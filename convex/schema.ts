import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  sentiment: defineTable({
    text: v.string(),
    datetime: v.optional(v.string()),
    ip: v.optional(v.number())
  }),
});