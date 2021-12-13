import RequestService from '../requestService';
import CONSTANTS from '../../constants/constants';

function fetchExistingCoupons() {
  const url = `${CONSTANTS.BASE_API_URL}/coupon/getAll`;
  return RequestService.fetch(url);
}

function getCouponByCode(code: string) {
  const url = `${CONSTANTS.BASE_API_URL}/coupon/getCouponByCode`;
  const qs = { code };
  return RequestService.fetch(url, { qs });
}

function addNewCoupon(data: any = {}) {
  const url = `${CONSTANTS.BASE_API_URL}/coupon/generateSingleCoupon`;
  return RequestService.post(url, data);
}

function deleteCoupon(couponId: string) {
  const url = `${CONSTANTS.BASE_API_URL}/coupon/deleteCoupon/${couponId}`;
  return RequestService.remove(url);
}

function deactivateCoupon(couponId: string) {
  const url = `${CONSTANTS.BASE_API_URL}/coupon/deactivateCoupon/${couponId}`;
  return RequestService.put({ url });
}

const couponService = {
  fetchExistingCoupons,
  getCouponByCode,
  addNewCoupon,
  deleteCoupon,
  deactivateCoupon
};

export default couponService;
