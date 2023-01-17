import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";

function SetupRoutes() {
    return (
        <Routes>
            <Route index element={<Login />} />
        </Routes>
    );
}

export default SetupRoutes;
