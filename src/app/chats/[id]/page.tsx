'use client';
import { useState, useEffect, use } from 'react';
import Sidebar from '../../../Sidebar/Sidebar';
import ChatPanel from '../../../ChatPanel/ChatPanel';
import { getMessages, createMessage } from '../../../api/messages';

interface ChatPageParams {
    id: string;
}

interface ChatPageProps {
    params: Promise<ChatPageParams>;
}

export default function ChatPage({ params }: ChatPageProps) {
    const { id } = use(params);

    const [messages, setMessages] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getMessages(id).then(setMessages);
    }, [id]);

    async function appendMessage(input: string) {
        if (!input.trim() || isLoading) return;
        setIsLoading(true);

        try {
            await createMessage(id, input);
            const updatedMessages = await getMessages(id);
            setMessages([...updatedMessages]);
        } catch (error) {
            console.error('Failed to get AI response:', error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <Sidebar activeConversationID={params} />
            <ChatPanel messages={messages} appendMessage={appendMessage} isLoading={isLoading} />
        </>
    );
}
