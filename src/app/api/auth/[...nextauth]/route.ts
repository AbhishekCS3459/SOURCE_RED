import NextAuth from 'next-auth';

// importing providers
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: 'Ov23limaDiAz4wQRa6oy',
      clientSecret: '598c2770485f4be44b44b86133956d4436971aef',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
});

export { handler as GET, handler as POST };
