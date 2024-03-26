import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from 'pages/auth/components/common/container';
import Layout from 'pages/dashboard/components/common/layout';
import NotFoundPage from 'pages/404';
import ManageUsers from 'pages/dashboard/pages/users-page';
import PrivateRoutes from 'pages/utils/PrivateRoutes';
import Weather from 'pages/dashboard/pages/weather-page';
import DeviceManagement from 'pages/dashboard/pages/devices-page';
import GlobalErrorModal from 'error';
import ResetForm from 'pages/dashboard/pages/profile-page/password-reset-form';

import DashboardPage from 'pages/dashboard/pages/dashboard-page';
import AboutUsPage from 'pages/dashboard/pages/about-page';
import UserProfilePage from 'pages/dashboard/pages/profile-page';
import AgroEye from 'pages/dashboard/pages/agro-eye-page';
import Temp from 'hooks/temp';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={<LoginPage />} />

          {/* Below is the only route with Protected. */}
          <Route element={<PrivateRoutes />}>
            <Route path='/' element={<Layout />}>
              <Route path='/' element={<DashboardPage />} />
              <Route path='/dashboard' element={<DashboardPage />} />
              <Route path='/weather' element={<Weather />} />
              <Route path='/devices' element={<DeviceManagement />} />
              <Route path='/users' element={<ManageUsers />} />
              <Route path='/agro' element={<AgroEye />} />
              <Route path='/profile' element={<UserProfilePage />} />
              <Route path='/about' element={<AboutUsPage />} />
              <Route path='/reset' element={<ResetForm />} />

              <Route path='*' element={<NotFoundPage />} />
            </Route>
          </Route>
        </Routes>
      </Router>

      <GlobalErrorModal />
    </>
  );
}

export default App;
