import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<main className="h-svh container">
			<section className="pt-24">
				<div className="max-w-screen-xl px-4 lg:gap-8 xl:gap-0 py-16">
					<div className="mr-auto place-self-center">
						<h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
							Find your perfect job with just a few skills
						</h1>
						<p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
							Input your skills and we&apos;ll find the perfect job for you.
						</p>
						<Button asChild>
							<Link href="/create">Get started</Link>
						</Button>
					</div>
					<div className="hidden lg:mt-0 lg:col-span-5 lg:flex"></div>
				</div>
			</section>
		</main>
	);
}
