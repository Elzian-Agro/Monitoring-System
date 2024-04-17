import './index.css';
import Navbar from 'components/common/navbar';
import Sidebar from 'components/common/sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { selectActiveMenu, selectTheme } from '../../../slice/dashboardLayoutSlice';
import { useEffect } from 'react';
import { setUserData } from 'pages/dashboard/slice/userSlice';
import Loader from '../loader';
import useNotification from 'hooks/useNotification';
import { Outlet } from 'react-router';
import useFetch from 'hooks/useFetch';
import useAxios from 'hooks/useAxios';
import { useNavigate } from 'react-router-dom';

const getSidebarWidth = (activeMenu) => {
  switch (activeMenu) {
    case 'open':
      return 'w-60';
    case 'onlyIcon':
      return 'w-20';
    default:
      return 'w-0';
  }
};

const getMainContentMargin = (activeMenu) => {
  switch (activeMenu) {
    case 'open':
      return 'sm:ml-60';
    case 'onlyIcon':
      return 'ml-20';
    default:
      return 'ml-0';
  }
};

const Layout = () => {
  const activeMenu = useSelector(selectActiveMenu);
  const sidebarWidth = getSidebarWidth(activeMenu);
  const mainContentMargin = getMainContentMargin(activeMenu);
  const currentTheme = useSelector(selectTheme);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { response: userData, loader } = useFetch({
    endpoint: 'user/profile',
    method: 'GET',
    call: 1,
    requestBody: {},
    dependency: [],
  });
  const { send } = useAxios();

  useEffect(() => {
    const verifyUser = async () => {
      const response = await send({ endpoint: 'auth/verify', method: 'POST' });
      if (response?.code !== 14017) {
        navigate('/login');
      } else {
        dispatch(setUserData(userData));
      }
    };

    verifyUser();
    // eslint-disable-next-line
  }, [userData]);

  useNotification();

  useEffect(() => {
    if (currentTheme === 'Dark') {
      document.body.style.backgroundColor = '#20232A';
    } else {
      document.body.style.backgroundColor = '#FAFBFB';
    }
  }, [currentTheme]);

  return (
    <div className={currentTheme === 'Dark' ? 'dark' : ''}>
      {loader ? (
        <Loader />
      ) : (
        <div>
          <Navbar mainContentMargin={mainContentMargin} />
          <div className={`${mainContentMargin} mt-16`}>
            <Outlet />
          </div>
          <Sidebar sidebarWidth={sidebarWidth} />
        </div>
      )}
    </div>
  );
};

export default Layout;
