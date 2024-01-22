"use client";

import Login from "@/components/Login";
import Logout from "@/components/Logout";
import { useConvexAuth } from "convex/react";

export default function Home() {
	const { isAuthenticated, isLoading } = useConvexAuth();

	return (
		<>
			<nav>{isAuthenticated ? <Logout /> : <Login />}</nav>
			<main className="flex p-24">
				{isAuthenticated ? (
					<h1>I am logged in</h1>
				) : (
					<h1>I am not logged in</h1>
				)}
			</main>
		</>
	);
}
