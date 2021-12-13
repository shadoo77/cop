import React from 'react';
import CouponItem from './automic/CouponItem';
import { useCoupon } from '../contexts/couponContext';
import AddNewCoupon from './automic/AddNewCoupon';

export default () => {
  const {
    codes,
    isLoading
  } = useCoupon();

  return (
    <div className="home">
      <AddNewCoupon />
      {isLoading && (
        <div>Loading ..</div>
      )}
      {!codes || !codes.length ? (
        <div>No codes found in database!</div>
      ) : (
        <div className="coupon-list">
          {codes.map((code, i) => (
            <React.Fragment key={code.id}>
              <CouponItem coupon={code} index={i} fetched={!!(codes && codes.length)} />
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};
