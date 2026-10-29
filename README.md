# Naya Zehan (نیا ذہن)

Web learning platform for Pakistani children, ages 3–21, in Urdu,
Punjabi, Sindhi, Pashto and English. Built with Next.js 14 (App Router),
React 18, Tailwind CSS, Firebase (Auth + Firestore) and the Groq API.

Live site: https://nayazahen.vercel.app

## What this site actually does today

- Sign-up with email or Google (Firebase Auth)
- AI quiz (Groq, cached in Firestore) and AI tutors: Ustad, Kamai, Nano
- Games, deen content, 60 city pages, age-band pages, blog
- Rubax points for quiz / games, stored in Firestore
- School applications, teacher uploads, creator submissions and
  contact / lead forms, all writing to Firestore

## What it does NOT do yet — do not claim otherwise

- No payout / withdrawal flow. The earn page mentions JazzCash /
  EasyPaisa and a Rs 200 minimum, but there is no payment code.
- No premium checkout. Premium prices (Rs 299 / 599 / 1,499) are
  display text only; the button links to sign-up.
- Leaderboards, creator earnings, homepage stats and some blog
  stories contain hardcoded / unverified figures. They are being
  cleaned up step by step — see `nayazahen-agent.md` (kept outside
  the repo until the owner says to push it).

## Getting started

```bash
npm ci
cp .env.example .env.local   # then fill in your own values, see .env.example
npm run dev                  # http://localhost:3000
npm run build
npm run start
```

If Firebase env vars are missing, the site still builds and loads,
but sign-in, Rubax and form submissions will not work until the
`NEXT_PUBLIC_FIREBASE_*` values are set (in Vercel for the live site).
That behaviour is intentional — see the comment in `lib/firebase.js`.

## School onboarding and communication templates

### Welcome email template for schools
Subject: Welcome to Naya Zehan — your school is now onboarded

Hello {schoolName},

Welcome to Naya Zehan. We are excited to support your students with safe AI learning, local-language content, and earning opportunities.

Your school dashboard will be ready shortly. In the meantime, please review the student onboarding guide and share the parent consent form.

Thank you,
The Naya Zehan Team

### Weekly report template
Subject: Weekly Naya Zehan school report

Hello {schoolName},

This week your students completed {activityCount} learning activities and earned {rubaxEarned} Rubax. Please review participation highlights and encourage continued engagement.

Best regards,
The Naya Zehan Team

### Parent notification template
Subject: Your child has a new learning opportunity on Naya Zehan

Hello {parentName},

Your child has been invited to explore Naya Zehan. Please review the safety guidance and approve account access if needed.

Thank you,
The Naya Zehan Team
