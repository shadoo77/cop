import crypto from 'crypto';
import { Logger } from '../logger';
import ENV from './config';
import CONSTANTS from '../contants/constants';

const algorithm = 'AES-256-CBC';
const Securitykey = ENV.ENCRYPTION_KEY || CONSTANTS.ENCRYPTION_KEY;
const salt = ENV.ENCRYPTION_SALT || CONSTANTS.ENCRYPTION_SALT;

const key = crypto.createHash('sha256').update(Securitykey, 'utf8').digest('hex').substr(0, 32);

const iv = crypto.createHash('sha256').update(salt, 'utf8').digest('hex').substr(0, 16);

export function stringEncryptor(str: string) {
  try {
    const encryptor = crypto.createCipheriv(algorithm, key, iv);
    const encryptedString = encryptor.update(str, 'utf8', 'hex') + encryptor.final('hex');
    return Buffer.from(encryptedString).toString('base64');
  } catch (err) {
    Logger.error('Error by dataEncrypter function : ', err);
    return null;
  }
}

export function stringDecryptor(encryptedString: string) {
  try {
    const encryptedText = Buffer.from(encryptedString, 'base64').toString('utf-8');
    const decryptor = crypto.createDecipheriv(algorithm, key, iv);
    return decryptor.update(encryptedText, 'hex', 'utf8') + decryptor.final('utf8');
  } catch (err) {
    Logger.error('Error by dataDecrypter function : ', err);
    return null;
  }
}

export function couponGenerator() {
  let coupon = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  for (let i = 0; i <= 15; i++) {
    coupon += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return coupon;
}

export default {};
