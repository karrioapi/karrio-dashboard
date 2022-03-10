import { NotificationType } from '@/lib/types';
import React, { useContext, useRef, useState } from 'react';
import Notifier, { Notify } from '@/components/notifier';
import { useLoader } from './loader';
import { useUser } from '@/context/user-provider';
import UserMutation from '@/context/user-mutation';
import { request_email_change_request_email_change_errors } from '@purplship/graphql';

interface EmailManagementComponent { }

const EmailManagement: React.FC<EmailManagementComponent> = UserMutation<EmailManagementComponent>(({ children, requestEmailChange }) => {
  const password = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const user = useUser();
  const { notify } = useContext(Notify);
  const { loading, setLoading } = useLoader();
  const [isActive, setIsActive] = useState<boolean>(false);
  const [errors, setErrors] = useState<request_email_change_request_email_change_errors[]>([]);

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    try {
      setLoading(true);
      await requestEmailChange({
        email: email.current?.value as string,
        password: password.current?.value as string,
        redirect_url: `${location.origin}/email/change`,
      });
      notify({ type: NotificationType.success, message: "Email change request sent!" });
      setIsActive(false);
    } catch (error: any) {
      setErrors(Array.isArray(error) ? error : [error]);
    }
    setLoading(false);
  };
  const close = (evt: React.MouseEvent) => {
    evt.preventDefault();
    setIsActive(false);
  };

  return (
    <>
      <Notifier>
        <div className="field">
          <label className="label">Email</label>
          <p className="is-size-7 has-text-weight-semibold" style={{ maxWidth: "60%" }}>{user.email}</p>
          <a className="is-size-7 has-text-info" onClick={() => setIsActive(true)}>Change email</a>
        </div>

        <div className={`modal ${isActive ? "is-active" : ""}`}>
          <div className="modal-background" onClick={close}></div>
          {isActive && <form className="modal-card" onSubmit={handleSubmit}>
            <section className="modal-card-body modal-form">
              <div className="form-floating-header p-4">
                <span className="has-text-weight-bold is-size-6">Change your email</span>
              </div>
              <div className="p-3 my-4"></div>

              {(errors as any[]).filter(({ message }) => message).map(({ message }, key) => (
                <p key={key} className="has-text-danger is-size-7">{message}</p>
              ))}

              <p className="is-size-6 mt-3 mb-1 has-text-weight-bold">1. Enter a new email</p>
              <p className="is-size-7 mb-5">We’ll send you an email to the new address to verify that you own it.</p>

              <div className="field">
                <input className="input is-small"
                  id="email"
                  name="name"
                  type="text"
                  placeholder="Email"
                  required
                  ref={email}
                />
                {errors.filter(error => error.field === 'email').map(({ messages }) => (
                  messages.map((message, index) => <p key={index} className="has-text-danger is-size-7">{message}</p>)
                ))}
                {(errors as any[]).filter(({ validation }) => validation && validation.email).map(({ validation }, key) => (
                  <p key={key} className="has-text-danger is-size-7">{validation['email'] as string}</p>
                ))}
              </div>

              <hr className="my-4" style={{ height: '1px' }} />

              <p className="is-size-6 mt-3 mb-1 has-text-weight-bold">2. Enter your current password</p>
              <p className="is-size-7 mb-5">Enter the password you currently use to login.</p>

              <div className="field">
                <input className="input is-small"
                  id="id_password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                  ref={password}
                />
                {errors.filter(error => error.field === 'password').map(({ messages }) => (
                  messages.map((message, index) => <p key={index} className="has-text-danger is-size-7">{message}</p>)
                ))}
                {(errors as any[]).filter(({ validation }) => validation && validation.password).map(({ validation }, key) => (
                  <p key={key} className="has-text-danger is-size-7">{validation['password'] as string}</p>
                ))}
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

export default EmailManagement;
