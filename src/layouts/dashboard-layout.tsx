import React from 'react';
import Navbar from '@/components/navbar/navbar';
import Notifier from '@/components/notifier';
import ExpandedSidebar from '@/components/sidebars/expanded-sidebar';


const DashboardLayout: React.FC = ({ children }) => {
  return (
    <>
      <ExpandedSidebar />

      <div className="plex-wrapper pb-6">
        <div className="wrapper-inner mb-6">
          <Notifier />
          <Navbar />

          <div className="dashboard-content is-relative" style={{ zIndex: 'auto', paddingTop: 0 }}>
            {children}
          </div>

        </div>
      </div>

    </>
  )
};

export default DashboardLayout;
