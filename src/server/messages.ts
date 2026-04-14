import { prisma } from './db';
import { llmRequest } from './openrouter';
import { revalidatePath } from 'next/cache';
export async function getMessages(conversationId: string) {
    return await prisma.message.findMany({
        where: { conversationId },
        orderBy: { createdAt: 'asc' },
    });
}

export async function createMessage(conversationId: string, text: string) {
    const connect = { conversation: { connect: { id: conversationId } } };

    await prisma.message.create({
        data: { ...connect, role: 'user', text },
    });

    const conversationHistory = await prisma.message.findMany({
        where: { conversationId },
        orderBy: { createdAt: 'asc' },
    });
    revalidatePath(`/chats/${conversationId}`);
    const openAIMessages = conversationHistory.map(({ role, text }: { role: string; text: string }) => ({
        role,
        content: text,
    }));

    const aiResponse = await llmRequest(openAIMessages);

    const aiMessage = await prisma.message.create({
        data: { ...connect, role: 'assistant', text: aiResponse },
    });
    revalidatePath(`/chats/${conversationId}`);
    return aiMessage;
}
