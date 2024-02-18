import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from 'pages/auth/components/common/container';
import Dashboard from 'pages/dashboard';
import NotFoundPage from 'pages/404';
import ManageUsers from 'pages/dashboard/pages/users-page';
import PrivateRoutes from 'pages/utils/PrivateRoutes';
import Weather from 'pages/dashboard/pages/weather-page';
import DeviceManagement from 'pages/dashboard/pages/devices-page';
import GlobalErrorModal from 'error';
import ResetForm from 'pages/dashboard/pages/profile-page/passowrd-reset-form';

import DashboardPage from 'pages/dashboard/pages/dashboard-page';
import AboutPage from 'pages/dashboard/pages/about-page';
import UserProfilePage from 'pages/dashboard/pages/profile-page';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path='/dashboard' element={<Dashboard page={<DashboardPage />} />} />

            {/* Pages */}
            <Route path='/weather' element={<Dashboard page={<Weather />} />} />
            <Route path='/about' element={<Dashboard page={<AboutPage />} />} />
            <Route path='/devices' element={<Dashboard page={<DeviceManagement />} />} />
            <Route path='/users' element={<Dashboard page={<ManageUsers />} />} />
            <Route path='/profile' element={<Dashboard page={<UserProfilePage />} />} />
            <Route path='/reset' element={<Dashboard page={<ResetForm />} />} />

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
