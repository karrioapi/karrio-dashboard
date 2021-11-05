import { NotificationType } from '@/lib/types';
import React, { useContext, useState } from 'react';
import { Notify } from '@/components/notifier';
import TokenMutation from '@/context/token-mutation';

interface GenerateAPIModalComponent { }

// TODO: Handle password
const GenerateAPIModal: React.FC<GenerateAPIModalComponent> = TokenMutation<GenerateAPIModalComponent>(({ children, updateToken }) => {
  const { notify } = useContext(Notify);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    try {
      setIsDisabled(true);
      await updateToken({ refresh: true });
      setIsDisabled(false);
      setIsActive(false);
      notify({ type: NotificationType.success, message: "New token generated successfully!" });
    } catch (err) {
      setIsDisabled(false);
    }
  };
  const close = (evt: React.MouseEvent) => {
    evt.preventDefault();
    setIsDisabled(false);
    setIsActive(false);
  }

  return (
    <>
      <button className="button is-primary is-small" onClick={() => setIsActive(true)}>
        {children}
      </button>

      <div className={`modal ${isActive ? "is-active" : ""}`}>
        <div className="modal-background" onClick={close}></div>
        <form className="modal-card" onSubmit={handleSubmit}>
          <section className="modal-card-body">
            <div className="field">
              <label className="label">Generate a new API Token</label>
              <input className="button is-small is-fullwidth mt-2" type="submit" value="Submit" disabled={isDisabled} />
            </div>
          </section>
        </form>
        <button className="modal-close is-large has-background-dark" aria-label="close" onClick={close}></button>
      </div>
    </>
  )
});

export default GenerateAPIModal;
