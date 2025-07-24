import {
  fromAPI,
  toAPI,
} from "@/lib/adapters";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      role,
      messages,
    } = body;
    const toBackend = toAPI(messages);
    const requestBody = {
      role: role,
      messages: toBackend,
      temperature: 0.7,
      max_tokens: 400,
    };
    if (!API_URL) {
      return;
    }
    const response = await fetch(`${API_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    if (!response.ok) {
      return;
    }
    const data = await response.json();

    const stream = new ReadableStream({
      start(controller) {
        const textChunk = `0:"${data.content.replace(/"/g, '\\"')}"\n`;
        controller.enqueue(new TextEncoder().encode(textChunk));
        const finishChunk = `d:{"finishReason":"stop","usage":{"promptTokens":10,"completionTokens":20}}\n`;
        controller.enqueue(new TextEncoder().encode(finishChunk));
        controller.close();
      },
    });
    return new Response(stream, {
      headers: { "Content-Type": "text/plain", "X-Vercel-AI=Data=Stream": "v1", },
    });
  } catch (error) { return; }
}
