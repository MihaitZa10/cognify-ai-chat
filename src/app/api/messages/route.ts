import { llmRequest } from '../openrouter.js';

const MESSAGES_DATABASE: Map<number, any> = new Map([
    [
        1,
        [
            { id: 1, role: 'user', text: 'Hello, how are you?' },
            { id: 2, role: 'assistant', text: "I'm good, thank you! How can I assist you today?" },
            { id: 3, role: 'user', text: 'Can you tell me a joke?' },
            { id: 4, role: 'assistant', text: 'Of course, what kind of joke do you want?' },
        ],
    ],
    [
        2,
        [
            {
                id: 1,
                role: 'user',
                text: 'Help me with my homework? - essay on the topic of the siege of Warsaw during the World War Two.',
            },
            { id: 2, role: 'assistant', text: 'Okay! What style do you prefer - consince or detailed?' },
        ],
    ],
]);
async function getMessages(conversationID: number) {
    return MESSAGES_DATABASE.get(conversationID) ?? [];
}

async function createMessage(conversationID: number, text: string) {
    const conversatHistory = MESSAGES_DATABASE.get(conversationID) ?? [];
    console.log(conversationID, conversatHistory);
    const id = conversatHistory.length + 1;
    const newMessage = {
        id,
        role: 'user',
        text,
    };
    conversatHistory.push(newMessage);
    const openAImessages = conversatHistory.map(({ role, text }) => ({ role, content: text }));
    console.log('Sending to model:', openAImessages);
    const aiResponse = await llmRequest(openAImessages);
    const aiMessage = { id: id + 1, role: 'assistant', text: aiResponse };
    conversatHistory.push(aiMessage);
    return aiMessage;
}

export async function GET(request: Request) {
    const url = new URL(request.url);
    const conversationIDstring = url.searchParams.get('conversationID') ?? '0';
    const conversationID = Number.parseInt(conversationIDstring);
    const data = await getMessages(conversationID);
    return Response.json(data);
}

export async function POST(request: Request) {
    const payload: { conversationID: number; text: string } = await request.json();
    const newMessage = await createMessage(payload.conversationID, payload.text);
    return Response.json(newMessage);
}
