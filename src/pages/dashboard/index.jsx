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
      return 'ml-60';
    case 'onlyIcon':
      return 'ml-20';
    default:
      return 'ml-0';
  }
};

const Dashboard = ({ page }) => {
  const activeMenu = useSelector(selectActiveMenu);
  const sidebarWidth = getSidebarWidth(activeMenu);
  const mainContentMargin = getMainContentMargin(activeMenu);
  const currentMode = useSelector(selectTheme);

  const dispatch = useDispatch();
  const { loading, send } = useAxios();

  const fetchUserData = async () => {
    const userData = await send({ endpoint: 'user/profile', method: 'GET' });
    dispatch(setUserData(userData));
  };

  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      {loading ? (
        <Loader />
      ) : (
        <div className='bg-main-bg dark:bg-main-dark-bg'>
          <Navbar />
          <Sidebar sidebarWidth={sidebarWidth} />
          <div className={`${mainContentMargin} mt-16`}>{page}</div>
        </div>
      )}
    </div>
  );
};

Dashboard.propTypes = {
  page: PropTypes.element.isRequired,
};

export default Dashboard;
