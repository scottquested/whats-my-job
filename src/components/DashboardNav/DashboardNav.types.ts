import { LucideIcon } from "lucide-react";

export interface DashboardNavProps {
	isCollapsed: boolean;
	links: {
		title: string;
		label?: string;
		icon: LucideIcon;
		variant: "default" | "ghost";
		active?: boolean;
	}[];
	setActiveTab: (index: number) => void;
}
