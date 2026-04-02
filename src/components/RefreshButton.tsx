'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import Spinner from './Spinner';

type RefreshButtonProps = {
  label?: string;
};

export default function RefreshButton({
  label = 'Try again',
}: RefreshButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <button
      type="button"
      onClick={handleRefresh}
      disabled={isPending}
      className="mt-5 inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {isPending ? <Spinner size="sm" label="Retrying..." /> : label}
    </button>
  );
}