# AGENT.md — Naya Zehan (نیا ذہن) — Merged v3.1

> بسم اللہ الرحمن الرحیم
> "Seekhna i Poray Pakistan Ko" — Educate all of Pakistan, through play, AI, and culture.

**This is the single working source of truth from 2026-10-29 onward.**
It merges two documents that must never again be used alone:

- **Layer A — Repo truth:** the draft agent.md written 2026-10-29
  from a full review of github.com/nabeelage321-jpg/nayazahen
  (what actually builds, runs, and is live today).
- **Layer B — Vision / target:** the original AGENT.md v3.0 pasted
  by the owner in chat on 2026-10-29, which itself merges Agent v2.1,
  the 22-section Blueprint, Prompts, 6 HTML prototypes v1 → v5 /
  remixed-8909695e, and full conversation logs.

**Reading rule for any AI or developer using this file:**
Layer A governs everything that is live or claimed as built.
Layer B governs only what to build NEXT, in the order in §8.
If the two layers disagree, see §9 — the conflict is OPEN until
the owner picks a side. Do not silently pick a side, and do not
present a Layer B target as if it were already built.

This file is for Naya Zehan ONLY. It is NOT the TaxiFlow agent.md
and NOT the AI Receivables agent.md. Do not mix their rules, prices,
or data into this project.

---

## 1. Identity (agreed in both layers)

| Field | Value |
|---|---|
| Name | Naya Zehan — نیا ذہن ("New Mind"). Spelling "Naya Zahen" in older files is the same brand. |
| Tagline | Pakistan's First AI Education Platform — Learn. Earn. Grow. / سیکھو۔ کماؤ۔ بڑھو۔ (Marketing claim — see Hard Rule 5: do not use it in a grant, pitch, or school proposal without the owner's confirmation.) |
| Mission | AI education + real earning for every Pakistani child aged 3–21, in their own language, free to start. |
| One-sentence pitch | Every Pakistani child — no matter where they live, how much their family earns, or what school they go to — gets the same chance to learn, create, earn, and be seen. |
| Currency | Rubax (Rb). Future crypto ticker in v3.0: RBX — long-horizon only, see §7. In code, `rubax_balance` / `naya_coins` are the same thing; user-facing copy always says **Rubax**. |
| Repo | https://github.com/nabeelage321-jpg/nayazahen, branch `main` only (verified 2026-10-29) |
| Live site (Layer A) | https://nayazahen.vercel.app (returned 200 on 2026-10-29) |
| Domain claimed (Layer B) | nayazahen.pk — VERIFY before use. Repo contact emails already use @nayazahen.pk, but domain + mailbox existence is still unconfirmed (§9). |
| Last push in repo | 2026-07-26 |
| Founder role (v3.0) | Vision, Pakistan ground presence, school/parent relationships, deployment. |
| AI co-developer role (v3.0) | All code, design, copy, strategy, documents. |

---

## 2. LAYER A — Current repo truth (verified 2026-10-29)

### 2.1 Stack that actually builds

Next.js 14.2.5 (App Router), React 18, Tailwind CSS 3.4,
Firebase Auth + Firestore, Groq API. NOT the v3.0 stack.
Do NOT follow v3.0 §42 step 1 (`npx create-react-app`) — the
scaffold already exists as Next.js, and rebuilding it would
throw away a working, live site.

Size: 81 files, 41 `page.js` files, 50+ routes including
dynamic city / age / blog routes. `npm ci` installs cleanly
(182 packages). First-load JS shared ~87 kB.

### 2.2 Repo map

```
app/
  page.js                 Homepage (hero, six pillars, stats, LeadForm)
  layout.js               LangProvider, Navbar, Footer, 4 global widgets
  globals.css             Tailwind + theme (colours match §3 below)
  sitemap.js              Static pages + 60 cities + ages + 8 blog slugs
  signup/                 Email + Google sign-up (Firebase Auth)
  dashboard/              Logged-in user + Rubax balance (real Firestore read)
  quiz/                   AI quiz (Groq) + quiz/leaderboard (HARDCODED, §4)
  games/                  cricket-champions, kite-flying, math-bazaar,
                          piggy-bank, urdu-hero
  deen/                   Main, 99names, duas, quran
  cities/[city]/          60 city pages from data/cities.js
  ages/[age]/             Age-band pages from data/index.js AGES
  blog/[slug]/            Blog posts; /api/blog/generate is Mistral-based
  earn/                   Earning explainer — claims only, no payout code
  premium/                Rs 299 / 599 / 1,499 per month — prices only, no checkout
  schools/                Info, /apply (Firestore), /dashboard
  teacher/                Info, /upload (Firestore)
  creator/                Info, /studio (Firestore), /earnings (HARDCODED, §4)
  parent/, nz-id/, pitb/, launch/, contact/, about/, privacy/, terms/
  api/
    ustad/route.js        AI tutor — Groq first, OpenRouter fallback
    kamai/route.js        Earning-ideas tutor — Groq first, OpenRouter fallback
    nano/route.js         Small tutor widget — Groq
    quiz/route.js         Quiz generator — Groq + Firestore quiz_cache
    blog/generate/route.js  Blog draft generator — Mistral
components/
  Navbar.js, Footer.js, LeadForm.js (writes Firestore `leads`),
  ZehanUstad.js, ZehanKamai.js, NanoWidget.js, KhanaGhariWidget.js,
  RubaxWallet.js (real balance + last 20 transactions)
data/
  cities.js               60 cities: id, name, nameUr, province, pop, kids, schools
  index.js                AGES (9 bands, 3–21), FEATURES (six pillars),
                          EARN_TASKS (11 categories), TESTIMONIALS (8 entries)
lib/
  firebase.js             Firebase init (Step 1 fix applied locally, §8)
  rubax.js                awardRubax / getRubaxBalance / getTransactions
  lang.js                 LangProvider + useLang (en / ur / pa / sd / ps)
public/
  og-image.svg            Used for Open Graph. og-image.jpg was 0 bytes, unused.
```

Global widgets on EVERY page via `layout.js`: ZehanUstad,
ZehanKamai, NanoWidget, KhanaGhariWidget, plus RubaxWallet.
Changing one affects the whole site — re-check the homepage after.

Languages on site today: code defaults to English, layout is
`<html lang="ur" dir="rtl">`. Punjabi / Sindhi / Pashto fall back
to Urdu copy — do not claim full translation. Balochi and Saraiki
have content in v3.0 (blog, city copy) but are NOT switchable UI
languages in the repo — Phase 2 target, §7.

### 2.3 Environment variables (names only — never values, never in chat)

Server (Vercel, never `NEXT_PUBLIC_`): `GROQ_API_KEY` (ustad,
kamai, nano, quiz), `OPENROUTER_API_KEY` (fallback, ustad + kamai
only), `MISTRAL_API_KEY` (blog generate only).
Client (Firebase): `NEXT_PUBLIC_FIREBASE_API_KEY`,
`NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`, `NEXT_PUBLIC_FIREBASE_PROJECT_ID`,
`NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`,
`NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`,
`NEXT_PUBLIC_FIREBASE_APP_ID`.
v3.0's Gemini / Claude / Google TTS-STT keys are NOT in this repo
and must NOT be added until the owner picks the AI stack (§9).

### 2.4 Known build problem — and Step 1 fix (2026-10-29)

Old `lib/firebase.js` passed `undefined` into `initializeApp`,
so `npm run build` failed at "Collecting page data" for `/api/quiz`
with `FirebaseError: auth/invalid-api-key` whenever env vars were
missing. Step 1 pack (workspace/user/files/nayazahen-step1/,
NOT pushed to GitHub) fixes this with placeholder fallbacks +
a console warning, adds `.env.example` (names only), and rewrites
README.md to say what the site does and does NOT do. Verified:
`npm ci` + `npm run build` PASS with no keys set. Missing keys
still mean sign-in / Rubax / forms will not work at runtime —
that is intentional, and must be fixed by setting real env vars
in Vercel, not by hardcoding keys.
Next.js 14.2.5 prints a security-vulnerability warning on install.
Upgrading Next is a separate, owner-approved step — never silent
inside another fix. `next.config.mjs`: trailingSlash, compress,
poweredByHeader false, images unoptimised — do not change without
a visible reason.

Commands: `npm ci` · `npm run dev` (localhost:3000) ·
`npm run build` · `npm run start`.

---

## 3. Design system (both layers agree — keep it)

From v3.0 §4, confirmed by repo `tailwind.config.js`:

- ink #0D0D1A, ink2 #1E1C38, ink3 #5A587A, paper #FAFAF5,
  paper2 #F2F1E8, paper3 #E5E3D5
- plum #42188C (education / Ustad), plum-l #7040C8, plum-p #EDE8FA
- teal #0A7050 (earning / Kamai), teal-l #10A878, teal-p #E0F5EE
- gold #B8860A (parent / premium), gold-l #F0C030, gold-p #FEF6D8
- coral #B83008, coral-p #FAE8E0
- Fonts: Fraunces (headings), Plus Jakarta Sans (body),
  Noto Nastaliq Urdu (all Urdu, RTL).
- Radii 16px / 12px; shadows 0 2px 20px and 0 8px 48px rgba(13,13,26,·).

Brand rules: Plum = education, Teal = earning, Gold = parent /
premium CTAs, Coral = accent/alerts. Always bilingual: English /
Roman-Urdu primary + Urdu script subtitle beneath. Language choice
front-and-centre on first load, not buried in settings — v3.0 calls
this the core emotional hook ("tum bhi matter karte ho").

Language tone personalities (v3.0 §8, target for all copy):
English professional/global; Urdu warm, educated, respectful elder;
Punjabi casual like a yaar, fun; Sindhi like a bhai, community-warm;
Pashto respectful, strong, proud; Balochi gentle, welcoming.

---

## 4. What is real vs demo vs missing — read before touching copy

### Real today (works when env vars are set)

Email + Google sign-up; school applications → `school_applications`;
contact → `contacts`; homepage leads → `leads`; creator submissions
→ `creator_submissions`; teacher uploads → `teacher_content`;
NZ-ID requests → `nz_id_requests`; launch waitlist →
`launch_waitlist`; Rubax balance/transactions → `users/{uid}`;
quiz → Groq `llama-3.1-8b-instant` cached in `quiz_cache`;
Ustad/Kamai/Nano → Groq `llama-3.1-8b-instant` (OpenRouter fallback:
`meta-llama/llama-3.1-8b-instruct:free` in ustad,
`mistralai/mistral-7b-instruct:free` in kamai); blog generation →
Mistral `mistral-small`; city/age pages, sitemap, robots, manifest
generated from data files.

### Demo / hardcoded — NEVER present as real

- `app/leaderboard/page.js` and `app/quiz/leaderboard/page.js`
  (hardcoded tables)
- `app/creator/earnings/page.js` ("Rs 4,280 this month / Rs 1,120
  pending / Rs 3,160 available")
- Homepage stats ("60+ cities, 500+ kids learning, 5 languages,
  11 ways to earn") and v3.0 §35 counters (60+ cities, 9 age
  programs, 47+ schools, 5,200+ children earning) — v3.0 itself
  says these are hard-coded display targets, not live counts.
- `app/pitb/page.js` ("127,000+ children reached", 40/30/20/10
  fund-use split)
- `data/index.js` TESTIMONIALS (8 entries) and v3.0 §32
  testimonials — v3.0 itself states these are fictional /
  illustrative placeholders. They MUST be replaced with real,
  consented stories before any public launch or PITB pitch.
- `data/cities.js` populations / kids / school counts — round
  estimates in code, not cited statistics.
- Blog index: its 8 slugs (e.g. `ai-education-pakistan-2026`)
  do NOT match the 8 detail posts
  (e.g. `ai-education-pakistan-2025`), so index links land on
  "Post not found". Some detail posts also carry unverified
  earning stories (e.g. a 7-year-old earning Rs 300 in week one,
  "2,000+ withdrawals processed", NADRA verification as if live).
  Blog content is a Step 2 job — do not quietly rewrite it in
  Step 1, and do not quote it as evidence.

### Missing entirely — do not imply these exist

Any payout / withdrawal flow (earn page claims JazzCash/EasyPaisa
cash-out, Rs 200 minimum, parent approval under 18 — no code);
any premium checkout (button only links to `/signup`); Firestore
security rules (no `firestore.rules` in repo — treat every write
as unprotected until rules exist); tests / CI; any admin or
moderation panel; any age-verification, parent-consent, NADRA,
or review-queue flow; any Roblox hub, 3D world, voice TTS/STT,
or NFT/crypto feature (all Layer B targets, §7).

---

## 5. Hard rules (both layers combined — do not break without owner word)

1. **No invented facts.** No new user counts, earnings, reviews,
   ratings, city statistics, school names, or partner names.
   Only owner-confirmed or site-published figures.
2. **No real-money claims until payout is real.** "Earn real PKR",
   "withdraw", JazzCash/EasyPaisa copy stays out of any flow that
   does not exist end-to-end. Rubax is points, not money, until
   a real payout path is built and tested.
3. **Children first — parent-CNIC model (v3.0 §6/§29, TARGET).**
   Children never sign contracts or hold financial accounts
   directly. The parent's CNIC-verified account is the account of
   record; the child earns, money goes to the parent's wallet,
   parent withdraws. Tasks are "educational micro-tasks at home
   with parental consent", not jobs; peer-to-peer value is a
   voluntary gesture/tip, not a wage. No DMs between children
   anywhere. Every upload (game, Naat, Drama) is human-reviewed
   before publication — never auto-published. Activity logs
   visible to parents. AI chat filtered in Urdu + English.
   **Lawyer review of this model is required before any real
   money moves** (v3.0 §46) — flagged, not done.
4. **No secrets in repo, chat, or files.** Keys live in Vercel env
   only. Report "set / not set", never a value. v3.0's prototype
   flaw — calling an AI API directly from browser JS with a blank /
   exposed key — must NEVER be repeated in production; AI keys
   stay server-side (API routes / serverless functions).
5. **Do not claim "first" / "only"** in grants, pitches, or school
   proposals without the owner's confirmation.
6. **Customer copy stays professional.** No internal language
   ("pilot", "demo data", "hardcoded", "this page claims") on
   rendered pages. Internal status lives here and in owner reports.
7. **Do not redesign silently.** Keep the existing look; show any
   design change to the owner first.
8. **Do not push, deploy, or change the live site without the owner.**
   Writing this file does NOT authorise a push to
   nabeelage321-jpg/nayazahen or a Vercel deploy. Ownership and
   Vercel/Firebase access are still open (§9).
9. **One thing at a time, in the owner's order.** Finish one fix,
   verify it, then take the next pick. No parallel fix sprees.
10. **Do not borrow other projects' rules.** TaxiFlow and Receivables
    rules do not apply here unless this file says so.
11. **Voice Journal guardrail (v3.0 §22, TARGET).** If Nano ever
    asks "Beta, aaj kaisa raha?" and flags a sad pattern to a
    parent, messaging stays at "let's tell a grown-up" level.
    Never diagnosis, never clinical language.

---

## 6. LAYER B — Vision from v3.0 (TARGET, not built — build in §8 order)

### 6.1 Six pillars

1. Pakistani Roblox — hub world + 20 official games + kid-created games
2. Deen — Quran, Naat, Islamic Drama, Duas, 99 Names, AI Islamic Stories
3. Smart Classes — AI-adaptive Pakistan curriculum, 4PM live quiz, School League
4. Health Hub — Khana Ghari (world-first), Exercise, Water, Sleep, Outdoor Hero, Calm Kids
5. AI Nano — Urdu-speaking AI grandmother (see §6.5)
6. Creator Economy — verified creators, real PKR via JazzCash/EasyPaisa

### 6.2 Users

Player (kid, 4+), Creator (kid, 13+ via parent as creator-of-record),
Parent (18+, dashboard, approves every withdrawal, holds wallet),
Teacher (free account, earns), School Admin (principal dashboard),
Freelancer (16+, NZ Verified Badge), Admin (platform owner).

Audience promises in v3.0 §13 are TARGETS, not results — do not
quote them as achieved: parent averages Rs 1,200 (7–9), Rs 3,800
(10–12), Rs 8,400 (13–15), Rs 24,000 (16–21) per month; teacher
passive Rs 4,000–15,000/month; freelancer Week 1 Rs 200–500,
Month 1 Rs 3,000–8,000, Month 3 Rs 15,000–30,000, Month 6 Rs 50,000+.

### 6.3 Chatbots — target behaviour (adapt to Groq, keep the rules)

**Zehan Ustad (Plum, ذ):** tutor for Maths, Science, Urdu, English,
Islamiat, Computer, AI Basics, Class 1–12. Golden rule: NEVER give
direct answers — guide with questions. Wrong answer: "almost theek!"
Right answer: celebrate. Max 3 sentences per reply. Free 10
questions/day in v3.0; premium unlimited (price in §9, unresolved).

Target system prompt (v3.0, Urdu):
"Tu Zehan Ustad hai — Pakistan ke bachon ka pyara AI tutor. Sirf
school subjects parha: Maths, Science, Urdu, English, Islamiat,
Computer, AI Basics. KABHI seedha jawab mat do — hamesha guiding
question poochh ke bacha khud sooche. Galat jawab par 'almost
theek!' kaho. Sahi jawab par celebrate karo. Har reply max
3 sentences. Urdu mein likh."

**Zehan Kamai (Teal, ک):** earning guide only, strictly on-topic,
100% free forever (v3.0 positions this as the funnel into the
earning ecosystem, not charity). Max 4 sentences, enthusiastic,
mentions Easypaisa/JazzCash.

Target system prompt (v3.0, Urdu):
"Tu Zehan Kamai hai — Pakistan ke bachon ka free earning mentor.
Sirf AI earning topics: Age 7-9: image labelling Rs 50-200/task.
Age 10-11: poster design Rs 300-1500. Age 12-15: chatbot testing
Rs 500-3000. Age 16+: freelancing Rs 5000-30000/month. Hamesha
enthusiastic raho. Easypaisa/JazzCash mention karo. Max 4 sentences.
Urdu mein likh."
Note: the per-task rates inside this prompt are v3.0 targets and
conflict in places with §6.4 — do not hardcode them into a payout
until §9 is resolved.

**Floating mascots (v3.0 §10, TARGET, not in repo):** Ustad (left,
plum teacher) and Kamai (right, teal robot with "Rs 8,400 THIS WEEK"
ticker) with 330px chat drawers, language switchers, particle bursts,
4.2s bubble rotation. Repo today has chat widgets, not animated
mascots. Port mascot behaviour only if the owner picks it — do not
assume the HTML prototype files exist locally; they are NOT in the
repo. If the owner supplies them, extract data from them, do not
re-author it.

### 6.4 Earning tasks — 11 types (v3.0 §16, TARGET rates)

Image Labelling 8+ Rs 50–150/task; Urdu Voice Recording 7+
Rs 100–200; AI Poster Design 10+ Rs 300–1,500; Urdu Social Captions
10+ Rs 500–2,000; AI Quiz Creation 9+ Rs 200–500; Sentence Rating 8+
Rs 30–80; Chatbot Setup 12+ Rs 2,000–8,000; Monthly Content Package
13+ Rs 5,000–15,000; Peer Tutoring 12+ Rs 500–1,000; Prompt
Engineering 14+ Rs 2,000–10,000; Dollar Freelancing 16+ $10–$200.

Payment flow (TARGET): task complete → buyer approves (or 48hr
auto-approve) → child's in-app wallet → parent withdraws via
Easypaisa/JazzCash. Minimum withdrawal Rs 200, no maximum.
Sourcing honesty (v3.0 §16): real task demand does NOT appear
automatically. Months 1–3 the founder must personally source work:
cold-call 20+ local businesses/day, email data-labelling firms,
post in UK/Gulf diaspora groups. Offerwall/affiliate partners
(Lootably, AdGem, BitLabs) are secondary only, never the primary
engine.

### 6.5 Age programs — 9 (v3.0 §17, TARGET ranges; repo flags differ, §9)

3–4 Wonder (free), 5–6 Play (free), 7–8 Question (v3.0:
Rs 50–300/mo), 9 Creator (Rs 200–800/mo), 10–11 Earner
(Rs 1,000–5,000/mo, "the sweet spot"), 12 Professional
(Rs 5,000–15,000/mo), 13–15 Freelancer (Rs 15,000–35,000/mo),
16–18 Leader (Rs 30,000–80,000/mo), 19–21 Entrepreneur
(Rs 80,000–3,00,000/mo). Each has a 4-month curriculum, tools
list, and personalised Ustad/Kamai panels in v3.0.

### 6.6 Games, Deen, Health, Nano (TARGET summaries — full text in v3.0)

**20 official games (v3.0 §18):** Adventure — Naya Duniya (flagship
Pakistani Minecraft, Three.js, build = learn), Nano ka Ghar,
Lahore Fort Mystery, K2 Climber, Space Pakistan, Underwater Sindh.
Education — Urdu Hero, Math Bazaar, Science Lab PK, Pakistan
Explorer, History Quest. Sports — Cricket Champions, Kabaddi King,
Kite Flying Lahore, Gully Football, Pittu Garam. Life — Bazaar
Builder, Chef Pakistan, Fashion Designer PK, My Dream City,
Mera Piggy Bank. Hub layout: Lahore Street, Karachi Beach,
Peshawar Mountains, Cricket Ground, School Building, Nano ka Ghar,
Grand Bazaar, Space Station, Creator Hub, Friend Zone. Growth
target: 20 → ~100 kid games (Month 6) → ~500 (Year 1) → 1,000+
(Year 2). Repo today: 5 game pages only.

**Nano ka Ghar (v3.0 §19):** city-by-city relative visits —
Lahore Nano, Karachi Dada, Peshawar Khala, Quetta Chachu, Multan
Phupho, Islamabad Mama (+ Hyderabad Nana, Faisalabad Tayya in
earlier drafts). Loop: dialect greeting → cooking mini-game (math)
→ history quiz → craft → Passport city stamp → Rubax.
Pakistan Passport tracks visited cities, badges, leaderboard rank.

**Deen (v3.0 §21):** Interactive Quran (word-by-word, Tajweed
levels, pronunciation check), Naat Muqabla (monthly, age groups
4–7 / 8–11 / 12–14), Islamic Drama (2-min recording, 24hr human
safety review, NOT auto-published, 7-day vote), Daily Duas
(streaks), 99 Names (trading cards), AI Nano Islamic Stories
(choice-based, bedtime mode).

**AI Nano (v3.0 §22, TARGET):** Pakistani-grandmother persona,
Lahore-based, Urdu-first with Punjabi warmth ("putar", "sohniye"),
simple words for ages 4–12. 4 moods: Ghar pe, Khana bana rahi,
Kahani sunayegi, Maths sikhayegi. Voice Journal: nightly "Beta,
aaj kaisa raha?" + sentiment pattern → parent notification after
3+ sad days (guardrail §5.11 applies). v3.0 tech was Gemini + Google
TTS ur-PK-Standard-A + STT ur-PK — adapt to the repo stack only
if the owner picks it (§9); do not add those keys on assumption.

**Khana Ghari (v3.0 §23):** meal-time gamification — Breakfast
7:00–8:30, Lunch 1:00–2:30, Dinner 7:30–9:00. Mom taps "Khana Time!",
timer runs, fastest healthy completion wins. Leaderboards:
Family → School → City → National. Rewards: 10–30 Rubax/meal,
+50 for 3-day streak, crown for weekly city #1, JazzCash prize
for monthly national #1 (prize only when payout is real, §5.2).
Viral mechanic: mom screenshots leaderboard → family WhatsApp.
Other Health Hub: Morning Exercise, Water Challenge (6 glasses),
Sleep Champion, Outdoor Hero (pedometer / Bahar Points),
Calm Kids (breathing).

**Naya Code (v3.0 §25):** Seedling 8–10 (blocks) → Builder 10–12
(visual logic) → Coder 12–14 (Python in Urdu) → Creator 14+
(JavaScript/HTML, publishable). **Mera Piggy Bank (§26):**
weekly 100-Rubax allowance — Save (+5%), Spend, Donate, Invest
(simulated). **School League (§27):** Friday matches → City →
Provincial → National, 6 subjects, physical trophy to winning
school.

### 6.7 Schools, NZ-ID, revenue, funding, expansion (v3.0 TARGET)

**School tiers (§15):** Tier 1 — Beaconhouse, City School, LGS,
Roots: Free Year 1, founding-partner badge, homepage logo, joint
press release. Strategic priority #1 ("if Beaconhouse says yes,
everyone else lines up"). Tier 2 — private 500–2,000 students:
free 6 months, then Rs 150/student/year. Tier 3 — government
schools, all provinces: always free, forever (core social mission).
NZ-ID format: `NZ-2025-LHR-00847` — permanent portfolio, school +
parent verified, QR code.

**Revenue shares (TARGET, not in code):** school 10% of student
earnings (corrected from an early 5% draft — 10% is current in
v3.0), teacher 30% of their content's earnings. Other streams:
Rubax sales, conversion spread, NFT brokerage 5–10% both sides,
task/business partnerships, premium listings, brand partnerships
(Shan Foods, Engro, Nestlé named as illustrative targets only).
3-year projection in v3.0 is ILLUSTRATIVE only: Year 1 Rs 2–5M,
Year 2 Rs 20–50M, Year 3 Rs 100–200M — never quote as forecast
without the owner's word.

**Rubax economy (§24):** earn (tasks/quizzes/games/Khana Ghari),
buy (parents, base rate in §9 — unresolved), receive as gift /
gesture. Spend: premium courses, gifts, marketplace, PKR via
parent wallet. Tiers: Bronze 0–999, Silver 1,000–4,999, Gold
5,000–19,999 (+10% bonus rate), Diamond 20,000+ (priority + prizes).
NFT marketplace + RBX coin on BSC/Polygon are Year 2–3+ targets
only; State Bank crypto restrictions must be re-checked first.

**Funding targets (v3.0 §37):** PITB (apply Month 1, ask Rs 5–10M,
Year-1 impact claim 50,000 kids / 100 schools / 500 creators —
do NOT submit these numbers until they are real or clearly
labelled targets), IGNITE/HEC (Month 1), UNICEF / Google.org
(Month 2), Invest2Innovate (Month 3+), diaspora angels (later).

**Expansion (v3.0 §39):** Year 1 Pakistan only (Lahore, Karachi,
Islamabad first). Year 2–3 South Asia. Year 3–4 Muslim world
(also the RBX window). Year 5+ global. Founder advice carried
in v3.0: focus on Pakistan first — launch in one city, get 500
real children using it, fix what breaks, then grow. "The world
does not need another perfect idea that never launches."

**Competitive edge claimed in v3.0 (§38, TARGET positioning):**
7 languages, NADRA-verified safety, real PKR via JazzCash/EasyPaisa
(Robux cannot be cashed out in PKR), Urdu AI from age 4, Deen
section, board-curriculum alignment, Khana Ghari, Voice Journal,
school revenue share, NZ-ID, teacher passive income. Use only
the parts that are true at the time of writing.

---

## 7. What "proper site" means in this merged plan

Owner direction, 2026-10-29: "proper site tu bano, earning pir
hi ho gi" — proper site FIRST, earning later. That order governs
§8. No payout, checkout, or earning claim is built ahead of its
phase, even if v3.0 describes it in full.

---

## 8. Build order — one thing at a time, in this sequence

### Phase 0 — Honest + buildable (in progress)

0.1 DONE (local pack, NOT pushed): Firebase build fix +
`.env.example` + real README — workspace/user/files/nayazahen-step1/.
Owner uploads these 3 files, or authorises a push, before Phase 0
continues. Also delete the 0-byte `public/og-image.jpg`.
0.2 Firestore security rules (users own doc only; public forms
write-only with validation; `quiz_cache` read-only for clients;
test with a second account).
0.3 Remove / wire every §4 demo figure (leaderboards, creator
earnings, homepage stats, PITB numbers, testimonials, city
estimates) — wire to real data or remove the section. No hardcoded
number stays on a live page and calls the site ready.
0.4 Verify nayazahen.pk domain + the three @nayazahen.pk mailboxes.
0.5 Blog fix (content job, not a silent edit): either align the
blog index to the 8 existing detail posts with matching titles,
or write the 8 missing detail posts properly — owner picks.
Do NOT leave index links pointing at "Post not found", and do
NOT keep unverified earning stories presented as fact.

### Phase 1 — School pilot core (only after Phase 0)

One school, end-to-end, with real keys: sign-up → dashboard with
real Rubax → quiz (Groq + cache) → Rubax visible in wallet →
Ustad tutor with the §6.3 guiding-question rule → teacher upload
+ school apply with an owner-checked inbox.
**Proof gate:** a fresh test account signs up, finishes a quiz,
sees Rubax change, and gets a Ustad answer — with no developer
help. No school demo until this gate passes.

### Phase 2 — Earning, only if the owner picks it (never early)

In order: owner-confirmed payout partner/method → Rubax-to-PKR
rate fixed (§9) → parent-approval flow for under-18 → withdrawal
request + review queue (manual approval first) → server-side
Rubax awarding (today `awardRubax` is a client-side Firestore
write — anyone can inflate their own balance) + quiz answer
validation + daily caps → lawyer review (§5.3) → only then a
real PKR withdrawal test. Manual JazzCash/bank + receipt check
comes before any automated gateway; automated gateway (JazzCash /
Easypaisa official, or Safepay / PayFast-style aggregator) only
after manual payouts work. Gateway onboarding typically needs
CNIC + FBR NTN + bank account — prepare those, do not promise
a gateway date before approval.

### Phase 3 — Content / SEO, only after Phase 1

Verify city figures or remove them, fix blog (Phase 0.5), then
City × Age SEO engine (v3.0 §34: `?city=Lahore&age=10-11`, 60+
cities × 6 ages, eventually languages — generated from data
arrays, never hand-written thousands of pages). No new Kent-style
rule applies here, but the same honesty rule does: no page built
from unverified facts.

### Adapted 12-week shape (v3.0 §40, re-based on Next.js)

v3.0's weeks assumed a fresh React scaffold. Re-based: Weeks 1–2
Phase 0 + pilot core on the existing Next.js repo; Weeks 3–5
games + AI + Rubax wallet hardening; Weeks 6–7 Deen + safety
(NADRA/review/parent dashboard as targets, not promises);
Weeks 8–9 Khana Ghari + 4PM quiz + School League + payment
integration (manual first); Weeks 10–11 creator tools + review
queue + real withdrawal test; Week 12 launch readiness (§10).
Dates are relative to Phase 0 completion, not calendar promises.

---

## 9. OPEN DECISIONS — unresolved, money work is blocked until picked

Interim rule until the owner picks: **repo truth governs anything
live; vision governs future direction only.** Recommendations are
labelled as such — they are NOT decisions.

1. **Stack:** KEEP Next.js / Vercel / Groq (recommendation — it
   builds and is live) vs REVERT to v3.0 React / Firebase Hosting /
   Gemini / Claude / TTS-STT (would be a rebuild). Unresolved.
2. **Premium price:** repo tiers Rs 299 / 599 / 1,499 vs v3.0
   Ustad unlimited Rs 499/month. Pick one set before payment work.
3. **Rubax rate — BLOCKS all payout work:** v3.0 §24 says
   100 Rb = Rs 1 (1,000 Rb = Rs 10). Repo blog says 1,000 Rb =
   Rs 100. 10x apart. Owner must fix ONE rate in writing.
4. **Earning ages:** v3.0 says 7–8 already earns; repo data says
   7–9 earning = false, earning starts 10–12. Parent-wallet-always
   is the safe default in both cases (v3.0 §43).
5. **Goal order:** school pilot (Phase 1) vs earning (Phase 2) vs
   SEO (Phase 3) vs clean demo only — owner said "proper site
   first, earning later", which puts Phase 0 + Phase 1 ahead of
   Phase 2, but the Phase 1 pilot school itself is still unnamed.
6. **Repo ownership + access:** is `nabeelage321-jpg` the owner's
   account? Does he control the Vercel + Firebase projects?
   Are Groq / OpenRouter / Mistral keys set in Vercel? (Yes/no
   only — never paste a key.)
7. **Push permission:** may v3.1 (and the Step 1 pack) be pushed
   to the repo root as `agent.md` / file overwrites, or stay local
   only? Default: local only until the owner says push.
8. **PITB / stats truth:** are PITB figures and homepage stats
   real and sourceable? If not, they come out in Phase 0.3.
9. **Mascots + voice:** build v3.0 animated mascots and Nano voice
   (TTS/STT) later, or keep the repo's simpler chat widgets?
   Unresolved — do not start until Phase 1 passes.

---

## 10. Testing + "Done" (v3.0 §45, adapted to this repo)

Test every phase BEFORE the next phase starts. No carrying bugs
forward. Keep a `BUGS.md` (format: ID | file | steps | status).

- **Phase 0/1:** auth signup/login (parent + child roles), language
  switcher (Urdu first — English always works, Urdu is where things
  break), RTL + Nastaliq, no horizontal scroll at 375px, all nav
  routes load, cities (60+) + ages (9) render + filters work,
  lead forms land in Firestore, build passes with AND without env
  vars (Step 1 behaviour), PWA install prompt on Android Chrome.
- **Phase 2 (AI/games):** AI reply <5s, Urdu culturally correct,
  rate-limit message graceful ("thora ruko beta", not a crash),
  ≥1 game playable, Rubax balance increments correctly, Ustad
  never gives direct answers, 20-message history handling,
  works on a cheap Android phone (Rs 15,000 class) on real 3G,
  offline PWA fallback shown, no crash.
- **Safety phase:** Deen uploads go to review queue (never auto-
  published), NADRA mock rejects under-18 correctly (when built),
  parent dashboard (child list, purchase restriction toggle),
  child creation requires parent approval, NO DM button anywhere.
- **Payments phase (when reached):** test JazzCash/EasyPaisa
  transactions succeed AND fail cleanly, Rs 200 minimum enforced,
  balance never negative, withdrawals idempotent (never double-
  processed).
- **Launch readiness:** <3s on throttled 3G, locked-down Firebase
  rules, no keys in client code, usage caps on AI APIs, no child
  sees another child's real name/photo, admin routes protected,
  all uploads hidden until reviewed, all 60+ cities / 9 ages /
  8 blog posts / 20 game cards checked (cards visible even if not
  all playable yet), all 5 live languages switch correctly,
  44px minimum touch targets, mascots/widgets never block content
  on mobile.
- **Golden rules:** test on a real cheap Android phone, on real
  3G, in Urdu first, with a real child (8–10) unsupervised for
  15 minutes per phase — watch what confuses them. Fix bugs before
  adding features. Document every bug, even after fixing it.

A fix is "done" only when: `npm run build` passes, the changed
page is checked live (or on a preview the owner can open), no §4
demo figure remains in the changed area, and no secret was added
to the repo. "It compiled" is not done.

---

## 11. Sources + supersession

- Source A (chat, 2026-10-29): original AGENT.md v3.0, full text
  pasted by the owner. Full v3.0 detail (all 46 sections, exact
  mascot JS function names, full city/age data shapes, full
  prototype file list) lives in that chat message — this merged
  file condenses it; it does not replace it as an archive.
- Source B (repo, verified 2026-10-29): draft agent.md +
  reconciliation note + Step 1 pack, all under
  workspace/user/files/nayazahen-*.
- From now on, **this v3.1 file is the working document**.
  The draft and v3.0 are kept as audit references only.
  If v3.1 and either source disagree, v3.1's §9 open-decision
  list wins until the owner updates v3.1 itself.

*AGENT.md — Merged v3.1 (Vision + Repo Truth) — 2026-10-29*
*Project: Naya Zehan — نیا ذہن*
*Next action: owner uploads / authorises push of Step 1 pack,
then Phase 0.2 (Firestore rules).*
