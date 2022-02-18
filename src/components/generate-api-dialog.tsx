import { NotificationType } from '@/lib/types';
import React, { useContext, useRef, useState } from 'react';
import Notifier, { Notify } from '@/components/notifier';
import TokenMutation from '@/context/token-mutation';
import { useLoader } from './loader';
import { useUser } from '@/context/user-provider';

interface GenerateAPIModalComponent { }

const GenerateAPIModal: React.FC<GenerateAPIModalComponent> = TokenMutation<GenerateAPIModalComponent>(({ children, updateToken }) => {
  const password = useRef<HTMLInputElement>(null);
  const user = useUser();
  const { notify } = useContext(Notify);
  const { loading, setLoading } = useLoader();
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    try {
      setLoading(true);
      await updateToken({ refresh: true, password: password.current?.value });
      setLoading(false);
      setIsActive(false);
      notify({ type: NotificationType.success, message: "New token generated successfully!" });
    } catch (err) {
      setLoading(false);
    }
  };
  const close = (evt: React.MouseEvent) => {
    evt.preventDefault();
    setIsActive(false);
  }

  return (
    <>
      <Notifier>
        <div onClick={() => setIsActive(true)}>
          {children}
        </div>

        <div className={`modal ${isActive ? "is-active" : ""}`}>
          <div className="modal-background" onClick={close}></div>
          {isActive && <form className="modal-card" onSubmit={handleSubmit}>
            <section className="modal-card-body modal-form">
              <div className="form-floating-header p-4">
                <span className="has-text-weight-bold is-size-6">Regenerate API key</span>
              </div>
              <div className="p-3 my-4"></div>

              <div className="notification is-warning is-light">
                This action will block the curren API key and generate a new one.
                We recommend reviewing your security history for events related to this key.
                Any webhook endpoints created with this key will stay active, even after the key is regenerated.
              </div>

              <hr className="mt-1 mb-2" style={{ height: '1px' }} />

              <p className="is-size-6 mt-3 mb-1 has-text-weight-bold">Additional authentication required</p>
              <p className="is-size-7 mb-5">To continue, please enter your password.</p>

              <div className="field">
                <label className="label">Email</label>
                <input className="input is-small"
                  id="email"
                  name="name"
                  type="text"
                  value={user.email}
                  disabled
                />
              </div>

              <div className="field">
                <label className="label">Password</label>
                <input className="input is-small"
                  id="id_password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                  ref={password}
                />
              </div>

              <div className="p-3 my-5"></div>
              <div className="form-floating-footer has-text-centered p-1">
                <button className="button is-default m-1 is-small" onClick={close}>
                  <span>Dismiss</span>
                </button>
                <button
                  type="submit"
                  className="button is-primary m-1 is-small"
                  disabled={loading}
                >
                  <span>Confirm</span>
                </button>
              </div>
            </section>
          </form>}
          <button className="modal-close is-large has-background-dark" aria-label="close" onClick={close}></button>
        </div>
      </Notifier>
    </>
  )
});

export default GenerateAPIModal;
