import { Id } from "../../../convex/_generated/dataModel";

export interface JobListFailedProps {
	job: {
		_id: Id<"jobs">;
		skills: string;
	};
}
