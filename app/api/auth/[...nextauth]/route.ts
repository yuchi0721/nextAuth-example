import NextAuth, { AuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import KeycloakProvider from 'next-auth/providers/keycloak';

async function refreshAccessToken(token: JWT) {
  const resp = await fetch(
    `http://localhost:8080/realms/myrealms/protocol/openid-connect/token`,
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: 'ppm-public',
        client_secret: '',
        grant_type: 'refresh_token',
        refresh_token: token.refresh_token,
      }),
      method: 'POST',
    },
  );
  const refreshToken = await resp.json();
  if (!resp.ok) throw refreshToken;
  return {
    ...token,
    access_token: refreshToken.access_token,
    id_token: refreshToken.id_token,
    expires_at: Math.floor(Date.now() / 1000) + refreshToken.expires_in,
    refresh_token: refreshToken.refresh_token,
  };
}

const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    KeycloakProvider({
      clientId: 'ppm-public',
      clientSecret: '',
      issuer: 'http://localhost:8080/realms/myrealms',
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      const nowTimeStamp = Math.floor(Date.now() / 1000);
      if (account) {
        console.log('account: ', account);
        token.id_token = account.id_token;
        token.access_token = account.access_token;
        token.refresh_token = account.refresh_token;
        return token;
      } else if (nowTimeStamp < token.expires_at) {
        // token has not expired yet, return it
        return token;
      } else {
        // token is expired, try to refresh it
        console.log('Token has expired. Will refresh...');
        try {
          const refreshedToken = await refreshAccessToken(token);
          console.log('Token is refreshed.');
          return refreshedToken;
        } catch (error) {
          console.error('Error refreshing access token', error);
          return { ...token, error: 'RefreshAccessTokenError' };
        }
      }
    },
    async session({ session, token }) {
      if (token) {
        session.user.id_token = token.id_token;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
