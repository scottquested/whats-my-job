import { Doc } from "../../../convex/_generated/dataModel";

export type JobCardResult = {
	jobTitle?: string;
	jobDescription?: string;
};

export interface JobCardProps {
	job: Doc<"jobs">;
	result: JobCardResult;
}
