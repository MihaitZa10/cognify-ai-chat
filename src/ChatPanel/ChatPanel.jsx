'use client';

import MessageList from './MessageList';
import MessageForm from './MessageForm';
import { useState, useEffect } from 'react';
import { getMessages, createMessage } from '../api/messages';

function ChatPanel({ activeConversationID }) {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getMessages(activeConversationID).then(setMessages);
    }, [activeConversationID]); // ✅ ONLY id here

    async function appendMessage(input) {
        if (!input.trim() || isLoading) return;

        setIsLoading(true);

        try {
            await createMessage(activeConversationID, input);

            // re-fetch messages
            const updatedMessages = await getMessages(activeConversationID);
            setMessages(updatedMessages);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main className="flex flex-1 min-w-0 flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4">
                <MessageList messages={messages} />

                {isLoading && (
                    <div className="p-4 text-gray-400 italic flex items-center gap-2">
                        <div className="animate-bounce">●</div>
                        <div className="animate-bounce [animation-delay:0.2s]">●</div>
                        <div className="animate-bounce [animation-delay:0.4s]">●</div>
                        <span>Gemma is thinking...</span>
                    </div>
                )}
            </div>

            <div className="border-t border-white/20 p-4">
                <MessageForm appendMessage={appendMessage} isLoading={isLoading} />
            </div>
        </main>
    );
}

export default ChatPanel;
