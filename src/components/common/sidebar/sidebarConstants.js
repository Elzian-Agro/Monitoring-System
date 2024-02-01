// sidebarConstants.js
import {
  Squares2X2Icon,
  UsersIcon,
  ArrowTrendingUpIcon,
  Cog6ToothIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

const sidebarLinks = [
  {
    to: '/dashboard',
    text: 'Dashboard',
    icon: Squares2X2Icon,
  },
  {
    to: '/users',
    text: 'Manage Users',
    icon: UsersIcon,
  },
  {
    to: '/orders',
    text: 'Orders',
    icon: ArrowTrendingUpIcon,
  },
  {
    to: '/analytics',
    text: 'Analytics',
    icon: ArrowTrendingUpIcon,
  },
  {
    to: '/settings',
    text: 'Settings',
    icon: Cog6ToothIcon,
  },
  {
    to: '/profile',
    text: 'My Profile',
    icon: UserCircleIcon,
  },
];

export { sidebarLinks };
