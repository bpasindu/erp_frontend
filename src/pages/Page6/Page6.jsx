import React from 'react';
import '../Page2/Page2.css';
import Sidebar from '../../common/layout/Sidebar';
import TopHeader from '../../common/layout/TopHeader';
import LedgerPage from '../../features/ledger/LedgerPage';

const Page6 = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className={`dashboard-layout ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <div className="sidebar-overlay" onClick={closeSidebar}></div>
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      <main className="main-content">
        <TopHeader onMenuClick={toggleSidebar} />
        <LedgerPage />
      </main>
    </div>
  );
};

export default Page6;

