export const authRegex = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])(?!.*\s)[A-Za-z\d\W_]{8,}$/,
};

export const patterns = {
  email: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
  nicNum: '^(\\d{9}[vV]|\\d{12})$',
  phoneNum: '^(0\\d{9}|[1-9]\\d{8})$',
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

  notificationNotFound: {
    code: 13016,
    message: 'Notification is not found',
  },

  notificationDeletedFailure: {
    code: 13017,
    message: 'Notification is deleted failure. Please try again!',
  },

  accessDenied: {
    code: 13019,
    message: 'Access denied',
  },

  fileNotUploaded: {
    code: 13020,
    message: 'No file uploaded. Please try again!',
  },

  userDisabled: {
    code: 13021,
    message: 'The account has been disabled',
  },

  deviceNotFound: {
    code: 13023,
    message: 'Device not found',
  },

  deviceCreatedFailure: {
    code: 13024,
    message: 'Device is already exist!',
  },

  userDoesNotExistOrIsDisabled: {
    code: 13025,
    message: 'User does not exist or is disabled',
  },
};

export const customTableStyles = {
  table: {
    style: {
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  headRow: {
    style: {
      backgroundColor: '#414345',
      color: '#ffffff',
    },
  },
  headCells: {
    style: {
      '&:last-child': {
        display: 'flex',
        justifyContent: 'center',
        minWidth: '300px',
      },
    },
  },
  rows: {
    style: {
      borderBottom: '1px solid #e3e5e8',
    },
  },
  cells: {
    style: {
      '&:last-child': {
        minWidth: '300px',
      },
    },
  },
};
