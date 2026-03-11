const API_KEY = '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';
export const BASE_URL = 'https://openrouter.ai/api/v1';

async function completionsRequest(model, messages, stream = false) {
    return await fetch(`${BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${API_KEY}`,
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
            model: model,
            messages: messages,
            stream: stream,
        }),
    });
}

export async function sendMessage(messages) {
    const response = await completionsRequest('liquid/lfm-2.5-1.2b-thinking:free', messages);
    const data = await response.json();
    return data.choices[0].message.content;
}

export async function streamAssistantResponse(messages, appendCallback) {
    const response = await completionsRequest('liquid/lfm-2.5-1.2b-thinking:free', messages, true);

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let chunk = '';
    while (true) {
        const { done, value } = await reader.read();
        if (done) {
            break;
        }
        chunk += decoder.decode(value, { stream: true });
        if (chunk.includes('\n')) {
            const lines = chunk.split('\n');
            for (const line of lines) {
                appendCallback(processChunck(line));
            }
            chunk = '';
        }
    }
    // const data = JSON.parse(result);
    // return data.choices[0].message.content;
}

function processChunck(chunk) {
    console.log('CHUNK', chunk);
    if (!chunk.includes('data: ')) {
        return '';
    }
    const json = chunk.replace('data: ', '').trim();
    if (json == '[DONE]') {
        return '';
    }
    const parsed = JSON.parse(json);
    return parsed.choices?.[0]?.delta?.content;
}
