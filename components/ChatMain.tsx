'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import React, { use, useEffect } from 'react';

const ChatMain = () => {
  const { data: session, status } = useSession();
  console.log('status: ', status);
  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn('keycloak', { callbackUrl: '/chat' });
    }
  }, [status]);

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
};

export default ChatMain;
