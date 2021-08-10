import AuthorizedPage from "@/components/authorized-page";
import DashboardLayout from "@/components/dashboard-layout";
import Head from "next/head";


export default function AddressesPage() {
  return AuthorizedPage(() => {

    return (
      <DashboardLayout>
        <Head><title>Address Templates</title></Head>

      </DashboardLayout>
    );
  })
}
