import { query } from "./_generated/server";

export const getJobs = query({
	handler: async (ctx) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			return;
		}

		const jobs = await ctx.db
			.query("jobs")
			.filter((q) => {
				// Only get jobs for the current user
				return q.eq(q.field("userId"), identity.subject);
			})
			.order("desc")
			.collect();

		return jobs;
	},
});
