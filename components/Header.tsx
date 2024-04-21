'use client';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useEffect } from 'react';

const Header = () => {
  const { data: session, status } = useSession();
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (session) {
        const result = await axios.get(
          'http://localhost:3000/api/getUserProfile',
          {
            headers: {
              Authorization: `${session.user.id_token}`,
            },
          },
        );
        console.log('result: ', result);
      }
    };
    fetchUserProfile();
  }, [session]);

  if (!session) {
    return <p>User not logged in</p>;
  }

  // Now you can access session.user.idToken
  return (
    <header>
      <p>Welcome, {session.user.name}</p>
      <p>ID Token: {session.user.id_token}</p>{' '}
      {/* Display the ID token; remove in production! */}
      {/* Use the ID token for authenticated requests here */}
    </header>
  );
};

export default Header;
