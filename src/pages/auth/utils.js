// Email validation function
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation function
export const isValidPassword = (password) => {
  // Validate password for minimum 8 characters, at least one uppercase letter,
  // one lowercase letter, one number, and one special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// Encryption
async function importPublicKey(pem) {
  // Fetch the part of the PEM string between the header and footer
  const pemHeader = '-----BEGIN PUBLIC KEY-----';
  const pemFooter = '-----END PUBLIC KEY-----';
  const pemContents = pem.substring(pemHeader.length, pem.length - pemFooter.length);
  // Base64 decode the string to get the binary data
  const binaryDerString = window.atob(pemContents);
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
  const publicKeyBase64 =
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsSJkAY0WeNXdS/Nq1Wf0U5WfSUvwoxOAjXwAxDSqHSOTBshJWtcjFW0UNLgXxvdR6mA9x6L4A10SIe0p5gj7AO2ibrc+WWYwZb1whlUG5rd7FDSy+Agt2I+3cJWcT1MYsPkZIvW/p+Livtd1DH4gzCA0IidYlL5fJY4IvTtZBY4JQ1LpAHAOAHGvAGD6ylbw2Uv2e9iLx27mJma9UFPBJTFUSaJjyL8n6olYneQMUggE5enfFFgr46ZtCSi5LmLEq11P0DjM9KY1Au5r/fgNlnd2aNDCkIdvlIKX395D1f6pmAF2o4UfeWeq7IjCx2AoNNIebyTU8ld6xrvpV3itiwIDAQAB';
  const publicKeyPem = `-----BEGIN PUBLIC KEY-----\n${publicKeyBase64}\n-----END PUBLIC KEY-----`;
  const publicKey = await importPublicKey(publicKeyPem);
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
  const expiryTime = new Date(new Date().getTime() + (2 * 60 * 1000)).toGMTString();
  let token = JSON.stringify({ ...data, expiry: expiryTime });

  try {
    token = await encryptData(token);
  } catch (err) {
    throw err;
  }

  return token;
};

