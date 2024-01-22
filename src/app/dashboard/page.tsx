"use client";

import {
	SignedIn,
	UserButton,
	SignedOut,
	SignInButton,
} from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import Header from "../header";

export default function Home() {
	const { isAuthenticated, isLoading } = useConvexAuth();

	return (
		<>
			<Header />
			<main className="flex p-24">Dashboard Page</main>
		</>
	);
}
