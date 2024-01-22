"use client";

import { useConvexAuth, useMutation, useQuery } from "convex/react";
import Header from "./header";
import { api } from "../../convex/_generated/api";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

const schema = z.object({
	title: z.string().min(1, "This field is required."),
	skills: z.string().min(1, "This field is required."),
});

type Schema = z.infer<typeof schema>;

export default function Home() {
	const { isAuthenticated } = useConvexAuth();
	const { user } = useUser();
	const jobs = useQuery(api.queries.getJobs);
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
		console.log("data", data);

		// await saveJobs({
		// 	prompt: data.skills,
		// 	title: data.title,
		// 	userId: user.id,
		// });
	};

	console.log("errors", errors);

	return (
		<>
			<Header />
			<main className="flex p-24">
				{isAuthenticated ? (
					<h1>I am logged in</h1>
				) : (
					<h1>I am not logged in</h1>
				)}
			</main>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-4 p-24"
			>
				<Label htmlFor="title">Title</Label>
				<Input {...register("title")} id="title" />
				{errors.title && <span>This field is required</span>}
				<Label htmlFor="skills">Skills</Label>
				<Input {...register("skills")} id="skills" />
				{errors.skills && <span>This field is required</span>}

				<Button type="submit">Generate Job</Button>
			</form>
			<div className="flex gap-4">
				{jobs?.map((job) => {
					return (
						<div className="bg-slate-500 text-black" key={job._id}>
							<h2>{job.title}</h2>
							<div>{job.result}</div>
						</div>
					);
				})}
			</div>
		</>
	);
}
