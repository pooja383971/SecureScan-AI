import { NavLink, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaSearch, FaFileAlt, FaHistory, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import "./Sidebar.css";

function Sidebar() {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const linkClass = ({ isActive }) => "menu-item" + (isActive ? " active" : "");

    const handleLogout = () => { logout(); navigate("/", { replace: true }); };

    return (
        <div className="sidebar">
            <h2 className="menu-title">Menu</h2>
            <NavLink to="/dashboard" className={linkClass}><FaTachometerAlt /> Dashboard</NavLink>
            <NavLink to="/new-scan" className={linkClass}><FaSearch /> New Scan</NavLink>
            <NavLink to="/reports" className={linkClass}><FaFileAlt /> Reports</NavLink>
            <NavLink to="/history" className={linkClass}><FaHistory /> History</NavLink>
            <NavLink to="/profile" className={linkClass}><FaUser /> Profile</NavLink>
            <NavLink to="/settings" className={linkClass}><FaCog /> Settings</NavLink>
            <div className="sidebar-spacer" />
            <button className="menu-item logout" onClick={handleLogout} type="button"><FaSignOutAlt /> Logout</button>
        </div>
    );
}

export default Sidebar;