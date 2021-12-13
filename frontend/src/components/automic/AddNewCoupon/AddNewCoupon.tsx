import React, { useState } from 'react';
import { Divider, InputAdornment, TextField, Radio } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider, LoadingButton } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import AddIcon from '@mui/icons-material/Add';
import { useSnackbar } from '../../../contexts/snackbarContext';
import { ICouponCode, ICouponCodeState, useCoupon } from '../../../contexts/couponContext';
import couponService from '../../../services/couponService';

function AddNewCoupon() {
  const [selectedValue, setSelectedValue] = useState('precentage');
  const [precentage, setPrecentage] = useState(0);
  const [amount, setAmount] = useState(0);
  const [expireDate, setExpireDate] = useState<Date | null>(new Date());
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState<any>(false);
  const { showSnackbar } = useSnackbar();
  const { setState, codes } = useCoupon();

  const handlePrecentChange = (e: any) => {
    setErrors({});
    const newValue = Math.min(Math.max(e.target.value, 1), 100);
    setPrecentage(newValue);
  };

  const handleAmountChange = (e: any) => {
    setErrors({});
    setAmount(e.target.value);
  };

  const validateInput = () => {
    if (selectedValue === 'precentage') {
      return precentage && precentage > 0;
    }
    return amount && amount > 0;
  };

  const handleErrors = () => {
    if (selectedValue === 'precentage') {
      setErrors({
        ...errors,
        precentage: 'Precentage should be bigger than 0'
      });
    } else {
      setErrors({
        ...errors,
        amount: 'Amount should be bigger than 0'
      });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (!validateInput()) {
      handleErrors();
      setLoading(false);
      return false;
    }
    try {
      const dataToSend = {
        isPercent: selectedValue === 'precentage',
        isAmount: selectedValue === 'amount',
        discountMount: selectedValue === 'precentage' ? precentage : amount,
        expireDate
      };
      const result: ICouponCode = await couponService.addNewCoupon(dataToSend);
      if (result) {
        const newCoupon = {
          ...result, pending: false
        };
        setState((prevState: ICouponCodeState) => ({
          ...prevState,
          codes: [...codes, newCoupon]
        }));
        showSnackbar('New coupon added successfully', 'success');
      }
      setLoading(false);
      return true;
    } catch (error) {
      console.error(error);
      setLoading(false);
      return false;
    }
  };

  return (
    <>
      {/* <form> */}
      <h2>Add new coupon</h2>
      <div className="add-coupon">

        <div className="add-coupon-row">
          <div className="add-coupon-row-title">
            <Radio
              checked={selectedValue === 'precentage'}
              onChange={(e) => {
                setSelectedValue(e.target.value);
                setErrors({});
              }}
              value="precentage"
              name="radio-buttons"
              inputProps={{ 'aria-label': 'A' }}
            />
            <span>Precentage</span>
          </div>
          <div className="add-coupon-row-field">
            <TextField
              value={precentage}
              name="precentage"
              type="number"
              onChange={handlePrecentChange}
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    %
                  </InputAdornment>
                )
              }}
              fullWidth
              disabled={selectedValue === 'amount'}
              error={!!errors.precentage}
              helperText={errors.precentage}
            />
          </div>
        </div>

        <div className="add-coupon-row">
          <div className="add-coupon-row-title">
            <Radio
              checked={selectedValue === 'amount'}
              onChange={(e) => {
                setSelectedValue(e.target.value);
                setErrors({});
              }}
              value="amount"
              name="radio-buttons"
              inputProps={{ 'aria-label': 'A' }}
            />
            <span>Amount</span>
          </div>
          <div className="add-coupon-row-field">
            <TextField
              value={amount}
              name="amount"
              type="number"
              onChange={handleAmountChange}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    $
                  </InputAdornment>
                )
              }}
              fullWidth
              disabled={selectedValue === 'precentage'}
              error={!!errors.amount}
              helperText={errors.amount}
            />
          </div>
        </div>

        <div className="add-coupon-row">
          <div className="add-coupon-row-title">
            <span>Expire date</span>
          </div>
          <div className="add-coupon-row-field">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                value={expireDate}
                minDate={new Date('2017-01-01')}
                onChange={(newValue) => {
                  setExpireDate(newValue);
                }}
                renderInput={(params) => <TextField fullWidth size="small" {...params} />}
              />
            </LocalizationProvider>
          </div>
        </div>

        <div className="add-coupon-row">
          <LoadingButton
            loading={loading}
            loadingPosition="start"
            startIcon={<AddIcon />}
            variant="contained"
            onClick={handleSubmit}
          >
            Add coupon
          </LoadingButton>
        </div>
        <Divider variant="middle" />
      </div>
      {/* </form> */}

    </>
  );
}

export default AddNewCoupon;
