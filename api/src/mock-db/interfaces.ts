import { Request } from 'express';

export interface IDiscountData {
  id: string;
  code: string;
  isPercent: boolean;
  isAmount: boolean;
  discountMount: number;
  expireDate: Date;
  isActive: boolean;
  createdAt: Date;
}

export interface IRequestGenerateSingleCouponCode extends Request {
  body: {
    isPercent: boolean,
    isAmount: boolean,
    discountMount: number,
    expireDate: Date,
  };
}

export interface ICouponCodeRequest extends Request {
  id?: string;
}

export interface IGetCouponByCodeRequest extends Request {
  query: {
    code?: string,
  };
}
