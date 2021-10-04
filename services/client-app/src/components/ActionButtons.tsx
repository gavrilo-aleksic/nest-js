import { Stack } from '@mui/material';
import Button from '@mui/material/Button';

interface ActionButtonsProps {
  onOk?: () => void;
  onCancel: () => void;
  disabled?: boolean;
}

const ActionButtons = ({ onOk, onCancel, disabled }: ActionButtonsProps) => {
  return (
    <Stack direction="row" spacing={2} style={{ justifyContent: 'flex-end' }}>
      <Button
        disabled={disabled}
        type="submit"
        variant="contained"
        size="large"
      >
        Submit
      </Button>
      <Button onClick={onCancel} type="button" variant="outlined">
        Cancel
      </Button>
    </Stack>
  );
};

export default ActionButtons;
