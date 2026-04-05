const API_KEY = process.env.OPEN_API_KEY;
const MODEL = 'nvidia/nemotron-3-nano-30b-a3b:free';
export const BASE_URL = 'https://openrouter.ai/api/v1';

async function completionsRequest(model, messages, stream = false) {
    return await fetch(`${BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
            model,
            messages,
            stream,
        }),
    });
}

export async function llmRequest(messages) {
    const response = await completionsRequest(MODEL, messages);

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`OpenRouter request failed: ${response.status} ${errorText}`);
    }

    const data = await response.json();

    if (data.error) {
        throw new Error(data.error.message);
    }

    return data.choices?.[0]?.message?.content ?? 'No response from model.';
}
