import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  getJwtUser(token) {
    const jwtData = token.split('.')[1];
    const decodedJwtJsonData = window.atob(jwtData);
    const userData = JSON.parse(decodedJwtJsonData);

    return userData;
  }
  getEncrypted(data) {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), environment.CRYPTO_KEY).toString();

    return encrypted;
  }
  getDecrypted(data) {
    const bytes = CryptoJS.AES.decrypt(data, environment.CRYPTO_KEY);
    const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    return decrypted;
  }
  getEncryptedHex(data) {
    const b64 = CryptoJS.AES.encrypt(JSON.stringify(data), environment.CRYPTO_KEY).toString();
    const e64 = CryptoJS.enc.Base64.parse(b64);
    const eHex = e64.toString(CryptoJS.enc.Hex);
    return eHex;
  }
  getDecryptedHex(cipherText) {
    const reb64 = CryptoJS.enc.Hex.parse(cipherText);
    const bytes = reb64.toString(CryptoJS.enc.Base64);
    const decrypt = CryptoJS.AES.decrypt(bytes, environment.CRYPTO_KEY);
    const decrypted = JSON.parse(decrypt.toString(CryptoJS.enc.Utf8));
    return decrypted;
  }
  getRedirect(url, data, requestType, isBlank) {
    const mapForm = document.createElement('form');
    mapForm.target = isBlank ? '_blank' : '';
    mapForm.method = requestType;
    mapForm.action = url;
    Object.keys(data).forEach(param => {
      const mapInput = document.createElement('input');
      mapInput.type = 'hidden';
      mapInput.name = param;
      mapInput.setAttribute('value', data[param]);
      mapForm.appendChild(mapInput);
    });
    document.body.appendChild(mapForm);
    mapForm.submit();
  }
}
