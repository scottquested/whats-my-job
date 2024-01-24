"use client";

import { useConvexAuth } from "convex/react";
import Header from "./header";

export default function Home() {
	return (
		<>
			<Header />
			<main className="h-svh flex items-center justify-center">
				<h1 className="text-8xl">Home page!</h1>
			</main>
		</>
	);
}
