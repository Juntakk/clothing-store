export const runtime = "nodejs"; // Ensure this page uses the Node.js runtime

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/db/prisma";
import { compareSync } from "bcrypt-ts-edge";
import type { NextAuthConfig } from "next-auth";
import { setSessionCartCookie } from "./lib/utils";

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
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, user, trigger, token }: any) {
      //Set user ID form token
      session.user.id = token.sub;
      session.user.role = token.role;
      session.user.name = token.name;

      //If update, set user name
      if (trigger === "update") {
        session.user.name = user.name;
      }

      return session;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    async jwt({ token, user, trigger, session }: any) {
      //Assign user fields to token
      if (user) {
        token.role = user.role;

        //If user has no name
        if (user.name === "NO_NAME") {
          token.name = user.email!.split("@")[0];
          await prisma.user.update({
            where: { id: user.id },
            data: { name: token.name },
          });
        }
      }
      return token;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    authorized({ request }: any) {
      if (!request.cookies.get("sessionCartId")) {
        return setSessionCartCookie(request);
      }
      return true;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
