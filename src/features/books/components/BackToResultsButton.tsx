'use client';

import { useRouter } from 'next/navigation';

export default function BackToResultsButton() {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push('/');
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-sky-400/40 hover:bg-white/10 hover:text-white"
    >
      <span aria-hidden="true">←</span>
      <span>Back to results</span>
    </button>
  );
}