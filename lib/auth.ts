import { NextAuthOptions, User, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        try {
          const res = await fetch(`${process.env.STRAPI_URL}/api/auth/local`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              identifier: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await res.json();

          if (data.user) {
            return { ...data.user, jwt: data.jwt };
          } else {
            return null;
          }
        } catch (error) {
          console.error('Strapi auth error:', error);
          return null;
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        //token.jwt = user.jwt;
      }
      //console.log("JWT callback, token:", token);
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        //session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        //session.user.jwt = token.jwt as string;
      }
      //console.log("Session callback, session:", session);
      return session;
    },
  },
};