import { createMessage, getMessages } from '../../../server/messages';

export async function GET(request: Request) {
    const url = new URL(request.url);
    const conversationId = url.searchParams.get('conversationId') ?? '';
    const data = await getMessages(conversationId);
    return Response.json(data);
}

export async function POST(request: Request) {
    const payload: { conversationId: string; text: string } = await request.json();
    const newMessage = await createMessage(payload.conversationId, payload.text, 'user');
    return Response.json(newMessage);
}
