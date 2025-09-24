import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getAllEvents = query({
  args: {},
  handler: async (ctx:any) => {
    return await ctx.db.query("events").collect();
  },
});

export const getEventById = query({
  args: { eventId: v.id("events") },
  handler: async (ctx:any, args:any) => {
    return await ctx.db.get(args.eventId);
  },
});

export const createEvent = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    date: v.number(),
    location: v.string(),
    capacity: v.number(),
    price: v.number(),
    images: v.array(v.string()),
  },
  handler: async (ctx:any, args:any) => {
    return await ctx.db.insert("events", {
      ...args,
      attendees: [],
    });
  },
});

export const rsvpEvent = mutation({
  args: {
    eventId: v.id("events"),
    userId: v.id("users"),
  },
  handler: async (ctx:any, args:any) => {
    const event = await ctx.db.get(args.eventId);
    if (!event) throw new Error("Event not found");

    if (event.attendees.includes(args.userId)) {
      throw new Error("Already registered for this event");
    }

    if (event.attendees.length >= event.capacity) {
      throw new Error("Event is full");
    }

    await ctx.db.patch(args.eventId, {
      attendees: [...event.attendees, args.userId],
    });

    return args.eventId;
  },
});

export const cancelRsvp = mutation({
  args: {
    eventId: v.id("events"),
    userId: v.id("users"),
  },
  handler: async (ctx:any, args:any) => {
    const event = await ctx.db.get(args.eventId);
    if (!event) throw new Error("Event not found");

    await ctx.db.patch(args.eventId, {
      attendees: event.attendees.filter((id:any) => id !== args.userId),
    });

    return args.eventId;
  },
});