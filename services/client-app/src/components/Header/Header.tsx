import {
  Badge,
  Divider,
  IconButton,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core';
import {
  AppBar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../contexts/User.context';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon from '@mui/icons-material/Logout';

import './Header.css';

const Header = () => {
  const { user } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen((menu) => !menu);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuOpen((menu) => !menu);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <IconButton onClick={handleMenuItemClick}>
            <Badge color="secondary">
              <PersonOutlineIcon />
            </Badge>
          </IconButton>
          <Menu
            className="app-header__menu"
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleClose}
          >
            <MenuItem onClick={(event) => handleMenuItemClick(event)}>
              <ListItemButton>
                <ListItemIcon>
                  <ListItemText primary={user?.username || 'Profile'} />
                </ListItemIcon>
              </ListItemButton>
            </MenuItem>
            <Divider />
            <MenuItem onClick={(event) => handleMenuItemClick(event)}>
              <ListItemButton>
                <ListItemIcon>
                  <LogoutIcon />
                  <ListItemText primary="Logout" />
                </ListItemIcon>
              </ListItemButton>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
