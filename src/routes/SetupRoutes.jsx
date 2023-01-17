import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";

function SetupRoutes() {
    return (
        <Routes>
            <Route index element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    );
}

export default SetupRoutes;
