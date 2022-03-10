import React from 'react';
import AccountDropdown from '@/components/navbar/account-dropdown';
import ShortcutDropdown from './shortcut-dropdown';

interface NavbarComponent { }

const Navbar: React.FC<NavbarComponent> = () => {
  const openSidebar = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector('.plex-sidebar')?.classList.add('is-mobile-active');
  };

  return (
    <div className="static-nav">
      <div className="nav-start">

        <div className="nav-item mobile-item is-flex">
          <button className="menu-icon v-2 mobile-sidebar-trigger" onClick={openSidebar}>
            <span></span>
          </button>
        </div>

        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input className="input is-small" type="email" placeholder="Search for shipments..." />
            <span className="icon is-small is-left">
              <i className="fas fa-search"></i>
            </span>
          </p>
        </div>

      </div>
      <div className="nav-end">

        <div className="nav-item mobile-item is-flex mobile-search-trigger">
          <i className="fas fa-search"></i>
        </div>

        <ShortcutDropdown />

        <AccountDropdown />

      </div>

      <div className="mobile-search">
        <div className="field">
          <div className="control has-icon has-icon-right">
            <input type="text" className="input search-field" placeholder="Search for shipments..." />
            <div className="form-icon">
              <i className="fas fa-search"></i>
            </div>
            <div className="form-icon right-icon mobile-search-trigger">
              <i className="fas fa-clear"></i>
            </div>
            <div className="search-results has-slimscroll"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
