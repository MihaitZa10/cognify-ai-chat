const form = document.getElementById('messages-form');
const input = document.getElementById('messages-form-input');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const userMessage = input.value;
    displayMessage(userMessage, 'user');
    input.value = '';
    //Here you would typically send the userMessage to the server and get a response
    const assistantResponse = getAssistantResponse(userMessage);
    displayMessage(assistantResponse, 'assistant');
});

function displayMessage(message, role) {
    const messageDiv = document.createElement('chat-message');
    messageDiv.setAttribute('role', role);
    const messageContent = document.createElement('div');
    messageContent.textContent = message;
    messageDiv.appendChild(messageContent);
    document.getElementById('messages-history').appendChild(messageDiv);
}

function getAssistantResponse() {
    //Simulate
    return 'This is a response from the assistant.';
}
