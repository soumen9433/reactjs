import {Navigate, useLocation, Outlet} from "react-router-dom";
import jwt_decode from "jwt-decode";
import AccessDenied from "../views/accessDenied/accessDenied";
import auth from "../auth/authentication";

function ProtectedRoute(props: any) {
  let location = useLocation();

  // const isAuthenticated = auth.getCurrentUser() ? true : false;
  const isAuthenticated = true;

  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{from: location}} />;
  }

  const token = localStorage.getItem("token") || "";

  if (token) {
    // bypassing basic authorization for demo
    // @todo: Make this part secure by removing this condition in actual project

    const decoded: any = jwt_decode(token);
    const userHasRequiredRole =
      isAuthenticated && props.roles.includes(decoded.role) ? true : false;
    if (isAuthenticated && !userHasRequiredRole) {
      return <AccessDenied />;
    }
  }

  if (props.children) {
    return props.children;
  }
  return <Outlet />;
}

export default ProtectedRoute;
