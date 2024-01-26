"use client";

import { useSession } from "@clerk/nextjs";
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
	skills: z.string().min(1, "This field is required."),
});

export default function JobForm() {
	const { session } = useSession();
	const userId = session?.user.id;
	const saveJobs = useMutation(api.mutations.saveJobs);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			skills: "",
		},
	});
	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		if (!userId) {
			return;
		}

		await saveJobs({
			skills: data.skills,
			userId: userId,
		});

		form.reset();
	};

	return (
		<Card className="p-5 max-w-[500px]">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
	);
}
