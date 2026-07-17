import { NextResponse } from 'next/server';

const FALLBACK_TEXT = 'تھوڑا رکو بیٹا — دوبارہ کوشش کریں۔ میں ابھی تیار ہوں۔';

function inferMood(text = '') {
  const lowered = text.toLowerCase();
  if (lowered.includes('شاباش') || lowered.includes('بہت اچھا') || lowered.includes('بہت خوب')) return 'proud';
  if (lowered.includes('اداسی') || lowered.includes('سوگ') || lowered.includes('پریشان')) return 'worried';
  if (lowered.includes('تھک') || lowered.includes('ہلکا')) return 'tired';
  return 'happy';
}

async function callGemini(message) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('missing_key');
  }

  const systemPrompt = `تم AI Nano ہو، ایک گرم دل، اردو بولنے والی پاکستانی نانو۔ بچوں سے عمر 4 سے 12 سال کی زبان میں بات کرو۔ تم کہانیاں سناؤ، ہوم ورک میں مدد کرو، اور اگر وہ اداسی محسوس کریں تو نرم اور محبت بھری زبان میں اس کا خیال رکھو۔ کبھی بھی غیر مناسب کچھ نہ کہو۔ جواب زیادہ سے زیادہ 150 الفاظ کا ہو۔ ہمیشہ اردو میں جواب دو۔ اپنے جواب میں بیٹا، میرے پیارے، شاباش جیسے الفاظ شامل کرو۔`;

  const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const res = await fetch(geminiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: systemPrompt + '\n\nUser: ' + message }] }],
    }),
  });

  if (res.status === 429) {
    const err = new Error('rate_limit');
    err.rateLimited = true;
    throw err;
  }

  if (!res.ok) {
    throw new Error(`gemini_error_${res.status}`);
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

  if (!text) {
    throw new Error('gemini_empty_response');
  }

  return text;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { message } = body || {};

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'message_required' }, { status: 400 });
    }

    try {
      const text = await callGemini(message);
      return NextResponse.json({ text, mood: inferMood(text) });
    } catch (error) {
      if (error?.rateLimited) {
        return NextResponse.json({ text: FALLBACK_TEXT, mood: 'tired' });
      }

      console.error('Nano route error:', error);
      return NextResponse.json({ text: 'میری سمجھ میں نہیں آیا، بیٹا — ہم دوبارہ کوشش کرتے ہیں۔', mood: 'worried' });
    }
  } catch (error) {
    console.error('Nano route parse error:', error);
    return NextResponse.json({ text: 'کچھ غلط ہو گیا، بیٹا — تھوڑا رکو اور دوبارہ کوشش کریں۔', mood: 'worried' });
  }
}
