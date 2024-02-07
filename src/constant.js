export const authRegex = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  nicNumber: /^(\d{9}[vV]|\d{12})$/,
  phoneNumber: /^0?\d{9}$/,
};

export const characterSets = {
  lowercaseLetters: 'abcdefghijklmnopqrstuvwxyz',
  uppercaseLetters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '!@#$%&*+-=<>?',
};

export const menuMode = {
  open: 'open',
  partiallyOpen: 'onlyIcon',
  close: 'close',
};

export const errorType = {
  userBlocked: {
    code: 13001,
    message: 'User is blocked! Contact admin',
  },

  authenticationFailed: {
    code: 13002,
    message: 'Authentication failed! Please log in again',
  },

  incorrectTempPassword: {
    code: 13003,
    message: 'Incorrect Temporary Password',
  },

  timeOut: {
    code: 13004,
    message: 'Time Out',
  },

  invalidCredentials: {
    code: 13005,
    message: 'Invalid email or password',
  },

  userNotFound: {
    code: 13007,
    message: 'User Not Found!',
  },

  userAlreadyExist: {
    code: 13008,
    message: 'NIC or Email Address already exists',
  },

  serverError: {
    code: 13009,
    message: 'Oops! an error occured. Please try again later',
  },

  connectionError: {
    code: 13010,
    message: 'Oops! an error occured. Please try again later',
  },

  emailNotVerified: {
    code: 13011,
    message: 'Email address not verified',
  },

  noRecords: {
    code: 13015,
    message: 'No records found',
  },

  accessDenied: {
    code: 13019,
    message: 'Access denied',
  },
};

export const customTableStyles = {
  headRow: {
    style: {
      backgroundColor: '#494d4a',
      color: '#ffffff',
    },
  },
  rows: {
    style: {
      borderBottom: '1px solid #e3e5e8',
    },
  },
  cells: {
    style: {
      '&:first-child': {
        borderLeft: '1px solid #e3e5e8',
      },
    },
  },
};
