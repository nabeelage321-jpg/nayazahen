'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { getRubaxBalance, getTransactions } from '@/lib/rubax';

export default function RubaxWallet() {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const [bal, tx] = await Promise.all([getRubaxBalance(currentUser.uid), getTransactions(currentUser.uid)]);
        setBalance(bal);
        setTransactions(tx);
      }
    });
    return () => unsub();
  }, []);

  if (!user) return null;

  return (
    <div className="hidden md:block">
      <button onClick={() => setOpen(true)} className="flex items-center gap-2 rounded-full border border-[#F0C030] bg-[#FEF6D8] px-3 py-2 text-sm font-semibold text-[#B8860A]">
        <span className="text-base">🪙</span>
        <span className="animate-pulse">{balance}</span>
        <span>Rubax</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0D0D1A]/70 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-4 shadow-2xl">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="font-urdu text-lg text-[#B8860A]">ربیکس والیٹ</p>
                <p className="text-sm text-[#5A587A]">آپ کی موجودہ توازن</p>
              </div>
              <button onClick={() => setOpen(false)} className="rounded-full bg-[#FEF6D8] px-3 py-1 text-sm text-[#B8860A]">بند</button>
            </div>
            <div className="rounded-2xl bg-[#FEF6D8] p-4 text-center">
              <p className="text-4xl font-bold text-[#B8860A]">{balance}</p>
              <p className="mt-1 text-sm text-[#5A587A]">Rubax Coins</p>
            </div>
            <div className="mt-4">
              <p className="mb-2 font-semibold text-[#0D0D1A]">سفارشات</p>
              {transactions.length ? (
                <div className="space-y-2">
                  {transactions.map((tx) => (
                    <div key={tx.id} className="rounded-xl border border-[#E5E3D5] bg-[#FAFAF5] p-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="font-urdu">{tx.reason}</span>
                        <span className={tx.amount >= 0 ? 'text-[#0A7050]' : 'text-[#B83008]'}>{tx.amount >= 0 ? '+' : ''}{tx.amount}</span>
                      </div>
                      <p className="text-xs text-[#5A587A]">{new Date(tx.timestamp).toLocaleString('ur-PK')}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="rounded-xl bg-[#FAFAF5] p-3 text-sm text-[#5A587A]">ابھی کوئی لین دین نہیں ہوا۔</p>
              )}
            </div>
            <button disabled className="mt-4 w-full rounded-xl bg-[#E5E3D5] px-3 py-2 text-sm text-[#5A587A]">واخواستہ واپس لینا (مرحلہ 4 میں)</button>
          </div>
        </div>
      )}
    </div>
  );
}
