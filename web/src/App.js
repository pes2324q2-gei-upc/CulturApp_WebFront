import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthWrapper } from './Logic/AuthWrapper'; // Import AuthWrapper
import { RenderRoutes } from './Logic/RenderRoutes';

function App() {
  return (
    <Router>
      <AuthWrapper> {/* Wrap RenderRoutes with AuthWrapper */}
        <RenderRoutes/>
      </AuthWrapper>
    </Router>
  );
}

export default App;
