import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import "./Notifications.css";

function Notification() {

    const navigate = useNavigate();

    // ==========================================
    // USER INFORMATION
    // ==========================================

    const [user, setUser] = useState({

        fullName: "",

        email: ""

    });

    // ==========================================
    // NOTIFICATION DATA
    // ==========================================

    const [notifications, setNotifications] = useState([]);

    const [filteredNotifications, setFilteredNotifications] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    // ==========================================
    // SEARCH & FILTER
    // ==========================================

    const [search, setSearch] = useState("");

    const [filter, setFilter] = useState("All");

    // ==========================================
    // LOAD USER & NOTIFICATIONS
    // ==========================================

    useEffect(() => {

        const fullName =
            localStorage.getItem("userName") || "User";

        const email =
            localStorage.getItem("userEmail") || "";

        setUser({

            fullName,

            email

        });

        loadNotifications();

    }, []);

    // ==========================================
    // LOAD NOTIFICATIONS
    // ==========================================

    const loadNotifications = async () => {

        try {

            setLoading(true);

            const response =
                await api.get("/notifications");

            const data = response.data || [];

            const myNotifications = data.filter(item =>

                item.email === user.email ||

                item.userEmail === user.email ||

                !item.email

            );

            setNotifications(myNotifications);

            setFilteredNotifications(myNotifications);

        }

        catch (err) {

            console.error(err);

            setError("Unable to load notifications.");

        }

        finally {

            setLoading(false);

        }

    };

    // ==========================================
    // SEARCH & FILTER
    // ==========================================

    useEffect(() => {

        let list = [...notifications];

        if (search.trim() !== "") {

            list = list.filter(item =>

                item.title
                    ?.toLowerCase()
                    .includes(search.toLowerCase()) ||

                item.message
                    ?.toLowerCase()
                    .includes(search.toLowerCase())

            );

        }

        if (filter === "Unread") {

            list = list.filter(item => !item.read);

        }

        if (filter === "Read") {

            list = list.filter(item => item.read);

        }

        setFilteredNotifications(list);

    }, [

        search,

        filter,

        notifications

    ]);

    // ==========================================
    // STATISTICS
    // ==========================================

    const totalNotifications =
        notifications.length;

    const unreadNotifications =
        notifications.filter(

            item => !item.read

        ).length;

    const readNotifications =
        notifications.filter(

            item => item.read

        ).length;

    // ==========================================
    // MARK AS READ
    // ==========================================

    const markAsRead = async (id) => {

        try {

            await api.put(

                `/notifications/${id}/read`

            );

            loadNotifications();

        }

        catch (err) {

            console.error(err);

        }

    };

    // ==========================================
    // DELETE NOTIFICATION
    // ==========================================

    const deleteNotification = async (id) => {

        try {

            await api.delete(

                `/notifications/${id}`

            );

            loadNotifications();

        }

        catch (err) {

            console.error(err);

        }

    };

    // ==========================================
    // CLEAR ALL
    // ==========================================

    const clearAllNotifications = async () => {

        try {

            await api.delete("/notifications");

            loadNotifications();

        }

        catch (err) {

            console.error(err);

        }

    };

    // ==========================================
    // JSX STARTS HERE
    // ==========================================
    return (

        <div className="notification-page">


            <div className="notification-header">

        <div>

            <h1>

                🔔 Notifications

            </h1>

            <p>

                Welcome back,

                {" "}

                <strong>

                    {user.fullName}

                </strong>

                {" "}

                Stay updated with your latest security
                alerts, scan reports, AI recommendations,
                and system notifications.

            </p>

        </div>

        <button
            className="clear-btn"
            onClick={clearAllNotifications}
        >

            🗑 Clear All

        </button>

    </div>

    {/* ==========================================
                SEARCH & FILTER
            ========================================== */}

    <div className="notification-toolbar">

        <div className="search-box">

            <input
                type="text"
                placeholder="🔍 Search notifications..."
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
            />

        </div>

        <div className="filter-box">

            <select
                value={filter}
                onChange={(e) =>
                    setFilter(e.target.value)
                }
            >

                <option value="All">

                    All Notifications

                </option>

                <option value="Unread">

                    Unread

                </option>

                <option value="Read">

                    Read

                </option>

            </select>

        </div>

    </div>

    {/* ==========================================
                NOTIFICATION STATISTICS
            ========================================== */}

    <div className="notification-stats">

        <div className="stat-card">

            <div className="stat-icon">

                🔔

            </div>

            <div>

                <h2>

                    {totalNotifications}

                </h2>

                <p>

                    Total Notifications

                </p>

            </div>

        </div>

        <div className="stat-card">

            <div className="stat-icon">

                📩

            </div>

            <div>

                <h2>

                    {unreadNotifications}

                </h2>

                <p>

                    Unread

                </p>

            </div>

        </div>

        <div className="stat-card">

            <div className="stat-icon">

                ✅

            </div>

            <div>

                <h2>

                    {readNotifications}

                </h2>

                <p>

                    Read

                </p>

            </div>

        </div>

        <div className="stat-card">

            <div className="stat-icon">

                🤖

            </div>

            <div>

                <h2>

                    {

                        unreadNotifications === 0

                            ? "Good"

                            : "Active"

                    }

                </h2>

                <p>

                    Security Status

                </p>

            </div>

        </div>

    </div>

    {/* ==========================================
                NOTIFICATION LIST START
            ========================================== */}

    <div className="notification-list">
        {/* ==========================================
                LOADING
            ========================================== */}

        {

            loading ?

                (

                    <div className="loading-box">

                        <h2>

                            Loading Notifications...

                        </h2>

                    </div>

                )

                :

                error ?

                    (

                        <div className="error-box">

                            <h2>

                                {error}

                            </h2>

                        </div>

                    )

                    :

                    filteredNotifications.length === 0 ?

                        (

                            <div className="empty-notification">

                                <div className="empty-icon">

                                    🔕

                                </div>

                                <h2>

                                    No Notifications Found

                                </h2>

                                <p>

                                    You're all caught up. New security
                                    alerts and updates will appear here.

                                </p>

                            </div>

                        )

                        :

                        (

                            filteredNotifications.map((notification) => (

                                <div

                                    key={notification.id}

                                    className={

                                        notification.read

                                            ?

                                            "notification-card"

                                            :

                                            "notification-card unread"

                                    }

                                >

                                    {/* ===============================
                                HEADER
                            =============================== */}

                                    <div className="notification-card-header">

                                        <div className="notification-left">

                                            <div className="notification-icon">

                                                {

                                                    notification.type === "SCAN"

                                                        ?

                                                        "🔍"

                                                        :

                                                        notification.type === "REPORT"

                                                            ?

                                                            "📄"

                                                            :

                                                            notification.type === "WARNING"

                                                                ?

                                                                "⚠️"

                                                                :

                                                                notification.type === "SUCCESS"

                                                                    ?

                                                                    "✅"

                                                                    :

                                                                    "🔔"

                                                }

                                            </div>

                                            <div>

                                                <h3>

                                                    {notification.title}

                                                </h3>

                                                <small>

                                                    {

                                                        notification.createdAt

                                                            ?

                                                            new Date(

                                                                notification.createdAt

                                                            ).toLocaleString()

                                                            :

                                                            "Just Now"

                                                    }

                                                </small>

                                            </div>

                                        </div>

                                        <span

                                            className={

                                                notification.read

                                                    ?

                                                    "status-badge read"

                                                    :

                                                    "status-badge unread"

                                            }

                                        >

                                            {

                                                notification.read

                                                    ?

                                                    "Read"

                                                    :

                                                    "Unread"

                                            }

                                        </span>

                                    </div>

                                    {/* ===============================
                                MESSAGE
                            =============================== */}

                                    <div className="notification-message">

                                        <p>

                                            {notification.message}

                                        </p>

                                    </div>

                                    {/* ===============================
                                ACTIONS
                            =============================== */}

                                    <div className="notification-actions">

                                        {

                                            !notification.read && (

                                                <button

                                                    className="read-btn"

                                                    onClick={() =>

                                                        markAsRead(

                                                            notification.id

                                                        )

                                                    }

                                                >

                                                    ✅ Mark as Read

                                                </button>

                                            )

                                        }

                                        <button

                                            className="delete-btn"

                                            onClick={() =>

                                                deleteNotification(

                                                    notification.id

                                                )

                                            }

                                        >

                                            🗑 Delete

                                        </button>

                                    </div>

                                </div>

                            ))

                        )

        }

    </div>
    {/* ==========================================
                QUICK ACTIONS
            ========================================== */}

    <div className="quick-actions-section">

        <div className="section-title">

            <h2>

                ⚡ Quick Actions

            </h2>

        </div>

        <div className="quick-actions-grid">

            <button
                className="action-btn"
                onClick={() => navigate("/dashboard")}
            >

                📊 Dashboard

            </button>

            <button
                className="action-btn"
                onClick={() => navigate("/new-scan")}
            >

                🔍 New Scan

            </button>

            <button
                className="action-btn"
                onClick={() => navigate("/reports")}
            >

                📄 Reports

            </button>

            <button
                className="action-btn"
                onClick={() => navigate("/history")}
            >

                📜 History

            </button>

        </div>

    </div>

    {/* ==========================================
                FILTER SUMMARY
            ========================================== */}

    <div className="filter-summary-section">

        <div className="section-title">

            <h2>

                📊 Notification Summary

            </h2>

        </div>

        <div className="summary-grid">

            <div className="summary-card">

                <h3>

                    Total

                </h3>

                <h1>

                    {totalNotifications}

                </h1>

            </div>

            <div className="summary-card">

                <h3>

                    Unread

                </h3>

                <h1>

                    {unreadNotifications}

                </h1>

            </div>

            <div className="summary-card">

                <h3>

                    Read

                </h3>

                <h1>

                    {readNotifications}

                </h1>

            </div>

            <div className="summary-card">

                <h3>

                    Filter

                </h3>

                <h1>

                    {filter}

                </h1>

            </div>

        </div>

    </div>

    {/* ==========================================
                NOTIFICATION CATEGORIES
            ========================================== */}

    <div className="category-section">

        <div className="section-title">

            <h2>

                📂 Notification Categories

            </h2>

        </div>

        <div className="category-grid">

            <div className="category-card">

                <div className="category-icon">

                    🔍

                </div>

                <h3>

                    Scan Alerts

                </h3>

                <p>

                    Scan completion and vulnerability alerts.

                </p>

            </div>

            <div className="category-card">

                <div className="category-icon">

                    📄

                </div>

                <h3>

                    Reports

                </h3>

                <p>

                    Report generation and download updates.

                </p>

            </div>

            <div className="category-card">

                <div className="category-icon">

                    ⚠️

                </div>

                <h3>

                    Security

                </h3>

                <p>

                    Critical vulnerabilities and security warnings.

                </p>

            </div>

            <div className="category-card">

                <div className="category-icon">

                    🤖

                </div>

                <h3>

                    AI Insights

                </h3>

                <p>

                    AI recommendations and security suggestions.

                </p>

            </div>

        </div>

    </div>
    {/* ==========================================
                AI NOTIFICATION ANALYSIS
            ========================================== */}

    <div className="ai-analysis-section">

        <div className="section-title">

            <h2>

                🤖 AI Notification Analysis

            </h2>

        </div>

        <div className="ai-analysis-card">

            {

                unreadNotifications === 0 ?

                    (

                        <>

                            <h3>

                                🟢 Excellent!

                            </h3>

                            <p>

                                You have read all your notifications.
                                Your SecureScan AI dashboard is fully
                                synchronized and there are no pending
                                security alerts requiring attention.

                            </p>

                        </>

                    )

                    :

                    unreadNotifications <= 5 ?

                        (

                            <>

                                <h3>

                                    🟡 Action Recommended

                                </h3>

                                <p>

                                    You have a few unread notifications.
                                    Review the latest scan reports and
                                    AI recommendations to maintain the
                                    security of your projects.

                                </p>

                            </>

                        )

                        :

                        (

                            <>

                                <h3>

                                    🔴 Immediate Attention Required

                                </h3>

                                <p>

                                    Multiple unread notifications were
                                    detected. Review security warnings
                                    and vulnerability reports as soon
                                    as possible.

                                </p>

                            </>

                        )

            }

        </div>

    </div>

    {/* ==========================================
                SECURITY RECOMMENDATIONS
            ========================================== */}

    <div className="recommendation-section">

        <div className="section-title">

            <h2>

                🛡 Security Recommendations

            </h2>

        </div>

        <div className="recommendation-grid">

            <div className="recommendation-card">

                <h3>

                    🔍 Review Scan Reports

                </h3>

                <p>

                    Regularly review completed scans and
                    resolve critical vulnerabilities first.

                </p>

            </div>

            <div className="recommendation-card">

                <h3>

                    📄 Download Reports

                </h3>

                <p>

                    Keep PDF reports for audit,
                    documentation and compliance.

                </p>

            </div>

            <div className="recommendation-card">

                <h3>

                    🔄 Run Weekly Scans

                </h3>

                <p>

                    Perform periodic scans to detect
                    newly introduced vulnerabilities.

                </p>

            </div>

        </div>

    </div>

    {/* ==========================================
                ACTIVITY TIMELINE
            ========================================== */}

    <div className="timeline-section">

        <div className="section-title">

            <h2>

                📅 Recent Activity

            </h2>

        </div>

        <div className="timeline-list">

            {

                filteredNotifications

                    .slice(0, 5)

                    .map((notification) => (

                        <div

                            className="timeline-item"

                            key={notification.id}

                        >

                            <div className="timeline-icon">

                                🔔

                            </div>

                            <div className="timeline-content">

                                <h4>

                                    {notification.title}

                                </h4>

                                <p>

                                    {notification.message}

                                </p>

                            </div>

                            <span>

                                {

                                    notification.createdAt

                                        ?

                                        new Date(

                                            notification.createdAt

                                        ).toLocaleDateString()

                                        :

                                        "Today"

                                }

                            </span>

                        </div>

                    ))

            }

        </div>

    </div>

    {/* ==========================================
                OVERALL STATUS
            ========================================== */}

    <div className="overall-status">

        <div className="status-content">

            <div>

                <h2>

                    🎯 Notification Health

                </h2>

                <p>

                    {

                        unreadNotifications === 0

                            ?

                            "All notifications have been reviewed."

                            :

                            `${unreadNotifications} unread notification(s) require your attention.`

                    }

                </p>

            </div>

            <div className="status-score">

                <h1>

                    {

                        unreadNotifications === 0

                            ?

                            "100%"

                            :

                            `${Math.max(
                                0,
                                100 -
                                Math.round(
                                    (unreadNotifications /
                                        Math.max(totalNotifications, 1)
                                    ) * 100
                                )
                            )}%`

                    }

                </h1>

            </div>

        </div>

    </div>
    {/* ==========================================
                QUICK NAVIGATION
            ========================================== */}

    <div className="quick-navigation">

        <div className="section-title">

            <h2>

                🚀 Quick Navigation

            </h2>

        </div>

        <div className="navigation-grid">

            <button
                className="nav-card"
                onClick={() => navigate("/dashboard")}
            >

                <span className="nav-icon">

                    📊

                </span>

                <h3>

                    Dashboard

                </h3>

                <p>

                    View your security dashboard

                </p>

            </button>

            <button
                className="nav-card"
                onClick={() => navigate("/new-scan")}
            >

                <span className="nav-icon">

                    🔍

                </span>

                <h3>

                    New Scan

                </h3>

                <p>

                    Start a new vulnerability scan

                </p>

            </button>

            <button
                className="nav-card"
                onClick={() => navigate("/reports")}
            >

                <span className="nav-icon">

                    📄

                </span>

                <h3>

                    Reports

                </h3>

                <p>

                    View and download reports

                </p>

            </button>

            <button
                className="nav-card"
                onClick={() => navigate("/profile")}
            >

                <span className="nav-icon">

                    👤

                </span>

                <h3>

                    Profile

                </h3>

                <p>

                    Manage your account settings

                </p>

            </button>

        </div>

    </div>

    {/* ==========================================
                FOOTER
            ========================================== */}

    <footer className="notification-footer">

        <div className="footer-content">

            <h2>

                🛡 SecureScan AI

            </h2>

            <p>

                Intelligent Vulnerability Detection &
                AI-Powered Security Notification Center

            </p>

            <div className="footer-features">

                <span>

                    🔔 Smart Alerts

                </span>

                <span>

                    🤖 AI Insights

                </span>

                <span>

                    📄 Scan Reports

                </span>

                <span>

                    🛡 Threat Monitoring

                </span>

            </div>

            <hr />

            <div className="footer-bottom">

                <small>

                    © 2026 SecureScan AI. All Rights Reserved.

                </small>

                <small>

                    Version 1.0.0 | Built with React & Spring Boot

                </small>

            </div>

        </div>

    </footer>

        </div >

    );

}

export default Notification;