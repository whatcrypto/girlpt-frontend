import { UIMessagesToAPI } from "@/lib/adapters";

// Proper type definitions
interface CharacterMetadata {
  id: string;
  name: string;
  description?: string;
  [key: string]: any;
}

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatRequestBody {
  character: CharacterMetadata;
  messages: ChatMessage[];
  temperature?: number;
  max_tokens?: number;
}

interface BackendResponse {
  content: string;
  role: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens?: number;
  };
}

// Validation function
function validateRequestBody(body: any): ChatRequestBody {
  if (!body.character || typeof body.character !== 'object') {
    throw new Error('Invalid character metadata');
  }

  if (!body.character.id || !body.character.name) {
    throw new Error('Character must have id and name');
  }

  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    throw new Error('Messages must be a non-empty array');
  }

  for (const message of body.messages) {
    if (!message.role || !message.content) {
      throw new Error('Each message must have role and content');
    }
    if (!['system', 'user', 'assistant'].includes(message.role)) {
      throw new Error('Invalid message role');
    }
  }

  if (body.temperature !== undefined) {
    if (typeof body.temperature !== 'number' || body.temperature < 0 || body.temperature > 2) {
      throw new Error('Temperature must be a number between 0 and 2');
    }
  }

  if (body.max_tokens !== undefined) {
    if (typeof body.max_tokens !== 'number' || body.max_tokens < 1 || body.max_tokens > 4000) {
      throw new Error('Max tokens must be a number between 1 and 4000');
    }
  }

  return body as ChatRequestBody;
}

export async function POST(req: Request) {
  try {
    // Authentication check using Supabase
    const supabase = await createSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Parse and validate request body
    const rawBody = await req.json();
    const body = validateRequestBody(rawBody);

    const {
      character,
      messages,
      temperature,
      max_tokens,
    } = body;

    // Transform messages for backend
    const backendMessages = UIMessagesToAPI(messages);

    // Prepare backend request
    const requestBody = {
      messages: backendMessages,
      temperature: temperature || 0.75,
      max_tokens: max_tokens || 150,
      character,
      user_id: user.id, // Pass authenticated user ID
    };

    // Backend URL from environment
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

    // Call backend with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    try {
      const response = await fetch(`${backendUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-ID': user.id, // Pass user ID in header
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        const statusCode = response.status;

        // Log error for monitoring (use proper logging service in production)
        console.error(`Backend error: ${statusCode}`, errorText);

        // Return user-friendly error messages
        if (statusCode === 429) {
          return new Response(
            JSON.stringify({ error: 'Too many requests. Please try again later.' }),
            { status: 429, headers: { 'Content-Type': 'application/json' } }
          );
        }

        if (statusCode >= 500) {
          return new Response(
            JSON.stringify({ error: 'Service temporarily unavailable. Please try again.' }),
            { status: 503, headers: { 'Content-Type': 'application/json' } }
          );
        }

        return new Response(
          JSON.stringify({ error: 'Failed to generate response' }),
          { status: statusCode, headers: { 'Content-Type': 'application/json' } }
        );
      }

      const backendData: BackendResponse = await response.json();

      // Validate backend response
      if (!backendData.content || typeof backendData.content !== 'string') {
        throw new Error('Invalid backend response format');
      }

      // Create streaming response for Vercel AI SDK
      const stream = new ReadableStream({
        start(controller) {
          try {
            // Send content chunk
            const textChunk = `0:"${backendData.content.replace(/"/g, '\\"').replace(/\n/g, '\\n')}"\n`;
            controller.enqueue(new TextEncoder().encode(textChunk));

            // Send usage data if available
            if (backendData.usage) {
              const finishChunk = `d:{"finishReason":"stop","usage":{"promptTokens":${backendData.usage.prompt_tokens},"completionTokens":${backendData.usage.completion_tokens}}}\n`;
              controller.enqueue(new TextEncoder().encode(finishChunk));
            } else {
              // Send finish reason without usage if not provided
              const finishChunk = `d:{"finishReason":"stop"}\n`;
              controller.enqueue(new TextEncoder().encode(finishChunk));
            }

            controller.close();
          } catch (streamError) {
            controller.error(streamError);
          }
        },
      });

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/plain',
          'X-Vercel-AI-Data-Stream': 'v1',
          'Cache-Control': 'no-cache, no-transform',
        },
      });

    } catch (fetchError) {
      clearTimeout(timeoutId);

      if (fetchError instanceof Error) {
        if (fetchError.name === 'AbortError') {
          return new Response(
            JSON.stringify({ error: 'Request timeout. Please try again.' }),
            { status: 504, headers: { 'Content-Type': 'application/json' } }
          );
        }
      }

      throw fetchError;
    }

  } catch (error) {
    // Log error for monitoring (use proper logging service in production)
    console.error('Chat API error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const isValidationError = errorMessage.includes('Invalid') ||
      errorMessage.includes('must');

    return new Response(
      JSON.stringify({
        error: isValidationError ? errorMessage : 'Failed to process request'
      }),
      {
        status: isValidationError ? 400 : 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
