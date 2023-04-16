import React from "react";
import jwt_decode from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");
  const isAuthenticated = token ? jwt_decode(token) : false;
  const isTokenExpired = isAuthenticated
    ? isAuthenticated.exp < Date.now() / 1000
    : true;

  const handleAlert = () => {
    window.alert("Você precisa fazer login para acessar essa página.\nCaso Esteja com algum erro, chame o suporte.");
  };

  return isAuthenticated && !isTokenExpired ? (
    <Outlet />
  ) : (
    <>
      <Navigate to="/" />
      {handleAlert()}
    </>
  );
};

export default PrivateRoute;
