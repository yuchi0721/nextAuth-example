import NextAuth from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      name: string;
      id_token: string;
    };
  }
  interface Account {
    id_token: string;
    refresh_token: string;
    access_token: string;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    id_token: string;
    access_token: string;
    userName: string;
    refresh_token: string;
    expires_at: number;
  }
}
