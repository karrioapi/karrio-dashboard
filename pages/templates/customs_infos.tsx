import AuthorizedPage from "@/components/authorized-page";
import DashboardLayout from "@/components/dashboard-layout";
import Head from "next/head";


export default function CustomsInfosPage() {
  return AuthorizedPage(() => {

    return (
      <DashboardLayout>
        <Head><title>Csutsoms Info Templates</title></Head>

      </DashboardLayout>
    );
  })
}
