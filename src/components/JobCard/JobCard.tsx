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
		<article className="h-full">
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
							priority
						/>
						<div className="w-full h-full object-cover object-top absolute top-0 left-0 z-10 bg-white dark:bg-black opacity-80"></div>
						<div className="relative z-10">
							<CardHeader className="!mb-0">
								<h1 className="text-xl font-semibold">
									{result?.jobTitle || ""}
								</h1>
							</CardHeader>
							<CardContent>
								{!!job.skills.length && (
									<div className="mb-4 flex gap-2 flex-wrap">
										{job.skills.split(",").map((skill) => (
											<Badge variant="outline" key={skill}>
												{skill}
											</Badge>
										))}
									</div>
								)}
								{job.status === "failed" && <JobListFailed job={job} />}
								{job.status === "completed" && (
									<p className="text-sm">{result?.jobDescription || ""}</p>
								)}
							</CardContent>
						</div>
					</>
				)}
			</Card>
		</article>
	);
}
