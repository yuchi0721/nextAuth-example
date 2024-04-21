'use client';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/react';
export default function Page() {
  const { data: session, status } = useSession();
  console.log('status: ', status);
  if (status === 'unauthenticated') {
    signIn('google', { callbackUrl: '/chat' });
  }
  if (session) {
    console.log('status: ', status);
    console.log('session: ', session.user.id_token);
  }
  return (
    <div>
      <button onClick={() => signIn()}>sign in</button>
      <button onClick={() => signOut()}>sign out</button>
    </div>
  );
}
