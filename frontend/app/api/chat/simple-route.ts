import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function POST(req: Request) {
  try {
    // 1. Check authentication
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return new Response('Unauthorized', { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return new Response('Unauthorized', { status: 401 });
    }

    // 2. Get request body
    const { messages, character_id } = await req.json();

    // 3. Get character data (optional - for personality)
    let systemPrompt = "You are a helpful AI assistant.";
    if (character_id) {
      const { data: character } = await supabase
        .from('characters')
        .select('*')
        .eq('id', character_id)
        .single();
      
      if (character) {
        systemPrompt = `You are ${character.name}. ${character.description}`;
      }
    }

    // 4. Call OpenRouter directly
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_URL || "https://girlfriendpt.com",
        "X-Title": "GirlfriendPT",
      },
      body: JSON.stringify({
        "model": "mistralai/mistral-7b-instruct:free",
        "messages": [
          { "role": "system", "content": systemPrompt },
          ...messages
        ],
        "temperature": 0.7,
        "max_tokens": 400,
        "stream": true // Enable streaming
      })
    });

    if (!response.ok) {
      return new Response('AI service error', { status: 500 });
    }

    // 5. Return streaming response
    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('Chat error:', error);
    return new Response('Internal server error', { status: 500 });
  }
}