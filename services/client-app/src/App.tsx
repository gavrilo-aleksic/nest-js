import LoginPage from './pages/Login/Login.page';
import { BrowserRouter, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

import './App.css';
import HomePage from './pages/Home/HomePage';

const App = () => {
  return (
    <BrowserRouter>
      <Route path="/login" exact>
        <LoginPage />
      </Route>
      <ProtectedRoute path={['/home', '/']}>
        <HomePage />
      </ProtectedRoute>
    </BrowserRouter>
  );
};

export default App;
