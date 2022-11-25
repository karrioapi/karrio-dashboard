import { SystemConnectionType } from '@/context/system-connection';
import React, { useContext, useEffect } from 'react';
import { isNone } from '@/lib/helper';
import { useAPIReference } from '@/context/reference';

interface ConnectionDescriptionComponent {
  connection: SystemConnectionType;
}

const CAPABILITY_KEYS = {
  "pickup": "pickup",
  "rating": "rates",
  "shipping": "shipment",
  "tracking": "tracking",
} as any;

const CAPABILITY_DETAILS: any = {
  "pickup": "Use this account can be used to schedule pickup",
  "rating": "Use this account to get our negotiated rates",
  "shipping": "Use this account to buy shipping labels",
  "tracking": "Use this account to track shipments",
};

const ConnectionDescription: React.FC<ConnectionDescriptionComponent> = ({ connection }) => {
  const { carrier_capabilities } = useAPIReference();
  const [raw_capabilities, setRawCapabilities] = React.useState<string[]>([]);
  const [key] = React.useState<string>(`description-${connection.id}-${Date.now()}`);

  useEffect(() => {
    if (isNone(carrier_capabilities)) return;

    setRawCapabilities((carrier_capabilities as any)[connection.carrier_name]);
  }, [carrier_capabilities, connection]);

  return (
    <div className="content is-small" key={key}>
      <ul>
        <li key={`carrier_id-${key}`}>
          <span className="is-size-7 my-1 has-text-weight-semibold">carrier id: {connection.carrier_id}</span>
        </li>

        {(connection?.capabilities || []).map((capability: any, index: number) => {
          if ((raw_capabilities || []).filter(raw_capability => raw_capability.includes(CAPABILITY_KEYS[capability])).length > 0) {
            return (
              <li key={`${index}-${key}`}>
                <span className="is-size-7 my-1 has-text-weight-semibold">{CAPABILITY_DETAILS[capability]}</span>
              </li>
            );
          }
          return <React.Fragment key={`${index}-${key}`}></React.Fragment>;
        })}

      </ul>
    </div>
  );
};

export default ConnectionDescription;
