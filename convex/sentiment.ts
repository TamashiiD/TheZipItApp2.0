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
  args: { text: v.string(), datetime: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert("sentiment", { text: args.text, datetime: args.datetime });
    // do something with `taskId`
  },
});