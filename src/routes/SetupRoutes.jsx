import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Archive from "../pages/Archive";
import Dashboard from "../pages/Dashboard";
import Detail from "../pages/Detail";
import Edit from "../pages/Edit";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import ProtectedRoute from "./ProtectedRoute";

function SetupRoutes() {
    return (
        <Routes>
            <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/detail/:id" element={<Detail />} />
                <Route path="/archive" element={<Archive />} />
                <Route path="/edit/:id" element={<Edit />} />
            </Route>
            <Route element={<ProtectedRoute />}>
                <Route index element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>
        </Routes>
    );
}

export default SetupRoutes;
