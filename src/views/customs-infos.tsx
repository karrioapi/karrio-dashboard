import CustomInfoTemplatesProvider, { CustomInfoTemplates } from "@/context/customs-templates-provider";
import CustomsInfoEditModal, { CustomsInfoEditContext } from "@/components/customs-info-edit-modal";
import CustomsInfoDescription from "@/components/descriptions/customs-info-description";
import ConfirmModal, { ConfirmModalContext } from "@/components/confirm-modal";
import AuthenticatedPage from "@/layouts/authenticated-page";
import DashboardLayout from "@/layouts/dashboard-layout";
import { isNone, isNoneOrEmpty } from "@/lib/helper";
import { useRouter } from "next/dist/client/router";
import { Loading } from "@/components/loader";
import { useContext, useEffect } from "react";
import { CustomsType } from "@/lib/types";
import Head from "next/head";
import React from "react";
import { useCustomsTemplateMutation } from "@/context/data/customs";

export { getServerSideProps } from "@/lib/middleware";


export default function CustomsInfoPage(pageProps: any) {
  const Component: React.FC<any> = () => {
    const router = useRouter();
    const { setLoading } = useContext(Loading);
    const { confirm: confirmDeletion } = useContext(ConfirmModalContext);
    const { editCustomsInfo } = useContext(CustomsInfoEditContext);
    const mutation = useCustomsTemplateMutation();
    const { loading, templates, next, previous, called, load, loadMore, refetch } = useContext(CustomInfoTemplates);
    const [initialized, setInitialized] = React.useState(false);

    const update = async () => refetch && await refetch();
    const remove = (id: string) => async () => {
      await mutation.deleteCustomsTemplate.mutateAsync({ id });
      update();
    };

    useEffect(() => { !loading && load() }, []);
    useEffect(() => { setLoading(loading); });
    useEffect(() => {
      if (called && !initialized && !isNoneOrEmpty(router.query.modal)) {
        const customsTemplate = templates.find(c => c.id === router.query.modal);
        if (customsTemplate || router.query.modal === 'new') {
          editCustomsInfo({ customsTemplate, onConfirm: update });
        }
        setInitialized(true);
      }
    }, [router.query.modal, called]);

    return (
      <>

        <header className="px-0 py-4">
          <span className="title is-4">Customs</span>
          <button className="button is-primary is-small is-pulled-right" onClick={() => editCustomsInfo({ onConfirm: update })}>
            <span>Create customs info</span>
          </button>
        </header>

        {(templates.length > 0) && <div className="table-container">
          <table className="table is-fullwidth">

            <tbody className="templates-table">
              <tr>
                <td className="is-size-7" colSpan={2}>CUSTOMS INFO TEMPLATES</td>
                <td className="action"></td>
              </tr>

              {templates.map((template) => (

                <tr key={`${template.id}-${Date.now()}`}>
                  <td className="template">
                    <p className="is-subtitle is-size-6 my-1 has-text-weight-semibold">{template.label}</p>
                    <CustomsInfoDescription customs={template.customs as CustomsType} />
                  </td>
                  <td className="default is-vcentered">
                    {template.is_default && <span className="is-size-7 has-text-weight-semibold">
                      <span className="icon has-text-success"><i className="fas fa-check"></i></span> Default customs
                    </span>}
                  </td>
                  <td className="action is-vcentered pr-0">
                    <div className="buttons is-justify-content-end">
                      <button className="button is-white" onClick={() => editCustomsInfo({
                        customsTemplate: template,
                        onConfirm: update,
                      })}>
                        <span className="icon is-small">
                          <i className="fas fa-pen"></i>
                        </span>
                      </button>
                      <button className="button is-white" onClick={() => confirmDeletion({
                        label: "Delete Customs info template",
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

        {(!loading && templates.length == 0) && <div className="card my-6">

          <div className="card-content has-text-centered">
            <p>No customs info template has been added yet.</p>
            <p>Use the <strong>New Customs Info</strong> button above to add</p>
          </div>

        </div>}

      </>
    );
  };

  return AuthenticatedPage((
    <DashboardLayout>
      <Head><title>Customs Templates - {(pageProps as any).metadata?.APP_NAME}</title></Head>
      <CustomInfoTemplatesProvider>
        <ConfirmModal>
          <CustomsInfoEditModal>

            <Component />

          </CustomsInfoEditModal>
        </ConfirmModal>
      </CustomInfoTemplatesProvider>
    </DashboardLayout>
  ), pageProps);
}
