import AddressEditModal, { AddressEditContext } from "@/components/address-edit-modal";
import AuthenticatedPage from "@/layouts/authenticated-page";
import ConfirmModal, { ConfirmModalContext } from "@/components/confirm-modal";
import DashboardLayout from "@/layouts/dashboard-layout";
import AddressDescription from "@/components/descriptions/address-description";
import GoogleGeocodingScript from "@/components/google-geocoding-script";
import { Loading } from "@/components/loader";
import { isNoneOrEmpty } from "@/lib/helper";
import Head from "next/head";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import { useAddressTemplateMutation } from "@/context/address-template-mutation";

export { getServerSideProps } from '@/lib/middleware';


export default function AddressPage(pageProps: any) {
  const Component: React.FC<any> = () => {
    const router = useRouter();
    const { setLoading } = useContext(Loading);
    const { editAddress } = useContext(AddressEditContext);
    const { deleteAddressTemplate } = useAddressTemplateMutation();
    const { loading, templates, next, previous, called, load, loadMore, refetch } = useContext(AddressTemplates);
    const [initialized, setInitialized] = React.useState(false);

    const update = async (_?: React.MouseEvent) => refetch && await refetch();
    const remove = (id: string) => async () => {
      await deleteAddressTemplate.mutateAsync({ id });
      update();
    };

    useEffect(() => { setLoading(query.isFetching); });
    useEffect(() => {
      if (query.isFetched && !initialized && !isNoneOrEmpty(router.query.modal)) {
        const templates = query.data?.address_templates?.edges || [];
        const addressTemplate = templates
          .find(c => c.node.id === router.query.modal)?.node as AddressTemplateType | undefined;
        if (addressTemplate || router.query.modal === 'new') {
          editAddress({ addressTemplate });
        }
        setInitialized(true);
      }
    }, [router.query.modal, query.isFetched]);

    return (
      <>
        <header className="px-0 py-4">
          <span className="title is-4">Addresses</span>
          <button className="button is-primary is-small is-pulled-right" onClick={() => editAddress()}>
            <span>Create address</span>
          </button>
        </header>

        {((query?.data?.address_templates?.edges || []).length > 0) &&
          <div className="table-container">
            <table className="table is-fullwidth">

              <tbody className="templates-table">
                <tr>
                  <td className="is-size-7" colSpan={2}>ADDRESS TEMPLATES</td>
                  <td className="action"></td>
                </tr>

                {query!.data!.address_templates!.edges.map(({ node: template }) => (

                  <tr key={`${template.id}-${Date.now()}`}>
                    <td className="template">
                      <p className="is-subtitle is-size-6 my-1 has-text-weight-semibold">{template.label}</p>
                      <AddressDescription address={template.address as AddressType} />
                    </td>
                    <td className="default is-vcentered">
                      {template.is_default && <span className="is-size-7 has-text-weight-semibold">
                        <span className="icon has-text-success"><i className="fas fa-check"></i></span> Default shipper address
                      </span>}
                    </td>
                    <td className="action is-vcentered pr-0">
                      <div className="buttons is-justify-content-end">
                        <button className="button is-white" onClick={() => editAddress({
                          addressTemplate: template as AddressTemplateType,
                        })}>
                          <span className="icon is-small">
                            <i className="fas fa-pen"></i>
                          </span>
                        </button>
                        <button className="button is-white" onClick={() => confirmDeletion({
                          label: "Delete Address template",
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
              <span className="is-size-7 has-text-weight-semibold">{query!.data!.address_templates!.edges.length} results</span>

              <div className="buttons has-addons is-centered is-pulled-right">
                <button className="button is-small"
                  onClick={() => setFilter({ ...filter, offset: (filter?.offset || 0 - 20) })}
                  disabled={query.data?.address_templates?.page_info?.has_previous_page !== true}>
                  <span>Previous</span>
                </button>
                <button className="button is-small"
                  onClick={() => setFilter({ ...filter, offset: (filter?.offset || 0 + 20) })}
                  disabled={query.data?.address_templates?.page_info?.has_next_page !== true}>
                  <span>Next</span>
                </button>
              </div>
            </footer>

          </div>}

        {(query.isFetched && (query?.data?.address_templates?.edges || []).length == 0) &&
          <div className="card my-6">

            <div className="card-content has-text-centered">
              <p>No address has been added yet.</p>
              <p>Use the <strong>New Address</strong> button above to add</p>
            </div>

          </div>}

      </>
    );
  };

  return AuthenticatedPage((
    <DashboardLayout>
      <GoogleGeocodingScript />
      <Head><title>Address Templates - {(pageProps as any).metadata?.APP_NAME}</title></Head>
      <AddressTemplatesProvider>
        <ConfirmModal>
          <AddressEditModal>

            <Component />

          </AddressEditModal>
        </ConfirmModal>
      </AddressTemplatesProvider>
    </DashboardLayout>
  ), pageProps);
}
