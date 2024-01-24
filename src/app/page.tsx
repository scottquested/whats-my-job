"use client";

import { useConvexAuth } from "convex/react";
import Header from "./header";

export default function Home() {
	const { isAuthenticated } = useConvexAuth();

	return (
		<>
			<Header />
			<main className="h-svh pt-24">Home page!</main>
		</>
	);
}
