export default function BookDetailLoading() {
  return (
    <main className="container py-10 md:py-14">
      <div className="animate-pulse space-y-6">
        <div className="h-4 w-48 rounded bg-white/10" />
        <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div className="aspect-3/4 rounded-3xl bg-white/10" />
          <div className="space-y-4">
            <div className="h-4 w-28 rounded bg-sky-400/20" />
            <div className="h-12 w-3/4 rounded bg-white/10" />
            <div className="h-6 w-1/2 rounded bg-white/10" />
            <div className="h-24 w-full rounded bg-white/10" />
            <div className="h-24 w-full rounded bg-white/10" />
          </div>
        </div>
      </div>
    </main>
  );
}