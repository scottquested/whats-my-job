import JobForm from "@/components/JobForm";

export default function Create() {
	return (
		<main className="h-svh pt-24 container ">
			<section className="pt-24">
				<div className="max-w-screen-xl px-4 lg:gap-8 xl:gap-0 lg:py-16">
					<JobForm />
				</div>
			</section>
		</main>
	);
}
