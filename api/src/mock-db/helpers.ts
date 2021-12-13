import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import CONSTANTS from '../contants/constants';
import { IDiscountData, IRequestGenerateSingleCouponCode } from './interfaces';
import {
  stringEncryptor,
  stringDecryptor,
  couponGenerator,
} from '../utils/encryptor';
import { Logger } from '../logger';

const DEFAULT_ENCODING = 'utf8';

function readFromDB(): Promise<IDiscountData[] | any[]> {
  return new Promise((resolve) => {
    fs.readFile(
      path.join(__dirname, CONSTANTS.DB_FILE_NAME),
      DEFAULT_ENCODING,
      (error, data) => {
        if (error) {
          return resolve([]);
        }
        return resolve(JSON.parse(data));
      }
    );
  });
}

function writeToDB(data: IDiscountData[]) {
  return new Promise((resolve, reject) => {
    fs.writeFile(
      path.join(__dirname, CONSTANTS.DB_FILE_NAME),
      JSON.stringify(data, null, 2),
      (error) => {
        if (error) {
          return reject(error);
        }

        return resolve(true);
      }
    );
  });
}

export async function getDecryptedCouponCodes() {
  try {
    const data: IDiscountData[] = await readFromDB();
    let decryptedData: IDiscountData[] | any[] = [];
    if (!data || !data.length) {
      return decryptedData;
    }
    decryptedData = data.map((coupone: IDiscountData) => ({
      ...coupone,
      code: stringDecryptor(coupone.code),
    }));
    return decryptedData;
  } catch (error) {
    Logger.error('Unexpected error in getDecryptedCouponCodes', error);
    return [];
  }
}

export async function insertCode(encryptedCouponCode: IDiscountData) {
  try {
    if (!encryptedCouponCode) {
      return null;
    }
    const data: IDiscountData[] = await readFromDB();
    const decryptedCode = stringDecryptor(encryptedCouponCode.code);
    if (!decryptedCode) {
      return null;
    }
    data.push(encryptedCouponCode);
    const isInsterted = await writeToDB(data);
    if (!isInsterted) {
      return null;
    }
    return { ...encryptedCouponCode, code: decryptedCode };
  } catch (error) {
    Logger.error('Unexpected error during insert code', error);
    return null;
  }
}

export async function getTargetCode(val: string, isCode?: boolean) {
  try {
    const data: IDiscountData[] = await readFromDB();
    if (!data || !data.length) {
      return null;
    }
    const targetCode = data.find((code: IDiscountData) => {
      if (isCode) {
        const encryptedCode = stringEncryptor(val);
        return code.code === encryptedCode;
      }
      return code.id === val;
    });
    if (!targetCode) {
      return null;
    }
    const targetCodeIndex = data
      .map((code: IDiscountData) => code.id)
      .indexOf(targetCode.id);
    return { data, targetCode, targetCodeIndex };
  } catch (error) {
    Logger.error('Unexpected in getTargetCodeById', error);
    return null;
  }
}

export async function deleteCodeById(codeId: string) {
  try {
    const result = await getTargetCode(codeId);
    if (!result) {
      return false;
    }
    const { data, targetCodeIndex } = result;
    data.splice(targetCodeIndex, 1);
    const isDeleted = await writeToDB(data);
    if (!isDeleted) {
      return false;
    }
    return true;
  } catch (error) {
    Logger.error('Unexpected in deleteCodeById', error);
    return false;
  }
}

export async function deactivateCodeById(codeId: string) {
  try {
    const result = await getTargetCode(codeId);
    if (!result) {
      return null;
    }
    const { data, targetCode, targetCodeIndex } = result;
    targetCode.isActive = false;
    data.splice(targetCodeIndex, 1, targetCode);
    const isDeactivated = await writeToDB(data);
    if (!isDeactivated) {
      return null;
    }
    return true;
  } catch (error) {
    Logger.error('Unexpected in deactivateCodeById', error);
    return null;
  }
}

export function generateCouponCode({
  isPercent,
  discountMount,
  expireDate,
  isAmount,
}: IRequestGenerateSingleCouponCode['body']) {
  const uniqueCouponCode = couponGenerator();
  const encryptedCode = stringEncryptor(uniqueCouponCode);
  if (encryptedCode) {
    return {
      id: uuidv4(),
      code: encryptedCode,
      isPercent,
      isAmount,
      discountMount,
      expireDate: new Date(expireDate),
      isActive: true,
      createdAt: new Date(),
    };
  }
  return null;
}
