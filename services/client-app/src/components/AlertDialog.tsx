import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ActionButtons from './ActionButtons';

interface AlertDialogProps {
  title?: string;
  description?: string;
  onOk?: () => void;
  onClose?: () => void;
  isOpen?: boolean;
  type?: 'important';
}

const AlertDialog = ({
  title,
  description,
  onOk,
  onClose,
  isOpen,
  type,
}: AlertDialogProps) => {
  return (
    <Dialog
      open={isOpen || false}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <ActionButtons onOk={onOk} onCancel={onClose} type={type} />
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
