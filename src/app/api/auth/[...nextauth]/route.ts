import NextAuth from 'next-auth';

// importing providers
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: 'Ov23lioTM8v7qdSDxUXB',
      clientSecret: '988acf034c9943b8321b662c8a4f64e99ccc5ba9',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
});

export { handler as GET, handler as POST };
