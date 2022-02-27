import React from 'react';
import Navbar from '@/components/navbar/navbar';
import Notifier from '@/components/notifier';
import ExpandedSidebar from '@/components/sidebars/expanded-sidebar';


const DashboardLayout: React.FC = ({ children }) => {
  return (
    <>
      <ExpandedSidebar />

      <div className="plex-wrapper is-flex pb-6">
        <div className="wrapper-inner mb-3">
          <Notifier />
          <Navbar />

          <div className="dashboard-content is-relative" style={{ zIndex: 'auto', paddingTop: 0, height: '100%' }}>
            {children}
          </div>

        </div>
      </div>

    </>
  )
};

export default DashboardLayout;
