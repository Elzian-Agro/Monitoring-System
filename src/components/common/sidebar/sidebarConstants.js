import {
  Squares2X2Icon,
  UsersIcon,
  UserCircleIcon,
  CloudIcon,
  DevicePhoneMobileIcon,
  ChartBarIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';

const SidebarLinks = ({ t }) => {
  const userType = useSelector((state) => state.user.userType);

  const sidebarLinks = [
    {
      to: '/dashboard',
      text: t('Dashboard'),
      icon: Squares2X2Icon,
    },
    {
      to: '/agro',
      text: t('Agro Eye'),
      icon: ChartBarIcon,
    },
    {
      to: '/portable-device',
      text: t('Portable Device'),
      icon: ChartBarIcon,
    },
    {
      to: '/weather',
      text: t('Weather'),
      icon: CloudIcon,
    },
    {
      to: '/devices',
      text: t('Manage Devices'),
      icon: DevicePhoneMobileIcon,
    },
    {
      to: '/profile',
      text: t('My Profile'),
      icon: UserCircleIcon,
    },
    {
      to: '/about',
      text: t('About Us'),
      icon: LightBulbIcon,
    },
  ];

  if (userType === 'admin') {
    sidebarLinks.splice(3, 0, {
      to: '/users',
      text: t('Manage Users'),
      icon: UsersIcon,
    });
  }

  return sidebarLinks;
};

export default SidebarLinks;
