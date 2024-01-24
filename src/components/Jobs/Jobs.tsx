"use client";

import React from "react";
import { preloadQuery } from "convex/nextjs";
import { api } from "../../../convex/_generated/api";
import JobList from "../JobList";
import { useQuery } from "convex/react";

export default function Jobs() {
	const jobs = useQuery(api.queries.getJobs);

	return (
		<div className="h-full">
			<JobList jobs={jobs!} />
		</div>
	);
}
