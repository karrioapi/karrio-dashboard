import React, { useContext, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AppMode } from '@/context/app-mode-provider';
import { FeatureFlags } from '@/context/feature-flags';
import OrganizationDropdown from '@/components/sidebars/organization-dropdown';

interface ExpandedSidebarComponent { }

const ExpandedSidebar: React.FC<ExpandedSidebarComponent> = () => {
  const { testMode, switchMode } = useContext(AppMode);
  const { MULTI_ORGANIZATIONS } = useContext(FeatureFlags);
  const sidebar = useRef<HTMLDivElement>(null);
  const dismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    sidebar.current?.classList.remove('is-mobile-active');
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
        <Link href="/">
          <a className="menu-item is-active">
            <span>Shipments</span>
          </a>
        </Link>

        <Link href="/trackers">
          <a className="menu-item">
            <span>Trackers</span>
          </a>
        </Link>

        <Link href="/connections">
          <a className="menu-item">
            <span>Carriers</span>
          </a>
        </Link>

        <Link href="/templates/addresses">
          <a className="menu-item">
            <span>Addresses</span>
          </a>
        </Link>

        <Link href="/templates/parcels">
          <a className="menu-item">
            <span>Parcels</span>
          </a>
        </Link>

        <Link href="/templates/customs_infos">
          <a className="menu-item">
            <span>Customs</span>
          </a>
        </Link>


        <div className="menu-item menu-label my-0">
          <span>Developers</span>
        </div>

        <Link href="/developers/api">
          <a className="menu-item ml-6">
            <span>API</span>
          </a>
        </Link>

        <Link href="/developers/webhooks">
          <a className="menu-item ml-6">
            <span>Webhooks</span>
          </a>
        </Link>

        <Link href="/developers/logs">
          <a className="menu-item ml-6">
            <span>Logs</span>
          </a>
        </Link>

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

        <Link href="/settings/account">
          <a className="menu-item has-text-grey">
            <i className="fas fa-cog"></i>
            <span>Account Settings</span>
          </a>
        </Link>
      </div>
    </div>
  );
}

export default ExpandedSidebar;
