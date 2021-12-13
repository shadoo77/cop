import { Request, Response } from 'express';
import { Logger } from '../logger';
import {
  deactivateCodeById,
  deleteCodeById,
  generateCouponCode,
  getDecryptedCouponCodes,
  getTargetCode,
  insertCode,
} from '../mock-db/helpers';
import {
  IRequestGenerateSingleCouponCode,
  ICouponCodeRequest,
  IGetCouponByCodeRequest,
} from '../mock-db/interfaces';
import { stringDecryptor } from '../utils/encryptor';

function couponController() {
  const getCouponByCode = async (
    req: IGetCouponByCodeRequest,
    res: Response
  ) => {
    try {
      Logger.enter('/coupon/getCouponByCode');
      const { code } = req.query;
      if (!code) {
        Logger.error(
          `Unexpected error on /coupon/getCouponByCode/[[ code: ${code}]], couponCode not found!`
        );
        return res.status(500).send('Unexpected error on getCouponByCode!');
      }
      const result = await getTargetCode(code, true);
      if (!result) {
        return res.status(400).send('This code is not found!');
      }
      const { targetCode } = result;
      const decryptedCode = stringDecryptor(targetCode.code);
      targetCode.code = decryptedCode || targetCode.code;

      Logger.exit('/coupon/getCouponByCode');
      return res.status(200).send(targetCode);
    } catch (err) {
      Logger.error('Unexpected error by route /coupon/getCouponByCode', err);
      return res.status(500).send(err);
    }
  };

  const getExistingCouponCodes = async (req: Request, res: Response) => {
    try {
      Logger.enter('/coupon/getAll');
      const couponCodes = await getDecryptedCouponCodes();
      Logger.exit('/coupon/getAll');
      return res.status(200).send(couponCodes);
    } catch (err) {
      Logger.error('Unexpected error by route /coupon/getAll', err);
      return res.status(500).send(err);
    }
  };

  const generateSingleCouponCode = async (
    req: IRequestGenerateSingleCouponCode,
    res: Response
  ) => {
    try {
      Logger.enter('/coupon/generateSingleCoupon');
      const encryptedCode = generateCouponCode(req.body);
      if (!encryptedCode) {
        return res.status(400).send(null);
      }
      const decryptedCouponCode = await insertCode(encryptedCode);
      Logger.exit('/coupon/generateSingleCoupon');
      return res.status(200).send(decryptedCouponCode);
    } catch (err) {
      Logger.error(
        'Unexpected error by route /coupon/generateSingleCoupon',
        err
      );
      return res.status(500).send(err);
    }
  };

  const deleteCoupon = async (req: ICouponCodeRequest, res: Response) => {
    try {
      Logger.enter(`/coupon/deleteCoupon/[[ id: ${req.id}]]`);
      const codeId = req.id;
      if (!codeId) {
        Logger.error(
          `Unexpected error on /coupon/deleteCoupon/[[ id: ${req.id}]], calling codeId not found!`
        );
        return res.status(500).send('Unexpected error on deleteCoupon!');
      }
      const deleted = await deleteCodeById(codeId);
      if (!deleted) {
        return res.status(400).send(null);
      }
      Logger.exit('/coupon/deleteCoupon');
      return res.status(200).send(deleted);
    } catch (err) {
      Logger.error(
        `Unexpected error by route /coupon/deleteCoupon/[[ id: ${req.id}]]`,
        err
      );
      return res.status(500).send(err);
    }
  };

  const deactivateCoupon = async (req: ICouponCodeRequest, res: Response) => {
    try {
      Logger.enter(`/coupon/deactivateCoupon/[[ id: ${req.id}]]`);
      const codeId = req.id;
      if (!codeId) {
        Logger.error(
          `Unexpected error on /coupon/deactivateCoupon/[[ id: ${req.id}]], calling codeId not found!`
        );
        return res.status(500).send('Unexpected error on deactivateCoupon!');
      }
      const editedCode = await deactivateCodeById(codeId);
      if (!editedCode) {
        return res.status(400).send(null);
      }
      Logger.exit('/coupon/deactivateCoupon');
      return res.status(200).send(editedCode);
    } catch (err) {
      Logger.error(
        `Unexpected error by route /coupon/deactivateCoupon/[[ id: ${req.id}]]`,
        err
      );
      return res.status(500).send(err);
    }
  };

  return {
    getCouponByCode,
    getExistingCouponCodes,
    generateSingleCouponCode,
    deleteCoupon,
    deactivateCoupon,
  };
}

export default couponController;
