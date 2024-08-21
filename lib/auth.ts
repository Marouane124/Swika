import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { UserAttributes } from "@/types/types";

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
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        try {
          // Authenticate user
          const res = await fetch(`${process.env.STRAPI_URL}/api/auth/local`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              identifier: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await res.json();
          if (!data.user) {
            return null;
          }

          // Fetch user details, including image
          const userDetailsResponse = await fetch(`${process.env.STRAPI_URL}/api/users/${data.user.id}?populate=image`, {
            headers: {
              Authorization: `Bearer ${data.jwt}`,
            },
          });

          const userDetails = await userDetailsResponse.json();

          const user: UserAttributes = {
            username: data.user.username,
            email: data.user.email,
            provider: data.user.provider,
            confirmed: data.user.confirmed,
            blocked: data.user.blocked,
            createdAt: data.user.createdAt,
            updatedAt: data.user.updatedAt,
            phone: data.user.phone,
          };

          const imageUrl = userDetails.image?.url ? `${process.env.STRAPI_URL}${userDetails.image.url}` : null;

          return { ...user, id: data.user.id, jwt: data.jwt, image: imageUrl };
        } catch (error) {
          console.error('Strapi auth error:', error);
          return null;
        }
      },
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
        token.username = user.username;
        token.email = user.email;
        token.provider = user.provider;
        token.confirmed = user.confirmed;
        token.blocked = user.blocked;
        token.createdAt = user.createdAt;
        token.updatedAt = user.updatedAt;
        token.phone = user.phone;
        token.jwt = user.jwt;
        token.name = user.username || token.name;
        token.image = user.image || token.image || null;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.email = token.email as string;
        session.user.provider = token.provider as string;
        session.user.confirmed = token.confirmed as boolean;
        session.user.blocked = token.blocked as boolean;
        session.user.createdAt = token.createdAt as string;
        session.user.updatedAt = token.updatedAt as string;
        session.user.phone = token.phone as string;
        session.user.jwt = token.jwt as string;
        session.user.name = token.name as string;
        session.user.image = token.image as string | null;
      }
      return session;
    },
  },
};
