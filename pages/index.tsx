import AuthorizedPage from "@/components/authorized-page";
import DashboardLayout from "@/components/dashboard-layout";
import Head from "next/head";


export default function HomePage() {
  return AuthorizedPage(() => {

    return (
      <DashboardLayout>
        <Head><title>Shipments</title></Head>

      </DashboardLayout>
    );
  })
}
