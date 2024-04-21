// Header.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../stylesheet.css"

function Header() {
  const location = useLocation(); // Usa useLocation para obtener la ubicación actual

  return (
    <div className="container-menu">
      <h2>CulturApp Administrator</h2>
      <nav>
        <ul>
          <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
          <li><Link to="/report-bug" className={location.pathname === '/report-bug' ? 'active' : ''}>Report Bug</Link></li>
          <li><Link to="/report-user" className={location.pathname === '/report-user' ? 'active' : ''}>Report User</Link></li>
          <li><Link to="/request-org" className={location.pathname === '/request-org' ? 'active' : ''}>Request Org</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
