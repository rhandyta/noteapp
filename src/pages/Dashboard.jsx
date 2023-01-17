import React from "react";
import { ToastContainer } from "react-toastify";

function Dashboard() {
    return (
        <div>
            <ToastContainer
                position="top-center"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <h1>dashboard</h1>
        </div>
    );
}

export default Dashboard;
