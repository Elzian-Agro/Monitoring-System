import {
  Squares2X2Icon,
  UsersIcon,
  UserCircleIcon,
  CloudIcon,
  DevicePhoneMobileIcon,
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
      to: '/weather',
      text: t('Weather'),
      icon: CloudIcon,
    },
    {
      to: '/devicemanagement',
      text: t('Device Management'),
      icon: DevicePhoneMobileIcon,
    },
  ];

  if (userType === 'admin') {
    sidebarLinks.push({
      to: '/users',
      text: t('Manage Users'),
      icon: UsersIcon,
    });
  }

  // Add the '/profile' link to the end of the array
  sidebarLinks.push({
    to: '/profile',
    text: t('My Profile'),
    icon: UserCircleIcon,
  });

  return sidebarLinks;
};

export default SidebarLinks;
