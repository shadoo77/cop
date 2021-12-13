import React, { useState } from 'react';
import { Grow } from '@mui/material';
import Icon from './Icon';
import CouponSticker from './CouponSticker';
import { useCoupon } from '../../../contexts/couponContext';
import SendEmailForm from '../SendEmailForm';

function CouponItem({ coupon, index, fetched }: any) {
  const { deleteCouponById } = useCoupon();
  const [openDialog, setOpenDialog] = useState(false);

  const closeDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Grow
        in={fetched}
        style={{ transformOrigin: '0 0 0' }}
        {...(fetched ? { timeout: (index + 1) * 300 } : {})}
      >
        <div className="coupon-item">
          <CouponSticker coupon={coupon} />
          <div className="coupon-item-code">
            <span>{coupon.code}</span>
          </div>
          <div>
            <Icon
              label="mail"
              type="mail"
              onClickFunction={() => setOpenDialog(true)}
            />
            <Icon
              label="delete"
              type="delete"
              onClickFunction={() => deleteCouponById(coupon.id)}
            />
          </div>
        </div>
      </Grow>
      <SendEmailForm open={openDialog} closeDialog={closeDialog} coupon={coupon} />
    </>
  );
}

export default CouponItem;
