import { v } from "convex/values";
import { internal } from "./_generated/api";
import { internalMutation, mutation } from "./_generated/server";

export const saveJobs = mutation({
	args: { skills: v.string(), userId: v.string(), title: v.string() },
	handler: async (ctx, { skills, userId, title }) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			return;
		}

		const jobs = await ctx.db.insert("jobs", {
			userId,
			skills,
			title,
			status: "pending",
		});

		await ctx.scheduler.runAfter(0, internal.actionsNode.getOpenAiAnswer, {
			id: jobs,
			skills,
		});

		return jobs;
	},
});

export const retryJob = mutation({
	args: {
		id: v.id("jobs"),
		skills: v.string(),
	},
	handler: async (ctx, { id, skills }) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			return;
		}

		await ctx.db.patch(id, {
			skills,
			status: "pending",
		});

		await ctx.scheduler.runAfter(0, internal.actionsNode.getOpenAiAnswer, {
			id,
			skills,
		});
	},
});

export const updateJob = internalMutation({
	args: {
		id: v.id("jobs"),
		result: v.string(),
		status: v.union(
			v.literal("pending"),
			v.literal("completed"),
			v.literal("failed")
		),
	},
	handler: async (ctx, { id, result, status }) => {
		await ctx.db.patch(id, {
			result,
			status: status,
		});
	},
});
