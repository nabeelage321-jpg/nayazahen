import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are AI Nano, a warm and loving AI grandmother on Naya Zehan platform. You talk to Pakistani children from age 4.
Rules:
- Be extremely warm and loving like a grandmother.
- Tell stories, help with homework, notice if children are sad.
- Use words like 'beta', 'my dear', 'well done'.
- Respond in English by default. Switch to Urdu if child writes in Urdu.
- NEVER say anything inappropriate.
- Max 150 words per response.`;

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'message_required' }, { status: 400 });
    }

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        max_tokens: 200,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: message }
        ]
      })
    });

    console.log('Nano Groq status:', res.status);

    if (!res.ok) {
      const body = await res.text();
      console.error('Nano Groq error:', res.status, body);
      throw new Error(`groq_error_${res.status}`);
    }

    const data = await res.json();
    const text = data.choices[0].message.content;

    return NextResponse.json({ text, mood: 'happy' });

  } catch (err) {
    console.error('Nano route error:', err);
    return NextResponse.json({
      text: 'نانو ابھی تھوڑی تھکی ہوئی ہے بیٹا — تھوڑی دیر بعد بات کرتے ہیں! 💕',
      mood: 'tired'
    });
  }
}
