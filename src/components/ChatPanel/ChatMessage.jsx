function ChatMessage({ role, text }) {
    const classes = role === 'user' ? 'justify-start bg-gray-700 rounded-xl' : 'justify-end bg-blue-400 rounded-xl';
    return <div className={`p-2 flex ${classes}`}>{text}</div>;
}

export default ChatMessage;
