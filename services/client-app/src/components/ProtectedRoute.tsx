import { Redirect, Route } from 'react-router-dom';

interface ProtectedRouteProps {
  children: any;
  path: string | string[];
}
const ProtectedRoute = ({
  children,
  path,
  ...restOfProps
}: ProtectedRouteProps) => {
  const isAuthenticated = localStorage.getItem('jwt');
  return (
    <Route
      exact
      path={path}
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <>{children}</> : <Redirect to="/login" />
      }
    />
  );
};

export default ProtectedRoute;
