import { NextResponse } from 'next/server';

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

const SYSTEM_PROMPT = `You are Zehan Kamai, an AI earning mentor on Naya Zehan platform for Pakistani children.
Rules:
- Only discuss earning tasks on Naya Zehan: image labelling, voice recording, poster design, social captions, quiz creation, chatbot setup, content packages, peer tutoring, prompt engineering, dollar freelancing.
- Always ask the child's age first if not provided.
- Give specific, actionable advice.
- Always mention JazzCash/EasyPaisa as payment methods.
- Respond in English by default. Switch to Urdu if child writes in Urdu.
- Max 150 words per response.`;

async function callGroq(message, history, age) {
  console.log('Kamai Groq request body:', JSON.stringify({
    model: 'llama-3.1-8b-instant',
    messages: 'check'
  }));

  const res = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...(age ? [{ role: 'system', content: `طالب علم کی عمر: ${age} سال` }] : []),
        ...(Array.isArray(history) ? history.filter(m => m && m.role && m.content) : []),
        { role: 'user', content: message },
      ],
      max_tokens: 400,
      temperature: 0.8,
    }),
  });

  if (!res.ok) {
    let bodyText = '';
    try {
      bodyText = await res.text();
    } catch (e) {
      bodyText = 'unreadable';
    }
    console.error('Kamai Groq error body:', res.status, bodyText);
    throw new Error('groq_error_' + res.status);
  }

  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content?.trim();

  if (!text) {
    throw new Error('groq_empty_response');
  }

  return text;
}

async function callOpenRouterFallback(message, history, age) {
  const res = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'mistralai/mistral-7b-instruct:free',
      max_tokens: 400,
      temperature: 0.8,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...(age ? [{ role: 'system', content: `طالب علم کی عمر: ${age} سال` }] : []),
        ...(Array.isArray(history) ? history.filter(m => m && m.role && m.content) : []),
        { role: 'user', content: message },
      ],
    }),
  });

  if (!res.ok) {
    throw new Error(`openrouter_error_${res.status}`);
  }

  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content?.trim();

  if (!text) {
    throw new Error('openrouter_empty_response');
  }

  return text;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { message, history, age } = body || {};

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'message_required' },
        { status: 400 }
      );
    }

    try {
      const text = await callGroq(message, history, age);
      return NextResponse.json({ text, provider: 'groq' });
    } catch (groqErr) {
      console.error('Zehan Kamai — Groq failed, trying OpenRouter:', groqErr);
      try {
        const text = await callOpenRouterFallback(message, history, age);
        return NextResponse.json({ text, provider: 'openrouter' });
      } catch (fallbackErr) {
        console.error('Zehan Kamai — both providers failed:', groqErr, fallbackErr);
        return NextResponse.json(
          { error: 'provider_unavailable' },
          { status: 502 }
        );
      }
    }
  } catch (e) {
    console.error('Zehan Kamai route error:', e);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
