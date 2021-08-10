import AuthorizedPage from "@/components/authorized-page";
import DashboardLayout from "@/components/dashboard-layout";
import Head from "next/head";


export default function TrackersPage() {
  return AuthorizedPage(() => {

    return (
      <DashboardLayout>
        <Head><title>Trackers</title></Head>

      </DashboardLayout>
    );
  })
}
