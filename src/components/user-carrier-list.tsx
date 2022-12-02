import React, { useContext, useEffect, useState } from 'react';
import { ConnectProviderModalContext } from '@/components/connect-provider-modal';
import CarrierBadge from '@/components/carrier-badge';
import { UserConnections, UserConnectionType } from '@/context/user-connections-provider';
import { ConnectionMutationContext } from '@/context/connection-mutation';
import { Loading } from '@/components/loader';
import { Notify } from '@/components/notifier';
import { NotificationType } from '@/lib/types';
import { ConfirmModalContext } from '@/components/confirm-modal';
import Spinner from '@/components/spinner';
import { useRouter } from 'next/dist/client/router';
import { isNoneOrEmpty } from '@/lib/helper';
import CopiableLink from '@/components/copiable-link';
import { useLabelTemplateModal } from './label-template-edit-modal';

type ConnectionUpdateType = Partial<UserConnectionType> & { id: string, __typename: string };
interface UserConnectionListView { }

const UserConnectionList: React.FC<UserConnectionListView> = () => {
  const router = useRouter();
  const { notify } = useContext(Notify);
  const { setLoading } = useContext(Loading);
  const labelModal = useLabelTemplateModal();
  const { confirm: confirmDeletion } = useContext(ConfirmModalContext);
  const { editConnection } = useContext(ConnectProviderModalContext);
  const { updateConnection, deleteConnection } = useContext(ConnectionMutationContext);
  const { user_connections, loading, called, refetch } = useContext(UserConnections);

  const onRefresh = async () => refetch && await refetch();
  const update = ({ __typename, id, ...changes }: ConnectionUpdateType) => async () => {
    try {
      const data = { [__typename.toLowerCase()]: changes };
      await updateConnection({ id, ...data });
      notify({ type: NotificationType.success, message: `carrier connection updated!` });
      onRefresh();
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
      onRefresh();
    } catch (message: any) {
      notify({ type: NotificationType.error, message });
    }
  };

  useEffect(() => { setLoading(loading); });
  useEffect(() => {
    if (labelModal.isActive) {
      const connection = user_connections.find(c => c.id === labelModal.operation?.connection.id);
      connection && labelModal.editLabelTemplate({
        connection: connection as any, onSubmit: label_template => update({
          id: connection.id, __typename: connection.__typename, label_template
        } as any)()
      })
    }
  }, [user_connections]);
  useEffect(() => {
    if (called && !loading && !isNoneOrEmpty(router.query.modal)) {
      const connection = user_connections.find(c => c.id === router.query.modal);
      connection && editConnection({ connection, onConfirm: onRefresh });
    }
  }, [router.query.modal, user_connections]);

  return (
    <>
      {loading && <Spinner />}

      {(called && (user_connections || []).length > 0) && <table className="table is-fullwidth">

        <tbody className="connections-table">
          <tr>
            <td className="is-size-7" colSpan={4}>ACCOUNTS</td>
            <td className="action"></td>
          </tr>

          {user_connections.map((connection) => (

            <tr key={`${connection.id}-${Date.now()}`} style={{ display: 'table-row' }}>
              <td className="carrier pl-0">
                <CarrierBadge
                  carrier={connection.carrier_name}
                  custom_name={(connection as any).carrier_id}
                  className="box has-text-weight-bold"
                  textOnly
                />
              </td>
              <td className="mode is-vcentered">
                {connection.test_mode && <span className="tag is-warning is-centered">Test</span>}
              </td>
              <td className="active is-vcentered">
                <button className="button is-white is-large" onClick={update({
                  id: connection.id,
                  __typename: connection.__typename,
                  active: !connection.active
                } as any)}>
                  <span className={`icon is-medium ${connection.active ? 'has-text-success' : 'has-text-grey'}`}>
                    <i className={`fas fa-${connection.active ? 'toggle-on' : 'toggle-off'} fa-lg`}></i>
                  </span>
                </button>
              </td>
              <td className="details">
                <div className="content is-small">
                  <ul>
                    <li>
                      <span className="is-size-7 my-1 has-text-weight-semibold">
                        carrier_name: {(connection as any).custom_carrier_name || connection.carrier_name}
                      </span>
                    </li>
                    <li>
                      <span className="is-size-7 my-1 has-text-weight-semibold">
                        carrier_id: <CopiableLink className="button is-white is-small" text={connection.carrier_id} />
                      </span>
                    </li>
                  </ul>
                </div>
              </td>
              <td className="action is-vcentered pr-0">
                <div className="buttons is-justify-content-end">
                  {!isNoneOrEmpty((connection as any).custom_carrier_name) && <button
                    title="edit label" className="button is-white" onClick={() => labelModal.editLabelTemplate({
                      connection: connection as any, onSubmit: label_template => update({
                        id: connection.id, __typename: connection.__typename, label_template
                      } as any)()
                    })}>
                    <span className="icon is-small">
                      <i className="fas fa-sticky-note"></i>
                    </span>
                  </button>}
                  <button title="edit account" className="button is-white" onClick={() => editConnection({
                    connection, onConfirm: onRefresh
                  })}>
                    <span className="icon is-small">
                      <i className="fas fa-pen"></i>
                    </span>
                  </button>
                  <button title="discard connection" className="button is-white" onClick={() => confirmDeletion({
                    identifier: connection.id,
                    label: `Delete Carrier connection`,
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
          <p>Use the <strong>Register a Carrier</strong> button above to add a new connection</p>
        </div>

      </div>}

    </>
  );
}

export default UserConnectionList;
