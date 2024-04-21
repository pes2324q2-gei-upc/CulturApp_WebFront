// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
//import "../Header.css"

function Header() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/report-bug">Report Bug</Link></li>
        <li><Link to="/report-user">Report User</Link></li>
        <li><Link to="/request-org">Request Org</Link></li>
      </ul>
    </nav>
  );
}

export default Header;
