import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#fdfcf7] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-4xl flex-col gap-6 rounded-[32px] border border-[#e5ecd9] bg-white p-8 shadow-sm sm:p-10">
        <div className="text-6xl">🧠😅</div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#2f8a4a]">404</p>
          <h1 className="mt-3 text-3xl font-black text-[#144a2b] sm:text-4xl">صفحہ نہیں ملا | Page Not Found</h1>
          <p className="mt-4 text-base leading-8 text-[#4b6d53]">
            Beta yeh page nahi mila, chalo ghar chalte hain! Zehan Ustad says your page wandered off the learning path.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/" className="rounded-full bg-[#1f784a] px-5 py-3 text-sm font-semibold text-white">Home</Link>
          <Link href="/cities" className="rounded-full border border-[#d7e9d8] px-5 py-3 text-sm font-semibold text-[#2f8a4a]">Cities</Link>
          <Link href="/games" className="rounded-full border border-[#d7e9d8] px-5 py-3 text-sm font-semibold text-[#2f8a4a]">Games</Link>
        </div>
      </div>
    </main>
  );
}
