"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { JobListProps } from "./Job List.types";
import JobCard from "../JobCard";
import { JobCardResult } from "../JobCard/JobCard.types";

export default function JobList({ jobs }: JobListProps) {
	return (
		<>
			{jobs?.length === 0 && (
				<h1>
					You haven&apos;t generated any jobs yet. Try creating a new one...
				</h1>
			)}
			{!jobs && (
				<div className="h-[90svh] flex items-center justify-center">
					<Loader2 className="animate-spin h-16 w-16 m-auto" />
				</div>
			)}
			{!!jobs?.length && (
				<ul className="grid grid-cols-2 gap-5">
					{jobs?.map((job) => {
						const result: JobCardResult = JSON.parse(job?.result || "{}");

						return (
							<li key={job._id} className="h-full">
								<JobCard job={job} result={result} />
							</li>
						);
					})}
				</ul>
			)}
		</>
	);
}
