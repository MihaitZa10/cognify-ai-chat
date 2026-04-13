import { prisma } from '../db';
import { llmRequest } from '../openrouter';

async function getMessages(conversationId: string) {
    return await prisma.message.findMany({
        where: { conversationId },
        orderBy: { createdAt: 'asc' },
    });
}

async function createMessage(conversationId: string, text: string) {
    const connect = { conversation: { connect: { id: conversationId } } };

    await prisma.message.create({
        data: { ...connect, role: 'user', text },
    });

    const conversationHistory = await prisma.message.findMany({
        where: { conversationId },
        orderBy: { createdAt: 'asc' },
    });

    const openAIMessages = conversationHistory.map(({ role, text }: { role: string; text: string }) => ({
        role,
        content: text,
    }));

    const aiResponse = await llmRequest(openAIMessages);

    const aiMessage = await prisma.message.create({
        data: { ...connect, role: 'assistant', text: aiResponse },
    });

    return aiMessage;
}

export async function GET(request: Request) {
    const url = new URL(request.url);
    const conversationId = url.searchParams.get('conversationId') ?? '';
    const data = await getMessages(conversationId);
    return Response.json(data);
}

export async function POST(request: Request) {
    const payload: { conversationId: string; text: string } = await request.json();
    const newMessage = await createMessage(payload.conversationId, payload.text);
    return Response.json(newMessage);
}
