const CONVERSATION_DATABASE = [
    { id: 1, title: 'How is your day?' },
    { id: 2, title: 'Help me with homework' },
];

export async function getConversations() {
    return CONVERSATION_DATABASE;
}

export async function createConversation(title) {
    const id = CONVERSATION_DATABASE.length;
    CONVERSATION_DATABASE.push({
        id,
        title,
    });
    return id;
}
