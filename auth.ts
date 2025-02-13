import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/db/prisma";
import { compareSync } from "bcrypt-ts-edge";
import type { NextAuthConfig } from "next-auth";

export const config = {
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24,
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (credentials == null) return null;
        //Find user in DB
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string,
          },
        });

        //If user exists and if password matches
        if (user && user.password) {
          const isMatch = compareSync(
            credentials.password as string,
            user.password
          );

          //If password is correct return user
          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              role: user.role,
            };
          }
        }
        //If user non existant or pw no match
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
