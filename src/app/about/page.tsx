'use client';

import { useRouter } from 'next/navigation';
import About from '@/components/About';

export default function AboutPage() {
  const router = useRouter();

  return (
    <main className="container">
      <button className="back-btn" onClick={() => router.back()}>
        ← Назад
      </button>
      <About />
    </main>
  );
}