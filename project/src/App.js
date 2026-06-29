import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";

import NotificationToast from "./components/NotificationToast";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
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

      </Routes>

      {/* Global Toast */}
      <NotificationToast />
    </>
  );
}

export default App;