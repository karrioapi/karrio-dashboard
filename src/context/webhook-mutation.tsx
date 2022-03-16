import { Operation, OperationConfirmation, Webhook, WebhookData } from 'karrio/rest/index';
import { handleFailure } from '@/lib/helper';
import { RestContext } from '@/client/context';
import React, { useContext } from 'react';


export type WebhookMutator<T> = T & {
  addWebhook: (data: WebhookData) => Promise<Webhook>;
  updateWebhook: (data: Partial<Webhook>) => Promise<Webhook>;
  testWebhook: (id: string, payload: object) => Promise<OperationConfirmation>;
  removeWebhook: (id: string) => Promise<Operation>;
}

const WebhookMutation = <T extends {}>(Component: React.FC<WebhookMutator<T>>) => (
  function WebhookMutationWrapper({ children, ...props }: any) {
    const karrio = useContext(RestContext);

    const addWebhook = async (data: WebhookData) => handleFailure(
      karrio!.webhooks.create({ data })
    );
    const updateWebhook = async ({ id, ...data }: Partial<Webhook>) => handleFailure(
      karrio!.webhooks.update({ id: id as string, data: data as any })
    );
    const testWebhook = async (id: string, payload: object) => handleFailure(
      karrio!.webhooks.test({ id, data: { payload } })
    );
    const removeWebhook = async (id: string) => handleFailure(
      karrio!.webhooks.remove({ id })
    );

    return (
      <Component {...props}
        addWebhook={addWebhook}
        updateWebhook={updateWebhook}
        testWebhook={testWebhook}
        removeWebhook={removeWebhook}
      >
        {children}
      </Component>
    );
  }
);

export default WebhookMutation;
