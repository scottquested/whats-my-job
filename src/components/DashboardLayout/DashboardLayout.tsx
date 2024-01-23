"use client";

import React, { useState } from "react";
import { TooltipProvider } from "../ui/tooltip";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-separator";
import { Inbox, PlusSquare } from "lucide-react";
import {
	ResizablePanelGroup,
	ResizablePanel,
	ResizableHandle,
} from "../ui/resizable";
import DashboardNav from "../DashboardNav";
import { DashboardLayoutProps } from "./DashboardLayout.types";
import JobForm from "../JobForm";
import JobList from "../JobList";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function DashboardLayout({
	navCollapsedSize,
	defaultCollapsed = false,
	defaultLayout = [30, 70],
}: DashboardLayoutProps) {
	const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
	const [activeTab, setActiveTab] = useState(1);

	const jobs = useQuery(api.queries.getJobs);

	return (
		<TooltipProvider delayDuration={0}>
			<ResizablePanelGroup
				direction="horizontal"
				onLayout={(sizes: number[]) => {
					setIsCollapsed(false);

					document.cookie = `react-resizable-panels:layout=${JSON.stringify(
						sizes
					)}`;
				}}
				className="h-full items-stretch"
			>
				<ResizablePanel
					defaultSize={defaultLayout[0]}
					collapsedSize={navCollapsedSize}
					collapsible={true}
					minSize={15}
					maxSize={20}
					onCollapse={() => {
						setIsCollapsed(true);
						document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
							false
						)}`;
					}}
					className={cn(
						isCollapsed &&
							"min-w-[50px] transition-all duration-300 ease-in-out"
					)}
				>
					<Separator />
					<DashboardNav
						isCollapsed={isCollapsed}
						links={[
							{
								title: "Jobs",
								label: (jobs?.length || 0).toString(),
								icon: Inbox,
								variant: "default",
							},
							{
								title: "New Job",
								icon: PlusSquare,
								variant: "ghost",
							},
						].map((tab, index) => {
							return {
								...tab,
								active: index === activeTab,
								variant: activeTab === index ? "default" : "ghost",
							};
						})}
						setActiveTab={setActiveTab}
					/>
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel
					defaultSize={defaultLayout[1]}
					minSize={30}
					className="p-5"
				>
					{activeTab === 0 && <JobList />}
					{activeTab === 1 && <JobForm />}
				</ResizablePanel>
			</ResizablePanelGroup>
		</TooltipProvider>
	);
}
