// import { Routes, Route, Navigate } from "react-router-dom";

// // Public Pages
// import Login from "../pages/Login/Login";
// import Register from "../pages/Register/Register";

// // Main Pages
// import Dashboard from "../pages/Dashboard/Dashboard";
// import MyScan from "../pages/MyScan/MyScan";
// import History from "../pages/History/History";
// import NotFound from "../pages/NotFound/NotFound";

// // User Pages
// import MyProjects from "../pages/User/MyProjects/MyProjects";
// import MyReports from "../pages/User/MyReports/MyReports";
// import Notification from "../pages/User/Notifications/Notifications";
// import UserProfile from "../pages/User/UserProfile/UserProfile";
// import UserSettings from "../pages/User/UserSetting/UserSettings";

// // Layout
// import MainLayout from "../layouts/MainLayout";

// // Authentication
// import PrivateRoute from "./PrivateRoute";


// // ===============================
// // Protected Layout Wrapper
// // ===============================

// function Protected({ children }) {

//   return (

//     <PrivateRoute>

//       <MainLayout>

//         {children}

//       </MainLayout>

//     </PrivateRoute>

//   );

// }


// // ===============================
// // Routes
// // ===============================

// function AppRoutes() {


//   return (

//     <Routes>


//       {/* =====================
//                 PUBLIC ROUTES
//             ====================== */}


//       <Route

//         path="/"

//         element={<Login />}

//       />


//       <Route

//         path="/login"

//         element={<Login />}

//       />


//       <Route

//         path="/register"

//         element={<Register />}

//       />



//       {/* =====================
//                 USER DASHBOARD
//             ====================== */}


//       <Route

//         path="/dashboard"

//         element={

//           <Protected>

//             <Dashboard />

//           </Protected>

//         }

//       />



//       {/* =====================
//                 SCANNER
//             ====================== */}


//       <Route

//         path="/myscan"

//         element={

//           <Protected>

//             <MyScan />

//           </Protected>

//         }

//       />



//       {/* =====================
//                 PROJECTS
//             ====================== */}


//       <Route

//         path="/myprojects"

//         element={

//           <Protected>

//             <MyProjects />

//           </Protected>

//         }

//       />



//       {/* =====================
//                 REPORTS
//             ====================== */}


//       <Route

//         path="/myreports"

//         element={

//           <Protected>

//             <MyReports />

//           </Protected>

//         }

//       />



//       {/* =====================
//                 HISTORY
//             ====================== */}


//       <Route

//         path="/history"

//         element={

//           <Protected>

//             <History />

//           </Protected>

//         }

//       />



//       {/* =====================
//                 NOTIFICATIONS
//             ====================== */}


//       <Route

//         path="/notification"

//         element={

//           <Protected>

//             <Notification />

//           </Protected>

//         }

//       />



//       {/* =====================
//                 PROFILE
//             ====================== */}


//       <Route

//         path="/profile"

//         element={

//           <Protected>

//             <UserProfile />

//           </Protected>

//         }

//       />



//       {/* =====================
//                 SETTINGS
//             ====================== */}


//       <Route

//         path="/settings"

//         element={

//           <Protected>

//             <UserSettings />

//           </Protected>

//         }

//       />



//       {/* =====================
//                 ERROR PAGE
//             ====================== */}


//       <Route

//         path="/404"

//         element={<NotFound />}

//       />


//       {/* Unknown URL */}

//       <Route

//         path="*"

//         element={

//           <Navigate

//             to="/404"

//             replace

//           />

//         }

//       />


//     </Routes>

//   );

// }


// export default AppRoutes;
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





      <Route

        path="/myscan"

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






      {/* IMPORTANT:
                Dashboard uses /reports
            */}


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
                404 ROUTES
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