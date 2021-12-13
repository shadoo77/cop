import express, { NextFunction, Response } from 'express';
import couponController from '../controllers/couponController';
import { ICouponCodeRequest } from '../mock-db/interfaces';

const router = express.Router();

const CouponController = couponController();

// route middleware to add :id to request
router.param(
  'id',
  (req: ICouponCodeRequest, res: Response, next: NextFunction, id: string) => {
    req.id = id;
    next();
  }
);

// @route  GET /coupon/getCouponByCode
// @desc   Get coupon by code
// @access Public
router.get('/getCouponByCode', CouponController.getCouponByCode);

// @route  GET /coupon/getAll
// @desc   Get all existing coupon codes
// @access Public
router.get('/getAll', CouponController.getExistingCouponCodes);

// @route  POST /coupon/generateSingleCoupon
// @desc   Generate new code
// @access Public
router.post('/generateSingleCoupon', CouponController.generateSingleCouponCode);

// @route  PUT /coupon/getAll
// @desc   Deactivate existing coupon
// @access Public
router.put('/deactivateCoupon/:id', CouponController.deactivateCoupon);

// @route  DELETE /coupon/deleteCoupon
// @desc   Delete existing coupon
// @access Public
router.delete('/deleteCoupon/:id', CouponController.deleteCoupon);

export default router;
