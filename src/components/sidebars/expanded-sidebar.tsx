import React, { useContext, useRef } from 'react';
import Image from 'next/image';
import { AppMode } from '@/context/app-mode-provider';
import OrganizationDropdown from '@/components/sidebars/organization-dropdown';
import AppLink from '@/components/app-link';
import { APIReference } from '@/context/references-provider';
import { p } from '@/lib/helper';
import { useRouter } from 'next/dist/client/router';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

interface ExpandedSidebarComponent { }

const ExpandedSidebar: React.FC<ExpandedSidebarComponent> = () => {
  const router = useRouter();
  const sidebar = useRef<HTMLDivElement>(null);
  const { MULTI_ORGANIZATIONS, ORDERS_MANAGEMENT } = useContext(APIReference);
  const { testMode, basePath, switchMode } = useContext(AppMode);
  const [showTemplateMenus, setShowTemplateMenus] = React.useState(false);

  const dismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    sidebar.current?.classList.remove('is-mobile-active');
  };
  const isActive = (path: string) => {
    if (path === basePath) return path === router.pathname;
    return router.pathname.includes(`${basePath}${path}`.replace('//', '/'));
  };
  const activeClass = (path: string) => isActive(path) ? 'is-active' : '';

  return (
    <div className="plex-sidebar" ref={sidebar}>
      <div className="sidebar-header pl-5">
        {MULTI_ORGANIZATIONS
          ? <OrganizationDropdown />
          : <Image src={p`/icon.svg`} className="mt-2" width="50" height="100%" alt="logo" />}
        <button className="menu-icon v-5 is-open mobile-item is-block mobile-sidebar-trigger" onClick={dismiss}>
          <span></span>
        </button>
      </div>
      <div className="sidebar-menu has-slimscroll py-2" style={{ height: "calc(100% - 60px)" }}>
        <AppLink href="/" className={"menu-item " + activeClass(basePath)} shallow={false} prefetch={false}>
          <i className={`fa fa-truck pr-3 ${isActive(basePath) ? "" : 'has-text-grey'}`}></i>
          <span className="has-text-weight-semibold">Shipments</span>
        </AppLink>

        <AppLink href="/trackers" className={"menu-item " + activeClass("/trackers")} shallow={false} prefetch={false}>
          <i className={`fa fa-location-arrow pr-3 ${isActive("/trackers") ? "" : 'has-text-grey'}`}></i>
          <span className="has-text-weight-semibold">Trackers</span>
        </AppLink>

        {ORDERS_MANAGEMENT &&
          <AppLink href="/orders" className={"menu-item " + activeClass("/orders")} shallow={false} prefetch={false}>
            <i className={`fa fa-inbox pr-3 ${isActive("/orders") ? "" : 'has-text-grey'}`}></i>
            <span className="has-text-weight-semibold">Orders</span>
          </AppLink>}

        <AppLink href="/connections" className={"menu-item " + activeClass("/connections")} shallow={false} prefetch={false}>
          <i className={`fa fa-th-list pr-3 ${isActive("/connections") ? "" : 'has-text-grey'}`}></i>
          <span className="has-text-weight-semibold">Carriers</span>
        </AppLink>

        {/* Templates */}
        <a className="menu-item menu-item my-0" onClick={() => setShowTemplateMenus(!showTemplateMenus)}>
          <i className={`fa fa-folder pr-3 has-text-grey`}></i>
          <span className="has-text-weight-semibold">Templates</span>
        </a>

        {(showTemplateMenus || window.location.pathname.includes('/templates')) && <>
          <AppLink href="/templates/addresses" className={"menu-item ml-5 " + activeClass("/templates/addresses")} shallow={false} prefetch={false}>
            <span>Addresses</span>
          </AppLink>

          <AppLink href="/templates/parcels" className={"menu-item ml-5 " + activeClass("/templates/parcels")} shallow={false} prefetch={false}>
            <span>Parcels</span>
          </AppLink>

          <AppLink href="/templates/customs-infos" className={"menu-item ml-5 " + activeClass("/templates/customs-infos")} shallow={false} prefetch={false}>
            <span>Customs</span>
          </AppLink>
        </>}

        {/* Developers */}
        <AppLink href="/developers/api" className="menu-item menu-item my-0" shallow={false} prefetch={false}>
          <i className={`fa fa-terminal pr-3 has-text-grey`}></i>
          <span className="has-text-weight-semibold">Developers</span>
        </AppLink>

        {window.location.pathname.includes('/developers') && <>
          <AppLink href="/developers/api" className={"menu-item ml-5 " + activeClass("/developers/api")} shallow={false} prefetch={false}>
            <span>API</span>
          </AppLink>

          <AppLink href="/developers/webhooks" className={"menu-item ml-5 " + activeClass("/developers/webhooks")} shallow={false} prefetch={false}>
            <span>Webhooks</span>
          </AppLink>

          <AppLink href="/developers/events" className={"menu-item ml-5 " + activeClass("/developers/events")} shallow={false} prefetch={false}>
            <span>Events</span>
          </AppLink>

          <AppLink href="/developers/logs" className={"menu-item ml-5 " + activeClass("/developers/logs")} shallow={false} prefetch={false}>
            <span>Logs</span>
          </AppLink>
        </>}

        <hr className="my-3 mx-5" style={{ height: '1px' }} />

        <AppLink href="/settings/account" className={"menu-item " + activeClass("/settings/account")}>
          <i className={`fa fa-cog pr-3 ${isActive("/settings/account") ? "" : 'has-text-grey'}`}></i>
          <span className="has-text-weight-semibold">Settings</span>
        </AppLink>

        {testMode ?
          <a className="menu-item mode-menu-item" onClick={switchMode}>
            <i className="fas fa-toggle-on pr-3"></i>
            <span className="mode-menu-item has-text-weight-semibold">Viewing test data</span>
          </a>
          :
          <a className="menu-item has-text-grey" onClick={switchMode}>
            <i className="fas fa-toggle-off pr-3"></i>
            <span className="has-text-weight-semibold">View test data</span>
          </a>
        }
      </div>
      <div style={{ position: 'absolute', bottom: 10, left: 30, right: 10 }}>
        <span className="menu-item has-text-grey-light">
          Version: {publicRuntimeConfig.DASHBOARD_VERSION}
        </span>
      </div>
    </div>
  );
}

export default ExpandedSidebar;
