const MESSAGES_DATABASE = {
    1: [
        { id: 1, role: 'user', text: 'Hello, how are you?' },
        { id: 2, role: 'assistant', text: "I'm good, thank you! How can I assist you today?" },
        { id: 3, role: 'user', text: 'Can you tell me a joke?' },
        { id: 4, role: 'assistant', text: 'Of course, what kind of joke do you want?' },
    ],
    2: [
        {
            id: 1,
            role: 'user',
            text: 'Help me with my homework? - essay on the topic of the siege of Warsaw during the World War Two.',
        },
        { id: 2, role: 'assistant', text: 'Okay! What style do you prefer - consince or detailed?' },
    ],
};
export async function getMessages(conversationID) {
    return MESSAGES_DATABASE[conversationID] ?? [];
}

export async function createMessage(conversationID, role, text) {
    const conversatHistory = MESSAGES_DATABASE[conversationID] ?? [];
    const id = conversatHistory.length + 1;
    conversatHistory.push({
        id,
        role,
        text,
    });
    return id;
}
