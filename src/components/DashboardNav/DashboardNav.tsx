"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { buttonVariants } from "../ui/button";
import { DashboardNavProps } from "./DashboardNav.types";

export default function DashboardNav({
	isCollapsed,
	links,
	setActiveTab,
}: DashboardNavProps) {
	return (
		<div
			data-collapsed={isCollapsed}
			className="group flex flex-col gap-4 py-5"
		>
			<nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
				{links.map((link, index) =>
					isCollapsed ? (
						<Tooltip key={index} delayDuration={0}>
							<TooltipTrigger asChild>
								<Link
									href="#"
									className={cn(
										buttonVariants({ variant: link.variant, size: "icon" }),
										"h-9 w-9",
										link.variant === "default"
									)}
									onClick={() => setActiveTab(index)}
								>
									<link.icon className="h-4 w-4" />
									<span className="sr-only">{link.title}</span>
								</Link>
							</TooltipTrigger>
							<TooltipContent side="right" className="flex items-center gap-4">
								{link.title}
								{link.label && (
									<span className="ml-auto text-muted-foreground">
										{link.label}
									</span>
								)}
							</TooltipContent>
						</Tooltip>
					) : (
						<Link
							key={index}
							href="#"
							className={cn(
								buttonVariants({ variant: link.variant, size: "sm" }),
								link.variant === "default",
								"justify-start"
							)}
							onClick={() => setActiveTab(index)}
						>
							<link.icon className="mr-2 h-4 w-4" />
							{link.title}
							{link.loading && (
								<Loader2 className="animate-spin h-4 w-4 ml-auto" />
							)}
							{link.label && !link.loading && (
								<span
									className={cn(
										"ml-auto",
										link.variant === "default" &&
											"text-background dark:text-white"
									)}
								>
									{link.label}
								</span>
							)}
						</Link>
					)
				)}
			</nav>
		</div>
	);
}
