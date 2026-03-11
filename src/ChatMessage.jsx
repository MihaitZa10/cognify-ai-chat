function ChatMessage({ role, text }) {
    const classes = role === 'user' ? 'justify-start bg-gray-200' : 'justify-end bg-blue-200';
    return <div className={`p-2 flex ${classes}`}>{text}</div>;
}

export default ChatMessage;
