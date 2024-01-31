export const generateRandomPassword = (length = 12) => {
  const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*_+-=<>?';

  const getRandomChar = (charset) => {
    const randomIndex = Math.floor(Math.random() * charset.length);
    return charset[randomIndex];
  };

  let password = '';

  // Adding at least one lowercase letter, one uppercase letter, one number, and one symbol
  password += getRandomChar(lowercaseLetters);
  password += getRandomChar(uppercaseLetters);
  password += getRandomChar(numbers);
  password += getRandomChar(symbols);

  // Generate the remaining characters
  for (let i = 4; i < length; i++) {
    const randomCharset = lowercaseLetters + uppercaseLetters + numbers + symbols;
    password += getRandomChar(randomCharset);
  }

  // Shuffle the password to randomize the order
  password = password
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');

  return password;
};
