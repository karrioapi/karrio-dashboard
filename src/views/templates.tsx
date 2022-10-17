import AuthenticatedPage from "@/layouts/authenticated-page";
import ConfirmModal, { ConfirmModalContext } from "@/components/confirm-modal";
import DashboardLayout from "@/layouts/dashboard-layout";
import TemplateDescription from "@/components/descriptions/template-description";
import DocumentTemplatesProvider, { DocumentTemplates } from "@/context/document-templates-provider";
import { isNone } from "@/lib/helper";
import Head from "next/head";
import { useContext } from "react";
import React from "react";
import DocumentTemplateMutationProvider, { useDocumentTemplateMutation } from "@/context/document-template-mutation";
import AppLink from "@/components/app-link";

export { getServerSideProps } from "@/lib/middleware";


export default function TemplatesPage(pageProps: any) {
  const Component: React.FC<any> = () => {
    const { confirm: confirmDeletion } = useContext(ConfirmModalContext);
    const { deleteTemplate } = useDocumentTemplateMutation();
    const { loading, templates, previous, next, loadMore, refetch } = useContext(DocumentTemplates);

    const update = async () => refetch && await refetch();
    const remove = (id: string) => async () => {
      await deleteTemplate(id);
      update();
    };

    return (
      <>

        <header className="px-0 py-4">
          <span className="title is-4">Templates</span>
          <AppLink className="button is-primary is-small is-pulled-right" href="/settings/template?id=new">
            <span>Create template</span>
          </AppLink>
        </header>

        {(templates?.length > 0) && <div className="table-container">
          <table className="table is-fullwidth">

            <tbody className="templates-table">
              <tr>
                <td className="is-size-7">DOCUMENT TEMPLATES</td>
                <td className="action"></td>
              </tr>

              {templates.map((template) => (

                <tr key={`${template.id}-${Date.now()}`}>
                  <td className="template">
                    <TemplateDescription template={template} />
                  </td>
                  <td className="action is-vcentered pr-0">
                    <div className="buttons is-justify-content-end">
                      <AppLink className="button is-white" href={`/settings/template?id=${template.id}`}>
                        <span className="icon is-small">
                          <i className="fas fa-pen"></i>
                        </span>
                      </AppLink>
                      <button className="button is-white" onClick={() => confirmDeletion({
                        label: "Delete Document template",
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
            <p>No template has been added yet.</p>
            <p>Use the <strong>Create Template</strong> button above to add</p>
          </div>

        </div>}

      </>
    );
  };

  return AuthenticatedPage((
    <DashboardLayout>
      <Head><title>Document Templates - {(pageProps as any).metadata?.APP_NAME}</title></Head>
      <DocumentTemplateMutationProvider>
        <DocumentTemplatesProvider>
          <ConfirmModal>

            <Component />

          </ConfirmModal>
        </DocumentTemplatesProvider>
      </DocumentTemplateMutationProvider>
    </DashboardLayout>
  ), pageProps);
}
