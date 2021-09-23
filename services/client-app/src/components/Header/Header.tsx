import { Paper, Typography } from '@mui/material';

import './Header.css';
const Header = () => {
  return (
    <Paper>
      <div className="header__wrapper">
        <h1 style={{ color: 'white' }}>Home</h1>
      </div>
    </Paper>
  );
};

export default Header;
