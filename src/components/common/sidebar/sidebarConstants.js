import { Squares2X2Icon, UsersIcon, ArrowTrendingUpIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const getSidebarLinks = (t) => [
  {
    to: '/dashboard',
    text: t('Dashboard'),
    icon: Squares2X2Icon,
  },
  {
    to: '/weather',
    text: t('Weather'),
    icon: ArrowTrendingUpIcon,
  },
  {
    to: '/devicemanagement',
    text: t('Device Management'),
    icon: ArrowTrendingUpIcon,
  },
  {
    to: '/users',
    text: t('Manage Users'),
    icon: UsersIcon,
  },
  {
    to: '/profile',
    text: t('My Profile'),
    icon: UserCircleIcon,
  },
];

export { getSidebarLinks };
