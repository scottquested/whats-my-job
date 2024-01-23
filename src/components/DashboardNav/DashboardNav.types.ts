import { LucideIcon } from "lucide-react";

export enum DashboardNavVariant {
	Default = "default",
	Ghost = "ghost",
}

export interface DashboardNavProps {
	isCollapsed: boolean;
	links: {
		title: string;
		label?: string;
		icon: LucideIcon;
		variant: DashboardNavVariant;
		active?: boolean;
		loading?: boolean;
	}[];
	setActiveTab: (index: number) => void;
}
