"use client";

import React from "react";
import { Button } from "../ui/button";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { GenericId } from "convex/values";
import { JobListFailedProps } from "./JobListFailed.types";

export default function JobListFailed({ job }: JobListFailedProps) {
	const saveJobs = useMutation(api.mutations.retryJob);

	const onRetry = async (jobId: GenericId<"jobs">, skills: string) => {
		await saveJobs({
			id: jobId,
			skills: skills,
		});
	};

	return (
		<div>
			<p className="mb-4">Something went wrong! Please try again</p>
			<Button onClick={() => onRetry(job._id, job.skills)}>Retry</Button>
		</div>
	);
}
