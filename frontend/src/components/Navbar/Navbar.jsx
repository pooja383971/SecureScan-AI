import { useNavigate } from "react-router-dom";
import { FaBell, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const handleLogout = () => { logout(); navigate("/", { replace: true }); };

  return (
    <header className="navbar">
      <div className="navbar-logo" onClick={() => navigate("/dashboard")}>
        <h2>🛡️ SecureScan AI</h2>
      </div>
      <div className="navbar-right">
        <button className="nav-icon-btn" type="button" onClick={() => alert("No new notifications")}>
          <FaBell className="nav-icon" />
        </button>
        <div className="user-info" onClick={() => navigate("/profile")}>
          <FaUserCircle className="user-icon" />
          <span>{user?.name || "Admin"}</span>
        </div>
        <button className="logout-btn" type="button" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;