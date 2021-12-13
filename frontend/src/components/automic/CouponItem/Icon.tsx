import * as React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteForeverOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ForwardToInbox from '@mui/icons-material/ForwardToInboxOutlined';

interface IIconProps {
    type: string;
    label: string;
    onClickFunction: () => void;
}

function Icon({ label, type, onClickFunction }: IIconProps) {
  switch (type) {
    case 'delete':
      return (
        <Tooltip title="Delete coupon" placement="top" arrow>
          <IconButton aria-label={label} onClick={onClickFunction}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      );
    case 'copy':
      return (
        <Tooltip title="Copy to cliboard" placement="top" arrow>
          <IconButton aria-label={label} onClick={onClickFunction}>
            <ContentCopyIcon />
          </IconButton>
        </Tooltip>
      );
    case 'mail':
      return (
        <Tooltip title="Mail to" placement="top" arrow>
          <IconButton aria-label={label} onClick={onClickFunction}>
            <ForwardToInbox />
          </IconButton>
        </Tooltip>
      );
    default:
      return null;
  }
}

export default Icon;
