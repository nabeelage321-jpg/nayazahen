export default function Loading() {
  return (
    <main className="min-h-screen bg-[#fdfcf7] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-[28px] border border-[#e5ecd9] bg-white p-8 text-center shadow-sm">
        <div className="mx-auto h-4 w-24 animate-pulse rounded-full bg-[#dce9d8]" />
        <div className="mx-auto mt-4 h-4 w-48 animate-pulse rounded-full bg-[#eef5e8]" />
        <div className="mx-auto mt-6 h-24 w-full animate-pulse rounded-[24px] bg-[#f7fff8]" />
      </div>
    </main>
  );
}
