import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'D—CONSTRUCT — 공간 해체 아카이브',
  description: '엘리베이터의 시선, 이동, 마주침과 동시성을 기록한 공간 해체 아카이브.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
