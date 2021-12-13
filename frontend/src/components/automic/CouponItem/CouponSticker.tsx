import * as React from 'react';

function CouponSticker({ coupon }: any) {
  const expireDate = new Date(coupon.expireDate);
  const dateNow = new Date();
  let label = '';
  let isActive = false;

  if (!coupon.isActive) {
    label = 'Not Active';
  } else if (expireDate <= dateNow) {
    label = 'Expired';
  } else {
    label = 'Active';
    isActive = true;
  }
  return (
    <div className={
        `coupon-item-sticker ${isActive
          ? 'coupon-item-sticker--active'
          : 'coupon-item-sticker--inactive'}`
        }
    >
      {label}
    </div>
  );
}

export default CouponSticker;
