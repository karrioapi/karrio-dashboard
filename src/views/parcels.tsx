import AuthenticatedPage from "@/layouts/authenticated-page";
import ConfirmModal, { ConfirmModalContext } from "@/components/confirm-modal";
import DashboardLayout from "@/layouts/dashboard-layout";
import ParcelDescription from "@/components/descriptions/parcel-description";
import { Loading } from "@/components/loader";
import ParcelEditModal, { ParcelEditContext } from "@/components/parcel-edit-modal";
import ParcelTemplatesProvider, { ParcelTemplates } from "@/context/parcel-templates-provider";
import { isNone, isNoneOrEmpty } from "@/lib/helper";
import Head from "next/head";
import { useContext, useEffect } from "react";
import ParcelMutationProvider, { ParcelMutationContext } from "@/context/parcel-template-mutation";
import { useRouter } from "next/dist/client/router";
import React from "react";

export { getServerSideProps } from "@/lib/middleware";


export default function ParcelsPage(pageProps: any) {
  const Component: React.FC<any> = () => {
    const router = useRouter();
    const { setLoading } = useContext(Loading);
    const { editParcel } = useContext(ParcelEditContext);
    const { confirmDeletion } = useContext(ConfirmModalContext);
    const { deleteTemplate } = useContext(ParcelMutationContext);
    const { loading, templates, previous, next, called, load, loadMore, refetch } = useContext(ParcelTemplates);
    const [initialized, setInitialized] = React.useState(false);

    const update = async () => refetch && await refetch();
    const remove = (id: string) => async () => {
      await deleteTemplate(id);
      update();
    };

    useEffect(() => { !loading && load() }, []);
    useEffect(() => { setLoading(loading); });
    useEffect(() => {
      if (called && !initialized && !isNoneOrEmpty(router.query.modal)) {
        const parcelTemplate = templates.find(c => c.id === router.query.modal);
        if (parcelTemplate || router.query.modal === 'new') {
          editParcel({ parcelTemplate, onConfirm: update });
        }
        setInitialized(true);
      }
      called && setInitialized(true);
    }, [router.query.modal, called]);

    return (
      <>

        <header className="px-0 py-4">
          <span className="title is-4">Parcels</span>
          <button className="button is-primary is-small is-pulled-right" onClick={() => editParcel({ onConfirm: update })}>
            <span>Create parcel</span>
          </button>
        </header>

        {(templates?.length > 0) && <div className="table-container">
          <table className="table is-fullwidth">

            <tbody className="templates-table">
              <tr>
                <td className="is-size-7" colSpan={2}>PARCEL TEMPLATES</td>
                <td className="action"></td>
              </tr>

              {templates.map((template) => (

                <tr key={`${template.id}-${Date.now()}`}>
                  <td className="template">
                    <p className="is-subtitle is-size-6 my-1 has-text-weight-semibold">{template.label}</p>
                    <ParcelDescription parcel={template.parcel} />
                  </td>
                  <td className="default is-vcentered">
                    {template.is_default && <span className="is-size-7 has-text-weight-semibold">
                      <span className="icon has-text-success"><i className="fas fa-check"></i></span> Default shipping parcel
                    </span>}
                  </td>
                  <td className="action is-vcentered pr-0">
                    <div className="buttons is-justify-content-end">
                      <button className="button is-white" onClick={() => editParcel({
                        parcelTemplate: template,
                        onConfirm: update,
                      })}>
                        <span className="icon is-small">
                          <i className="fas fa-pen"></i>
                        </span>
                      </button>
                      <button className="button is-white" onClick={() => confirmDeletion({
                        label: "Parcel template",
                        identifier: template.id,
                        onConfirm: remove(template.id),
                      })}>
                        <span className="icon is-small">
                          <i className="fas fa-trash"></i>
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>

              ))}
            </tbody>

          </table>

          <footer className="px-2 py-2 is-vcentered">
            <span className="is-size-7 has-text-weight-semibold">{templates.length} results</span>

            <div className="buttons has-addons is-centered is-pulled-right">
              <button className="button is-small" onClick={() => loadMore(previous)} disabled={isNone(previous)}>
                <span>Previous</span>
              </button>
              <button className="button is-small" onClick={() => loadMore(next)} disabled={isNone(next)}>
                <span>Next</span>
              </button>
            </div>
          </footer>

        </div>}

        {(!loading && templates?.length == 0) && <div className="card my-6">

          <div className="card-content has-text-centered">
            <p>No parcel has been added yet.</p>
            <p>Use the <strong>New Parcel</strong> button above to add</p>
          </div>

        </div>}

      </>
    );
  };

  return AuthenticatedPage((
    <DashboardLayout>
      <Head><title>Parcel Templates - {(pageProps as any).metadata?.APP_NAME}</title></Head>
      <ParcelMutationProvider>
        <ParcelTemplatesProvider>
          <ConfirmModal>
            <ParcelEditModal>

              <Component />

            </ParcelEditModal>
          </ConfirmModal>
        </ParcelTemplatesProvider>
      </ParcelMutationProvider>
    </DashboardLayout>
  ), pageProps);
}
