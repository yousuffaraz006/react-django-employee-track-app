//  ###  Added BASE CODE FILE
import api from "@/api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants";
import { jwtDecode } from "jwt-decode";
import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";
import { ContextComponent } from "@/context";

function CommonLayout() {
  const { isAuthorized, setIsAuthorized }  = useContext(ContextComponent)
  useEffect(() => {
    auth().catch(() => setIsAuthorized(false));
  }, []);
  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await api.post("/token/refresh/", {
        refresh: refreshToken,
      });
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuthorized(false);
    }
  };
  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      return;
    }
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;
    if (tokenExpiration < now) {
      await refreshToken();
    } else {
      setIsAuthorized(true);
    }
  };
  if (isAuthorized === null) {
    return (
      <Skeleton
        className={`w-full h-[740px]  rounded-[6px] bg-black opacity-50`}
      />
    );
  }
  return <div>{isAuthorized ? <Outlet /> : <Navigate to="/signin" />}</div>;
}

export default CommonLayout;
