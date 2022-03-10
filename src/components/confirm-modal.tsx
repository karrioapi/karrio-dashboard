import { NotificationType } from '@/lib/types';
import React, { useContext, useState } from 'react';
import { Notify } from '@/components/notifier';

type OperationType = {
  identifier: string;
  label: string;
  onConfirm: () => Promise<any>;
};
type ConfirmModalContextType = {
  confirm: (operation: OperationType) => void,
};

export const ConfirmModalContext = React.createContext<ConfirmModalContextType>({} as ConfirmModalContextType);

interface ConfirmModalComponent { }

const ConfirmModal: React.FC<ConfirmModalComponent> = ({ children }) => {
  const { notify } = useContext(Notify);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [operation, setOperation] = useState<OperationType>();

  const confirmDeletion = (operation: OperationType) => {
    setOperation(operation);
    setIsActive(true);
  };
  const close = (evt?: React.MouseEvent) => {
    evt?.preventDefault();
    setIsActive(false);
    setOperation(undefined);
  };
  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    try {
      await operation?.onConfirm();
      notify({
        type: NotificationType.success, message: `${operation?.label} deteled successfully!...`
      });
      close();
    } catch (message: any) {
      notify({ type: NotificationType.error, message });
    }
  };

  return (
    <>
      <ConfirmModalContext.Provider value={{ confirm: confirmDeletion }}>
        {children}
      </ConfirmModalContext.Provider>

      <div className={`modal ${isActive ? "is-active" : ""}`}>
        <div className="modal-background" onClick={close}></div>
        <form className="modal-card" onSubmit={handleSubmit}>
          <section className="modal-card-body">
            <div className="form-floating-header p-4">
              <span className="has-text-weight-bold is-size-6">
                Delete {operation?.label} <span className="is-size-7">({operation?.identifier})</span>
              </span>
            </div>
            <div className="p-3 my-4"></div>

            <div className="buttons my=2">
              <button className="button is-info is-light" onClick={close}>Cancel</button>
              <input className="button is-danger" type="submit" value="Delete" />
            </div>
          </section>
        </form>
        <button className="modal-close is-large has-background-dark" aria-label="close" onClick={close}></button>
      </div>
    </>
  )
};

export function useConfirmModal() {
  return useContext(ConfirmModalContext);
}

export default ConfirmModal;
