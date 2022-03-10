import React, { useContext, useState } from 'react';
import { NotificationType } from '@/lib/types';
import Notifier, { Notify } from '@/components/notifier';
import { Loading } from '@/components/loader';
import { removeUrlParam } from '@/lib/helper';
import { useRouter } from 'next/router';
import { useOrganizationInvitation } from '@/context/organization-invitation-provider';
import { useUser } from '@/context/user-provider';

type OperationType = { onChange?: (org_id: string) => void; };
interface AcceptInvitationInterface {
  acceptInvitation: (operation?: OperationType) => void;
}

export const AcceptInvitationContext = React.createContext<AcceptInvitationInterface>({} as AcceptInvitationInterface);

const AcceptInvitationProvider: React.FC = ({ children }) => {
  const router = useRouter();
  const user = useUser();
  const { accept_invitation } = router.query as { accept_invitation: string };
  const { notify } = useContext(Notify);
  const { loading, setLoading } = useContext(Loading);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [key, setKey] = useState<string>(`invite-${Date.now()}`);
  const [operation, setOperation] = useState<OperationType>({} as OperationType);
  const { load, accept, error, invitation } = useOrganizationInvitation();

  const acceptInvitation = (operation?: OperationType) => {
    load(accept_invitation);
    setKey(`invite-${Date.now()}`);
    operation && setOperation(operation);
    setIsActive(true);
  };
  const close = ({ updated, org_id }: any | { updated?: boolean }) => {
    setIsActive(false);
    setKey(`invite-${Date.now()}`);
    (updated && operation?.onChange) && operation.onChange(org_id);
    removeUrlParam('accept_invitation');
  };
  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setLoading(true);
    try {
      const { data } = await accept(accept_invitation);
      const org_id = data?.accept_organization_invitation?.organization?.id
      setTimeout(() => close({ updated: true, org_id }), 500);
    } catch (message: any) {
      notify({ type: NotificationType.error, message });
    }
    setLoading(false);
  };

  return (
    <>
      <AcceptInvitationContext.Provider value={{ acceptInvitation }}>
        {children}
      </AcceptInvitationContext.Provider>

      <Notifier>
        <div className={`modal ${isActive ? "is-active" : ""}`} key={key}>
          <div className="modal-background" onClick={close}></div>
          {isActive && <form className="modal-card" onSubmit={handleSubmit}>
            <section className="modal-card-body modal-form">
              <div className="form-floating-header p-4">
                <span className="has-text-weight-bold is-size-6">Accept Invitation</span>
              </div>
              <div className="p-3 my-4"></div>

              {error &&
                <p className="is-size-6 has-text-centered">
                  Error, invalid or expired organization invitation token!
                </p>}

              {!error && invitation?.invitee_identifier !== user?.email &&
                <p className="is-size-6 has-text-centered">
                  The invitation is not for this account.
                </p>}

              {invitation?.invitee_identifier === user?.email &&
                <p className="is-size-6 has-text-centered">
                  Click Confirm to accept the invitation to <strong>{invitation?.organization_name}</strong>.
                </p>}

              <div className="p-3 my-5"></div>
              <div className="form-floating-footer has-text-centered p-1">
                <button className="button is-default m-1" onClick={close}>
                  <span>Dismiss</span>
                </button>
                {invitation?.invitee_identifier === user?.email &&
                  <button className="button is-primary m-1" type="submit" disabled={loading}>
                    <span>Confirm</span>
                  </button>}
              </div>
            </section>
          </form>}

          <button className="modal-close is-large has-background-dark" aria-label="close" onClick={close}></button>
        </div>
      </Notifier>
    </>
  )
};

export function useAcceptInvitation() {
  return useContext(AcceptInvitationContext);
}

export default AcceptInvitationProvider;
