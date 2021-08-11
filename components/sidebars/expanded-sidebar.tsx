import React, { useContext, useRef } from 'react';
import Image from 'next/image';
import { AppMode } from '@/context/app-mode-provider';
import { FeatureFlags } from '@/context/feature-flags';
import OrganizationDropdown from '@/components/sidebars/organization-dropdown';
import AppLink from '@/components/app-link';

interface ExpandedSidebarComponent { }

const ExpandedSidebar: React.FC<ExpandedSidebarComponent> = () => {
  const { testMode, basePath, switchMode } = useContext(AppMode);
  const { MULTI_ORGANIZATIONS } = useContext(FeatureFlags);
  const sidebar = useRef<HTMLDivElement>(null);

  const dismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    sidebar.current?.classList.remove('is-mobile-active');
  };
  const isActive = (path: string) => {
    return window.location.pathname === `${basePath}${path}` ? 'is-active' : '';
  };

  return (
    <div className="plex-sidebar" ref={sidebar}>
      <div className="sidebar-header pl-5">
        <Image src="/logo.svg" width="80" height="40" alt="logo" />
        {MULTI_ORGANIZATIONS && <OrganizationDropdown />}
        <button className="menu-icon v-5 is-open mobile-item is-block mobile-sidebar-trigger" onClick={dismiss}>
          <span></span>
        </button>
      </div>
      <div className="sidebar-menu has-slimscroll py-4" style={{ height: "calc(100% - 60px)" }}>
        <AppLink href="" className={"menu-item " + isActive("")}>
          <span>Shipments</span>
        </AppLink>

        <AppLink href="/trackers" className={"menu-item " + isActive("/trackers")}>
          <span>Trackers</span>
        </AppLink>

        <AppLink href="/connections" className={"menu-item " + isActive("/connections")}>
          <span>Carriers</span>
        </AppLink>

        <AppLink href="/templates/addresses" className={"menu-item " + isActive("/templates/addresses")}>
          <span>Addresses</span>
        </AppLink>

        <AppLink href="/templates/parcels" className={"menu-item " + isActive("/templates/parcels")}>
          <span>Parcels</span>
        </AppLink>

        <AppLink href="/templates/customs_infos" className={"menu-item " + isActive("/templates/customs_infos")}>
          <span>Customs</span>
        </AppLink>


        <div className="menu-item menu-label my-0">
          <span>Developers</span>
        </div>

        <AppLink href="/developers/api" className={"menu-item ml-6 " + isActive("/developers/api")}>
          <span>API</span>
        </AppLink>

        <AppLink href="/developers/webhooks" className={"menu-item ml-6 " + isActive("/developers/webhooks")}>
          <span>Webhooks</span>
        </AppLink>

        <AppLink href="/developers/logs" className={"menu-item ml-6 " + isActive("/developers/logs")}>
          <span>Logs</span>
        </AppLink>

        {testMode ?
          <a className="menu-item mode-menu-item" onClick={switchMode}>
            <i className="fas fa-toggle-on"></i>
            <span className="mode-menu-item">Viewing test data</span>
          </a>
          :
          <a className="menu-item has-text-grey" onClick={switchMode}>
            <i className="fas fa-toggle-off"></i>
            <span>View test data</span>
          </a>
        }

        <AppLink href="/settings/account" className={"menu-item " + isActive("/settings/account")}>
          <i className="fas fa-cog"></i>
          <span>Account Settings</span>
        </AppLink>
      </div>
    </div>
  );
}

export default ExpandedSidebar;
