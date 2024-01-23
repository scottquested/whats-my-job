"use client";

import { useUser } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "../../../convex/_generated/api";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
} from "../ui/form";
import { Card } from "../ui/card";

const formSchema = z.object({
	title: z.string().min(1, "This field is required."),
	skills: z.string(),
});

export default function JobForm() {
	const { user } = useUser();
	const saveJobs = useMutation(api.mutations.saveJobs);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			skills: "",
		},
	});
	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		if (!user) {
			return;
		}

		await saveJobs({
			skills: data.skills,
			title: data.title,
			userId: user.id,
		});

		form.reset();
	};

	return (
		<div>
			<h1 className="text-3xl font-bold mb-4">
				Generate a new job matched by your skills
			</h1>
			<p></p>
			<Card className="p-5 max-w-[500px]">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input placeholder="Add a title..." {...field} />
									</FormControl>
									<FormDescription className="text-xs italic">
										This is your title for the job generation.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="skills"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Skills</FormLabel>
									<FormControl>
										<Input placeholder="Add some skills..." {...field} />
									</FormControl>
									<FormDescription className="text-xs italic">
										Comma seperated list of all the skills you have.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit">Submit</Button>
					</form>
				</Form>
			</Card>
		</div>
	);
}
