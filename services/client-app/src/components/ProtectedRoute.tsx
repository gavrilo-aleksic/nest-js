import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from '../contexts/User.context';

interface ProtectedRouteProps {
  children: any;
  path: string | string[];
}
const ProtectedRoute = ({
  children,
  path,
  ...restOfProps
}: ProtectedRouteProps) => {
  const { user } = useContext(UserContext);
  return (
    <Route
      exact
      path={path}
      {...restOfProps}
      render={(props) => (user ? <>{children}</> : <Redirect to="/login" />)}
    />
  );
};

export default ProtectedRoute;
