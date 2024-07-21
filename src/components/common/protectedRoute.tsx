import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import auth from "../../services/authService";

interface ProtectedRouteProps extends RouteProps {
  component?: React.ComponentType<any>;
  render?: (props: any) => React.ReactNode;
}

/**
 * Renders a protected route based on authentication status.
 *
 * @param {string} path - The route path
 * @param {React.ComponentType<any>} component - The component to render if authenticated
 * @param {(props: any) => React.ReactNode} render - The function to render if authenticated
 * @param {...any} rest - Additional props for the Route component
 * @return {JSX.Element} The protected route component
 */
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
                pathname: "/login",
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
