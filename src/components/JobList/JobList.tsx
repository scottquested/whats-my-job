"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "../ui/card";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { GenericId } from "convex/values";
import { Badge } from "../ui/badge";

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
		<div className="h-full">
			{jobs?.length === 0 && (
				<h1>
					You haven&apos;t generated any jobs yet. Try creating a new one...
				</h1>
			)}
			{!jobs && (
				<div className="h-full flex items-center justify-center">
					<Loader2 className="animate-spin h-16 w-16 m-auto" />
				</div>
			)}
			{!!jobs?.length && (
				<ul className="grid grid-cols-2 gap-5">
					{jobs?.map((job) => {
						const result = JSON.parse(job?.result || "{}");

						console.log("result", result);

						return (
							<li key={job._id} className="h-full">
								<Card className="h-full">
									<CardHeader className=" !mb-0">
										<h1 className="text-xl font-semibold">
											{result?.jobTitle || ""}
										</h1>
									</CardHeader>
									<CardContent>
										{!!job.skills.length && (
											<div className="mb-4 flex gap-2">
												{job.skills.split(",").map((skill) => (
													<Badge variant="outline" key={skill}>
														{skill}
													</Badge>
												))}
											</div>
										)}
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
										{job.status === "completed" && (
											<div>
												<p>{result?.jobDescription || ""}</p>
											</div>
										)}
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
