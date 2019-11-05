import React from "react";
import { Route, Redirect } from "react-router-dom";

const isAuthenticated = () => {
  if (localStorage.getItem("token") !== null) {
    return true;
  }

  return false;
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/", state: { message: "Usuário não autorizado" } }}
        />
      )
    }
  />
);

export default PrivateRoute;
