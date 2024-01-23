"use client";

import { useConvexAuth } from "convex/react";
import Header from "./header";

export default function Home() {
	const { isAuthenticated } = useConvexAuth();

	return (
		<>
			<Header />
			<main className="flex">
				{isAuthenticated ? (
					<h1>I am logged in</h1>
				) : (
					<h1>I am not logged in</h1>
				)}
			</main>
		</>
	);
}
