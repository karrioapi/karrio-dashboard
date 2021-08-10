import AuthorizedPage from "@/components/authorized-page";
import DashboardLayout from "@/components/dashboard-layout";
import Head from "next/head";


export default function LogsPage() {
  return AuthorizedPage(() => {

    return (
      <DashboardLayout>
        <Head><title>Logs</title></Head>

      </DashboardLayout>
    );
  })
}
