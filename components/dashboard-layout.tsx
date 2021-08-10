import React from 'react';
import Navbar from '@/components/navbar/navbar';
import Notifier from '@/components/notifier';
import ExpandedSidebar from '@/components/sidebars/expanded-sidebar';
import LocationTitle from '@/components/location-title';


const DashboardLayout: React.FC = ({ children }) => {
  return (
    <>
      <LocationTitle />
      <ExpandedSidebar />

      <div className="plex-wrapper pb-6">
        <div className="wrapper-inner mb-6">
          <Notifier />
          <Navbar />

          <div className="dashboard-content" style={{ position: 'relative' }}>
            {children}
          </div>

        </div>
      </div>

    </>
  )
};

export default DashboardLayout;
