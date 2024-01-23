"use client";

import ThemeToggle from "@/components/ThemeToggle";
import {
	SignedIn,
	UserButton,
	SignedOut,
	SignInButton,
} from "@clerk/clerk-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function Header() {
	const path = usePathname();
	return (
		<header className="flex justify-between items-center p-4 border-b-2 border-gray-800">
			<Link href="/">WHAT&apos;S MY JOB</Link>
			<div className="flex items-center gap-3">
				<SignedIn>
					{!path.includes("dashboard") && (
						<Link
							href="/dashboard"
							className="flex items-center justify-between bg-slate-400 py-1 px-2 rounded-md text-white"
						>
							Dashboard <ArrowRight />
						</Link>
					)}
					<UserButton afterSignOutUrl="\" />
				</SignedIn>
				<SignedOut>
					<SignInButton mode="modal" />
				</SignedOut>
				<nav className="flex items-center space-x-1">
					<ThemeToggle />
				</nav>
			</div>
		</header>
	);
}
