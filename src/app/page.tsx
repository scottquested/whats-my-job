import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
	return (
		<main className="h-svh">
			<section className="pt-24 container">
				<div className="grid grid-cols-1 sm:grid-cols-2 max-w-screen-xl px-4 lg:gap-8 xl:gap-0 py-8">
					<div className="mr-auto place-self-center">
						<h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
							Find your perfect job with just a few skills
						</h1>
						<p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
							Input your skills and we&apos;ll find the perfect job for you.
						</p>
						<Button asChild>
							<Link href="/explore">Get started</Link>
						</Button>
					</div>
					<div className="order-first sm:order-last">
						<Image
							src="/jobs.png"
							alt="People jon hunting"
							width={600}
							height={300}
							priority
						/>
					</div>
				</div>
			</section>
			<section className="bg-secondary mt-16">
				<div className="container px-4 py-16">
					<p className="mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum eaque
						sequi deleniti esse odio? Veniam officiis officia deserunt similique
						repellat ratione, perspiciatis, minima blanditiis provident
						doloremque, et iste unde! Corporis.
					</p>
				</div>
			</section>
		</main>
	);
}
