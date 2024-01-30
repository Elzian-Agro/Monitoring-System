import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from 'pages/auth/components/common/container';
import Dashboard from 'pages/dashboard';
import NotFoundPage from 'pages/404';
import ManageUsers from 'pages/dashboard/manage-users';
import PrivateRoutes from 'pages/utils/PrivateRoutes';
import UserProfilePage from 'pages/dashboard/user-profile-page';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path='/dashboard' element={<Dashboard />} />

          {/* Pages */}
          <Route path='/users' element={<Dashboard page={<ManageUsers />} />} />
          <Route path='/orders' element={<Dashboard />} />
          <Route path='/analytics' element={<Dashboard />} />
          <Route path='/settings' element={<Dashboard />} />
          <Route path='/profile' element={<Dashboard page={<UserProfilePage />} />} />

          {/* Charts */}
          <Route path='/pie' element={<Dashboard />} />

          <Route path='*' element={<NotFoundPage />} />
        </Route>

        {/* Below is the only route without Protected. */}
        <Route path='/' element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
