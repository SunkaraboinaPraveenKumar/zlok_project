import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    role: v.union(v.literal("user"), v.literal("admin"), v.literal("partner")),
    avatarUrl: v.optional(v.string()),
    currentPlanId: v.optional(v.id("plans")),
    subscriptionStatus: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_email", ["email"]),

  plans: defineTable({
    name: v.string(),
    priceMonthly: v.number(),
    priceYearly: v.number(),
    benefits: v.array(v.string()),
    limits: v.object({
      monthlyBookings: v.number(),
      eventAccess: v.boolean(),
      priority: v.string(),
    }),
    isPopular: v.optional(v.boolean()),
  }),

  payments: defineTable({
    userId: v.id("users"),
    razorpayPaymentId: v.string(),
    orderId: v.string(),
    amount: v.number(),
    status: v.string(),
    createdAt: v.number(),
  }).index("by_user", ["userId"]),

  hubs: defineTable({
    name: v.string(),
    coords: v.object({
      lat: v.number(),
      lng: v.number(),
    }),
    address: v.string(),
    images: v.array(v.string()),
    spaces: v.array(v.object({
      id: v.string(),
      type: v.string(),
      capacity: v.number(),
    })),
    tags: v.array(v.string()),
    amenities: v.array(v.string()),
  }),

  bookings: defineTable({
    userId: v.id("users"),
    hubId: v.id("hubs"),
    spaceId: v.string(),
    startTime: v.number(),
    endTime: v.number(),
    status: v.string(),
    paymentRef: v.optional(v.id("payments")),
  }).index("by_user", ["userId"]).index("by_hub", ["hubId"]),

  events: defineTable({
    title: v.string(),
    description: v.string(),
    date: v.number(),
    location: v.string(),
    capacity: v.number(),
    price: v.number(),
    attendees: v.array(v.id("users")),
    images: v.array(v.string()),
  }),

  partners: defineTable({
    userId: v.id("users"),
    propertyDetails: v.object({
      name: v.string(),
      address: v.string(),
      type: v.string(),
    }),
    revenueShare: v.number(),
    status: v.string(),
    payoutHistory: v.array(v.object({
      amount: v.number(),
      date: v.number(),
      status: v.string(),
    })),
  }).index("by_user", ["userId"]),
});