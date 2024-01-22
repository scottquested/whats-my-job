import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	jobs: defineTable({
		prompt: v.string(),
		result: v.optional(v.string()),
		title: v.string(),
		userId: v.string(),
	}),
});
