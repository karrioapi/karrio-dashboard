import AuthorizedPage from "@/components/layouts/authorized-page";
import ConfirmModal from "@/components/confirm-modal";
import ConnectProviderModal, { ConnectProviderModalContext } from "@/components/connect-provider-modal";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import Tabs from "@/components/generic/tabs";
import { Loading } from "@/components/loader";
import ModeIndicator from "@/components/mode-indicator";
import { APIReference } from "@/context/references-provider";
import SystemConnectionsProvider, { SystemConnections } from "@/context/system-connections-provider";
import UserConnectionsProvider, { UserConnections } from "@/context/user-connections-provider";
import Head from "next/head";
import { useContext, useEffect } from "react";
import SystemConnectionList from "@/components/system-carrier-list";
import UserConnectionList from "@/components/user-carrier-list";
import { withSessionCookies } from "@/lib/middleware";


export default withSessionCookies(function (pageProps) {
  const Component: React.FC = () => {
    const { setLoading } = useContext(Loading);
    const { app_name } = useContext(APIReference);
    const { editConnection } = useContext(ConnectProviderModalContext);
    const { refetch, ...user_connections } = useContext(UserConnections);
    const system_connections = useContext(SystemConnections);

    const onUpdate = async () => refetch && await refetch();

    useEffect(() => {
      (!user_connections.loading) && user_connections.load();
      (!system_connections.loading) && system_connections.load();
    }, []);
    useEffect(() => { setLoading(user_connections?.loading || system_connections?.loading); });

    return (
      <>
        <ModeIndicator />

        <header className="px-2 pt-1 pb-4">
          <span className="title is-4">Carriers</span>
          <button className="button is-success is-pulled-right" onClick={() => editConnection({ onConfirm: onUpdate })}>
            <span>Connect a Carrier</span>
          </button>
        </header>

        <div className="table-container">

          <Tabs tabs={['Your Accounts', `${app_name || ''} Accounts`]} tabClass="is-capitalized has-text-weight-semibold" style={{ position: 'relative' }}>

            <UserConnectionList />

            <SystemConnectionList />

          </Tabs>

        </div>

      </>
    );
  };

  return AuthorizedPage(() => (
    <DashboardLayout>
      <Head><title>Carrier Connections</title></Head>
      <ConfirmModal>
        <ConnectProviderModal>
          <SystemConnectionsProvider>
            <UserConnectionsProvider>

              <Component />

            </UserConnectionsProvider>
          </SystemConnectionsProvider>
        </ConnectProviderModal>
      </ConfirmModal>
    </DashboardLayout>
  ), pageProps);
})
