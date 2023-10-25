import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { SecretKeys } from '../keys/secret-keys.enum';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private readonly key = SecretKeys.crypto;

  constructor() {}

  setEncryptedStorage(_key: string, _input: any) {
    let encryptedData = CryptoJS.RC4.encrypt(
      JSON.stringify(_input),
      this.key
    ).toString();

    localStorage.setItem(_key, encryptedData);
  }

  getEncryptedStorage(_key: string): any {
    let encryptedData = localStorage.getItem(_key)!;

    if (encryptedData) {
      let decryptedData = CryptoJS.RC4.decrypt(
        encryptedData,
        this.key
      ).toString(CryptoJS.enc.Utf8);

      return JSON.parse(decryptedData);
    } else {
      return null;
    }
  }

  deleteEncryptedStorageByKey(_key: string) {
    localStorage.removeItem(_key);
  }

  encrypt(data: any) {
    return CryptoJS.RC4.encrypt(data, this.key).toString();
  }

  decrypt(data: any) {
    return CryptoJS.RC4.decrypt(data, this.key).toString(CryptoJS.enc.Utf8);
  }
}
