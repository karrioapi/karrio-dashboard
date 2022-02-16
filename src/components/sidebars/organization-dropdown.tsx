import { Organizations, OrganizationType } from '@/context/organizations-provider';
import { TokenData } from '@/context/token-provider';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Loading } from '@/components/loader';
import Image from 'next/image';
import { isNone, isNoneOrEmpty, p } from '@/lib/helper';
import { useRouter } from 'next/router';
import { useAcceptInvitation } from '../accept-invitation-modal';


const OrganizationDropdown: React.FC = () => {
  const router = useRouter();
  const { acceptInvitation } = useAcceptInvitation();
  const btn = useRef<HTMLInputElement>(null);
  const { authenticateOrg, ...token } = useContext(TokenData);
  const { load, organizations, organization, loading, called } = useContext(Organizations);
  const { setLoading } = useContext(Loading);
  const [active, setActive] = useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [selected, setSelected] = useState<OrganizationType>();

  const handleOnClick = (e: React.MouseEvent) => {
    if (!active) {
      setActive(true);
      document.addEventListener('click', onBodyClick);
    }
    e.stopPropagation();
  };
  const onBodyClick = (e: MouseEvent) => {
    if (e.target !== btn.current) {
      setActive(false);
      document.removeEventListener('click', onBodyClick);
    }
  };
  const select = (org: OrganizationType) => async (e: any) => {
    if (!active) {
      setActive(true);
      document.addEventListener('click', onBodyClick);
    }
    e.preventDefault();
    e.stopPropagation();

    if (org.id === selected?.id) return;
    setLoading(true);
    setSelected(org);
    authenticateOrg(org.id).then(() => setLoading(false));
    setActive(false);
  };
  const checkTokenChange = useCallback((key?: string) => {
    if (called && !isNone(key) && !token.loading && (selected?.token !== key)) {
      load();
    }
  }, [called, selected, token, load]);

  useEffect(() => { setSelected(organization); }, [organization]);
  useEffect(() => { checkTokenChange(token?.token?.key) }, [token, checkTokenChange]);
  useEffect(() => {
    if (!initialized && !isNoneOrEmpty(router.query.accept_invitation)) {
      acceptInvitation({ onChange: org_id => authenticateOrg(org_id) });
      setInitialized(true);
    }
    if (router.query && isNoneOrEmpty(router.query.accept_invitation)) {
      setInitialized(true);
    }
  }, [initialized, setInitialized, router.query, acceptInvitation, load]);

  return (
    <>
      {((organizations || []).length > 0) &&
        <div className={`dropdown ${active ? 'is-active' : ''}`} style={{ width: '100%' }}>
          <div className="dropdown-trigger control has-icons-left" style={{ width: '100%' }}>
            <div className="select is-fullwidth" aria-haspopup="true" aria-controls="dropdown-menu" onClick={handleOnClick} ref={btn}>
              <input
                type="text"
                className="input is-clickable"
                value={selected?.name || "All Organizations"}
                onChange={() => { }}
                readOnly
              />
            </div>

            <span className="icon is-left">
              <i className="fas fa-store"></i>
            </span>
          </div>

          <div className="dropdown-menu" id="dropdown-menu" role="menu" style={{ width: '100%' }}>
            <div className="dropdown-content">
              {(organizations || []).map(org => (
                <a key={org.id} className={`dropdown-item ${(org.id === selected?.id) ? 'is-active' : ''}`} onClick={select(org)}>
                  <i className="fas fa-store"></i>
                  <span className="px-2">{org.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>}

      {(!loading && (organizations || []).length === 0) &&
        <Image src={p`/icon.svg`} className="mt-2" width="70" height="100%" alt="logo" />}
    </>
  );
};

export default OrganizationDropdown;
