import { Container, MenuItem, MenuList } from '@mui/material';
import Header from '../../components/Header/Header';

import './HomePage.css';

const HomePage = () => {
  return (
    <Container className="home-page__wrapper">
      <Header />
      <MenuList className="home-page__menu">
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </MenuList>
    </Container>
  );
};

export default HomePage;
