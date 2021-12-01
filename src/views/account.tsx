import AuthorizedPage from "@/layouts/authorized-page";
import CloseAccountAction from "@/components/close-account-action";
import DashboardLayout from "@/layouts/dashboard-layout";
import Tabs from "@/components/generic/tabs";
import Head from "next/head";
import { useContext } from "react";
import ProfileUpdateInput from "@/components/profile-update-input";
import OrganizationManagement from "@/components/organization-management";
import { APIReference } from "@/context/references-provider";
import PasswordManagement from "@/components/password-management";

export { getServerSideProps } from "@/lib/middleware";


export default function AccountPage(pageProps: any) {
  const Component: React.FC = () => {
    const { multi_organizations, app_name } = useContext(APIReference);

    return (
      <>
        <header className="px-2 pt-1 pb-4">
          <span className="title is-4">Account Settings</span>
        </header>

        <Tabs tabs={['Profile', 'Account']}>
          <div>
            <div className="columns py-6">
              <div className="column is-5 pr-6">
                <p className="subtitle is-6 py-1">Profile</p>
                <p className="is-size-7 pr-6">Your email address is your identity on {app_name} and is used to log in.</p>
              </div>

              <div className="column is-7">
                <ProfileUpdateInput label="Email Address" propertyKey="email" inputType="email" />
                <ProfileUpdateInput label="Name (Optional)" propertyKey="full_name" inputType="text" />
              </div>
            </div>

            <hr style={{ height: '1px' }} />

            <div className="columns py-6">
              <div className="column is-5 pr-6">
                <p className="subtitle is-6 py-1">Password</p>
                <p className="is-size-7 pr-6">You can change your password.</p>
              </div>

              <PasswordManagement />
            </div>
          </div>

          <div>
            {multi_organizations && <>

              <OrganizationManagement />

              <hr style={{ height: '1px' }} />

            </>}

            <div className="columns py-6">
              <div className="column is-5">
                <p className="subtitle is-6 py-1">Close Account</p>
                <p className="is-size-7">
                  <strong>Warning:</strong> You will lose access to your Purplship services
                </p>
              </div>

              <div className="column is-5">
                <CloseAccountAction>
                  <span>Close this account...</span>
                </CloseAccountAction>
              </div>
            </div>
          </div>
        </Tabs>
      </>
    );
  };

  return AuthorizedPage((
    <DashboardLayout>
      <Head><title>Account Settings - {(pageProps as any).references?.app_name}</title></Head>

      <Component />

    </DashboardLayout>
  ), pageProps)
}
