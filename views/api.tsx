import AuthorizedPage from "@/components/authorized-page";
import DashboardLayout from "@/components/dashboard-layout";
import Head from "next/head";


export default function APIPage() {
  return AuthorizedPage(() => {

    return (
      <DashboardLayout>
        <Head><title>API Keys</title></Head>

      </DashboardLayout>
    );
  })
}
