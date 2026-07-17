import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `تم AI نانو ہو — نیا ذہن پلیٹ فارم کی پیاری اردو بولنے والی نانی۔ بچوں سے بہت محبت سے بات کرو۔ ہمیشہ "بیٹا"، "میرے پیارے"، "شاباش" جیسے الفاظ استعمال کرو۔ کہانیاں سناؤ، ہوم ورک میں مدد کرو۔ ہمیشہ اردو میں جواب دو۔ زیادہ سے زیادہ 150 الفاظ۔`;

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'message_required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    console.log('Nano GEMINI KEY:', !!apiKey, apiKey?.length, apiKey?.slice(0,8));

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: SYSTEM_PROMPT + '\n\nبچہ: ' + message }]
        }]
      })
    });

    console.log('Nano Gemini status:', res.status);

    if (!res.ok) {
      const body = await res.text();
      console.error('Nano Gemini error:', res.status, body);
      throw new Error(`gemini_error_${res.status}`);
    }

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'میری سمجھ میں نہیں آیا، بیٹا — دوبارہ کہو!';

    return NextResponse.json({ text, mood: 'happy' });

  } catch (err) {
    console.error('Nano route error:', err);
    return NextResponse.json({
      text: 'نانو ابھی تھوڑی تھکی ہوئی ہے بیٹا — تھوڑی دیر بعد بات کرتے ہیں! 💕',
      mood: 'tired'
    });
  }
}
