const form = document.getElementById('messages-form');
const input = document.getElementById('messages-form-input');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const userMessage = input.value;
    displayMessage(userMessage, ['flex', 'justify-start']);
    input.value = '';
    //Here you would typically send the userMessage to the server and get a response
    const assistantResponse = getAssistantResponse(userMessage);
    displayMessage(assistantResponse, ['flex', 'justify-end', 'bg-blue-500']);
});

function displayMessage(message, classes) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('p-2', ...classes);
    messageDiv.textContent = message;
    document.getElementById('messages-history').appendChild(messageDiv);
}

function getAssistantResponse() {
    //Simulate
    return 'This is a response from the assistant.';
}
