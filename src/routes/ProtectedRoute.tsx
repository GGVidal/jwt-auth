import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { token } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        token ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default ProtectedRoute;
