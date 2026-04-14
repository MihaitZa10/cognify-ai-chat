'use client';
import { useMessagesQuery } from '../hooks/messages';
import ChatMessage from './ChatMessage';

function MessageList({ conversationID }) {
    const response = useMessagesQuery(conversationID);
    const messages = response.data ?? [];

    const chatMessages = [];
    for (const message of messages) {
        chatMessages.push(<ChatMessage key={message.id} role={message.role} text={message.text} />);
    }
    return <div className="p-2 flex flex-col gap-2">{chatMessages}</div>;
}

export default MessageList;
