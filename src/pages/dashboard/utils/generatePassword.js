import { characterSets } from 'constant';

export const generatePassword = (length = 12) => {
  const { lowercaseLetters, uppercaseLetters, numbers, symbols } = characterSets;

  const getRandomChar = (charset) => charset[Math.floor(Math.random() * charset.length)];

  const requiredCharTypes = [lowercaseLetters, uppercaseLetters, numbers, symbols];

  const password = [];

  // Adding at least one lowercase letter, one uppercase letter, one number, and one symbol
  requiredCharTypes.forEach((charset) => {
    password.push(getRandomChar(charset));
  });

  // Generate remaining characters randomly from all charsets
  for (let i = requiredCharTypes.length; i < length; i++) {
    const randomCharset = lowercaseLetters + uppercaseLetters + numbers + symbols;
    password.push(getRandomChar(randomCharset));
  }

  // Shuffle characters for randomness
  return password.sort(() => Math.random() - 0.5).join('');
};
