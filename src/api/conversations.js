export async function getConversations() {
    const response = await fetch('/api/conversations');
    return await response.json();
}

export async function createConversation(title) {
    const response = await fetch('/api/conversations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
    });
    return await response.json();
}
