import LoginPage from './pages/Login/LoginPage';
import { BrowserRouter, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

import './App.css';
import HomePage from './pages/Home/HomePage';
import OrganizationsPage from './pages/Organizations/OrganizationsPage';
import UserProvider from './contexts/User.context';
import OrganizationProvider from './contexts/Organization.context';

const App = () => {
  return (
    <BrowserRouter>
      <Route path="/login" exact>
        <LoginPage />
      </Route>
      <OrganizationProvider>
        <ProtectedRoute path={['/home', '/']}>
          <UserProvider>
            <HomePage />
          </UserProvider>
        </ProtectedRoute>
        <ProtectedRoute path="/organizations">
          <OrganizationsPage />
        </ProtectedRoute>
      </OrganizationProvider>
    </BrowserRouter>
  );
};

export default App;
