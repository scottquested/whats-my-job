"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "../ui/card";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { GenericId } from "convex/values";

export default function JobList() {
	const jobs = useQuery(api.queries.getJobs);
	const saveJobs = useMutation(api.mutations.retryJob);

	const onRetry = async (jobId: GenericId<"jobs">, skills: string) => {
		await saveJobs({
			id: jobId,
			skills: skills,
		});
	};

	return (
		<div>
			{!jobs?.length && (
				<h1>
					You haven&apos;t generated any jobs yet. Try creating a new one...
				</h1>
			)}
			{!!jobs?.length && (
				<ul className="grid grid-cols-2 gap-5">
					{jobs?.map((job) => {
						return (
							<li key={job._id} className="h-full">
								<Card className="h-full">
									<CardHeader>
										<h1 className="text-xl font-semibold">{job.title}</h1>
									</CardHeader>
									<CardContent>
										{job.status === "pending" && (
											<Loader2 className="animate-spin h-100 w-100 m-auto" />
										)}
										{job.status === "failed" && (
											<div>
												<p className="mb-4">
													Something went wrong! Please try again
												</p>
												<Button onClick={() => onRetry(job._id, job.skills)}>
													Retry
												</Button>
											</div>
										)}
										{job.status === "completed" &&
											job.result?.replace(/"/g, "")}
									</CardContent>
								</Card>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
}
