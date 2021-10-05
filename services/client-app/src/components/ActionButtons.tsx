import { Stack } from '@mui/material';
import Button from '@mui/material/Button';

interface ActionButtonsProps {
  onOk?: () => void;
  onCancel?: () => void;
  disabled?: boolean;
  type?: 'important';
}

const ActionButtons = ({
  onOk,
  onCancel,
  disabled,
  type,
}: ActionButtonsProps) => {
  return (
    <Stack direction="row" spacing={2} style={{ justifyContent: 'flex-end' }}>
      {onCancel && (
        <Button onClick={onCancel} type="button" variant="outlined">
          Cancel
        </Button>
      )}
      <Button
        disabled={disabled}
        type="submit"
        variant="contained"
        size="large"
        onClick={onOk}
        color={type === 'important' ? 'error' : undefined}
      >
        Submit
      </Button>
    </Stack>
  );
};

export default ActionButtons;
