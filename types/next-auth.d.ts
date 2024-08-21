import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
    phone: string;
    jwt: string;
  }

  interface Session {
    user: {
      id: number;
      username: string;
      email: string;
      provider: string;
      confirmed: boolean;
      blocked: boolean;
      createdAt: string;
      updatedAt: string;
      phone: string;
      jwt: string;
    } & DefaultSession["user"];
  }
}
