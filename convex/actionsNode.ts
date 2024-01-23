"use node";

import { v } from "convex/values";
import { internalAction } from "./_generated/server";
import OpenAI from "openai";
import { internal } from "./_generated/api";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export const getOpenAiAnswer = internalAction({
	args: {
		prompt: v.string(),
		id: v.id("jobs"),
	},
	handler: async (ctx, { id, prompt }) => {
		const completion = await openai.chat.completions.create({
			messages: [
				{
					role: "system",
					content:
						"What is considered the top job someone could get with these skills. Don't include the question or skills in the response. skills: " +
						prompt,
				},
			],
			model: "gpt-3.5-turbo",
		});

		await ctx.runMutation(internal.mutations.updateJobs, {
			id,
			result: JSON.stringify(completion.choices[0].message.content),
		});
	},
});
