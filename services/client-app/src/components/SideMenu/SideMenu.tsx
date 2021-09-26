import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import AodIcon from '@mui/icons-material/Aod';
import { useHistory } from 'react-router';

const SideMenu = () => {
  const { push } = useHistory();
  return (
    <List className="home-page__menu">
      <ListItem>
        <ListItemButton>
          <ListItemIcon>
            <PersonIcon />
            <ListItemText primary="Profile" />
          </ListItemIcon>
        </ListItemButton>
      </ListItem>
      <ListItem onClick={() => push('/organizations')}>
        <ListItemButton>
          <ListItemIcon>
            <BusinessIcon />
            <ListItemText primary="Organizations" />
          </ListItemIcon>
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton>
          <ListItemIcon>
            <AodIcon />
            <ListItemText primary="Attributes" />
          </ListItemIcon>
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default SideMenu;
