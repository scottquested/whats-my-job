"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "../ui/card";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function JobList() {
	const jobs = useQuery(api.queries.getJobs);

	return jobs?.map((job) => {
		return (
			<Card key={job._id}>
				<CardHeader>{job.title}</CardHeader>
				<CardContent>{job.result}</CardContent>
			</Card>
		);
	});
}
