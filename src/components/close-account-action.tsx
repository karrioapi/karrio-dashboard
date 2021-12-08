import { NotificationType } from '@/lib/types';
import React, { useContext, useState } from 'react';
import UserMutation from '@/context/user-mutation';
import { Notify } from '@/components/notifier';
import { signOut } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';

interface CloseAccountActionComponent extends React.InputHTMLAttributes<HTMLDivElement> { }

const CloseAccountAction: React.FC<CloseAccountActionComponent> = UserMutation<CloseAccountActionComponent>(({ children, closeAccount }) => {
  const router = useRouter();
  const { notify } = useContext(Notify);
  const [isActive, setIsActive] = useState<boolean>(false);
  const close = (evt: React.MouseEvent) => {
    evt.preventDefault();
    setIsActive(false);
  }
  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    try {
      await closeAccount();
      signOut();
      router.push('/login');
    } catch (err: any) {
      notify({ type: NotificationType.error, message: err });
    }
  };

  return (
    <>
      <button className="button is-danger is-light" onClick={() => setIsActive(true)}>
        {children}
      </button>

      <div className={`modal ${isActive ? "is-active" : ""}`}>
        <div className="modal-background" onClick={close}></div>
        <form className="modal-card" onSubmit={handleSubmit}>
          <section className="modal-card-body">
            <h3 className="subtitle is-3">Close Account</h3>

            <div className="buttons my=2">
              <button className="button is-info is-light" onClick={close}>Cancel</button>
              <input className="button is-danger" type="submit" value="Close My Account" />
            </div>
          </section>
        </form>
        <button className="modal-close is-large has-background-dark" aria-label="close" onClick={close}></button>
      </div>
    </>
  )
});

export default CloseAccountAction;
