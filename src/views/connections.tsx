import AuthenticatedPage from "@/layouts/authenticated-page";
import ConfirmModal from "@/components/confirm-modal";
import ConnectProviderModal, { ConnectProviderModalContext } from "@/components/connect-provider-modal";
import DashboardLayout from "@/layouts/dashboard-layout";
import Tabs, { TabStateContext, TabStateProvider } from "@/components/generic/tabs";
import { Loading } from "@/components/loader";
import ModeIndicator from "@/components/mode-indicator";
import { APIReference } from "@/context/references-provider";
import SystemConnectionsProvider, { SystemConnections } from "@/context/system-connections-provider";
import UserConnectionsProvider, { UserConnections } from "@/context/user-connections-provider";
import Head from "next/head";
import { useContext, useEffect } from "react";
import SystemConnectionList from "@/components/system-carrier-list";
import UserConnectionList from "@/components/user-carrier-list";
import ConnectionMutationProvider, { ConnectionMutationContext } from "@/context/connection-mutation";
import { useRouter } from "next/dist/client/router";
import { getURLSearchParams, insertUrlParam, isNoneOrEmpty } from "@/lib/helper";

export { getServerSideProps } from "@/lib/middleware";


export default function ConnectionsPage(pageProps: any) {
  const tabs = ['Your Accounts', `${(pageProps as any).references?.app_name || ''} Accounts`];

  const Component: React.FC = () => {
    const router = useRouter();
    const { modal, tab } = router.query;
    const { setLoading } = useContext(Loading);
    const { selectTab } = useContext(TabStateContext);
    const { editConnection } = useContext(ConnectProviderModalContext);
    const { refetch, ...user_connections } = useContext(UserConnections);
    const system_connections = useContext(SystemConnections);

    const onChange = async () => refetch && await refetch();
    const onTabSwitch = (tab: string) => {
      insertUrlParam({ ...getURLSearchParams(), tab });
    };

    useEffect(() => {
      (!user_connections.loading && user_connections.load) && user_connections.load();
      (!system_connections.loading && system_connections.load) && system_connections.load();
    }, []);
    useEffect(() => { setLoading(user_connections?.loading || system_connections?.loading); });
    useEffect(() => { selectTab(isNoneOrEmpty(tab) ? tabs[0] : tab as string) }, [router.query]);
    useEffect(() => {
      if (!isNoneOrEmpty(modal)) {
        editConnection({
          onConfirm: async () => {
            await onChange();
            selectTab(tabs[0]);
          }
        });
      }
    }, [modal])

    return (
      <>
        <ModeIndicator />

        <header className="px-2 pt-1 pb-4">
          <span className="title is-4">Carriers</span>
          <button className="button is-success is-pulled-right" onClick={() => editConnection({ onConfirm: onChange })}>
            <span>Connect a Carrier</span>
          </button>
        </header>

        <div className="table-container">

          <Tabs tabClass="is-capitalized has-text-weight-semibold" onSwitch={onTabSwitch} style={{ position: 'relative' }}>

            <UserConnectionList />

            <SystemConnectionList />

          </Tabs>

        </div>

      </>
    );
  };

  return AuthenticatedPage((
    <DashboardLayout>
      <Head><title>Carrier Connections - {(pageProps as any).references?.app_name}</title></Head>
      <ConfirmModal>
        <ConnectionMutationProvider>
          <ConnectProviderModal>
            <SystemConnectionsProvider>
              <UserConnectionsProvider>

                <TabStateProvider tabs={tabs}>
                  <Component />
                </TabStateProvider>

              </UserConnectionsProvider>
            </SystemConnectionsProvider>
          </ConnectProviderModal>
        </ConnectionMutationProvider>
      </ConfirmModal>
    </DashboardLayout>
  ), pageProps);
}
