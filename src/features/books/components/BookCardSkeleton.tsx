export default function BookCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-(--border) bg-(--card)">
      <div className="aspect-3/4 w-full animate-pulse bg-white/10" />

      <div className="space-y-3 p-4">
        <div className="space-y-2">
          <div className="h-5 w-4/5 animate-pulse rounded bg-white/10" />
          <div className="h-4 w-3/5 animate-pulse rounded bg-white/10" />
        </div>

        <div className="flex gap-2">
          <div className="h-7 w-24 animate-pulse rounded-full bg-white/10" />
          <div className="h-7 w-24 animate-pulse rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  );
}