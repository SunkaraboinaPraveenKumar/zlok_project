import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { hash, compare } from "bcryptjs";

export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    password: v.string(),
    phone: v.optional(v.string()),
    role: v.union(v.literal("user"), v.literal("admin"), v.literal("partner")),
  },
  handler: async (ctx, args) => {
    const hashedPassword = await hash(args.password, 10);

    const userId = await ctx.db.insert("users", {
      ...args,
      password: hashedPassword,
      createdAt: Date.now(),
    });

    return {
      id: userId,
      email: args.email,
      name: args.name,
      phone: args.phone,
      role: args.role,
    };
  },
});

export const getUserByEmail = query({
  args: { 
    email: v.string() 
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
  },
});

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
      return null;
    }

    const isValid = await compare(args.password, user.password);
    if (!isValid) {
      return null;
    }

    return {
      id: user._id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role,
    };
  },
});