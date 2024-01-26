import { Loader2 } from "lucide-react";
import React from "react";
import JobListFailed from "../JobListFailed";
import { Card, CardHeader, CardContent } from "../ui/card";
import { JobCardProps } from "./JobCard.types";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";

export default function JobCard({ job, result }: JobCardProps) {
	return (
		<Card className="h-full relative z-0">
			{job.status === "pending" ? (
				<div className="flex flex-col items-center justify-center h-full w-full">
					<div>
						<Loader2 className="animate-spin h-100 w-100 m-auto" />
						Generating top job based on skills...
					</div>
				</div>
			) : (
				<>
					<Image
						src={getImageUrl(job.imageId)}
						alt={`An image of a ${result.jobTitle || "job"}`}
						width={400}
						height={300}
						className="w-full h-full object-cover object-top absolute top-0 left-0 z-0"
					/>
					<div className="w-full h-full object-cover object-top absolute top-0 left-0 z-10 bg-black opacity-70"></div>
					<div className="relative z-10">
						<CardHeader className="!mb-0">
							<h1 className="text-xl font-semibold">
								{result?.jobTitle || ""}
							</h1>
						</CardHeader>
						<CardContent>
							{!!job.skills.length && (
								<div className="mb-4 flex gap-2">
									{job.skills.split(",").map((skill) => (
										<Badge variant="default" key={skill}>
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
					</div>
				</>
			)}
		</Card>
	);
}
