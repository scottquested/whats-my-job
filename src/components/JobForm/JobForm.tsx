"use client";

import { useUser } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useMutation } from "convex/react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "../../../convex/_generated/api";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
const schema = z.object({
	title: z.string().min(1, "This field is required."),
	skills: z.string().min(1, "This field is required."),
});

type Schema = z.infer<typeof schema>;

export default function JobForm() {
	const { user } = useUser();
	const saveJobs = useMutation(api.mutations.saveJobs);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Schema>({
		resolver: zodResolver(schema),
	});
	const onSubmit = async (data: Schema) => {
		if (!user) {
			return;
		}

		await saveJobs({
			prompt: data.skills,
			title: data.title,
			userId: user.id,
		});
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
			<Label htmlFor="title">Title</Label>
			<Input {...register("title")} id="title" />
			{errors.title && <span>This field is required</span>}
			<Label htmlFor="skills">Skills</Label>
			<Input {...register("skills")} id="skills" />
			{errors.skills && <span>This field is required</span>}

			<Button type="submit">Generate Job</Button>
		</form>
	);
}
