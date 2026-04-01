export async function getMessages(conversationID) {
    const response = await fetch(`/api/messages?conversationID=${conversationID}`);
    return await response.json();
}

export async function createMessage(conversationID, text) {
    const response = await fetch('/api/conversations', {
        method: 'POST',
        body: JSON.stringify({ conversationID, text }),
    });
    return await response.json();
}
