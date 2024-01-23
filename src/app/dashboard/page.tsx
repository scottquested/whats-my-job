import DashboardLayout from "@/components/DashboardLayout";
import Header from "../header";
import { cookies } from "next/headers";

export default function Dashboard() {
	const layout = cookies().get("react-resizable-panels:layout");
	const collapsed = cookies().get("react-resizable-panels:collapsed");

	const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
	const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

	return (
		<>
			<Header />
			<main className="h-svh pt-[74px]">
				<DashboardLayout
					navCollapsedSize={4}
					defaultCollapsed={defaultCollapsed}
					defaultLayout={defaultLayout}
				/>
			</main>
		</>
	);
}
