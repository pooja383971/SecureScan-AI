
// import { NavLink } from "react-router-dom";
// import "./Sidebar.css";

// function Sidebar() {
//   return (
//     <div className="sidebar">

//       <h2 className="menu-title">Menu</h2>

//       <NavLink to="/dashboard" className="menu-item">
//         Dashboard
//       </NavLink>

//       <NavLink to="/new-scan" className="menu-item">
//         New Scan
//       </NavLink>

//       <NavLink to="/reports" className="menu-item">
//         Reports
//       </NavLink>

//       <NavLink to="/history" className="menu-item">
//         History
//       </NavLink>

//       <NavLink to="/profile" className="menu-item">
//         Profile
//       </NavLink>

//       <NavLink to="/settings" className="menu-item">
//         Settings
//       </NavLink>

//     </div>
//   );
// }

// export default Sidebar;
// import { NavLink, useNavigate } from "react-router-dom";
// import {
//   FaTachometerAlt,
//   FaPlusCircle,
//   FaGlobe,
//   FaAndroid,
//   FaFileAlt,
//   FaHistory,
//   FaUser,
//   FaCog,
//   FaSignOutAlt,
//   FaShieldAlt
// } from "react-icons/fa";

// import "./Sidebar.css";

// function Sidebar() {

//   const navigate = useNavigate();

//   const handleLogout = () => {

//     localStorage.removeItem("token");
//     localStorage.removeItem("user");

//     navigate("/");

//   };

//   return (

//     <aside className="sidebar">

//       {/* Logo */}

//       <div className="sidebar-logo">

//         <FaShieldAlt className="logo-icon" />

//         <h2>SecureScan AI</h2>

//       </div>

//       {/* Navigation */}

//       <nav className="sidebar-menu">

//         <NavLink
//           to="/dashboard"
//           className="menu-item"
//         >
//           <FaTachometerAlt />
//           <span>Dashboard</span>
//         </NavLink>

//         <NavLink
//           to="/new-scan"
//           className="menu-item"
//         >
//           <FaPlusCircle />
//           <span>New Scan</span>
//         </NavLink>

//         <NavLink
//           to="/website-scanner"
//           className="menu-item"
//         >
//           <FaGlobe />
//           <span>Website Scanner</span>
//         </NavLink>

//         <NavLink
//           to="/apk-scanner"
//           className="menu-item"
//         >
//           <FaAndroid />
//           <span>APK Scanner</span>
//         </NavLink>

//         <NavLink
//           to="/reports"
//           className="menu-item"
//         >
//           <FaFileAlt />
//           <span>Reports</span>
//         </NavLink>

//         <NavLink
//           to="/history"
//           className="menu-item"
//         >
//           <FaHistory />
//           <span>History</span>
//         </NavLink>

//         <NavLink
//           to="/profile"
//           className="menu-item"
//         >
//           <FaUser />
//           <span>Profile</span>
//         </NavLink>

//         <NavLink
//           to="/settings"
//           className="menu-item"
//         >
//           <FaCog />
//           <span>Settings</span>
//         </NavLink>

//       </nav>

//       {/* Logout */}

//       <div className="sidebar-footer">

//         <button
//           className="logout-btn"
//           onClick={handleLogout}
//         >
//           <FaSignOutAlt />
//           <span>Logout</span>
//         </button>

//       </div>

//     </aside>

//   );

// }

// export default Sidebar;
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaSearch,
  FaFolderOpen,
  FaFileAlt,
  FaHistory,
  FaBell,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaShieldAlt
} from "react-icons/fa";

import "./Sidebar.css";

function Sidebar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

  };

  return (

    <aside className="sidebar">

      {/* ===========================
          Logo
      ============================ */}

      <div className="sidebar-logo">

        <FaShieldAlt className="logo-icon" />

        <h2>SecureScan AI</h2>

      </div>

      {/* ===========================
          Navigation
      ============================ */}

      <nav className="sidebar-menu">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/myscan"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FaSearch />
          <span>My Scan</span>
        </NavLink>

        <NavLink
          to="/myprojects"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FaFolderOpen />
          <span>My Projects</span>
        </NavLink>

        <NavLink
          to="/myreports"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FaFileAlt />
          <span>My Reports</span>
        </NavLink>

        <NavLink
          to="/history"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FaHistory />
          <span>History</span>
        </NavLink>

        <NavLink
          to="/notification"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FaBell />
          <span>Notifications</span>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FaUser />
          <span>Profile</span>
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FaCog />
          <span>Settings</span>
        </NavLink>

      </nav>

      {/* ===========================
          Footer
      ============================ */}

      <div className="sidebar-footer">

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>

      </div>

    </aside>

  );

}

export default Sidebar;