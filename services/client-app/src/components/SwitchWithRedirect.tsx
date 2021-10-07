import { useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from '../contexts/User.context';
import GlobalLoader from './GlobalLoader/GlobalLoader';

const SwitchWithRedirect = ({ children }: any) => {
  const { user, networkError } = useContext(UserContext);
  const token = localStorage.getItem('jwt');

  if (token && !user && !networkError) {
    return <GlobalLoader />;
  }

  return <BrowserRouter>{children}</BrowserRouter>;
};

export default SwitchWithRedirect;
