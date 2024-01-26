import { v } from "convex/values";
import { internalMutation } from "./_generated/server";

export const updateJob = internalMutation({
	args: {
		id: v.id("jobs"),
		result: v.optional(v.string()),
		status: v.union(
			v.literal("pending"),
			v.literal("completed"),
			v.literal("failed")
		),
		imageId: v.optional(v.string()),
	},
	handler: async (ctx, { id, result, status, imageId }) => {
		await ctx.db.patch(id, {
			result,
			status: status,
			imageId,
		});
	},
});
