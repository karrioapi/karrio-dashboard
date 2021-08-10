import { Organizations, OrganizationType } from '@/context/organizations-query';
import { TokenData } from '@/context/token-query';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Loading } from '@/components/loader';

const OrganizationDropdown: React.FC = () => {
    const btn = useRef<HTMLButtonElement>(null);
    const { authenticateOrg, token, ...state } = useContext(TokenData);
    const { organizations, organization, load, loading } = useContext(Organizations);
    const { setLoading } = useContext(Loading)
    const [active, setActive] = useState<boolean>(false);
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
        await authenticateOrg(org.id, org.token);
        setLoading(false);
    };

    useEffect(() => { (!loading && load) && load(); }, []);
    useEffect(() => { setSelected(organization); }, [organization]);
    useEffect(() => {
        if (!(loading || state.loading) && (selected?.token !== token?.key)) {
            load();
        }
    }, [token]);

    return (
        <>
            {((organizations || []).length > 0) && <div className={`dropdown ${active ? 'is-active' : ''}`}>
                <div className="dropdown-trigger">
                    <button className="button is-light" aria-haspopup="true" aria-controls="dropdown-menu" onClick={handleOnClick} ref={btn}>
                        <i className="fas fa-store"></i>
                        <span className="px-3">{selected?.name}</span>
                        <span className="icon is-small">
                            <i className="fas fa-angle-down" aria-hidden="true"></i>
                        </span>
                    </button>
                </div>
                <div className="dropdown-menu" id="dropdown-menu" role="menu">
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

            {(!loading && (organizations || []).length === 0) && <img src="/static/branding/logo.svg" width="80" />}
        </>
    );
};

export default OrganizationDropdown;