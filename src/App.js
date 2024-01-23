import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from 'pages/auth/components/common/container';
import Dashboard from 'pages/dashboard';
import NotFoundPage from 'pages/404';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/dashboard' element={<Dashboard />} />

        {/* Pages */}
        <Route path='/customer' element={<Dashboard />} />
        <Route path='/orders' element={<Dashboard />} />
        <Route path='/analytics' element={<Dashboard />} />
        <Route path='/settings' element={<Dashboard />} />
        <Route path='/addProducts' element={<Dashboard />} />

        {/* Charts */}
        <Route path='/pie' element={<Dashboard />} />

        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
