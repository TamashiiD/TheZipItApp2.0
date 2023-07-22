import { query } from "./_generated/server";
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async ctx => {
    return await ctx.db.query("sentiment").collect();
  },
});



export const createSentiment = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
  const time : Date = new Date()
  const datetime : string = time.toLocaleString()
    await ctx.db.insert("sentiment", { text: args.text, datetime: datetime  });
    // do something with `taskId`
  },
});