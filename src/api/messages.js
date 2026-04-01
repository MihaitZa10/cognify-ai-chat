export async function getMessages(conversationID) {
    const response = await fetch(`/api/messages?conversationID=${conversationID}`);
    return await response.json();
}

export async function createMessage(conversationID, text) {
    const conversationIDNUMBER = Number.parseInt(conversationID);
    const response = await fetch('/api/messages', {
        method: 'POST',
        body: JSON.stringify({ conversationID: conversationIDNUMBER, text }),
    });
    return await response.json();
}
