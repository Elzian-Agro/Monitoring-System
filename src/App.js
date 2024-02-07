import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from 'pages/auth/components/common/container';
import Dashboard from 'pages/dashboard';
import NotFoundPage from 'pages/404';
import ManageUsers from 'pages/dashboard/manage-users';
import PrivateRoutes from 'pages/utils/PrivateRoutes';
import UserProfilePage from 'pages/dashboard/user-profile-page';
import Weather from 'pages/dashboard/weather';
import DeviceManagement from 'pages/dashboard/device-management';
import GlobalErrorModal from 'error';
import UserResetPassword from 'pages/dashboard/user-reset-password';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path='/dashboard' element={<Dashboard />} />

            {/* Pages */}
            <Route path='/weather' element={<Dashboard page={<Weather />} />} />
            <Route path='/devicemanagement' element={<Dashboard page={<DeviceManagement />} />} />
            <Route path='/users' element={<Dashboard page={<ManageUsers />} />} />
            <Route path='/profile' element={<Dashboard page={<UserProfilePage />} />} />
            <Route path='/reset' element={<Dashboard page={<UserResetPassword />} />} />

            {/* Charts */}

            <Route path='*' element={<NotFoundPage />} />
          </Route>

          {/* Below is the only route without Protected. */}
          <Route path='/' element={<LoginPage />} />
        </Routes>
      </Router>

      <GlobalErrorModal />
    </>
  );
}

export default App;
