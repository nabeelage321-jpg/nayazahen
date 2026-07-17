import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function POST(request) {
  try {
    const { subject, grade } = await request.json();
    const safeSubject = subject || 'General Knowledge';
    const safeGrade = grade || '5';

    const cacheRef = doc(db, 'quiz_cache', `${safeSubject}-${safeGrade}`);
    const existing = await getDoc(cacheRef);

    if (existing.exists()) {
      const cacheData = existing.data();
      if (cacheData?.questions) {
        return Response.json({ questions: cacheData.questions, source: 'cache' });
      }
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return Response.json({ error: 'GROQ API key missing' }, { status: 500 });
    }

    const prompt = `Generate 10 multiple choice questions for Pakistani school children about ${safeSubject} for grade ${safeGrade}. Each question must have 4 options (A, B, C, D) and one correct answer. Return as JSON array: [{"question":"...","options":["A","B","C","D"],"correct":"A"}]`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: 'You are a helpful quiz generator for Pakistani school children.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.2,
      }),
    });

    if (!response.ok) {
      throw new Error('Groq request failed');
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content || '[]';
    let questions = [];

    try {
      questions = JSON.parse(content);
    } catch (error) {
      questions = [];
    }

    await setDoc(cacheRef, {
      questions,
      subject: safeSubject,
      grade: safeGrade,
      cachedAt: new Date().toISOString(),
    }, { merge: true });

    return Response.json({ questions, source: 'groq' });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
