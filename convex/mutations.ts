import { v } from "convex/values";
import { internal } from "./_generated/api";
import { internalMutation, mutation } from "./_generated/server";

export const saveJobs = mutation({
	args: { prompt: v.string(), userId: v.string(), title: v.string() },
	handler: async (ctx, { prompt, userId, title }) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			return;
		}

		const jobs = await ctx.db.insert("jobs", {
			userId,
			prompt,
			title,
		});

		await ctx.scheduler.runAfter(0, internal.actionsNode.getOpenAiAnswer, {
			id: jobs,
			prompt,
		});

		return jobs;
	},
});

export const updateJobs = internalMutation({
	args: {
		id: v.id("jobs"),
		result: v.string(),
	},
	handler: async (ctx, { id, result }) => {
		await ctx.db.patch(id, {
			result,
		});
	},
});
