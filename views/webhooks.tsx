import AuthorizedPage from "@/components/authorized-page";
import DashboardLayout from "@/components/dashboard-layout";
import Head from "next/head";


export default function WebhooksPage() {
  return AuthorizedPage(() => {

    return (
      <DashboardLayout>
        <Head><title>Webhooks</title></Head>

      </DashboardLayout>
    );
  })
}
