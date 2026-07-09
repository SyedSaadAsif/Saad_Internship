import { Routes, Route } from "react-router-dom";

import NavigationBar from "./components/Navbar";
import "./App.css";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import NotFound from "./pages/NotFound";
import DeveloperDetails from "./pages/DeveloperDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import NotificationToast from "./components/NotificationToast";
import EditHistory from "./pages/EditHistory";
import { useAuth } from "./context/AuthContext";

function App() {
    const { isLoggedIn } = useAuth();
    return (

        <>

            {isLoggedIn && <NavigationBar />}

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/dashboard"
                    element={<ProtectedRoute>
                            <Dashboard />
                            </ProtectedRoute>}
                />

                <Route
                    path="/add-user"
                    element={
                        <ProtectedRoute>
                            <AddUser />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/edit-user/:id"
                    element={
                        <ProtectedRoute>
                            <EditUser />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/developer/:id"
                    element={
                        <ProtectedRoute>
                            <DeveloperDetails />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/history"
                    element={
                    <ProtectedRoute>
                    <EditHistory />
                    </ProtectedRoute>
                }
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