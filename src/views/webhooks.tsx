import { Webhook } from "karrio/rest";
import AuthenticatedPage from "@/layouts/authenticated-page";
import ConfirmModal, { ConfirmModalContext } from "@/components/confirm-modal";
import DashboardLayout from "@/layouts/dashboard-layout";
import { Loading } from "@/components/loader";
import { Notify } from "@/components/notifier";
import WebhookEditModal, { WebhookEditContext } from "@/components/webhook-edit-modal";
import WebhookTestModal from "@/components/webhook-test-modal";
import WebhookMutation from "@/context/webhook-mutation";
import WebhooksProvider, { Webhooks } from "@/context/webhooks-provider";
import { NotificationType } from "@/lib/types";
import Head from "next/head";
import { useContext, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import { formatDateTime, isNoneOrEmpty } from "@/lib/helper";
import React from "react";

export { getServerSideProps } from "@/lib/middleware";


export default function WebhooksPage(pageProps: any) {
  const Component: React.FC<any> = ({ removeWebhook, updateWebhook }) => {
    const router = useRouter();
    const { notify } = useContext(Notify)
    const { setLoading } = useContext(Loading);
    const { loading, results = [], called, load, refetch } = useContext(Webhooks);
    const { editWebhook } = useContext(WebhookEditContext);
    const { confirm: confirmDeletion } = useContext(ConfirmModalContext);
    const [initialized, setInitialized] = React.useState(false);

    const update = async () => refetch && await refetch();
    const remove = (id: string) => async () => {
      await removeWebhook(id);
      update();
    };
    const toggle = ({ disabled, id }: Webhook) => async () => {
      try {
        const data = { id, disabled: !disabled };
        await updateWebhook({ ...data });
        notify({
          type: NotificationType.success,
          message: `webhook ${disabled ? 'activated' : 'deactivated'}!`
        });
        update();
      } catch (message: any) {
        notify({ type: NotificationType.error, message });
      }
    };

    useEffect(() => { !loading && load(); }, []);
    useEffect(() => { setLoading(loading); });
    useEffect(() => {
      if (called && !initialized && !isNoneOrEmpty(router.query.modal)) {
        const webhook = results.find(c => c.id === router.query.modal);
        webhook && editWebhook({ webhook, onConfirm: update });
        setInitialized(true);
      }
    }, [router.query.modal, called]);

    return (
      <>
        <header className="px-0 py-4">
          <span className="title is-4">Endpoints</span>
          <button className="button is-default is-pulled-right" onClick={() => editWebhook({ onConfirm: update })}>
            <span className="icon"><i className="fas fa-plus"></i></span>
            <span>Add endpoint</span>
          </button>
        </header>

        {(results.length > 0) && <div className="table-container">
          <table className="webhooks-table table is-fullwidth">

            <tbody>
              <tr>
                <td className="url is-size-7">URL</td>
                <td className="mode is-size-7">MODE</td>
                <td className="last_event is-size-7">LAST EVENT</td>
                <td className="action"></td>
              </tr>

              {results.map(webhook => (
                <tr key={webhook.id}>
                  <td className="url is-vcentered is-clickable" onClick={() => editWebhook({ webhook, onConfirm: update })}>
                    <span className="is-subtitle is-size-7 has-text-weight-semibold has-text-grey">{webhook.url}</span>
                  </td>
                  <td className="mode is-vcentered is-centered is-clickable p-1" onClick={() => editWebhook({ webhook, onConfirm: update })}>
                    <span className={`tag ${webhook.test_mode ? 'is-warning' : 'is-success'} is-centered`}>
                      {webhook.test_mode ? 'test' : 'live'}
                    </span>
                  </td>
                  <td className="last-event is-vcentered is-clickable" onClick={() => editWebhook({ webhook, onConfirm: update })}>
                    <span className="is-subtitle is-size-7 has-text-weight-semibold has-text-grey">
                      {webhook.last_event_at ? formatDateTime(webhook.last_event_at as any) : "No recent event"}
                    </span>
                  </td>
                  <td className="action is-flex is-justify-content-end px-0">
                    <button className="button is-white" onClick={toggle(webhook)}>
                      <span className={`icon is-medium ${webhook.disabled ? 'has-text-grey' : 'has-text-success'}`}>
                        <i className={`fas fa-${webhook.disabled ? 'toggle-off' : 'toggle-on'} fa-lg`}></i>
                      </span>
                    </button>
                    <WebhookTestModal className="button is-white" webhook={webhook}>
                      <span className="icon is-small">
                        <i className="fas fa-flask"></i>
                      </span>
                    </WebhookTestModal>
                    <button className="button is-white" onClick={() => confirmDeletion({
                      label: "Delete Webhook endpoint",
                      identifier: webhook.id as string,
                      onConfirm: remove(webhook.id as string),
                    })}>
                      <span className="icon is-small">
                        <i className="fas fa-trash"></i>
                      </span>
                    </button>
                  </td>
                </tr>
              ))}

            </tbody>

          </table>
        </div>}

        {(!loading && results.length == 0) && <div className="card my-6">

          <div className="card-content has-text-centered">
            <p>No webhooks added yet.</p>
            <p>Use the <strong>Add Enpoint</strong> button above to add</p>
          </div>

        </div>}

      </>
    );
  };

  const Wrapped = WebhookMutation<{}>(({ removeWebhook, updateWebhook }) => (
    <DashboardLayout showModeIndicator={true}>
      <Head><title>Webhooks - {(pageProps as any).metadata?.APP_NAME}</title></Head>

      <WebhooksProvider>
        <WebhookEditModal>
          <ConfirmModal>
            <Component removeWebhook={removeWebhook} updateWebhook={updateWebhook} />
          </ConfirmModal>
        </WebhookEditModal>
      </WebhooksProvider>

    </DashboardLayout>
  ));


  return AuthenticatedPage(<Wrapped />, pageProps)
}
