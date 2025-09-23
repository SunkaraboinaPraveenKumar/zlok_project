import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getAllHubs = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("hubs").collect();
  },
});

export const getHubById = query({
  args: { hubId: v.id("hubs") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.hubId);
  },
});

export const searchHubs = query({
  args: {
    location: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    let hubs = await ctx.db.query("hubs").collect();
    
    if (args.location) {
      hubs = hubs.filter(hub => 
        hub.address.toLowerCase().includes(args.location!.toLowerCase())
      );
    }
    
    if (args.tags && args.tags.length > 0) {
      hubs = hubs.filter(hub =>
        args.tags!.some(tag => hub.tags.includes(tag))
      );
    }
    
    return hubs;
  },
});

export const createHub = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("hubs", args);
  },
});