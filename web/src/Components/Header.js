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
          <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Welcome</Link></li>
          <li><Link to="/report-bug" className={location.pathname === '/report-bug' ? 'active' : ''}>Bug reports</Link></li>
          <li><Link to="/report-user" className={location.pathname === '/report-user' ? 'active' : ''}>User reports</Link></li>
          <li><Link to="/request-org" className={location.pathname === '/request-org' ? 'active' : ''}>Organizer requests</Link></li>
          <li><Link to="/list-act-org" className={location.pathname === '/list-act-org' ? 'active' : ''}>Activities with Organizers</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
