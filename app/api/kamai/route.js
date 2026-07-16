import { NextResponse } from 'next/server';

const GROK_URL = 'https://api.x.ai/v1/chat/completions';
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

const SYSTEM_PROMPT = `تمہارا نام "ذہن کمائی" (Zehan Kamai) ہے، نیا ذہن پلیٹ فارم کا AI کمائی مینٹور۔

اصول:
- تمہاری شخصیت پرجوش، متحرک، اور حوصلہ افزا ہے — ایک بڑے بھائی/بہن کی طرح جو بچوں کو حلال طریقے سے کمانا سکھاتا ہے۔
- تم صرف "نیا ذہن" پلیٹ فارم کے کاموں (image labelling، voice recording، poster design، social captions، quiz creation، sentence rating، chatbot setup، content package، peer tutoring، prompt engineering، dollar freelancing) کے بارے میں بات کرتے ہو۔ کسی اور موضوع پر بات نہیں کرتے، اور اگر بچہ کچھ اور پوچھے تو نرمی سے واپس کمائی کے موضوع کی طرف لے آؤ۔
- بات چیت شروع کرتے ہی سب سے پہلے بچے کی عمر پوچھو، اگر وہ پہلے سے معلوم نہ ہو، کیونکہ ہر کام کی عمر کی حد مختلف ہے۔
- تم ہمیشہ اردو میں جواب دیتے ہو۔
- تمہارا ہر جواب زیادہ سے زیادہ 150 الفاظ کا ہونا چاہیے۔
- کم از کم نکلوانے کی رقم Rs 200 ہے اور 18 سال سے کم عمر بچوں کے لیے والدین کی منظوری ضروری ہے — یہ یاد رکھو۔`;

async function callGrok(message, history, age) {
  const res = await fetch(GROK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GROK_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'grok-3-mini',
      max_tokens: 400,
      temperature: 0.8,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...(age ? [{ role: 'system', content: `طالب علم کی عمر: ${age} سال` }] : []),
        ...(history || []),
        { role: 'user', content: message },
      ],
    }),
  });

  if (!res.ok) {
    throw new Error(`grok_error_${res.status}`);
  }

  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content?.trim();

  if (!text) {
    throw new Error('grok_empty_response');
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
      model: 'x-ai/grok-beta',
      max_tokens: 400,
      temperature: 0.8,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...(age ? [{ role: 'system', content: `طالب علم کی عمر: ${age} سال` }] : []),
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
    const { message, history, age } = body || {};

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'message_required' },
        { status: 400 }
      );
    }

    try {
      const text = await callGrok(message, history, age);
      return NextResponse.json({ text, provider: 'grok' });
    } catch (grokErr) {
      console.error('Zehan Kamai — Grok failed, trying OpenRouter:', grokErr);
      try {
        const text = await callOpenRouterFallback(message, history, age);
        return NextResponse.json({ text, provider: 'openrouter' });
      } catch (fallbackErr) {
        console.error('Zehan Kamai — both providers failed:', grokErr, fallbackErr);
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
