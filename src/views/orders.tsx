import AuthenticatedPage from "@/layouts/authenticated-page";
import DashboardLayout from "@/layouts/dashboard-layout";
import { Loading } from "@/components/loader";
import ModeIndicator from "@/components/mode-indicator";
import Spinner from "@/components/spinner";
import StatusBadge from "@/components/status-badge";
import OrdersProvider from "@/context/orders-provider";
import { OrdersContext } from "@/context/orders-provider";
import { formatAddress, formatDateTime, getURLSearchParams, isNone, isNoneOrEmpty } from "@/lib/helper";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import React, { useContext, useEffect } from "react";
import OrdersFilter from "@/components/filters/orders-filter";
import { AddressType } from "@/lib/types";
import OrderPreview, { OrderPreviewContext } from "@/components/descriptions/order-preview";

export { getServerSideProps } from "@/lib/middleware";


export default function OrdersPage(pageProps: any) {
  const Component: React.FC = () => {
    const router = useRouter();
    const { setLoading } = useContext(Loading);
    const { previewOrder } = useContext(OrderPreviewContext);
    const { loading, called, orders, next, previous, variables, load, loadMore } = useContext(OrdersContext);
    const [filters, setFilters] = React.useState<typeof variables>(variables);

    const fetchOrders = (extra: Partial<typeof variables> = {}) => {
      const query = {
        ...filters,
        ...getURLSearchParams(),
        ...extra
      };

      setFilters(query);
      (!loading) && (called ? loadMore : load)(query);
    }

    useEffect(() => { window.setTimeout(() => setLoading(loading), 1000); });
    useEffect(() => { fetchOrders(); }, [router.query]);
    useEffect(() => { setFilters({ ...variables }); }, [variables]);
    useEffect(() => {
      (called && !loading && !isNoneOrEmpty(router.query.modal))
        && previewOrder(router.query.modal as string);
    }, [router.query.modal, loading]);

    return (
      <>
        <ModeIndicator />

        <header className="px-2 pt-1 pb-4 is-flex is-justify-content-space-between">
          <span className="title is-4">Orders</span>
          <div>
            <OrdersFilter />
          </div>
        </header>

        <div className="tabs">
          <ul>
            <li className={`is-capitalized has-text-weight-semibold ${isNone(filters?.status) ? 'is-active' : ''}`}>
              <a onClick={() => !isNone(filters?.status) && fetchOrders({ status: null, offset: 0 })}>all</a>
            </li>
            <li className={`is-capitalized has-text-weight-semibold ${filters?.status?.includes('created') ? 'is-active' : ''}`}>
              <a onClick={() => !filters?.status?.includes('created') && fetchOrders({ status: ['created'], offset: 0 })}>created</a>
            </li>
            <li className={`is-capitalized has-text-weight-semibold ${filters?.status?.includes('partial') ? 'is-active' : ''}`}>
              <a onClick={() => !filters?.status?.includes('partial') && fetchOrders({ status: ['partial'], offset: 0 })}>processing</a>
            </li>
            <li className={`is-capitalized has-text-weight-semibold ${filters?.status?.includes('fulfilled') ? 'is-active' : ''}`}>
              <a onClick={() => !filters?.status?.includes('fulfilled') && fetchOrders({ status: ['fulfilled', 'delivered'], offset: 0 })}>fulfilled</a>
            </li>
            <li className={`is-capitalized has-text-weight-semibold ${filters?.status?.includes('cancelled') ? 'is-active' : ''}`}>
              <a onClick={() => !filters?.status?.includes('cancelled') && fetchOrders({ status: ['cancelled'], offset: 0 })}>cancelled</a>
            </li>
          </ul>
        </div>

        {loading && <Spinner />}

        {(!loading && orders?.length > 0) && <div className="table-container">
          <table className="orders-table table is-fullwidth">
            <tbody>

              <tr>
                <td className="order is-size-7">#ID</td>
                <td className="source"></td>
                <td className="status"></td>
                <td className="customer is-size-7">CUSTOMER</td>
                <td className="date has-text-right is-size-7">DATE</td>
              </tr>

              {orders?.map(order => (
                <tr key={order.id} className="items is-clickable" onClick={() => previewOrder(order.id)}>
                  <td className="carrier is-vcentered">
                    <p className="is-size-7 has-text-weight-bold has-text-grey">
                      {order.order_id}
                    </p>
                  </td>
                  <td className="carrier is-vcentered">
                    <p className="is-size-7 has-text-weight-bold has-text-grey">
                      {order.source}
                    </p>
                  </td>
                  <td className="status is-vcentered">
                    <StatusBadge status={order.status as string} style={{ width: '100%' }} />
                  </td>
                  <td className="recipient is-vcentered">
                    <p className="is-size-7 has-text-weight-bold has-text-grey">
                      {formatAddress(order.shipping_address as AddressType)}
                    </p>
                  </td>
                  <td className="date is-vcentered has-text-right">
                    <p className="is-size-7 has-text-weight-semibold has-text-grey">
                      {formatDateTime(order.created_at)}
                    </p>
                  </td>
                </tr>
              ))}

            </tbody>

          </table>

          <footer className="px-2 py-2 is-vcentered">
            <span className="is-size-7 has-text-weight-semibold">{(orders || []).length} results</span>

            <div className="buttons has-addons is-centered is-pulled-right">
              <button className="button is-small" onClick={() => loadMore({ ...filters, offset: previous })} disabled={isNone(previous)}>Previous</button>
              <button className="button is-small" onClick={() => loadMore({ ...filters, offset: next })} disabled={isNone(next)}>Next</button>
            </div>
          </footer>

        </div>}

        {(!loading && (orders || []).length == 0) && <div className="card my-6">

          <div className="card-content has-text-centered">
            <p>No order found.</p>
          </div>

        </div>}

      </>
    );
  };

  return AuthenticatedPage((
    <DashboardLayout>
      <Head><title>Orders - {(pageProps as any).references?.app_name}</title></Head>
      <OrdersProvider>
        <OrderPreview>

          <Component />

        </OrderPreview>
      </OrdersProvider>
    </DashboardLayout>
  ), pageProps)
};
