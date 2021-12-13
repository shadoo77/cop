import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Slide,
  IconButton,
  Button
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiDialogTitle from '@mui/material/DialogTitle';
import { TransitionProps } from '@mui/material/transitions';
import SendIcon from '@mui/icons-material/SendAndArchiveOutlined';

const Transition = React.forwardRef<unknown, TransitionProps>((props, ref) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
  <Slide direction="up" ref={ref} {...props} />
));

const useStyles = makeStyles(() => ({
  root: {
    margin: 0,
    padding: '10px'
  },
  closeButton: {
    position: 'absolute',
    right: '10px',
    top: '10px',
    color: 'black'
  }
}));

const DialogTitleWithCloseIcon = (props: any) => {
  const classes = useStyles();
  const {
    children, onClose, ...other
  } = props;
  return (
    <MuiDialogTitle
      sx={{
        m: 0, p: 2
      }}
      className={classes.root}
      {...other}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'gray'
          }}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};

const EvesDialog = (props: any) => {
  const {
    isOpen,
    handleClose,
    title,
    text,
    primaryActionButtonLabel,
    primaryAction,
    secondaryAction,
    secondaryActionButtonLabel,
    dialogStyle,
    dialogClassName,
    primaryButtonDisabled,
    clickPrimaryWithoutClose,
    clickSecondaryWithoutClose,
    withCloseIcon,
    disableEscapeKeyDown,
    loading
  } = props;

  const primaryActionConfirm = () => {
    if (primaryAction) primaryAction();
    if (!clickPrimaryWithoutClose) handleClose();
  };

  const secondaryActionConfirm = () => {
    if (secondaryAction) secondaryAction();
    if (!clickSecondaryWithoutClose) handleClose();
  };

  // eslint-disable-next-line no-nested-ternary
  const TitleWithCloseIcon = withCloseIcon
    ? <DialogTitleWithCloseIcon onClose={handleClose}>{title}</DialogTitleWithCloseIcon>
    : !withCloseIcon && title
      ? <DialogTitleWithCloseIcon>{title}</DialogTitleWithCloseIcon>
      : null;

  const rest = disableEscapeKeyDown ? {} : { onClose: handleClose };
  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      disableEscapeKeyDown={disableEscapeKeyDown}
      fullWidth
      {...rest}
    >
      <div className={dialogClassName || ''}>
        {TitleWithCloseIcon}
        <DialogContent className={dialogStyle || ''}>
          {text && <DialogContentText>{text}</DialogContentText>}
          <div className="dialog-content">{props.children}</div>
        </DialogContent>

        {(primaryAction || secondaryAction) && (
        <DialogActions>
          {primaryAction && (
          <LoadingButton
            loading={loading}
            loadingPosition="start"
            startIcon={<SendIcon />}
            variant="contained"
            onClick={primaryActionConfirm}
            disabled={primaryButtonDisabled}
          >
            {primaryActionButtonLabel}
          </LoadingButton>
          )}

          {secondaryAction && (
          <Button
            size="large"
            variant="outlined"
            onClick={secondaryActionConfirm}
          >
            {secondaryActionButtonLabel}
          </Button>
          )}
        </DialogActions>
        )}
      </div>
    </Dialog>
  );
};

EvesDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
  primaryActionButtonLabel: PropTypes.string,
  secondaryActionButtonLabel: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  primaryAction: PropTypes.func,
  secondaryAction: PropTypes.func,
  dialogStyle: PropTypes.string,
  dialogClassName: PropTypes.string,
  children: PropTypes.node,
  clickPrimaryWithoutClose: PropTypes.bool,
  clickSecondaryWithoutClose: PropTypes.bool,
  withCloseIcon: PropTypes.bool,
  disableEscapeKeyDown: PropTypes.bool,
  loading: PropTypes.bool
};
EvesDialog.defaultProps = {
  handleClose: undefined,
  primaryActionButtonLabel: null,
  secondaryActionButtonLabel: null,
  title: null,
  text: null,
  primaryAction: null,
  secondaryAction: null,
  dialogStyle: null,
  children: null,
  dialogClassName: null,
  clickPrimaryWithoutClose: false,
  clickSecondaryWithoutClose: false,
  withCloseIcon: false,
  disableEscapeKeyDown: false,
  loading: false
};

export default EvesDialog;
