import Jobs from "@/components/Jobs";

export default function Explore() {
	return (
		<main className="h-svh pt-24 container ">
			<section>
				<div className="max-w-screen-xl px-4 lg:gap-8 xl:gap-0 py-8">
					<div className="mr-auto place-self-center">
						<h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
							Explore all of the jobs you have created.
						</h1>
						<p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
							Look back on some of your previous creations.
						</p>
						<Jobs />
					</div>
				</div>
			</section>
		</main>
	);
}
