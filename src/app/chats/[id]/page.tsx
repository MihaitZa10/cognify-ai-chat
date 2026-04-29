import Sidebar from '../../../components/Sidebar/Sidebar';
import ChatPanel from '../../../components/ChatPanel/ChatPanel';
import { getMessages } from '../../../server/messages';
interface ChatPageParams {
    id: string;
}

interface ChatPageProps {
    params: Promise<ChatPageParams>;
}

export default async function ChatPage({ params }: ChatPageProps) {
    const { id } = await params;
    const dbMessages = await getMessages(id);
    type ChatMessage = {
        id: string;
        role: 'user' | 'assistant';
        parts: { type: 'text'; text: string }[];
    };

    const messages: ChatMessage[] = dbMessages.map((m) => ({
        id: m.id,
        role: m.role as 'user' | 'assistant',
        parts: [{ type: 'text', text: m.text }],
    }));
    return (
        <>
            <Sidebar activeConversationID={id} />
            <ChatPanel conversationId={id} initialMessages={messages} />
        </>
    );
}
