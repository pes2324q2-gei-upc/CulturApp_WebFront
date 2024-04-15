//import logo from './logo.svg';  
//import './App.css';

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { RenderRoutes } from './Logic/RenderRoutes';


function App() {
  return (
    <Router>
      <RenderRoutes/>
    </Router>
  );
}

export default App;