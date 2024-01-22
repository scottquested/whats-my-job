"use client";
import { ReactNode } from "react";
import { ConvexReactClient } from "convex/react";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ThemeProvider } from "next-themes";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function Providers({ children }: { children: ReactNode }) {
	return (
		<ClerkProvider publishableKey="pk_test_aW1tZW5zZS1kb2ctODguY2xlcmsuYWNjb3VudHMuZGV2JA">
			<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					{children}
				</ThemeProvider>
			</ConvexProviderWithClerk>
		</ClerkProvider>
	);
}