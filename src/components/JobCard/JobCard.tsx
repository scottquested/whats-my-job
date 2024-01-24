import { Loader2 } from "lucide-react";
import React from "react";
import JobListFailed from "../JobListFailed";
import { Card, CardHeader, CardContent } from "../ui/card";
import { JobCardProps } from "./JobCard.types";
import { Badge } from "../ui/badge";

export default function JobCard({ job, result }: JobCardProps) {
	return (
		<Card className="h-full">
			{job.status === "pending" ? (
				<div className="flex items-center justify-center h-full w-full">
					<Loader2 className="animate-spin h-100 w-100 m-auto" />
					Generating top job based on skills...
				</div>
			) : (
				<>
					<CardHeader className=" !mb-0">
						<h1 className="text-xl font-semibold">{result?.jobTitle || ""}</h1>
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
						{job.status === "failed" && <JobListFailed job={job} />}
						{job.status === "completed" && (
							<div>
								<p>{result?.jobDescription || ""}</p>
							</div>
						)}
					</CardContent>
				</>
			)}
		</Card>
	);
}
