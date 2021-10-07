import LoginPage from './pages/Login/LoginPage';
import { Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

import './App.css';
import HomePage from './pages/Home/HomePage';
import OrganizationsPage from './pages/Organizations/OrganizationsPage';
import UserProvider from './contexts/User.context';
import OrganizationProvider from './contexts/Organization.context';
import SwitchWithRedirect from './components/SwitchWithRedirect';
import AttributesPage from './pages/Attributes/AttributesPage';
import AttributeProvider from './contexts/Attribute.context';

const App = () => {
  return (
    <UserProvider>
      <SwitchWithRedirect>
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <ProtectedRoute path={['/home', '/']}>
          <HomePage />
        </ProtectedRoute>
        <ProtectedRoute path="/organizations">
          <OrganizationProvider>
            <OrganizationsPage />
          </OrganizationProvider>
        </ProtectedRoute>
        <ProtectedRoute path="/attributes">
          <AttributeProvider>
            <AttributesPage />
          </AttributeProvider>
        </ProtectedRoute>
      </SwitchWithRedirect>
    </UserProvider>
  );
};

export default App;
