import React from 'react';
import Navbar from '@/components/navbar/navbar';
import Notifier from '@/components/notifier';
import ExpandedSidebar from '@/components/sidebars/expanded-sidebar';
import Footer from '@/components/footer';


const DashboardLayout: React.FC = ({ children }) => {
  return (
    <>
      <ExpandedSidebar />

      <div className="plex-wrapper is-flex is-flex-direction-column">
        <div className="wrapper-inner is-flex-grow-1 mb-3">
          <Notifier />
          <Navbar />

          <div className="dashboard-content is-relative" style={{ paddingTop: 0, height: '100%' }}>
            {children}
          </div>

        </div>

        <Footer />
      </div>

    </>
  )
};

export default DashboardLayout;
