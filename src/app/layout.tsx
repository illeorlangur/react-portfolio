import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Дудник Ярослав — Портфолио',
  description: 'Персональная визитка fullstack-разработчика',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}