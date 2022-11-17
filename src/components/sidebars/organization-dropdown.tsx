import { Organizations, OrganizationType } from '@/context/organizations-provider';
import { TokenData } from '@/context/token-provider';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Loading } from '@/components/loader';
import Image from 'next/image';
import { isNone, isNoneOrEmpty, p } from '@/lib/helper';
import { useRouter } from 'next/router';
import { useAcceptInvitation } from '@/components/accept-invitation-modal';
import { useCreateOrganizationModal } from '@/components/create-organization-modal';
import { APIReference } from '@/context/references-provider';


const OrganizationDropdown: React.FC = () => {
  const trigger = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { ALLOW_MULTI_ACCOUNT } = useContext(APIReference);
  const { acceptInvitation } = useAcceptInvitation();
  const { createOrganization } = useCreateOrganizationModal();
  const { authenticateOrg, ...token } = useContext(TokenData);
  const { load, organizations, organization, loading, called } = useContext(Organizations);
  const { setLoading } = useContext(Loading);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [selected, setSelected] = useState<OrganizationType>();

  const handleOnClick = (e: React.MouseEvent) => {
    setIsActive(!isActive);
    if (!isActive) { document.addEventListener('click', onBodyClick); }
    else { document.removeEventListener('click', onBodyClick); }
  };
  const onBodyClick = (e: MouseEvent) => {
    if (!trigger.current?.contains(e.target as Node)) {
      setIsActive(false);
      document.removeEventListener('click', onBodyClick);
    }
  };
  const select = (org: OrganizationType) => async (e: any) => {
    if (!isActive) {
      setIsActive(true);
      document.addEventListener('click', onBodyClick);
    }
    e.preventDefault();
    e.stopPropagation();

    if (org.id === selected?.id) return;
    setLoading(true);
    setSelected(org);
    authenticateOrg(org.id).then(() => setLoading(false));
    setIsActive(false);
  };
  const create = async () => {
    createOrganization({
      onChange: (orgId: string) => {
        setIsActive(false);
        return authenticateOrg(orgId);
      }
    });
  };
  const checkTokenChange = useCallback((key?: string) => {
    if (called && !isNone(key) && !token.loading && (selected?.token !== key)) {
      load();
    }
  }, [called, selected, token, load]);

  useEffect(() => {
    setSelected(organization);
  }, [organization]);
  useEffect(() => { checkTokenChange(token?.token?.key) }, [token, checkTokenChange]);
  useEffect(() => {
    if (!initialized && !isNoneOrEmpty(router.query.accept_invitation)) {
      acceptInvitation({ onChange: orgId => authenticateOrg(orgId) });
      setInitialized(true);
    }
    if (router.query && isNoneOrEmpty(router.query.accept_invitation)) {
      setInitialized(true);
    }
  }, [initialized, setInitialized, router.query, acceptInvitation, load]);

  return (
    <>
      {((organizations || []).length > 0) &&
        <div className={`dropdown ${isActive ? 'is-active' : ''}`} style={{ width: '100%' }}>
          <div className="dropdown-trigger control has-icons-left" style={{ width: '100%' }}>
            <div className="select is-fullwidth" aria-haspopup="true" aria-controls="dropdown-menu" onClick={handleOnClick} ref={trigger}>
              <input
                type="text"
                className="input is-clickable has-text-grey has-text-weight-semibold"
                value={selected?.name || "All Organizations"}
                onChange={_ => _}
                readOnly
              />
            </div>

            <span className="icon is-left">
              <i className="fas fa-store"></i>
            </span>
          </div>

          <div className="dropdown-menu" id="dropdown-menu" role="menu" style={{ width: '100%' }}>
            <div className="dropdown-content is-menu">
              {/* Organization list */}
              {(organizations || []).map(org => (
                <a
                  key={`org-${org?.id}-${new Date()}`}
                  onClick={select(org)}
                  className={`dropdown-item ${(org?.id === selected?.id) ? 'is-active' : ''}`}
                >
                  <i className="fas fa-store"></i>
                  <span className="px-2">{org?.name}</span>
                </a>
              ))}

              {/* Create organization action */}
              {ALLOW_MULTI_ACCOUNT && <a onClick={() => create()} className="dropdown-item">
                <i className="fas fa-plus"></i>
                <span className="px-2">New organization</span>
              </a>}

            </div>
          </div>
        </div>}

      {(!loading && (organizations || []).length === 0) &&
        <Image src={p`/icon.svg`} className="mt-2" width="70" height="100%" alt="logo" />}
    </>
  );
};

export default OrganizationDropdown;
