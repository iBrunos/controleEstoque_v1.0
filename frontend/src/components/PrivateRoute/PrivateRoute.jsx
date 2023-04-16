import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");
  const isAuthenticated = token ? jwt_decode(token) : false;
  const isTokenExpired = isAuthenticated ? isAuthenticated.exp < Date.now() / 1000 : true;
  const [alertShown, setAlertShown] = useState(false);

  const handleAlert = () => {
    if (!alertShown) {
      window.alert("Você precisa logar para acessar essa página ;)");
      setAlertShown(true);
    }
  };

  return isAuthenticated && !isTokenExpired ? (
    <Outlet />
  ) : (
    <>
      {handleAlert()}
      <Navigate to="/" />
    </>
  );
};

export default PrivateRoute;