import { Routes, Route, Navigate } from "react-router-dom";

// ==============================
// PUBLIC PAGES
// ==============================

import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

// ==============================
// USER PAGES
// ==============================

import Dashboard from "../pages/Dashboard/Dashboard";
import MyScan from "../pages/MyScan/MyScan";
import MyProjects from "../pages/User/MyProjects/MyProjects";
import MyReports from "../pages/User/MyReports/MyReports";
import History from "../pages/History/History";
import Notification from "../pages/User/Notifications/Notifications";
import UserProfile from "../pages/User/UserProfile/UserProfile";
import UserSettings from "../pages/User/UserSetting/UserSettings";

// ==============================
// ERROR PAGE
// ==============================

import NotFound from "../pages/NotFound/NotFound";

// ==============================
// LAYOUT
// ==============================

import MainLayout from "../layouts/MainLayout";
import PrivateRoute from "./PrivateRoute";

// ==============================
// PROTECTED WRAPPER
// ==============================

function Protected({ children }) {
  return (
    <PrivateRoute>
      <MainLayout>
        {children}
      </MainLayout>
    </PrivateRoute>
  );
}

function AppRoutes() {
  return (
    <Routes>

      {/* =========================
                PUBLIC ROUTES
            ========================= */}

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* =========================
                PROTECTED ROUTES
            ========================= */}

      <Route
        path="/dashboard"
        element={
          <Protected>
            <Dashboard />
          </Protected>
        }
      />

      {/* NEW SCAN */}
      <Route
        path="/myscan"
        element={
          <Protected>
            <MyScan />
          </Protected>
        }
      />

      {/* ALSO SUPPORT /newscan */}
      <Route
        path="/newscan"
        element={
          <Protected>
            <MyScan />
          </Protected>
        }
      />

      <Route
        path="/myprojects"
        element={
          <Protected>
            <MyProjects />
          </Protected>
        }
      />

      <Route
        path="/reports"
        element={
          <Protected>
            <MyReports />
          </Protected>
        }
      />

      <Route
        path="/myreports"
        element={
          <Protected>
            <MyReports />
          </Protected>
        }
      />

      <Route
        path="/history"
        element={
          <Protected>
            <History />
          </Protected>
        }
      />

      <Route
        path="/notification"
        element={
          <Protected>
            <Notification />
          </Protected>
        }
      />

      <Route
        path="/profile"
        element={
          <Protected>
            <UserProfile />
          </Protected>
        }
      />

      <Route
        path="/settings"
        element={
          <Protected>
            <UserSettings />
          </Protected>
        }
      />

      {/* =========================
                404
            ========================= */}

      <Route
        path="/404"
        element={<NotFound />}
      />

      <Route
        path="*"
        element={
          <Navigate
            to="/404"
            replace
          />
        }
      />

    </Routes>
  );
}

export default AppRoutes;