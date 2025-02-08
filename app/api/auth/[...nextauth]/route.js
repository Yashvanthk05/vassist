import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import dotenv from 'dotenv';

dotenv.config();

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTHSECRET,
});

export { handler as GET, handler as POST };
