// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
//import "../Header.css"
import "../stylesheet.css"

function Header() {
  return (
    <div className="container">
      <div className="container-menu">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/report-bug">Report Bug</Link></li>
            <li><Link to="/report-user">Report User</Link></li>
            <li><Link to="/request-org">Request Org</Link></li>
          </ul>
        </nav>
      </div>
      <div className="content">
        
      </div>
    </div>
  );
}

export default Header;
