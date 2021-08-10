import AuthorizedPage from "@/components/authorized-page";
import DashboardLayout from "@/components/dashboard-layout";
import Head from "next/head";


export default function ConnectionsPage() {
  return AuthorizedPage(() => {

    return (
      <DashboardLayout>
        <Head><title>Carrier Connections</title></Head>

      </DashboardLayout>
    );
  })
}
