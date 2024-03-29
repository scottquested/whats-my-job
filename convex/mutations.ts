import { v } from "convex/values";
import { internal } from "./_generated/api";
import { mutation } from "./_generated/server";

export const saveJobs = mutation({
	args: { skills: v.string(), userId: v.string() },
	handler: async (ctx, { skills, userId }) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error("Not authenticated");
		}

		const jobs = await ctx.db.insert("jobs", {
			userId,
			skills,
			status: "pending",
			imageId: "",
		});

		await ctx.scheduler.runAfter(0, internal.actionsNode.getJobBySkills, {
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
			throw new Error("Not authenticated");
		}

		await ctx.db.patch(id, {
			skills,
			status: "pending",
		});

		await ctx.scheduler.runAfter(0, internal.actionsNode.getJobBySkills, {
			id,
			skills,
		});
	},
});
