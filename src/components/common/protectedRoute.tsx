import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import auth from '../../services/authService';

interface ProtectedRouteProps extends RouteProps {
  component?: React.ComponentType<any>;
  render?: (props: any) => React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  path,
  component: Component,
  render,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth.getCurrentUser())
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: {
                  from: props.location,
                },
              }}
            />
          );
        return Component ? <Component {...props} /> : render?.(props);
      }}
    />
  );
};

export default ProtectedRoute;
