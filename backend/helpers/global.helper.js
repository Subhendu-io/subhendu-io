const CryptoJS = require('crypto-js');

module.exports.encryptPassword = async (_password, _secrate) => {
  let salt = CryptoJS.lib.WordArray.random(128 / 8);

  let key = CryptoJS.PBKDF2(_secrate, salt, {
    keySize    : 256 / 32,
    iterations : 100
  });

  let iv = CryptoJS.lib.WordArray.random(128 / 8);

  let encrypted = CryptoJS.AES.encrypt(_password, key, {
    iv      : iv,
    padding : CryptoJS.pad.Pkcs7,
    mode    : CryptoJS.mode.CBC
  });

  let encryptedPass = salt.toString() + iv.toString() + encrypted.toString();
  return encryptedPass;
};

module.exports.decryptPassword = async (_password, _secrate) => {
  let salt = CryptoJS.enc.Hex.parse(_password.substr(0, 32));
  let iv = CryptoJS.enc.Hex.parse(_password.substr(32, 32));
  let encrypted = _password.substring(64);

  let key = CryptoJS.PBKDF2(_secrate, salt, {
    keySize    : 256 / 32,
    iterations : 100
  });

  let decryptedPass = CryptoJS.AES.decrypt(encrypted, key, {
    iv      : iv,
    padding : CryptoJS.pad.Pkcs7,
    mode    : CryptoJS.mode.CBC
  });
  return decryptedPass.toString(CryptoJS.enc.Utf8);
};

module.exports.getEncrypted = async (data, key) => {
  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
  return encrypted;
};

module.exports.getDecrypted = async (data, key) => {
  const bytes = CryptoJS.AES.decrypt(data, key);
  const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decrypted;
};

module.exports.getEncryptedHex = async (data, key) => {
  const b64 = CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
  const e64 = await CryptoJS.enc.Base64.parse(b64);
  const eHex = e64.toString(CryptoJS.enc.Hex);
  return eHex;
};

module.exports.getDecryptedHex = async (cipherText, key) => {
  const reb64 = await CryptoJS.enc.Hex.parse(cipherText);
  const bytes = await reb64.toString(CryptoJS.enc.Base64);
  const decrypt = CryptoJS.AES.decrypt(bytes, key);
  const decrypted = JSON.parse(decrypt.toString(CryptoJS.enc.Utf8));
  return decrypted;
};

module.exports.getRandomString = async (_length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for(let i = 0; i < _length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

module.exports.getRandomNumber = async (_length) => {
  let result = '';
  const characters = '0123456789';
  const charactersLength = characters.length;
  for(let i = 0; i < _length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
