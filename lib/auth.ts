import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { getServerClient } from "./convex";
import { api } from "@/convex/_generated/api";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text" },
        phone: { label: "Phone", type: "text" },
        role: { label: "Role", type: "text" },
        isSignUp: { label: "Is Sign Up", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }

        try {
          const client = await getServerClient();
          
          // Handle sign up
          if (credentials.isSignUp === "true") {
            const existingUser = await client.query(api.auth.getUserByEmail, {
              email: credentials.email,
            });

            if (existingUser) {
              throw new Error("Email already exists");
            }

            const newUser = await client.mutation(api.auth.createUser, {
              email: credentials.email,
              password: credentials.password,
              name: credentials.name || "",
              phone: credentials.phone || "",
              role: (credentials.role as "user" | "admin" | "partner") || "user",
            });

            if (!newUser) {
              throw new Error("Failed to create user");
            }

            return newUser;
          }

          // Handle sign in
          const user = await client.query(api.auth.authenticateUser, {
            email: credentials.email,
            password: credentials.password,
          });

          if (!user) {
            throw new Error("Invalid credentials");
          }

          return user;
        } catch (error: any) {
          throw new Error(error.message || "Authentication failed");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
};