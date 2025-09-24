import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { ConvexError } from "convex/values";
import { hash, compare } from "bcryptjs";

// Function to create a new user
export const createUser = mutation({
  args: {
    email: v.string(),
    password: v.string(),
    name: v.string(),
    phone: v.optional(v.string()),
    role: v.union(v.literal("user"), v.literal("admin"), v.literal("partner")),
  },
  handler: async (ctx, args) => {
    // Check for existing user
    const existing = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existing) {
      throw new ConvexError("Email already exists");
    }

    // Hash password
    const hashedPassword = await hash(args.password, 10);

    // Create user
    const userId = await ctx.db.insert("users", {
      email: args.email,
      password: hashedPassword,
      name: args.name,
      phone: args.phone ?? "",
      role: args.role,
      createdAt: Date.now(),
      subscriptionStatus: "inactive",
    });

    return {
      id: userId,
      email: args.email,
      name: args.name,
      role: args.role,
    };
  },
});

// Function to authenticate a user
export const authenticateUser = query({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!user) {
      throw new ConvexError("Invalid credentials");
    }

    const isValid = await compare(args.password, user.password);
    if (!isValid) {
      throw new ConvexError("Invalid credentials");
    }

    return {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  },
});

// Function to get user by email
export const getUserByEmail = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!user) return null;

    return {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  },
});