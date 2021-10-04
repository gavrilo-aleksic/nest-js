import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';

const GlobalLoader = () => {
  return (
    <Box
      sx={{ display: 'flex', position: 'absolute', left: '50%', top: '50%' }}
    >
      <CircularProgress />
    </Box>
  );
};

export default GlobalLoader;
