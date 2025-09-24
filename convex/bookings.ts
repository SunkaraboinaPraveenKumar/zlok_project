import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createBooking = mutation({
  args: {
    userId: v.id("users"),
    hubId: v.id("hubs"),
    spaceId: v.string(),
    startTime: v.number(),
    endTime: v.number(),
  },
  handler: async (ctx:any, args:any) => {
    // Check for conflicts
    const existingBookings = await ctx.db
      .query("bookings")
      .withIndex("by_hub", (q:any) => q.eq("hubId", args.hubId))
      .filter((q:any) => 
        q.and(
          q.eq(q.field("spaceId"), args.spaceId),
          q.eq(q.field("status"), "confirmed"),
          q.or(
            q.and(
              q.lte(q.field("startTime"), args.startTime),
              q.gt(q.field("endTime"), args.startTime)
            ),
            q.and(
              q.lt(q.field("startTime"), args.endTime),
              q.gte(q.field("endTime"), args.endTime)
            )
          )
        )
      )
      .collect();

    if (existingBookings.length > 0) {
      throw new Error("Time slot not available");
    }

    return await ctx.db.insert("bookings", {
      ...args,
      status: "pending",
    });
  },
});

export const getUserBookings = query({
  args: { userId: v.id("users") },
  handler: async (ctx:any, args:any) => {
    return await ctx.db
      .query("bookings")
      .withIndex("by_user", (q:any) => q.eq("userId", args.userId))
      .collect();
  },
});

export const updateBookingStatus = mutation({
  args: {
    bookingId: v.id("bookings"),
    status: v.string(),
    paymentRef: v.optional(v.id("payments")),
  },
  handler: async (ctx:any, args:any) => {
    const { bookingId, ...updates } = args;
    await ctx.db.patch(bookingId, updates);
    return bookingId;
  },
});

export const getAvailableSlots = query({
  args: {
    hubId: v.id("hubs"),
    spaceId: v.string(),
    date: v.number(),
  },
  handler: async (ctx:any, args:any) => {
    const startOfDay = new Date(args.date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(args.date);
    endOfDay.setHours(23, 59, 59, 999);

    const bookings = await ctx.db
      .query("bookings")
      .withIndex("by_hub", (q:any) => q.eq("hubId", args.hubId))
      .filter((q:any) =>
        q.and(
          q.eq(q.field("spaceId"), args.spaceId),
          q.eq(q.field("status"), "confirmed"),
          q.gte(q.field("startTime"), startOfDay.getTime()),
          q.lte(q.field("endTime"), endOfDay.getTime())
        )
      )
      .collect();

    // Generate available slots (9 AM to 9 PM, 1-hour slots)
    const slots = [];
    for (let hour = 9; hour < 21; hour++) {
      const slotStart = new Date(args.date);
      slotStart.setHours(hour, 0, 0, 0);
      const slotEnd = new Date(args.date);
      slotEnd.setHours(hour + 1, 0, 0, 0);

      const isBooked = bookings.some((booking: any) =>
        booking.startTime < slotEnd.getTime() && booking.endTime > slotStart.getTime()
      );

      slots.push({
        startTime: slotStart.getTime(),
        endTime: slotEnd.getTime(),
        available: !isBooked,
      });
    }

    return slots;
  },
});