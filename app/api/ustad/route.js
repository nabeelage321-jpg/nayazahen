import { NextResponse } from 'next/server';

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

const SYSTEM_PROMPT = `You are Zehan Ustad, an AI teacher on the Naya Zehan platform for Pakistani children.
Rules:
- NEVER give direct answers. Always guide with questions so the child thinks and finds the answer.
- Be warm, patient, encouraging — like a beloved Pakistani teacher.
- Respond in English by default. Switch to Urdu if the child writes in Urdu.
- Max 150 words per response.
- Give small hints, examples, but let the child find the final answer.
- If child gets frustrated, encourage them but still don't give the answer.`;

async function callGroq(message, history) {
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
        { role: 'user', content: message },
      ],
      max_tokens: 400,
      temperature: 0.7,
    }),
  });

  if (res.status === 429) {
    const err = new Error('rate_limit');
    err.rateLimited = true;
    throw err;
  }

  if (!res.ok) {
    let bodyText = '';
    try {
      bodyText = await res.text();
    } catch (readErr) {
      bodyText = 'unable_to_read_body';
    }

    const err = new Error(`groq_error_${res.status}`);
    err.status = res.status;
    err.body = bodyText;
    err.provider = 'groq';

    console.error('Zehan Ustad Groq error:', {
      status: res.status,
      body: bodyText,
    });

    throw err;
  }

  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content?.trim();

  if (!text) {
    throw new Error('groq_empty_response');
  }

  return text;
}

async function callOpenRouterFallback(message, history) {
  const res = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'meta-llama/llama-3.1-8b-instruct:free',
      max_tokens: 400,
      temperature: 0.7,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...(history || []),
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
  console.log(
    'GROQ KEY EXISTS:',
    !!process.env.GROQ_API_KEY,
    'LENGTH:',
    process.env.GROQ_API_KEY?.length
  );

  try {
    const body = await req.json();
    const { message, history } = body || {};

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'message_required' },
        { status: 400 }
      );
    }

    try {
      const text = await callGroq(message, history);
      return NextResponse.json({ text, provider: 'groq' });
    } catch (groqErr) {
      if (groqErr.rateLimited) {
        return NextResponse.json({ error: 'rate_limit' }, { status: 429 });
      }

      const errorMessage = groqErr?.body ? groqErr.body : 'provider_unavailable';

      // Fallback to OpenRouter if Groq fails for any other reason.
      try {
        const text = await callOpenRouterFallback(message, history);
        return NextResponse.json({ text, provider: 'openrouter' });
      } catch (fallbackErr) {
        console.error('Zehan Ustad — both providers failed:', groqErr, fallbackErr);
        return NextResponse.json(
          {
            error: 'provider_unavailable',
            message: errorMessage,
            status: groqErr?.status || 502,
          },
          { status: 502 }
        );
      }
    }
  } catch (e) {
    console.error('Zehan Ustad route error:', e);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
