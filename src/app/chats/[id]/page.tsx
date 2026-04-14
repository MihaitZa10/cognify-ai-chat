import { use } from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar';
import ChatPanel from '../../../components/ChatPanel/ChatPanel';

interface ChatPageParams {
    id: string;
}

interface ChatPageProps {
    params: Promise<ChatPageParams>;
}

export default function ChatPage({ params }: ChatPageProps) {
    const { id } = use(params);

    return (
        <>
            <Sidebar activeConversationID={id} />
            <ChatPanel activeConversationID={id} />
        </>
    );
}
