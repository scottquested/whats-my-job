"use node";

import { v } from "convex/values";
import { internalAction } from "./_generated/server";
import OpenAI from "openai";
import { internal } from "./_generated/api";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

const userPromoptText = `What is considered the top job someone could 
get with these skills. Don't include the question or skills in the response. 
Keep it short with a brief description of the role. Remove quotes and any newline characters skills:`;

const systemPromoptText = `You are a helpful assistant who will return JSON data 
for the top job someone could get with these skills. Use the keys 'jobTitle' and 
'jobDescription' to return the data.`;

export const getOpenAiAnswer = internalAction({
	args: {
		skills: v.string(),
		id: v.id("jobs"),
	},
	handler: async (ctx, { id, skills }) => {
		try {
			const completion = await openai.chat.completions.create({
				messages: [
					{
						role: "system",
						content: systemPromoptText,
					},
					{
						role: "user",
						content: `${userPromoptText} ${skills}`,
					},
				],
				model: "gpt-4-1106-preview",
				response_format: { type: "json_object" },
			});

			const transformResult = JSON.parse(
				completion.choices[0].message.content || "{}"
			);

			await ctx.runMutation(internal.mutations.updateJob, {
				id,
				result: JSON.stringify(transformResult),
				status: "completed",
			});
		} catch (error) {
			await ctx.runMutation(internal.mutations.updateJob, {
				id,
				status: "failed",
			});
		}
	},
});
