import React, { useContext } from 'react';
import SystemConnectionMutation from '@/context/system-connection-mutation';
import { SystemConnections, SystemConnectionType } from '@/context/system-connections-provider';
import { Notify } from '@/components/notifier';
import { NotificationType } from '@/lib/types';
import CarrierBadge from '@/components/carrier-badge';
import ConnectionDescription from '@/components/descriptions/connection-description';

interface SystemConnectionListView { }

const SystemConnectionList: React.FC<SystemConnectionListView> = SystemConnectionMutation<SystemConnectionListView>(({ mutateConnection }) => {
  const { notify } = useContext(Notify);
  const { system_connections, refetch } = useContext(SystemConnections);

  const onUpdate = async () => refetch && await refetch();
  const toggle = ({ enabled, id }: SystemConnectionType) => async () => {
    try {
      await mutateConnection({ id, enable: !enabled });
      notify({
        type: NotificationType.success,
        message: `system carrier connection ${!enabled ? 'enabled' : 'disabled'}!`
      });
      onUpdate();
    } catch (message: any) {
      notify({ type: NotificationType.error, message });
    }
  };

  return (
    <>

      {((system_connections || []).length > 0) && <table className="table is-fullwidth">

        <tbody className="system-connections-table">
          <tr>
            <td className="is-size-7" colSpan={3}>ACCOUNTS</td>
            <td className="action">Active</td>
          </tr>

          {(system_connections || []).map((connection) => (

            <tr key={`connection-${connection.id}-${Date.now()}`}>
              <td className="carrier is-vcentered pl-0">
                <CarrierBadge carrier={connection.carrier_name} className="box has-text-weight-bold" />
              </td>
              <td className="mode is-vcentered">
                {connection.test ? <span className="tag is-warning is-centered">Test</span> : <></>}
              </td>
              <td className="details">
                <ConnectionDescription connection={connection} />
              </td>
              <td className="action has-text-right is-vcentered">
                <button className="button is-white is-large" onClick={toggle(connection)}>
                  <span className={`icon is-medium ${connection.enabled ? 'has-text-success' : 'has-text-grey'}`}>
                    <i className={`fas fa-${connection.enabled ? 'toggle-on' : 'toggle-off'} fa-lg`}></i>
                  </span>
                </button>
              </td>
            </tr>

          ))}
        </tbody>

      </table>}

      {((system_connections || []).length == 0) && <div className="card my-6">

        <div className="card-content has-text-centered">
          <p>The administrators have not provided any system wide carrier connections.</p>
        </div>

      </div>}

    </>
  );
});

export default SystemConnectionList;
