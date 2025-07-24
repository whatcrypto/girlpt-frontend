import {
  transformBackendToAssistantUI,
  transformAssistantUIToBackend,
} from "@/lib/adapters";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    // Get authenticated user for usage tracking
    const { userId } = await auth();
    let userEmail = null;

    if (userId) {
      try {
        const clerk = await clerkClient();
        const user = await clerk.users.getUser(userId);
        userEmail = user.emailAddresses[0]?.emailAddress;
      } catch (error) {
        console.log("Could not get user email for usage tracking:", error);
      }
    }

    const body = await req.json();
    console.log("Received request body:", JSON.stringify(body, null, 2));

    const {
      messages,
      companionId,
      personality,
      backstory,
      conversationStyle,
      greetingMessage,
      characterId,
      characterName,
      characterDescription,
    } = body;

    // Transform messages for backend
    const backendMessages = transformAssistantUIToBackend(messages);
    console.log(
      "Transformed messages:",
      JSON.stringify(backendMessages, null, 2)
    );

    // Create request body in the format expected by backend
    const requestBody = {
      messages: backendMessages,
      temperature: 0.7,
      max_tokens: 1000,
      ...(userEmail && { user_email: userEmail }), // Add user email for usage tracking
      // Add companion data if available
      ...(companionId && {
        companion_id: companionId,
        personality,
        backstory,
        conversation_style: conversationStyle,
        greeting_message: greetingMessage,
      }),
      // Add character data if available (fallback to predefined characters)
      ...(characterId &&
        !companionId && {
          character_id: characterId,
          character_name: characterName,
          character_description: characterDescription,
        }),
    };
    console.log("Sending to backend:", JSON.stringify(requestBody, null, 2));

    const response = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    console.log("Backend response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Backend error response:", errorText);
      throw new Error(`Backend error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("Backend response data:", JSON.stringify(data, null, 2));

    // Update user metadata to track daily message usage (if authenticated)
    if (userId && userEmail) {
      try {
        const clerk = await clerkClient();
        const user = await clerk.users.getUser(userId);
        const currentMessages =
          (user.publicMetadata?.messagesUsedToday as number) || 0;
        const today = new Date().toDateString();
        const lastResetDate = user.publicMetadata?.lastResetDate as string;

        // Reset daily count if it's a new day
        const messagesToday = lastResetDate === today ? currentMessages + 1 : 1;

        await clerk.users.updateUserMetadata(userId, {
          publicMetadata: {
            ...user.publicMetadata,
            messagesUsedToday: messagesToday,
            lastResetDate: today,
          },
        });
      } catch (error) {
        console.log("Could not update user message count:", error);
      }
    }

    // Create a streaming response for Assistant UI
    const stream = new ReadableStream({
      start(controller) {
        // Send the content as a text delta
        const textChunk = `0:"${data.content.replace(/"/g, '\\"')}"\n`;
        controller.enqueue(new TextEncoder().encode(textChunk));

        // Send finish reason
        const finishChunk = `d:{"finishReason":"stop","usage":{"promptTokens":10,"completionTokens":20}}\n`;
        controller.enqueue(new TextEncoder().encode(finishChunk));

        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain",
        "X-Vercel-AI-Data-Stream": "v1",
      },
    });
  } catch (error) {
    console.error("Backend API error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: `Failed to get response: ${errorMessage}` }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
