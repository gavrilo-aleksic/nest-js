import { Alert, AlertColor, Stack } from '@mui/material';

interface ToastProps {
  severity: AlertColor;
  show?: boolean;
  text: string;
  onClose?: () => void;
}
const Toast = ({ severity, show, text, onClose }: ToastProps) => {
  if (!show) {
    return <></>;
  }

  return (
    <Stack
      sx={{
        position: 'absolute',
        top: '60px',
        width: '50%',
        right: 0,
      }}
      spacing={2}
    >
      <Alert variant="filled" severity={severity} onClose={onClose}>
        {text}
      </Alert>
    </Stack>
  );
};

export default Toast;
