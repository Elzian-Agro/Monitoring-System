import { authRegex, errorType } from 'utils/constant';

// Email validation function
export const isValidEmail = (email) => {
  return authRegex.email.test(email);
};

// Password validation function
export const isValidPassword = (password) => {
  // Validate password for minimum 8 characters, at least one uppercase letter,
  // one lowercase letter, one number, and one special character
  return authRegex.password.test(password);
};

//error handling
const errorMessages = {};
Object.keys(errorType).forEach((key) => {
  errorMessages[errorType[key].code] = errorType[key].message;
});

export const identifyError = (code) => {
  return errorMessages[code] || 'Network error! Please try again later';
};
