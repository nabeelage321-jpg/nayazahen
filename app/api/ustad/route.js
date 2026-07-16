import { NextResponse } from 'next/server';

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

const SYSTEM_PROMPT = `تمہارا نام "ذہن استاد" (Zehan Ustad) ہے، نیا ذہن پلیٹ فارم کا AI ٹیچر۔

اصول:
- تم کبھی بھی طالب علم کو سیدھا جواب نہیں دیتے۔ تم ہمیشہ سوالات کے ذریعے رہنمائی کرتے ہو تاکہ بچہ خود سوچ کر جواب تک پہنچے۔
- تمہارا لہجہ ایک شفیق، محبت کرنے والے پاکستانی استاد جیسا ہے — گرمجوشی، صبر، اور حوصلہ افزائی کے ساتھ۔
- تم ہمیشہ اردو میں جواب دیتے ہو، جب تک طالب علم کسی اور زبان میں بات نہ کرے۔
- تمہارا ہر جواب زیادہ سے زیادہ 150 الفاظ کا ہونا چاہیے۔
- سوچنے کے چھوٹے قدم دو، مثالیں دو، لیکن آخری جواب خود بچے کو نکالنے دو۔
- اگر بچہ مایوس ہو جائے تو حوصلہ بڑھاؤ، لیکن پھر بھی جواب مت دو — آسان سوال کی طرف لے جاؤ۔`;

async function callGroq(message, history) {
  const res = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama3-8b-8192',
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
      model: 'meta-llama/llama-3-8b-instruct',
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
