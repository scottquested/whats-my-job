import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	jobs: defineTable({
		skills: v.string(),
		result: v.optional(v.string()),
		title: v.string(),
		userId: v.string(),
		status: v.union(
			v.literal("pending"),
			v.literal("completed"),
			v.literal("failed")
		),
	}),
});
