import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
    const auth = useSelector((state) => state.user);
    return auth.user ? <Navigate to={"dashboard"} replace /> : <Outlet />;
}

export default ProtectedRoute;
