import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions = {
   adapter: PrismaAdapter(prisma),
   providers: [
      GithubProvider({
         clientId: process.env.GITHUB_ID,
         clientSecret: process.env.GITHUB_SECRET,
      }),
      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID,
         clientSecret: process.env.GOOGLE_SECRET,
      })
   ],
   callbacks: {
      async session({ session, user, token }) {
         session.user.id = user.id;
         session.user.role = user.role;
         return session;
      }
   }
};

const resf = NextAuth(authOptions);

export default resf;
