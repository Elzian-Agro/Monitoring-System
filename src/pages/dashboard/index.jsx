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
      return 'sm:ml-60';
    case 'onlyIcon':
      return 'sm:ml-20';
    default:
      return 'sm:ml-0';
  }
};

const Dashboard = ({ page }) => {
  const activeMenu = useSelector(selectActiveMenu);
  const sidebarWidth = getSidebarWidth(activeMenu);
  const mainContentMargin = getMainContentMargin(activeMenu);
  const currentTheme = useSelector(selectTheme);
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

  useEffect(() => {
    if (currentTheme === 'Dark') {
      document.body.style.backgroundColor = '#20232A';
    } else {
      document.body.style.backgroundColor = '#FAFBFB';
    }
  }, [currentTheme]);

  return (
    <div className={currentTheme === 'Dark' ? 'dark' : ''}>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Navbar mainContentMargin={mainContentMargin} />
          <div className={`${mainContentMargin} mt-16`}>{page}</div>
          <Sidebar sidebarWidth={sidebarWidth} />
        </div>
      )}
    </div>
  );
};

Dashboard.propTypes = {
  page: PropTypes.element.isRequired,
};

export default Dashboard;
