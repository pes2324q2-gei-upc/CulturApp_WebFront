//import logo from './logo.svg';  
//import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './Home';
import Header from './Header';
import ReportBug from './ReportBug';
import ReportUser from './ReportUser';
import RequestOrg from './RequestOrg';

function App() {
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the home page!</p>
    </div>
    /*
    <Router>
      <div>
        <Header />
          <Route exact path="/" component={Home} />
          <Route path="/report-bug" component={ReportBug} />
          <Route path="/report-user" component={ReportUser} />
          <Route path="/request-org" component={RequestOrg} />
      </div>
    </Router>
    */
  );
}

export default App;