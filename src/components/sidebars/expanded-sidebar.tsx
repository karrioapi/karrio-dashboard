import React, { useContext, useRef } from 'react';
import Image from 'next/image';
import { AppMode } from '@/context/app-mode-provider';
import OrganizationDropdown from '@/components/sidebars/organization-dropdown';
import AppLink from '@/components/app-link';
import { APIReference } from '@/context/references-provider';
import { p } from '@/lib/helper';
import { useRouter } from 'next/dist/client/router';

interface ExpandedSidebarComponent { }

const ExpandedSidebar: React.FC<ExpandedSidebarComponent> = () => {
  const router = useRouter();
  const { testMode, basePath, switchMode } = useContext(AppMode);
  const { multi_organizations } = useContext(APIReference);
  const sidebar = useRef<HTMLDivElement>(null);

  const dismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    sidebar.current?.classList.remove('is-mobile-active');
  };
  const isActive = (path: string) => {
    if (path === basePath) return path === router.pathname ? 'is-active' : '';
    return router.pathname.includes(`${basePath}${path}`.replace('//', '/')) ? 'is-active' : '';
  };

  return (
    <div className="plex-sidebar" ref={sidebar}>
      <div className="sidebar-header pl-5">
        {multi_organizations
          ? <OrganizationDropdown />
          : <Image src={p`/icon.svg`} className="mt-2" width="70" height="100%" alt="logo" />}
        <button className="menu-icon v-5 is-open mobile-item is-block mobile-sidebar-trigger" onClick={dismiss}>
          <span></span>
        </button>
      </div>
      <div className="sidebar-menu has-slimscroll py-6" style={{ height: "calc(100% - 60px)" }}>
        <AppLink href="/" className={"menu-item " + isActive(basePath)}>
          <span className="has-text-weight-semibold">Shipments</span>
        </AppLink>

        <AppLink href="/trackers" className={"menu-item " + isActive("/trackers")}>
          <span className="has-text-weight-semibold">Trackers</span>
        </AppLink>

        <AppLink href="/connections" className={"menu-item " + isActive("/connections")}>
          <span className="has-text-weight-semibold">Carriers</span>
        </AppLink>

        <AppLink href="/templates/addresses" className={"menu-item " + isActive("/templates/addresses")}>
          <span className="has-text-weight-semibold">Addresses</span>
        </AppLink>

        <AppLink href="/templates/parcels" className={"menu-item " + isActive("/templates/parcels")}>
          <span className="has-text-weight-semibold">Parcels</span>
        </AppLink>

        <AppLink href="/templates/customs-infos" className={"menu-item " + isActive("/templates/customs-infos")}>
          <span className="has-text-weight-semibold">Customs</span>
        </AppLink>

        <AppLink href="/developers/api" className="menu-item menu-item my-0">
          <span className="has-text-weight-semibold">Developers</span>
        </AppLink>

        {window.location.pathname.includes('/developers') && <>
          <AppLink href="/developers/api" className={"menu-item ml-6 " + isActive("/developers/api")}>
            <span>API</span>
          </AppLink>

          <AppLink href="/developers/webhooks" className={"menu-item ml-6 " + isActive("/developers/webhooks")}>
            <span>Webhooks</span>
          </AppLink>

          <AppLink href="/developers/events" className={"menu-item ml-6 " + isActive("/developers/events")}>
            <span>Events</span>
          </AppLink>

          <AppLink href="/developers/logs" className={"menu-item ml-6 " + isActive("/developers/logs")}>
            <span>Logs</span>
          </AppLink>
        </>}

        {testMode ?
          <a className="menu-item mode-menu-item" onClick={switchMode}>
            <i className="fas fa-toggle-on"></i>
            <span className="mode-menu-item has-text-weight-semibold">Viewing test data</span>
          </a>
          :
          <a className="menu-item has-text-grey" onClick={switchMode}>
            <i className="fas fa-toggle-off"></i>
            <span className="has-text-weight-semibold">View test data</span>
          </a>
        }

        <AppLink href="/settings/account" className={"menu-item " + isActive("/settings/account")}>
          <i className="fas fa-cog"></i>
          <span className="has-text-weight-semibold">Account Settings</span>
        </AppLink>
      </div>
    </div>
  );
}

export default ExpandedSidebar;
