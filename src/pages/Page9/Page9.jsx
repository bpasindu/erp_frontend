import React from 'react';
import '../Page2/Page2.css';
import Sidebar from '../../common/layout/Sidebar';
import TopHeader from '../../common/layout/TopHeader';
import SettingsPage from '../../features/settings/SettingsPage';

const Page9 = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className={`dashboard-layout ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <div className="sidebar-overlay" onClick={closeSidebar}></div>
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      <main className="main-content">
        <TopHeader onMenuClick={toggleSidebar} />
        <SettingsPage />
      </main>
    </div>
  );
};

export default Page9;

