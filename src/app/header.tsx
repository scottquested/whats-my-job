import ThemeToggle from "@/components/ThemeToggle";
import {
	SignedIn,
	UserButton,
	SignedOut,
	SignInButton,
} from "@clerk/clerk-react";

export default function Header() {
	return (
		<header className="flex justify-between items-center p-4 border-b-2 border-gray-800">
			<div>WHAT&apos;S MY JOB</div>
			<div className="flex items-center gap-3">
				<SignedIn>
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
