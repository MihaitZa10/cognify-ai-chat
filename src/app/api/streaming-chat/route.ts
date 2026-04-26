import { streamText, UIMessage } from 'ai';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { getMessages, createMessage } from '../../../server/messages';

const openrouter = createOpenAICompatible({
    name: 'openrouter',
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req: Request) {
    const { messages, conversationId }: { messages: UIMessage[]; conversationId: string } = await req.json();
    const lastMessage = messages[messages.length - 1];
    const parts = lastMessage.parts.filter((p) => p.type === 'text');
    const userText = parts.map((p) => p.text).join(',');

    await createMessage(conversationId, userText, 'user');
    const history = await getMessages(conversationId);

    const result = streamText({
        model: openrouter('nvidia/nemotron-3-nano-30b-a3b:free'),
        messages: history.map((m) => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.text })),
        onFinish: async ({ text }) => {
            await createMessage(conversationId, text, 'assistant');
        },
    });

    return result.toUIMessageStreamResponse();
}
