import React, { useState } from 'react';
import { TextField } from '@mui/material';
import emailjs from 'emailjs-com';
import DialogModal from '../DialogModal';
import Constants from '../../../constants/constants';
import { useSnackbar } from '../../../contexts/snackbarContext';
import { ENV } from '../../../utils/config';

function SendEmailForm(props: any) {
  const { open, closeDialog, coupon } = props;
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<any>({});
  const [sending, setSending] = useState(false);
  const { showSnackbar } = useSnackbar();

  const data = {
    to_email: email, coupon_code: coupon.code
  };

  const handleChange = (e: any) => {
    setEmail(e.target.value);
    setErrors({
      ...errors, email: ''
    });
  };

  const validEmail = () => Constants.EMAIL_REGEX.test(email);

  const handleSubmit = () => {
    const isEmailVaild = validEmail();
    if (!isEmailVaild) {
      setErrors({
        ...errors, email: 'Invalid email, please type a valid email!'
      });
      return false;
    }
    setSending(true);
    emailjs.send(ENV.EMAIL_SERVICE_ID, ENV.EMAIL_TEMPLATE, data, ENV.EMAIL_USER_ID)
      .then(() => {
        showSnackbar('Email has sent!', 'info');
        setSending(false);
        closeDialog();
      }, (error) => {
        console.error(error);
        setSending(false);
      });
    return true;
  };

  return (
    <div>
      <DialogModal
        dialogClassName="dialog"
        isOpen={open}
        handleClose={closeDialog}
        withCloseIcon
        primaryActionButtonLabel="Send"
        primaryAction={handleSubmit}
        clickPrimaryWithoutClose
        secondaryActionButtonLabel="Cancel"
        secondaryAction={closeDialog}
        clickSecondaryWithoutClose
        disableEscapeKeyDown={true}
        title={`Send code ${coupon.code} to next email :`}
        loading={sending}
      >
        <form>
          <TextField
            variant="outlined"
            name="email"
            value={email}
            onChange={handleChange}
            label="Email"
            fullWidth
            error={!!errors.email}
            helperText={errors.email}
          />
        </form>
      </DialogModal>
    </div>
  );
}

export default SendEmailForm;
