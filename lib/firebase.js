import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Naya Zehan — Firebase setup.
//
// IMPORTANT: the build must never crash just because env vars are missing.
// The old version passed `undefined` straight into initializeApp, which
// broke `next build` at "Collecting page data" for /api/quiz with
// `FirebaseError: auth/invalid-api-key`.
// Now missing values fall back to obvious placeholders so the site
// still builds and pages still load. Real sign-in / Firestore features
// will fail with a clear Firebase error until the real values are set
// in Vercel (see .env.example). Never hardcode real keys here.

const isFirebaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID
);

if (!isFirebaseConfigured && typeof window !== 'undefined') {
  // eslint-disable-next-line no-console
  console.warn(
    'Naya Zehan: Firebase env vars are not set. ' +
      'Sign-in, Rubax and form submissions will not work until ' +
      'the NEXT_PUBLIC_FIREBASE_* values are set in Vercel.'
  );
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'not-configured',
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    'not-configured.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'not-configured',
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    'not-configured.appspot.com',
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '000000000000',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || 'not-configured',
};

// Prevent re-initializing the app on every hot reload in dev mode.
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, isFirebaseConfigured };
export default app;
