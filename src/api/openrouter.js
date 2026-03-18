const API_KEY = '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';
const MODEL = 'google/gemma-3-27b-it:free';
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

export async function llmRequest(messages) {
    const formattedMessages = messages.map((m) => ({
        role: m.role,
        content: m.text,
    }));

    const response = await completionsRequest(MODEL, formattedMessages);
    const data = await response.json();

    if (data.error) throw new Error(data.error.message);

    return data.choices[0].message.content;
}
