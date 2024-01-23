"use client";

import ThemeToggle from "@/components/ThemeToggle";
import {
	SignedIn,
	UserButton,
	SignedOut,
	SignInButton,
} from "@clerk/clerk-react";
import Link from "next/link";

export default function Header() {
	return (
		<header className="flex justify-between items-center p-4 border-b-2 border-gray-800">
			<Link href="/">WHAT&apos;S MY JOB</Link>
			<div className="flex items-center gap-3">
				<SignedIn>
					<Link href="/dashboard">Go to Dashboard</Link>
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
