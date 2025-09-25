import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import bcrypt from "bcryptjs";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

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
          // Handle sign up
          if (credentials.isSignUp === "true") {
            console.log("Attempting to create user:", credentials.email);
            
            const existingUser = await convex.query(api.auth.getUserByEmail, {
              email: credentials.email,
            });

            if (existingUser) {
              throw new Error("Email already exists");
            }

            // Hash password on the client side using bcrypt
            const hashedPassword = await bcrypt.hash(credentials.password, 10);

            const newUser = await convex.mutation(api.auth.createUser, {
              email: credentials.email,
              hashedPassword: hashedPassword, // Pass the hashed password
              name: credentials.name || "",
              phone: credentials.phone || "",
              role: (credentials.role as "user" | "admin" | "partner") || "user",
            });

            if (!newUser) {
              throw new Error("Failed to create user");
            }

            console.log("User created successfully:", newUser);
            return {
              id: newUser.id,
              email: newUser.email,
              name: newUser.name,
              role: newUser.role,
            };
          }

          // Handle sign in
          console.log("Attempting to authenticate user:", credentials.email);
          
          // Get user from database first
          const user = await convex.query(api.auth.getUserByEmail, {
            email: credentials.email,
          });

          if (!user) {
            throw new Error("Invalid credentials");
          }

          // Get the stored password hash
          const storedUser = await convex.query(api.auth.getUserWithPassword, {
            email: credentials.email,
          });

          if (!storedUser) {
            throw new Error("Invalid credentials");
          }

          // Compare password using bcrypt on the client side
          const isPasswordValid = await bcrypt.compare(credentials.password, storedUser.password);
          
          if (!isPasswordValid) {
            throw new Error("Invalid credentials");
          }

          console.log("User authenticated successfully:", user);
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error: any) {
          console.error("Auth error:", error.message);
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
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = (user as any).id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
};