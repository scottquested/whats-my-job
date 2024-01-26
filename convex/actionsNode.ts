"use node";

import { v } from "convex/values";
import { internalAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { openAiConfig } from "./utils";

const userPromoptText = `What is considered the top job someone could 
get with these skills. Don't include the question or skills in the response. 
Keep it short with a brief description of the role. Remove quotes and any newline characters skills:`;

const systemPromoptText = `You are a helpful assistant who will return JSON data 
for the top job someone could get with these skills. Use the keys 'jobTitle' and 
'jobDescription' to return the data.`;

/**
 * Internal action to generate a job from given skills from OpenAi.
 *
 * @param skills The skills to use to generate the job.
 * @param id The id of the job to update.
 *
 */
export const getJobBySkills = internalAction({
	args: {
		skills: v.string(),
		id: v.id("jobs"),
	},
	handler: async (ctx, { id, skills }) => {
		const openai = await openAiConfig(skills);

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

			const storageId = await ctx.runAction(
				internal.actionsNode.getOpenAiImage,
				{
					prompt: transformResult.jobTitle,
					id,
				}
			);

			await ctx.runMutation(internal.mutationsInternal.updateJob, {
				id,
				result: JSON.stringify(transformResult),
				status: "completed",
				imageId: storageId,
			});
		} catch (error) {
			await ctx.runMutation(internal.mutationsInternal.updateJob, {
				id,
				status: "failed",
			});
		}
	},
});

/**
 * Internal action to get an image from OpenAI.
 *
 * @param prompt The prompt to use to generate the image.
 * @returns The storage id of the image.
 *
 */
export const getOpenAiImage = internalAction({
	args: {
		id: v.id("jobs"),
		prompt: v.string(),
	},
	handler: async (ctx, { id, prompt }) => {
		const openai = await openAiConfig(prompt);

		console.log("prompt: ", prompt);

		try {
			// Query OpenAI for the image.
			const opanaiResponse = await openai.images.generate({
				prompt: `Image of ${prompt}. Make it a fun image`,
				size: "512x512",
			});
			const dallEImageUrl = opanaiResponse.data[0]["url"]!;

			// Download the image
			const imageResponse = await fetch(dallEImageUrl);
			if (!imageResponse.ok) {
				throw new Error(`failed to download: ${imageResponse.statusText}`);
			}

			// Store the image to Convex storage.
			const image = await imageResponse.blob();
			const storageId = await ctx.storage.store(image as Blob);

			return storageId;
		} catch (error) {
			throw new Error("Failed to get image");
		}
	},
});
