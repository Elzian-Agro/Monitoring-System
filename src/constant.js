import { ChatBubbleBottomCenterIcon } from '@heroicons/react/24/outline';

export const authRegex = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
};

export const menuMode = {
  open: 'open',
  partiallyOpen: 'onlyIcon',
  close: 'close',
};

export const userProfileData = [
  {
    icon: <ChatBubbleBottomCenterIcon className='h-6 w-6' />,
    title: 'My Profile',
    desc: 'Account Settings',
    iconColor: '#03C9D7',
    iconBg: '#E5FAFB',
  },
];

export const errorType = {
  invalidCredentials: {
    code: 13005,
    message: 'Invalid email or password',
  },

  timeOut: {
    code: 13004,
    message: 'Time Out',
  },

  serverError: {
    code: 13009,
    message: 'Oops! an error occured. Please try again later',
  },

  connectionError: {
    code: 13010,
    message: 'Oops! an error occured. Please try again later',
  },

  userNotFound: {
    code: 13007,
    message: 'User Not Found!',
  },

  userBlocked: {
    code: 13001,
    message: 'User is blocked! Contact admin',
  },

  incorrectTempPassword: {
    code: 13003,
    message: 'Incorrect Temporary Password',
  },

  emailNotVerified: {
    code: 13011,
    message: 'Email address not verified',
  },
};

export const customTableStyles = {
  header: {
    style: {
      minHeight: '56px',
    },
  },
  headCells: {
    style: {
      borderTopStyle: 'solid',
      borderTopWidth: '2px',
      borderTopColor: 'black',
      fontWeight: 'bold',
      justifyContent: 'center',
      '&:not(:last-child)': {
        borderRightStyle: 'solid',
        borderRightWidth: '2px',
        borderRightColor: 'black',
      },
    },
  },
  cells: {
    style: {
      borderTopStyle: 'solid',
      borderTopWidth: '2px',
      borderTopColor: 'black',
      '&:not(:last-child)': {
        borderRightStyle: 'solid',
        borderRightWidth: '2px',
        borderRightColor: 'black',
      },
    },
  },
};
