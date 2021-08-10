import AuthorizedPage from "@/components/authorized-page";
import DashboardLayout from "@/components/dashboard-layout";
import Head from "next/head";


export default function ParcelsPage() {
  return AuthorizedPage(() => {

    return (
      <DashboardLayout>
        <Head><title>Parcel Templates</title></Head>

      </DashboardLayout>
    );
  })
}
