import React, { useContext } from 'react';
import OrganizationUpdateInput from '@/components/organization-update-input';
import OrganizationMutationProvider from '@/context/organization-mutation';
import { Organizations } from '@/context/organizations-provider';
import { formatDateTime, formatDateTimeLong } from '@/lib/helper';

interface OrganizationManagementComponent { }

const OrganizationManagement: React.FC<OrganizationManagementComponent> = () => {
  const { organization } = useContext(Organizations);

  return (
    <>
      <OrganizationMutationProvider>
        <div className="columns py-5 mb-5">
          <div className="column is-5 pr-6">
            <p className="subtitle is-6 py-1">Display Name</p>
          </div>

          <div className="column is-7">

            <OrganizationUpdateInput propertyKey="name" inputType="text" />

          </div>
        </div>

        <header className="px-0 pt-4">
          <span className="subtitle is-5">Team</span>
          <button className="button is-primary is-small is-pulled-right">
            <span>New member</span>
          </button>
        </header>

        <hr style={{ height: '1px' }} />

        <div className="table-container">
          <table className="table is-fullwidth mb-0">

            <tbody className="members-table">
              <tr>
                <td className="member is-size-7 pl-0">MEMBER</td>
                <td className="role is-size-7">ROLE</td>
                <td className="last-login is-size-7">LAST LOGIN</td>
                <td className="action"></td>
              </tr>

              {organization.members.map(member => (

                <tr key={`${member.email}-${Date.now()}`} style={{ height: '60px' }}>
                  <td className="member is-vcentered pl-0">
                    {member.full_name && <p className="is-size-7">
                      <span className="pr-2">{member.full_name}</span>
                      {member.email === organization.current_user.email &&
                        <span className="tag is-size-7 is-info is-light px-3">You</span>}
                    </p>}
                    <p className="is-size-7 has-text-weight-semibold">{member.email}</p>
                  </td>
                  <td className="role is-vcentered">
                    <p>
                      {member.is_admin && <span className="is-size-7">Admin</span>}
                      {member.is_admin && member.is_owner && ', '}
                      {member.is_owner && <span className="is-size-7">Owner</span>}
                    </p>
                  </td>
                  <td className="last-login is-vcentered">
                    {member.last_login && <span className="is-size-7">{formatDateTime(member.last_login)}</span>}
                    {member.invitation && <span className="tag is-success is-light is-size-7">Invitation-sent</span>}
                  </td>
                  <td className="action pr-0">
                  </td>
                </tr>

              ))}
            </tbody>

          </table>

          <hr style={{ height: '1px' }} className="m-0 mb-3" />

          <footer className="py-2 is-vcentered">
            <span className="is-size-7 has-text-weight-semibold">{organization.members.length} results</span>

            <div className="buttons has-addons is-centered is-pulled-right pr-0">
              <button className="button is-small" disabled>
                <span>Previous</span>
              </button>
              <button className="button is-small" disabled>
                <span>Next</span>
              </button>
            </div>
          </footer>
        </div>
      </OrganizationMutationProvider>
    </>
  )
};

export default OrganizationManagement;
