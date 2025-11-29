import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai('gpt-4o'),
    messages,
    system: 'You are an expert SDLC assistant. Help the user with their software development projects. Provide concise and practical advice.',
  });

  return result.toTextStreamResponse();
}
