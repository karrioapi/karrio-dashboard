import React, { useContext, useEffect, useState } from 'react';
import InputField from '@/components/generic/input-field';
import { NotificationType } from '@/lib/types';
import ButtonField from '@/components/generic/button-field';
import SelectField from '@/components/generic/select-field';
import { APIReference } from '@/context/references-provider';
import { UserConnections, UserConnectionType } from '@/context/user-connections-provider';
import { SystemConnections, SystemConnectionType } from '@/context/system-connections-provider';
import { TrackerMutationContext } from '@/context/tracker-mutation';
import Notifier, { Notify } from '@/components/notifier';
import { Loading } from '@/components/loader';
import { AppMode } from '@/context/app-mode-provider';
import { p, removeUrlParam, validationMessage, validityCheck } from '@/lib/helper';
import { Organizations } from '@/context/organizations-provider';
import { OrganizationMutationContext } from '@/context/organization-mutation';

type OperationType = {
  onChange?: () => void;
};
interface InviteMemberInterface {
  sendInvites: (operation?: OperationType) => void;
}

export const InviteMemberContext = React.createContext<InviteMemberInterface>({} as InviteMemberInterface);

const InviteMemberProvider: React.FC<{}> = ({ children }) => {
  const { notify } = useContext(Notify);
  const { loading, setLoading } = useContext(Loading);
  const { organization } = useContext(Organizations);
  const { sendOrganizationInvites } = useContext(OrganizationMutationContext);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [key, setKey] = useState<string>(`invite-${Date.now()}`);
  const [operation, setOperation] = useState<OperationType>({} as OperationType);
  const [emails, setEmails] = useState<string[]>([]);
  const [isValid, setIsValid] = React.useState<boolean>(true);

  const sendInvites = (operation?: OperationType) => {
    operation && setOperation(operation);
    setIsActive(true);
  };
  const close = ({ updated }: any | { updated?: boolean }) => {
    setIsActive(false);
    setEmails([]);
    setKey(`invite-${Date.now()}`);
    (updated && operation?.onChange) && operation.onChange();
  };
  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setLoading(true);
    try {
      await sendOrganizationInvites({
        redirect_url: location.origin + p`/accept-invite`,
        org_id: organization.id,
        emails,
      });
      notify({ type: NotificationType.success, message: 'Invitations sent successfully!' });
      close({ updated: true });
    } catch (message: any) {
      notify({ type: NotificationType.error, message });
    }
    setLoading(false);
  };

  return (
    <>
      <InviteMemberContext.Provider value={{ sendInvites }}>
        {children}
      </InviteMemberContext.Provider>

      <Notifier>
        <div className={`modal ${isActive ? "is-active" : ""}`} key={key}>
          <div className="modal-background" onClick={close}></div>
          {isActive && <form className="modal-card" onChange={e => setIsValid((e.target as any).checkValidity())} onSubmit={handleSubmit}>
            <section className="modal-card-body modal-form">
              <div className="form-floating-header p-4">
                <span className="has-text-weight-bold is-size-6">Invite team members</span>
              </div>
              <div className="p-3 my-4"></div>

              <InputField
                type="email"
                label="Tracking Number"
                placeholder="john@mail.com, jane@mail.com, etc."
                defaultValue=""
                fieldClass="mt-6"
                onChange={e => setEmails(e.target.value.split(',').map(e => e.trim()))}
                onInvalid={validityCheck(validationMessage('Please enter a valid email list'))}
                multiple
                required
              />

              <div className="p-3 my-5"></div>
              <ButtonField type="submit"
                className={`is-primary ${loading ? 'is-loading' : ''} m-0`}
                fieldClass="form-floating-footer p-3"
                controlClass="has-text-centered"
                disabled={!isValid}
              >
                <span>Send invites</span>
              </ButtonField>
            </section>
          </form>}

          <button className="modal-close is-large has-background-dark" aria-label="close" onClick={close}></button>
        </div>
      </Notifier>
    </>
  )
};

export function useInviteMember() {
  return useContext(InviteMemberContext);
}

export default InviteMemberProvider;
