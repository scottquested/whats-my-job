import { query } from "./_generated/server";

export const getJobs = query({
	handler: async (ctx) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			return;
		}

		const jobs = await ctx.db.query("jobs").collect();
		return jobs;
	},
});
