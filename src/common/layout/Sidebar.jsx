import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [businessName, setBusinessName] = useState(
    localStorage.getItem('businessName') || 'SmartBiz'
  );

  useEffect(() => {
    const handleNameChange = () => {
      setBusinessName(localStorage.getItem('businessName') || 'SmartBiz');
    };
    
    window.addEventListener('businessNameChange', handleNameChange);
    return () => window.removeEventListener('businessNameChange', handleNameChange);
  }, []);
  
  const getNavClass = ({ isActive }) =>
    `nav-item${isActive ? ' active' : ''}`;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-brand">
        <h2 className="brand-name">{businessName}</h2>
        <button className="menu-toggle" onClick={onClose}>✕</button>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/home" className={getNavClass} end onClick={onClose}>
          <span className="nav-icon">⊞</span> Dashboard
        </NavLink>
        <NavLink to="/products" className={getNavClass} onClick={onClose}>
          <span className="nav-icon">📦</span> Products
        </NavLink>
        <NavLink to="/customers" className={getNavClass} onClick={onClose}>
          <span className="nav-icon">👥</span> Customers
        </NavLink>
        <NavLink to="/invoices" className={getNavClass} onClick={onClose}>
          <span className="nav-icon">📄</span> Invoices
        </NavLink>
        <NavLink to="/ledger" className={getNavClass} onClick={onClose}>
          <span className="nav-icon">📘</span> Ledger
        </NavLink>
        <NavLink to="/reports" className={getNavClass} onClick={onClose}>
          <span className="nav-icon">📊</span> Reports
        </NavLink>
        <NavLink to="/assistant" className={getNavClass} onClick={onClose}>
          <span className="nav-icon">🤖</span> AI Assistant
        </NavLink>
        <NavLink to="/settings" className={getNavClass} onClick={onClose}>
          <span className="nav-icon">⚙️</span> Settings
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <button type="button" className="nav-item logout" onClick={handleLogout}>
          <span className="nav-icon">🚪</span> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

