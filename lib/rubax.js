import { collection, doc, getDoc, getDocs, limit, orderBy, query, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function awardRubax(uid, amount, reason) {
  if (!uid) return null;

  const ref = doc(db, 'users', uid);
  const snap = await getDoc(ref);
  const current = snap.exists() ? Number(snap.data()?.rubax || 0) : 0;
  const nextBalance = current + Number(amount);

  await setDoc(ref, {
    rubax: nextBalance,
    updatedAt: new Date().toISOString(),
  }, { merge: true });

  const txRef = collection(db, 'users', uid, 'transactions');
  await setDoc(doc(txRef), {
    amount: Number(amount),
    reason,
    timestamp: new Date().toISOString(),
    type: amount >= 0 ? 'earn' : 'spend',
  });

  return nextBalance;
}

export async function getRubaxBalance(uid) {
  if (!uid) return 0;
  const ref = doc(db, 'users', uid);
  const snap = await getDoc(ref);
  return Number(snap.data()?.rubax || 0);
}

export async function getTransactions(uid) {
  if (!uid) return [];
  const txRef = collection(db, 'users', uid, 'transactions');
  const q = query(txRef, orderBy('timestamp', 'desc'), limit(20));
  const snap = await getDocs(q);
  return snap.docs.map((docItem) => ({ id: docItem.id, ...docItem.data() }));
}
