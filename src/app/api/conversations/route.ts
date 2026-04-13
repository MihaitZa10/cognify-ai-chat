import { getConversations, createConversation } from '../../../server/conversations';

export async function GET() {
    const data = await getConversations();
    return Response.json(data);
}

export async function POST(request: Request) {
    const payload: { title: string } = await request.json();
    const newConversation = await createConversation(payload.title);
    return Response.json(newConversation);
}
