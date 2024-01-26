"use client";

import ThemeToggle from "@/components/ThemeToggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignedIn, UserButton, SignedOut, SignInButton } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { Briefcase, Loader2 } from "lucide-react";
import Link from "next/link";
import { api } from "../../convex/_generated/api";

export default function Header() {
	const jobs = useQuery(api.queries.getJobs);

	return (
		<header className="flex justify-between items-center p-4 border-b-2 border-gray-100 dark:border-gray-800 fixed z-50 w-full bg-background dark:text-white">
			<Link
				href="/"
				className="font-bold text-xl flex items-center justify-center gap-2 cursor-pointer"
			>
				<Briefcase className="text-orange-500" /> What&apos;s my job?
			</Link>
			<div className="flex gap-4">
				<Link href="/explore" className="cursor-pointer flex gap-2">
					{jobs?.some((job) => job.status === "pending") && (
						<Loader2 className="animate-spin h-5 w-5 m-auto" />
					)}{" "}
					Explore
				</Link>
				<Link href="/create" className="cursor-pointer">
					Create
				</Link>
			</div>
			<div>
				<div className="flex items-center gap-3 cursor-pointer">
					<SignedIn>
						<UserButton afterSignOutUrl="\" />
					</SignedIn>
					<SignedOut>
						<SignInButton mode="modal">
							<span
								className={cn(
									buttonVariants({ variant: "default", size: "sm" }),
									"cursor-pointer"
								)}
							>
								Sign in
							</span>
						</SignInButton>
					</SignedOut>
					<nav className="flex items-center space-x-1">
						<ThemeToggle />
					</nav>
				</div>
			</div>
		</header>
	);
}
