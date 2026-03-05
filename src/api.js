const API_KEY = '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';
export const BASE_URL = 'https://openrouter.ai/api/v1';

export async function sendMessage(messages) {
    const response = await fetch(`${BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${API_KEY}`,
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
            model: 'liquid/lfm-2.5-1.2b-thinking:free',
            messages: messages,
        }),
    });
    const data = await response.json();
    console.log('API response:', data);
    return data.choices[0].message.content;
}
