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
import React, { ChangeEvent, useContext, useEffect } from "react";
import OrdersFilter from "@/components/filters/orders-filter";
import { AddressType } from "@/lib/types";
import OrderPreview, { OrderPreviewContext } from "@/components/descriptions/order-preview";
import AppLink from "@/components/app-link";

export { getServerSideProps } from "@/lib/middleware";


export default function OrdersPage(pageProps: any) {
  const Component: React.FC = () => {
    const router = useRouter();
    const { setLoading } = useContext(Loading);
    const { previewOrder } = useContext(OrderPreviewContext);
    const { loading, called, orders, next, previous, variables, load, loadMore } = useContext(OrdersContext);
    const [filters, setFilters] = React.useState<typeof variables>(variables);
    const [initialized, setInitialized] = React.useState(false);
    const [selection, setSelection] = React.useState<string[]>([]);
    const [allChecked, setAllChecked] = React.useState(false);

    const updatedSelection = (selectedOrders: string[], current: typeof orders) => {
      const order_ids = current.map(order => order.order_id);
      const selection = selectedOrders.filter(order_id => order_ids.includes(order_id));
      const selected = selection.length > 0 && selection.length === (current || []).length;
      setAllChecked(selected);
      if (selectedOrders.filter(order_id => !order_ids.includes(order_id)).length > 0) {
        setSelection(selection);
      }
    };
    const fetchOrders = (extra: Partial<typeof variables> = {}) => {
      const query = {
        ...filters,
        ...getURLSearchParams(),
        ...extra
      };

      setFilters(query);
      (!loading) && (called ? loadMore : load)(query);
    };
    const preventPropagation = (e: React.MouseEvent) => e.stopPropagation();
    const handleSelection = (e: ChangeEvent) => {
      const { checked, name } = e.target as HTMLInputElement;
      if (name === "all") {
        setSelection(checked ? (orders || []).map(({ order_id }) => order_id) : []);
      } else {
        setSelection(checked ? [...selection, name] : selection.filter(order_id => order_id !== name));
      }
    };

    useEffect(() => { window.setTimeout(() => setLoading(loading), 1000); });
    useEffect(() => { fetchOrders(); }, [router.query]);
    useEffect(() => { setFilters({ ...variables }); }, [variables]);
    useEffect(() => { updatedSelection(selection, orders || []); }, [selection, orders]);
    useEffect(() => {
      if (called && !initialized && !isNoneOrEmpty(router.query.modal)) {
        previewOrder(router.query.modal as string);
        setInitialized(true);
      }
    }, [router.query.modal, called]);

    return (
      <>
        <ModeIndicator />

        <header className="px-0 py-4 is-flex is-justify-content-space-between">
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
            <li className={`is-capitalized has-text-weight-semibold ${filters?.status?.includes('unfulfilled') && filters?.status?.length === 2 ? 'is-active' : ''}`}>
              <a onClick={() => !filters?.status?.includes('unfulfilled') && fetchOrders({ status: ['unfulfilled', 'partial'], offset: 0 })}>unfulfilled</a>
            </li>
            <li className={`is-capitalized has-text-weight-semibold ${filters?.status?.includes('fulfilled') && filters?.status?.length === 2 ? 'is-active' : ''}`}>
              <a onClick={() => !filters?.status?.includes('fulfilled') && fetchOrders({ status: ['fulfilled', 'delivered'], offset: 0 })}>fulfilled</a>
            </li>
            <li className={`is-capitalized has-text-weight-semibold ${filters?.status?.includes('cancelled') && filters?.status?.length === 1 ? 'is-active' : ''}`}>
              <a onClick={() => !filters?.status?.includes('cancelled') && fetchOrders({ status: ['cancelled'], offset: 0 })}>cancelled</a>
            </li>
          </ul>
        </div>

        {loading && <Spinner />}

        {(!loading && orders?.length > 0) && <div className="table-container">
          <table className="orders-table table is-fullwidth">
            <tbody>

              <tr>
                <td className="selector has-text-centered p-0" onClick={preventPropagation}>
                  <label className="checkbox p-2">
                    <input
                      name="all"
                      type="checkbox"
                      onChange={handleSelection}
                      checked={allChecked}
                    />
                  </label>
                </td>

                {selection.length > 0 && <td className="p-1" colSpan={5}>
                  <AppLink className="button is-small is-default px-3" href={`/orders/fulfillment?shipment_id=new&order_id=${selection.join(',')}`}>
                    <span className="has-text-weight-semibold">
                      Fulfill order{selection.length > 1 ? `s (${selection.length})` : ""}
                    </span>
                  </AppLink>
                </td>}

                {selection.length === 0 && <>
                  <td className="order is-size-7">#ID</td>
                  <td className="source"></td>
                  <td className="status"></td>
                  <td className="customer is-size-7">CUSTOMER</td>
                  <td className="date has-text-right is-size-7">DATE</td>
                </>}
              </tr>

              {orders?.map(order => (
                <tr key={order.id} className="items is-clickable" onClick={() => previewOrder(order.id)}>
                  <td className="selector has-text-centered is-vcentered p-0" onClick={preventPropagation}>
                    <label className="checkbox p-2">
                      <input
                        type="checkbox"
                        name={order.order_id}
                        onChange={handleSelection}
                        checked={selection.includes(order.order_id)}
                      />
                    </label>
                  </td>
                  <td className="order is-vcentered">
                    <p className="is-size-7 has-text-weight-bold has-text-grey">
                      {order.order_id}
                    </p>
                  </td>
                  <td className="source is-vcentered">
                    <p className="is-size-7 has-text-weight-bold has-text-grey">
                      {order.source}
                    </p>
                  </td>
                  <td className="status is-vcentered">
                    <StatusBadge status={order.status as string} style={{ width: '100%' }} />
                  </td>
                  <td className="customer is-vcentered">
                    <p className="is-size-7 has-text-weight-bold has-text-grey">
                      {formatAddress(order.shipping_to as AddressType)}
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

        {(called && !loading && (orders || []).length == 0) && <div className="card my-6">

          <div className="card-content has-text-centered">
            <p>No order found.</p>
          </div>

        </div>}

      </>
    );
  };

  return AuthenticatedPage((
    <DashboardLayout>
      <Head><title>Orders - {(pageProps as any).metadata?.APP_NAME}</title></Head>
      <OrdersProvider>
        <OrderPreview>

          <Component />

        </OrderPreview>
      </OrdersProvider>
    </DashboardLayout>
  ), pageProps)
};
