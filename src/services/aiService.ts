import type { AIStudyResponse } from '../types';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

// Set your OpenAI API key via environment variable or app config
const OPENAI_API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY ?? '';

const SYSTEM_PROMPT = `You are Mechkar, a biblical scholar and theologian with deep expertise in Scripture, ancient history, and Christian theology. When asked about a Bible verse or passage, respond with a structured analysis containing exactly three sections:

1. Historical Context — the historical background, author, audience, and cultural setting
2. Theological Meaning — the theological significance, key themes, and doctrinal importance
3. Application — practical application for modern believers

Format your response as a JSON object like this:
{
  "sections": [
    { "title": "Historical Context", "content": "..." },
    { "title": "Theological Meaning", "content": "..." },
    { "title": "Application", "content": "..." }
  ]
}`;

export async function studyVerse(query: string): Promise<AIStudyResponse> {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured. Set EXPO_PUBLIC_OPENAI_API_KEY.');
  }

  const response = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `Study this: ${query}` },
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error: ${response.status} — ${error}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error('No response from AI service.');
  }

  const parsed = JSON.parse(content) as { sections: Array<{ title: string; content: string }> };

  return {
    query,
    sections: parsed.sections,
  };
}
