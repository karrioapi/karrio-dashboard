import React, { FormEvent, useContext, useReducer, useState } from 'react';
import InputField from '@/components/generic/input-field';
import { Loading } from '@/components/loader';
import { ChangePasswordInput, change_password_change_password_errors } from '@purplship/graphql';
import ButtonField from '@/components/generic/button-field';
import UserMutation from '@/context/user-mutation';
import { isNone } from '@/lib/helper';
import { Notify } from '@/components/notifier';
import { NotificationType } from '@/lib/types';
import logger from '@/lib/logger';

const DEFAULT_VALUE: Partial<ChangePasswordInput> = {
  old_password: "",
  new_password1: "",
  new_password2: "",
};

function reducer(state: Partial<ChangePasswordInput>, { name, value }: { name: string, value: string | object }) {
  switch (name) {
    case "full":
      return { ...(value as object) };
    case "partial":
      return { ...state, ...(value as object) };
    default:
      return { ...state, [name]: value };
  }
}

const PasswordManagement: React.FC<{}> = UserMutation<{}>(({ changePassword }) => {
  const { notify } = useContext(Notify);
  const { loading, setLoading } = useContext(Loading);
  const [data, dispatch] = useReducer(reducer, DEFAULT_VALUE, () => DEFAULT_VALUE);
  const [errors, setErrors] = useState<change_password_change_password_errors[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = event.target.value;
    const name: string = event.target.name;

    dispatch({ name, value });
  };
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { errors } = await changePassword(data as ChangePasswordInput);
      setErrors(errors as change_password_change_password_errors[] || []);
      if ((errors || []).length === 0) {
        dispatch({ name: 'full', value: DEFAULT_VALUE });
        notify({ type: NotificationType.success, message: `Password changed successfully.` });
      }
    } catch (error: any) {
      logger.error(error);
    }
    setLoading(false);
  };
  const isDisabled = (data: Partial<ChangePasswordInput>) => {
    return (Object
      .keys(data) as (keyof ChangePasswordInput)[])
      .filter(key => key !== 'clientMutationId' && !isNone(data[key]) && (data[key] || '').length > 0)
      .length !== 3;
  }

  return (
    <form method="post" onSubmit={onSubmit} className="column is-7">

      <InputField
        label="Current Password" name="old_password" type="password"
        placeholder="Current Password" className="is-small" fieldClass="mt-3"
        onChange={handleChange} value={data.old_password} style={{ maxWidth: "60%" }} required>
        {errors.filter(error => error.field === 'old_password').map(({ messages }) => (
          messages.map((message, index) => <p key={index} className="has-text-danger is-size-7 my-1">{message}</p>)
        ))}
      </InputField>

      <hr style={{ height: "1px", maxWidth: "60%" }} />

      <InputField
        label="New Password" name="new_password1" type="password"
        placeholder="New Password" className="is-small" fieldClass="mt-3"
        onChange={handleChange} value={data.new_password1} style={{ maxWidth: "60%" }} required>
        {errors.filter(error => error.field === 'new_password1').map(({ messages }) => (
          messages.map((message, index) => <p key={index} className="has-text-danger is-size-7 my-1">{message}</p>)
        ))}
      </InputField>

      <InputField
        label="Confirm New Password" name="new_password2" type="password"
        placeholder="Confirm Password" className="is-small" fieldClass="mt-3"
        onChange={handleChange} value={data.new_password2} style={{ maxWidth: "60%" }} required>
        {errors.filter(error => error.field === 'new_password2').map(({ messages }) => (
          messages.map((message, index) => <p key={index} className="has-text-danger is-size-7 my-1">{message}</p>)
        ))}
      </InputField>


      <ButtonField type="submit"
        className={`is-default is-small ${loading ? 'is-loading' : ''} mt-4`}
        disabled={isDisabled(data)}>
        <span>Change my password</span>
      </ButtonField>

    </form>
  )
});

export default PasswordManagement;
