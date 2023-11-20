import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";

import { Layout as TrainerLayout } from "../TrainerPortail/Layout";
import { Layout as UserLayout } from "../UserPortail/Layout";
import useToken from "../hooks/useToken";

const RequireAuth = ({ allowedRoles }) => {
  const { auth, setAuth } = useAuth();
  useEffect(() => {
    setAuth(JSON.parse(sessionStorage.getItem('auth')));
  },[])  
  const location = useLocation();

  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Layout role={auth?.roles} />
  ) : auth?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

const Layout = (props) => {
  if (props.role[0] === 1) {
    return <Outlet />;
  } else if (props.role[0] === 2) {
    return <TrainerLayout />;
  } else {
    return <UserLayout />;
  }
};

export default RequireAuth;
