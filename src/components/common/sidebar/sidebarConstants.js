// sidebarConstants.js
import { Squares2X2Icon, UserIcon, ArrowTrendingUpIcon, Cog6ToothIcon, PlusIcon } from '@heroicons/react/24/outline';

const sidebarLinks = [
  {
    to: '/dashboard',
    text: 'Dashboard',
    icon: Squares2X2Icon,
  },
  {
    to: '/customer',
    text: 'Customers',
    icon: UserIcon,
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
    to: '/addProducts',
    text: 'Add Products',
    icon: PlusIcon,
  },
];

export { sidebarLinks };
