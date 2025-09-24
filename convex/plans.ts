import { query } from "./_generated/server";

export const getAll = query({
  args: {},
  handler: async (ctx:any) => {
    return await ctx.db.query("plans").collect();
  },
});