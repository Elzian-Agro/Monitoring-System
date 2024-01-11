import React, { useState } from 'react';
import logo from 'assets/images/logo.png';
import ForgotPassword from 'pages/auth/forgot-password';
import Login from 'pages/auth/login';
import ResetPassword from 'pages/auth/reset-password';
import LanguageSelector from 'pages/auth/components/base/LanguageSelector';

function LoginPage() {
  const [page, setPage] = useState('Login');

  return (
    <div className='flex justify-center items-center w-[100vw] h-[100dvh] bg-gradient-to-t from-[#DEE4EA] to-[#F9FCFF]'>
      <div className='w-[100%] h-[100%] sm:w-[95%] sm:h-[95%] md:w-[90%] md:h-[90%] bg-[#F9F9FA] shadow-2xl flex flex-col p-5 sm:p-10 gap-10 overflow-y-scroll no-scrollbar rounded-md'>
        <div className='flex justify-end items-center'>
          <LanguageSelector />
        </div>
        <div className='w-[100%] flex-1 flex flex-col justify-center lg:flex-row rounded-lg lg:gap-10'>
          <div className='flex-[0.5] lg:flex-[0.3] flex justify-center items-center lg:border-r-2 lg:px-10'>
            <img src={logo} alt='logo' className='max-w-[50%] xxs:max-w-[40%] sm:max-w-[30%] lg:max-w-[100%]' />
          </div>

          <div className='flex-[0.5] lg:flex-[1]'>
            {(() => {
              switch (page) {
                case 'ForgotPassword':
                  return <ForgotPassword setPage={setPage} />;
                case 'ResetPassword':
                  return <ResetPassword setPage={setPage} />;
                default:
                  return <Login setPage={setPage} />;
              }
            })()}
          </div>
        </div>

        <div className='flex justify-center items-center text-center text-[#ccc] font-zenkaku text-[12px]'>
          Copyright 2024 Elzian Agro. All Rights Reserved
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
