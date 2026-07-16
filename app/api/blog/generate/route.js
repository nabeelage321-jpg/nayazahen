import { NextResponse } from 'next/server';

const MISTRAL_URL = 'https://api.mistral.ai/v1/chat/completions';
const FALLBACK_TITLE_EN = 'AI Learning for Children in Pakistan';
const FALLBACK_TITLE_UR = 'بچوں کے لیے AI سیکھنا';

function buildFallback(city, age, topic) {
  return {
    titleEn: `${topic} for Kids in ${city}`,
    titleUr: `${topic} بچوں کے لیے ${city} میں`,
    contentEn: `AI education helps children in ${city} learn with confidence, creativity, and practical skills. At age ${age}, students benefit from simple lessons, guided practice, and activities that make technology feel friendly and useful. This approach supports curiosity, problem solving, and future-ready learning in Pakistan.`,
    contentUr: `AI تعلیم بچوں کو ${city} میں اعتماد، تخلیقی صلاحیتوں اور عملی مہارتوں کے ساتھ سکھاتی ہے۔ ${age} سال کی عمر میں بچہ سادہ سبق، رہنمائی اور سرگرمیوں سے ٹیکنالوجی کو دوستانہ اور مفید محسوس کر سکتے ہیں۔ یہ طریقہ پاکستان میں دلچسپی، مسئلہ حل اور مستقبل کے لیے تیار سیکھنے کو مضبوط بناتا ہے۔`,
    metaDesc: `Discover an easy and friendly AI education guide for children in ${city}, age ${age}, focused on ${topic}.`,
  };
}

async function callMistral(city, age, topic) {
  const apiKey = process.env.MISTRAL_API_KEY;
  if (!apiKey) {
    throw new Error('missing_key');
  }

  const res = await fetch(MISTRAL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'mistral-small',
      temperature: 0.8,
      max_tokens: 900,
      messages: [
        {
          role: 'system',
          content: 'You are an expert Pakistani education SEO writer. Write warm, useful, and child-friendly content. Return strict JSON with titleEn, titleUr, contentEn, contentUr, metaDesc only.',
        },
        {
          role: 'user',
          content: `Create a SEO blog post about AI education in ${city} for age ${age} about ${topic}. Return strict JSON with titleEn, titleUr, contentEn, contentUr, metaDesc.`,
        },
      ],
    }),
  });

  if (res.status === 429) {
    const error = new Error('rate_limit');
    error.rateLimited = true;
    throw error;
  }

  if (!res.ok) {
    throw new Error(`mistral_error_${res.status}`);
  }

  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content?.trim();
  if (!text) {
    throw new Error('mistral_empty_response');
  }

  const parsed = JSON.parse(text);
  return parsed;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { city = 'پاکستان', age = '7', topic = 'AI' } = body || {};

    try {
      const result = await callMistral(city, age, topic);
      return NextResponse.json({
        titleEn: result?.titleEn || FALLBACK_TITLE_EN,
        titleUr: result?.titleUr || FALLBACK_TITLE_UR,
        contentEn: result?.contentEn || '',
        contentUr: result?.contentUr || '',
        metaDesc: result?.metaDesc || '',
      });
    } catch (error) {
      if (error?.rateLimited) {
        return NextResponse.json({
          ...buildFallback(city, age, topic),
          fallback: true,
          message: 'تھوڑا رکو بیٹا — دوبارہ کوشش کریں',
        });
      }

      console.error('Blog generator route error:', error);
      return NextResponse.json({
        ...buildFallback(city, age, topic),
        fallback: true,
        message: 'بے شک، اس وقت بلاگ تیار نہیں ہو سکی۔',
      });
    }
  } catch (error) {
    console.error('Blog generator parse error:', error);
    return NextResponse.json({
      ...buildFallback('پاکستان', '7', 'AI'),
      fallback: true,
      message: 'تھوڑا رکو بیٹا — دوبارہ کوشش کریں',
    });
  }
}
