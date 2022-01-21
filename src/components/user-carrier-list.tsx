import React, { useContext, useEffect, useState } from 'react';
import { ConnectProviderModalContext } from '@/components/connect-provider-modal';
import CarrierBadge from '@/components/carrier-badge';
import { UserConnections, UserConnectionType } from '@/context/user-connections-provider';
import { ConnectionMutationContext } from '@/context/connection-mutation';
import { Loading } from '@/components/loader';
import { Notify } from '@/components/notifier';
import { NotificationType } from '@/lib/types';
import { AppMode, computeMode } from '@/context/app-mode-provider';
import { ConfirmModalContext } from '@/components/confirm-modal';
import Spinner from '@/components/spinner';
import { useRouter } from 'next/dist/client/router';
import { isNoneOrEmpty } from '@/lib/helper';
import CopiableLink from './copiable-link';

interface UserConnectionListView { }

const UserConnectionList: React.FC<UserConnectionListView> = () => {
  const router = useRouter();
  const { notify } = useContext(Notify);
  const { setLoading } = useContext(Loading);
  const { testMode } = useContext(AppMode);
  const { confirmDeletion } = useContext(ConfirmModalContext);
  const { editConnection } = useContext(ConnectProviderModalContext);
  const { updateConnection, deleteConnection } = useContext(ConnectionMutationContext);
  const { user_connections, loading, called, refetch } = useContext(UserConnections);
  const [viewOtherMode, showOther] = useState<boolean>(computeMode() || false);

  const onUpdate = async () => refetch && await refetch();
  const toggle = ({ __typename, active, id }: UserConnectionType) => async () => {
    try {
      const data = { [__typename.toLowerCase()]: { active: !active } };
      await updateConnection({ id, ...data });
      notify({
        type: NotificationType.success,
        message: `carrier connection ${!active ? 'activated' : 'deactivated'}!`
      });
      onUpdate();
    } catch (message: any) {
      notify({ type: NotificationType.error, message });
    }
  };
  const onDelete = (id: string) => async () => {
    try {
      await deleteConnection(id);
      notify({
        type: NotificationType.success,
        message: `carrier connection deleted!`
      });
      onUpdate();
    } catch (message: any) {
      notify({ type: NotificationType.error, message });
    }
  };

  useEffect(() => { setLoading(loading); });
  useEffect(() => {
    if (called && !loading && !isNoneOrEmpty(router.query.modal)) {
      const connection = user_connections.find(c => c.id === router.query.modal);
      connection && editConnection({ connection, onConfirm: onUpdate });
    }
  }, [router.query.modal, user_connections]);

  return (
    <>
      <label className="checkbox p-2" style={{ position: 'absolute', top: 1, right: 1 }}>
        <span className="is-size-7 has-text-weight-semibold has-text-info px-2">Show {testMode ? 'live' : 'test'} connections</span>
        <input id="toggle" type="checkbox" defaultChecked={viewOtherMode} onChange={() => showOther(!viewOtherMode)} />
      </label>

      {loading && <Spinner />}

      {(!loading && (user_connections || []).length > 0) && <table className="table is-fullwidth">

        <tbody className="connections-table">
          <tr>
            <td className="is-size-7" colSpan={4}>ACCOUNTS</td>
            <td className="action"></td>
          </tr>

          {user_connections.map((connection) => (

            <tr key={`${connection.id}-${Date.now()}`} style={{ display: (testMode === connection.test || (testMode !== connection.test && viewOtherMode)) ? 'table-row' : 'none' }}>
              <td className="carrier">
                <CarrierBadge carrier={connection.carrier_name} className="box has-text-weight-bold" />
              </td>
              <td className="mode is-vcentered">
                {connection.test && <span className="tag is-warning is-centered">Test</span>}
              </td>
              <td className="active is-vcentered">
                <button className="button is-white is-large" onClick={toggle(connection)}>
                  <span className={`icon is-medium ${connection.active ? 'has-text-success' : 'has-text-grey'}`}>
                    <i className={`fas fa-${connection.active ? 'toggle-on' : 'toggle-off'} fa-lg`}></i>
                  </span>
                </button>
              </td>
              <td className="details">
                <div className="content is-small">
                  <ul>
                    <li>
                      <span className="is-size-7 my-1 has-text-weight-semibold">carrier name: {connection.carrier_name}</span>
                    </li>
                    <li>
                      <CopiableLink className="button is-white is-small" text={connection.carrier_id} />
                    </li>
                  </ul>
                </div>
              </td>
              <td className="action is-vcentered">
                <div className="buttons is-centered">
                  <button className="button is-white" onClick={() => editConnection({
                    connection, onConfirm: onUpdate
                  })}>
                    <span className="icon is-small">
                      <i className="fas fa-pen"></i>
                    </span>
                  </button>
                  <button className="button is-white" onClick={() => confirmDeletion({
                    identifier: connection.id,
                    label: `Carrier connection`,
                    onConfirm: onDelete(connection.id),
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

      </table>}

      {(!loading && (user_connections || []).length == 0) && <div className="card my-6">

        <div className="card-content has-text-centered">
          <p>No carriers have been connected yet.</p>
          <p>Use the <strong>Connect a Carrier</strong> button above to add a new connection</p>
        </div>

      </div>}

    </>
  );
}

export default UserConnectionList;
