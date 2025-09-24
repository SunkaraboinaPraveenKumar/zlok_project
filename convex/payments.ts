import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createPayment = mutation({
  args: {
    userId: v.id("users"),
    razorpayPaymentId: v.string(),
    orderId: v.string(),
    amount: v.number(),
    status: v.string(),
  },
  handler: async (ctx:any, args:any) => {
    return await ctx.db.insert("payments", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const updatePaymentStatus = mutation({
  args: {
    paymentId: v.id("payments"),
    status: v.string(),
    razorpayPaymentId: v.optional(v.string()),
  },
  handler: async (ctx:any, args:any) => {
    const { paymentId, ...updates } = args;
    await ctx.db.patch(paymentId, updates);
    return paymentId;
  },
});

export const getUserPayments = query({
  args: { userId: v.id("users") },
  handler: async (ctx:any, args:any) => {
    return await ctx.db
      .query("payments")
      .withIndex("by_user", (q:any) => q.eq("userId", args.userId))
      .collect();
  },
});

export const getPaymentById = query({
  args: { paymentId: v.id("payments") },
  handler: async (ctx:any, args:any) => {
    return await ctx.db.get(args.paymentId);
  },
});