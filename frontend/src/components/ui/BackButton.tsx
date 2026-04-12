'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from './button';

export function BackButton({ fallbackPath = '/explore' }: { fallbackPath?: string }) {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 2) {
      router.back();
    } else {
      router.push(fallbackPath);
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={handleBack}
      className="mb-4 pl-0 text-slate-500 hover:text-teal-600 hover:bg-transparent flex items-center gap-2 group"
    >
      <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
      Kembali
    </Button>
  );
}
