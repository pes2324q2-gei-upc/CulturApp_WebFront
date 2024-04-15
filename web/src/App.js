//import logo from './logo.svg';  
//import './App.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Header from './Header';
import ReportBug from './ReportBug';
import ReportUser from './ReportUser';
import RequestOrg from './RequestOrg';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', height: '100vh' }}>
        <div style={{ flex: '0 0 200px', backgroundColor: 'lightgray', padding: '20px' }}>
          {/* Routes inside the left gray space */}
          <Header />
        </div>
        <div style={{ flex: '1', height: '100%', overflowY: 'auto', padding: '20px'  }}>
          {/* Main content goes here */}
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/report-bug" element={<ReportBug />} />
            <Route path="/report-user" element={<ReportUser />} />
            <Route path="/request-org" element={<RequestOrg />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;