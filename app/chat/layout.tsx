'use client';
import Header from '@/components/Header';
import Main from '@/components/Main';

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>
        <Header></Header>
      </div>
      <div>{children}</div>
    </div>
  );
}
