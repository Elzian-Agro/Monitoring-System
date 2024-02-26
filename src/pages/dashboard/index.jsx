import './index.css';
import Navbar from 'components/common/navbar';
import Sidebar from 'components/common/sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { selectActiveMenu, selectTheme } from './slice/dashboardLayoutSlice';
import { useEffect } from 'react';
import { setUserData } from 'pages/dashboard/slice/userSlice';
import useAxios from 'hooks/useAxios';
import PropTypes from 'prop-types';
import Loader from './components/common/loader';

const getSidebarWidth = (activeMenu) => {
  switch (activeMenu) {
    case 'open':
      return 'w-56 md:w-60 fixed';
    case 'onlyIcon':
      return 'w-30';
    default:
      return 'w-0';
  }
};

const getMainContentMargin = (activeMenu) => {
  switch (activeMenu) {
    case 'open':
      return 'ml-56 md:ml-60';
    case 'onlyIcon':
      return 'md:ml-2';
    default:
      return 'flex-2';
  }
};

const Dashboard = ({ page }) => {
  const activeMenu = useSelector(selectActiveMenu);
  const sidebarWidth = getSidebarWidth(activeMenu);
  const mainContentMargin = getMainContentMargin(activeMenu);
  const userId = useSelector((state) => state.user._id);
  const currentMode = useSelector(selectTheme);

  const dispatch = useDispatch();
  const { loading, send } = useAxios();

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await send({ endpoint: 'user/profile', method: 'GET' });
      dispatch(setUserData(userData));
    };
    fetchUserData();
    // eslint-disable-next-line
  }, [userId]);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      {loading ? (
        <Loader />
      ) : (
        <div className='flex relative dark:bg-main-dark-bg bg-gray-100'>
          <div className={`${sidebarWidth} z-20 md:z-0 dark:bg-secondary-dark-bg shadow-2xl dark:shadow-none bg-white`}>
            <Sidebar />
          </div>

          <div className={`${mainContentMargin} dark:bg-main-dark-bg bg-main-bg min-h-screen w-full`}>
            <div className='z-10 bg-main-bg dark:bg-main-dark-bg w-full'>
              <Navbar />
              {page}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Dashboard.propTypes = {
  page: PropTypes.element.isRequired,
};

export default Dashboard;
