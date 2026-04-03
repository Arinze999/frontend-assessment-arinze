'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getCoverImageUrl } from '@/lib/openlibrary';

type BookCoverProps = {
  title: string;
  coverId: number | null;
  eager?: boolean;
  size?: 'S' | 'M' | 'L';
};

export default function BookCover({
  title,
  coverId,
  eager = false,
  size = 'M',
}: BookCoverProps) {
  const [isLoading, setIsLoading] = useState(Boolean(coverId));
  const [hasError, setHasError] = useState(false);

  const coverUrl = getCoverImageUrl(coverId, size);
  const shouldShowFallback = !coverUrl || hasError;

  return (
    <div className="relative h-full w-full overflow-hidden bg-(--card-2)">
      {isLoading && !shouldShowFallback ? (
        <div className="absolute inset-0 z-10 shimmer ease-in-out bg-white/2" />
      ) : null}

      {shouldShowFallback ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-4 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg text-slate-300">
            📚
          </div>
          <div className="space-y-1">
            <p className="line-clamp-2 text-sm font-medium text-slate-200">
              {title}
            </p>
            <p className="text-xs text-slate-400">Cover unavailable</p>
          </div>
        </div>
      ) : (
        <Image
          src={coverUrl}
          alt={`Cover for ${title}`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          loading={eager ? 'eager' : 'lazy'}
          fetchPriority={eager ? 'high' : 'auto'}
          className={`object-cover transition duration-300 ${
            isLoading ? 'scale-[1.02] blur-[6px]' : 'scale-100 blur-0'
          }`}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
          }}
        />
      )}
    </div>
  );
}