import { SystemConnections, SystemConnectionType } from '@/context/system-connections-provider';
import ConnectionDescription from '@/components/descriptions/connection-description';
import { useSystemConnectionMutation } from '@/context/system-connection-mutation';
import CarrierNameBadge from '@/components/carrier-name-badge';
import { NotificationType } from '@/lib/types';
import { Notify } from '@/components/notifier';
import React, { useContext } from 'react';


const SystemConnectionList: React.FC = () => {
  const { notify } = useContext(Notify);
  const { system_connections, refetch } = useContext(SystemConnections);
  const { updateConnection } = useSystemConnectionMutation();

  const onUpdate = async () => refetch && await refetch();
  const toggle = ({ enabled, id }: SystemConnectionType) => async () => {
    try {
      await updateConnection({ id, enable: !enabled });
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
            <td className="is-size-7" colSpan={4}>ACCOUNTS</td>
          </tr>

          {(system_connections || []).map((connection) => (

            <tr key={`connection-${connection.id}-${Date.now()}`}>
              <td className="carrier is-vcentered pl-0">
                <CarrierNameBadge
                  carrier_name={connection.carrier_name}
                  display_name={connection.display_name}
                  className="box has-text-weight-bold"
                />
              </td>
              <td className="mode is-vcentered">
                {connection.test_mode ? <span className="tag is-warning is-centered">Test</span> : <></>}
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
};

export default SystemConnectionList;
