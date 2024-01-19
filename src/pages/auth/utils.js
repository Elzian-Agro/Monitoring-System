import { authRegex, errorType } from 'constant';

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

// Encryption
async function importPublicKey(pem) {
  // Base64 decode the string to get the binary data
  const binaryDerString = window.atob(pem);
  // Convert from a binary string to an ArrayBuffer
  const binaryDer = str2ab(binaryDerString);

  return window.crypto.subtle.importKey(
    'spki',
    binaryDer,
    {
      name: 'RSA-OAEP',
      hash: { name: 'SHA-256' }, // Specify the hash algorithm
    },
    true,
    ['encrypt']
  );
}

function str2ab(str) {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

export async function encryptData(data) {
  const publicKeyBase64 = process.env.REACT_APP_PUBLIC_KEY;
  const publicKey = await importPublicKey(publicKeyBase64);
  let enc = new TextEncoder();
  const encrypted = await window.crypto.subtle.encrypt(
    {
      name: 'RSA-OAEP',
    },
    publicKey,
    enc.encode(data)
  );
  return window.btoa(String.fromCharCode.apply(null, new Uint8Array(encrypted)));
}

//tokenise
export const tokenise = async (data) => {
  const expiryTime = new Date(new Date().getTime() + 2 * 60 * 1000).toUTCString();
  let token = JSON.stringify({ ...data, expiryTime: expiryTime });

  try {
    token = await encryptData(token);
  } catch (err) {
    throw err;
  }

  return token;
};

//error handling
const errorMessages = {};
Object.keys(errorType).forEach((key) => {
  errorMessages[errorType[key].code] = errorType[key].message;
});

export const identifyError = (code) => {
  return errorMessages[code] || 'Network error! Please try again later';
};
