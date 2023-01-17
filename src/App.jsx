import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Header from "./components/Header";
import SetupRoutes from "./routes/SetupRoutes";

function App() {
    return (
        <main className="w-full min-h-screen  bg-sky-50 flex flex-col">
            <Header />
            <SetupRoutes />
        </main>
    );
}

export default App;
