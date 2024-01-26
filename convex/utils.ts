import OpenAI from "openai";

export const openAiConfig = async (prompt: string) => {
	const apiKey = process.env.OPENAI_API_KEY;

	if (!apiKey) {
		throw new Error(
			"Add your OPENAI_API_KEY as an env variable in the " +
				"[dashboard](https://dasboard.convex.dev)"
		);
	}

	const openai = new OpenAI({ apiKey });

	// Check if the prompt is offensive.
	const modResponse = await openai.moderations.create({
		input: prompt,
	});
	const modResult = modResponse.results[0];
	if (modResult.flagged) {
		throw new Error(
			`Your prompt were flagged as offensive: ${JSON.stringify(
				modResult.categories
			)}`
		);
	}

	return openai;
};
