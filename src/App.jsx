import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Header from "./components/Header";
import SetupRoutes from "./routes/SetupRoutes";

function App() {
    return (
        <main className="flex min-h-screen  w-full flex-col bg-four">
            <Header />
            <div className="mx-auto mt-10 w-9/12 rounded-md bg-white p-5 shadow-md">
                <SetupRoutes />
            </div>
        </main>
    );
}

export default App;
