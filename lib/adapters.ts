// Data transformers/adapters for API response formats

interface Backend {
  content: string;
  role: string;
}

interface Frontend {
  choices: Array<{
    message: {
      content: string;
      role: string;
    };
  }>;
}

/**
 * Transforms backend API response to user format
 */
export function fromAPI(
  message: Backend
): Frontend {
  return {
    choices: [
      {
        message: {
          content: message.content,
          role: message.role,
        },
      },
    ],
  };
}

/**
 * Transforms user messages to API format
 */
export function toAPI(messages: any[]): any[] {
  return messages.map((msg) => ({
    role: msg.role,
    content: Array.isArray(msg.content)
      ? msg.content.map((c: any) => c.text).join("")
      : msg.content,
  }));
}
