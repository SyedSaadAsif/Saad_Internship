import { Routes, Route } from "react-router-dom";

import NavigationBar from "./components/Navbar";
import "./App.css";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import NotFound from "./pages/NotFound";
import DeveloperDetails from "./pages/DeveloperDetails";

import NotificationToast from "./components/NotificationToast";

function App() {

    return (

        <>

            <NavigationBar />

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/add-user"
                    element={<AddUser />}
                />

                <Route
                    path="/edit-user/:id"
                    element={<EditUser />}
                />
                <Route
                    path="/developer/:id"
                    element={<DeveloperDetails />}
                />
                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Routes>

            <NotificationToast />

        </>

    );

}

export default App;