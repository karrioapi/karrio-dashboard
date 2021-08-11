import AuthorizedPage from "@/components/authorized-page";
import DashboardLayout from "@/components/dashboard-layout";
import Head from "next/head";


export default function AccountPage() {
  return AuthorizedPage(() => {

    return (
      <DashboardLayout>
        <Head><title>Account Settings</title></Head>

      </DashboardLayout>
    );
  })
}
