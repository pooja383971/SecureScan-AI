import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./UserDashboard.css";

function UserDashboard() {

    const navigate = useNavigate();

    // ===============================
    // USER INFORMATION
    // ===============================

    const [user, setUser] = useState({

        fullName: "User",

        email: ""

    });

    // ===============================
    // DASHBOARD DATA
    // ===============================

    const [projects, setProjects] = useState([]);

    const [scans, setScans] = useState([]);

    const [notifications, setNotifications] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    // ===============================
    // LOAD USER DASHBOARD
    // ===============================

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            // Logged in user email

            const email =
                localStorage.getItem("userEmail") || "";

            setUser({

                fullName:
                    localStorage.getItem("userName") ||
                    "User",

                email

            });

            // Load scans

            const scanResponse =
                await api.get("/scans");

            const allScans = scanResponse.data || [];

            // Only current user's scans

            const myScans = allScans.filter(scan =>

                scan.userEmail === email ||

                scan.email === email ||

                !scan.userEmail

            );

            setScans(myScans);

            // Project List

            const uniqueProjects = [];

            const map = {};

            myScans.forEach(scan => {

                if (!map[scan.projectName]) {

                    map[scan.projectName] = true;

                    uniqueProjects.push({

                        projectName: scan.projectName,

                        status: scan.status,

                        scanType: scan.scanType

                    });

                }

            });

            setProjects(uniqueProjects);

            // Notifications

            setNotifications([

                {

                    id: 1,

                    title: "Welcome to SecureScan AI",

                    message:
                        "Your dashboard is ready."

                },

                {

                    id: 2,

                    title: "Weekly Scan",

                    message:
                        "Run a weekly security scan."

                }

            ]);

        }

        catch (err) {

            console.error(err);

            setError("Unable to load dashboard.");

        }

        finally {

            setLoading(false);

        }

    };

    // ===============================
    // DASHBOARD STATISTICS
    // ===============================

    const totalProjects = projects.length;

    const totalScans = scans.length;

    const critical = scans.reduce(

        (sum, scan) =>

            sum + (scan.critical || 0),

        0

    );

    const high = scans.reduce(

        (sum, scan) =>

            sum + (scan.high || 0),

        0

    );

    const medium = scans.reduce(

        (sum, scan) =>

            sum + (scan.medium || 0),

        0

    );

    const low = scans.reduce(

        (sum, scan) =>

            sum + (scan.low || 0),

        0

    );

    const totalVulnerabilities =

        critical +

        high +

        medium +

        low;

    const securityScore = Math.max(

        0,

        100 -

        (

            critical * 15 +

            high * 8 +

            medium * 4 +

            low

        )

    );

    // ===============================
    // LOADING
    // ===============================

    if (loading) {

        return (

            <div className="user-dashboard">

                <h2>

                    Loading Dashboard...

                </h2>

            </div>

        );

    }

    // ===============================
    // ERROR
    // ===============================

    if (error) {

        return (

            <div className="user-dashboard">

                <h2>

                    {error}

                </h2>

            </div>

        );

    }

    // ===============================
    // RETURN STARTS HERE
    // ===============================

    return (

        <div className="user-dashboard">

            <div className="user-dashboard-container"></div>
            {/* ==========================================
                USER HEADER
            ========================================== */}

            <div className="user-header">

                <div className="welcome-section">

                    <h1>

                        Welcome Back,
                        {user.fullName} 👋

                    </h1>

                    <p>

                        Monitor your projects,
                        security scans,
                        vulnerabilities,
                        reports and
                        improve your application's
                        security posture.

                    </p>

                </div>

                <div className="header-buttons">

                    <button
                        className="primary-btn"
                        onClick={() =>
                            navigate("/new-scan")
                        }
                    >

                        🔍 New Scan

                    </button>

                    <button
                        className="secondary-btn"
                        onClick={() =>
                            navigate("/reports")
                        }
                    >

                        📄 Reports

                    </button>

                </div>

            </div>

            {/* ==========================================
                USER INFORMATION
            ========================================== */}

            <div className="profile-card">

                <div className="profile-left">

                    <div className="profile-avatar">

                        👤

                    </div>

                    <div>

                        <h2>

                            {user.fullName}

                        </h2>

                        <p>

                            {user.email}

                        </p>

                        <small>

                            SecureScan AI User

                        </small>

                    </div>

                </div>

                <div className="profile-right">

                    <button
                        className="edit-profile-btn"
                        onClick={() =>
                            navigate("/profile")
                        }
                    >

                        Edit Profile

                    </button>

                </div>

            </div>

            {/* ==========================================
                TOP STATISTICS
            ========================================== */}

            <div className="stats-grid">

                <div className="stat-card">

                    <div className="stat-icon">

                        🛡

                    </div>

                    <div>

                        <h2>

                            {securityScore}

                        </h2>

                        <p>

                            Security Score

                        </p>

                    </div>

                </div>

                <div className="stat-card">

                    <div className="stat-icon">

                        📁

                    </div>

                    <div>

                        <h2>

                            {totalProjects}

                        </h2>

                        <p>

                            My Projects

                        </p>

                    </div>

                </div>

                <div className="stat-card">

                    <div className="stat-icon">

                        🔍

                    </div>

                    <div>

                        <h2>

                            {totalScans}

                        </h2>

                        <p>

                            Total Scans

                        </p>

                    </div>

                </div>

                <div className="stat-card">

                    <div className="stat-icon">

                        🚨

                    </div>

                    <div>

                        <h2>

                            {totalVulnerabilities}

                        </h2>

                        <p>

                            Vulnerabilities

                        </p>

                    </div>

                </div>

            </div>

            {/* ==========================================
                SECURITY STATUS
            ========================================== */}

            <div className="security-banner">

                <div>

                    <h2>

                        Overall Security Status

                    </h2>

                    <p>

                        {securityScore >= 80
                            ? "Excellent Security"
                            : securityScore >= 60
                                ? "Good Security"
                                : securityScore >= 40
                                    ? "Needs Improvement"
                                    : "Critical Risk"}

                    </p>

                </div>

                <div className="security-score-circle">

                    <h1>

                        {securityScore}

                    </h1>

                    <small>

                        /100

                    </small>

                </div>

            </div>
            {/* ==========================================
                MY PROJECTS
            ========================================== */}

            <div className="projects-section">

                <div className="section-header">

                    <h2>

                        📁 My Projects

                    </h2>

                    <button
                        className="view-all-btn"
                        onClick={() => navigate("/history")}
                    >

                        View All

                    </button>

                </div>

                <div className="projects-grid">

                    {

                        projects.length > 0 ?

                            (

                                projects.map((project, index) => (

                                    <div
                                        className="project-card"
                                        key={index}
                                    >

                                        <div className="project-top">

                                            <div className="project-icon">

                                                📂

                                            </div>

                                            <span
                                                className={`status-badge ${project.status === "Completed"
                                                        ? "completed"
                                                        : project.status === "Running"
                                                            ? "running"
                                                            : "pending"
                                                    }`}
                                            >

                                                {project.status}

                                            </span>

                                        </div>

                                        <h3>

                                            {project.projectName}

                                        </h3>

                                        <p>

                                            Scan Type :
                                            {" "}
                                            <strong>

                                                {project.scanType}

                                            </strong>

                                        </p>

                                        <div className="project-footer">

                                            <button
                                                className="project-btn"
                                                onClick={() =>
                                                    navigate("/history")
                                                }
                                            >

                                                View Details

                                            </button>

                                        </div>

                                    </div>

                                ))

                            )

                            :

                            (

                                <div className="empty-projects">

                                    <div className="empty-icon">

                                        📁

                                    </div>

                                    <h3>

                                        No Projects Found

                                    </h3>

                                    <p>

                                        You haven't scanned any
                                        project yet.

                                    </p>

                                    <button
                                        className="primary-btn"
                                        onClick={() =>
                                            navigate("/new-scan")
                                        }
                                    >

                                        Start First Scan

                                    </button>

                                </div>

                            )

                    }

                </div>

            </div>

            {/* ==========================================
                PROJECT SUMMARY
            ========================================== */}

            <div className="project-summary">

                <div className="summary-card">

                    <h3>

                        Active Projects

                    </h3>

                    <h1>

                        {totalProjects}

                    </h1>

                </div>

                <div className="summary-card">

                    <h3>

                        Completed Scans

                    </h3>

                    <h1>

                        {totalScans}

                    </h1>

                </div>

                <div className="summary-card">

                    <h3>

                        Critical Issues

                    </h3>

                    <h1>

                        {critical}

                    </h1>

                </div>

                <div className="summary-card">

                    <h3>

                        Overall Status

                    </h3>

                    <h1>

                        {

                            securityScore >= 70

                                ?

                                "Secure"

                                :

                                "Attention"

                        }

                    </h1>

                </div>

            </div>
            {/* ==========================================
                RECENT SCANS
            ========================================== */}

            <div className="recent-scans-section">

                <div className="section-header">

                    <h2>

                        📋 Recent Scans

                    </h2>

                    <button
                        className="view-all-btn"
                        onClick={() => navigate("/history")}
                    >

                        View History

                    </button>

                </div>

                <div className="scan-table">

                    <table>

                        <thead>

                            <tr>

                                <th>Project</th>

                                <th>Scan Type</th>

                                <th>Status</th>

                                <th>Critical</th>

                                <th>High</th>

                                <th>Medium</th>

                                <th>Low</th>

                                <th>Date</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                scans.length > 0 ?

                                    (

                                        scans.slice(0, 5).map((scan, index) => (

                                            <tr key={index}>

                                                <td>

                                                    {scan.projectName}

                                                </td>

                                                <td>

                                                    {scan.scanType}

                                                </td>

                                                <td>

                                                    <span className="status completed">

                                                        {scan.status}

                                                    </span>

                                                </td>

                                                <td className="critical-text">

                                                    {scan.critical}

                                                </td>

                                                <td className="high-text">

                                                    {scan.high}

                                                </td>

                                                <td>

                                                    {scan.medium}

                                                </td>

                                                <td>

                                                    {scan.low}

                                                </td>

                                                <td>

                                                    {

                                                        scan.scanDate ?

                                                            new Date(scan.scanDate).toLocaleDateString()

                                                            :

                                                            "-"

                                                    }

                                                </td>

                                            </tr>

                                        ))

                                    )

                                    :

                                    (

                                        <tr>

                                            <td colSpan="8">

                                                No Scan History Found

                                            </td>

                                        </tr>

                                    )

                            }

                        </tbody>

                    </table>

                </div>

            </div>

            {/* ==========================================
                VULNERABILITY SUMMARY
            ========================================== */}

            <div className="vulnerability-section">

                <div className="section-header">

                    <h2>

                        🛡 Vulnerability Summary

                    </h2>

                </div>

                <div className="vulnerability-grid">

                    <div className="vulnerability-card critical">

                        <h3>

                            🔴 Critical

                        </h3>

                        <h1>

                            {critical}

                        </h1>

                        <p>

                            Immediate action required

                        </p>

                    </div>

                    <div className="vulnerability-card high">

                        <h3>

                            🟠 High

                        </h3>

                        <h1>

                            {high}

                        </h1>

                        <p>

                            Patch as soon as possible

                        </p>

                    </div>

                    <div className="vulnerability-card medium">

                        <h3>

                            🟡 Medium

                        </h3>

                        <h1>

                            {medium}

                        </h1>

                        <p>

                            Review regularly

                        </p>

                    </div>

                    <div className="vulnerability-card low">

                        <h3>

                            🟢 Low

                        </h3>

                        <h1>

                            {low}

                        </h1>

                        <p>

                            Continue monitoring

                        </p>

                    </div>

                </div>

            </div>

            {/* ==========================================
                SECURITY OVERVIEW
            ========================================== */}

            <div className="security-overview">

                <div className="overview-card">

                    <h2>

                        🎯 Security Score

                    </h2>

                    <h1>

                        {securityScore}/100

                    </h1>

                    <p>

                        Overall security posture

                    </p>

                </div>

                <div className="overview-card">

                    <h2>

                        🚨 Active Vulnerabilities

                    </h2>

                    <h1>

                        {totalVulnerabilities}

                    </h1>

                    <p>

                        Across all scanned projects

                    </p>

                </div>

                <div className="overview-card">

                    <h2>

                        📊 Scan Success Rate

                    </h2>

                    <h1>

                        98%

                    </h1>

                    <p>

                        Successful completed scans

                    </p>

                </div>

                <div className="overview-card">

                    <h2>

                        🔒 Overall Status

                    </h2>

                    <h1>

                        {

                            securityScore >= 70

                                ?

                                "Secure"

                                :

                                "Needs Attention"

                        }

                    </h1>

                    <p>

                        Current protection level

                    </p>

                </div>

            </div>
            {/* ==========================================
                AI SECURITY RECOMMENDATIONS
            ========================================== */}

            <div className="recommendation-section">

                <div className="section-header">

                    <h2>

                        🤖 AI Security Recommendations

                    </h2>

                </div>

                <div className="recommendation-grid">

                    <div className="recommendation-card critical">

                        <h3>

                            🔴 Fix Critical Issues

                        </h3>

                        <p>

                            Immediately resolve all critical
                            vulnerabilities to reduce security
                            risks.

                        </p>

                    </div>

                    <div className="recommendation-card high">

                        <h3>

                            🟠 Update Dependencies

                        </h3>

                        <p>

                            Upgrade outdated libraries,
                            frameworks and packages.

                        </p>

                    </div>

                    <div className="recommendation-card medium">

                        <h3>

                            🟡 Enable MFA

                        </h3>

                        <p>

                            Protect your account using
                            Multi-Factor Authentication.

                        </p>

                    </div>

                    <div className="recommendation-card info">

                        <h3>

                            🔵 Weekly Security Scan

                        </h3>

                        <p>

                            Schedule weekly scans to detect
                            vulnerabilities early.

                        </p>

                    </div>

                    <div className="recommendation-card success">

                        <h3>

                            🟢 Backup Reports

                        </h3>

                        <p>

                            Store your latest security reports
                            safely for auditing.

                        </p>

                    </div>

                    <div className="recommendation-card secure">

                        <h3>

                            🔒 HTTPS Protection

                        </h3>

                        <p>

                            Enable HTTPS, HSTS and secure
                            HTTP headers for better protection.

                        </p>

                    </div>

                </div>

            </div>

            {/* ==========================================
                NOTIFICATIONS
            ========================================== */}

            <div className="notification-section">

                <div className="section-header">

                    <h2>

                        🔔 Notifications

                    </h2>

                </div>

                <div className="notification-list">

                    {

                        notifications.length > 0 ?

                            (

                                notifications.map((item) => (

                                    <div
                                        className="notification-card"
                                        key={item.id}
                                    >

                                        <div className="notification-icon">

                                            🔔

                                        </div>

                                        <div>

                                            <h4>

                                                {item.title}

                                            </h4>

                                            <p>

                                                {item.message}

                                            </p>

                                        </div>

                                    </div>

                                ))

                            )

                            :

                            (

                                <div className="notification-card">

                                    <div className="notification-icon">

                                        ✅

                                    </div>

                                    <div>

                                        <h4>

                                            No New Notifications

                                        </h4>

                                        <p>

                                            You're all caught up.

                                        </p>

                                    </div>

                                </div>

                            )

                    }

                </div>

            </div>

            {/* ==========================================
                WEEKLY SECURITY STATUS
            ========================================== */}

            <div className="weekly-security">

                <div className="section-header">

                    <h2>

                        📈 Weekly Security Status

                    </h2>

                </div>

                <div className="weekly-grid">

                    <div className="weekly-card">

                        <h3>

                            Projects Protected

                        </h3>

                        <h1>

                            {totalProjects}

                        </h1>

                    </div>

                    <div className="weekly-card">

                        <h3>

                            Scans Completed

                        </h3>

                        <h1>

                            {totalScans}

                        </h1>

                    </div>

                    <div className="weekly-card">

                        <h3>

                            Security Score

                        </h3>

                        <h1>

                            {securityScore}

                        </h1>

                    </div>

                    <div className="weekly-card">

                        <h3>

                            Status

                        </h3>

                        <h1>

                            {

                                securityScore >= 80 ?

                                    "Excellent"

                                    :

                                    securityScore >= 60 ?

                                        "Good"

                                        :

                                        securityScore >= 40 ?

                                            "Average"

                                            :

                                            "Critical"

                            }

                        </h1>

                    </div>

                </div>

            </div>
            {/* ==========================================
                QUICK ACTIONS
            ========================================== */}

            <div className="quick-actions-section">

                <div className="section-header">

                    <h2>

                        ⚡ Quick Actions

                    </h2>

                </div>

                <div className="quick-actions-grid">

                    <div
                        className="quick-action-card"
                        onClick={() => navigate("/new-scan")}
                    >

                        <div className="action-icon">

                            🔍

                        </div>

                        <h3>

                            New Scan

                        </h3>

                        <p>

                            Start a new security scan.

                        </p>

                    </div>

                    <div
                        className="quick-action-card"
                        onClick={() => navigate("/reports")}
                    >

                        <div className="action-icon">

                            📄

                        </div>

                        <h3>

                            Reports

                        </h3>

                        <p>

                            View and download reports.

                        </p>

                    </div>

                    <div
                        className="quick-action-card"
                        onClick={() => navigate("/history")}
                    >

                        <div className="action-icon">

                            📋

                        </div>

                        <h3>

                            Scan History

                        </h3>

                        <p>

                            Review previous scans.

                        </p>

                    </div>

                    <div
                        className="quick-action-card"
                        onClick={() => navigate("/settings")}
                    >

                        <div className="action-icon">

                            ⚙️

                        </div>

                        <h3>

                            Settings

                        </h3>

                        <p>

                            Manage your preferences.

                        </p>

                    </div>

                </div>

            </div>

            {/* ==========================================
                ACCOUNT SUMMARY
            ========================================== */}

            <div className="account-summary">

                <div className="section-header">

                    <h2>

                        👤 Account Summary

                    </h2>

                </div>

                <div className="summary-grid">

                    <div className="summary-item">

                        <h4>

                            User Name

                        </h4>

                        <p>

                            {user.fullName}

                        </p>

                    </div>

                    <div className="summary-item">

                        <h4>

                            Email

                        </h4>

                        <p>

                            {user.email}

                        </p>

                    </div>

                    <div className="summary-item">

                        <h4>

                            Projects

                        </h4>

                        <p>

                            {totalProjects}

                        </p>

                    </div>

                    <div className="summary-item">

                        <h4>

                            Security Score

                        </h4>

                        <p>

                            {securityScore}/100

                        </p>

                    </div>

                </div>

            </div>

            {/* ==========================================
                RECENT ACTIVITY
            ========================================== */}

            <div className="activity-section">

                <div className="section-header">

                    <h2>

                        📅 Recent Activity

                    </h2>

                </div>

                <div className="activity-list">

                    {

                        scans.length > 0 ?

                            (

                                scans.slice(0, 5).map((scan, index) => (

                                    <div
                                        className="activity-card"
                                        key={index}
                                    >

                                        <div className="activity-icon">

                                            ✅

                                        </div>

                                        <div>

                                            <h4>

                                                {scan.projectName}

                                            </h4>

                                            <p>

                                                {scan.scanType} Scan Completed

                                            </p>

                                            <small>

                                                {

                                                    scan.scanDate ?

                                                        new Date(scan.scanDate).toLocaleString()

                                                        :

                                                        "-"

                                                }

                                            </small>

                                        </div>

                                    </div>

                                ))

                            )

                            :

                            (

                                <div className="activity-card">

                                    <div className="activity-icon">

                                        📌

                                    </div>

                                    <div>

                                        <h4>

                                            No Recent Activity

                                        </h4>

                                    </div>

                                </div>

                            )

                    }

                </div>

            </div>

            {/* ==========================================
                SECURITY ACHIEVEMENTS
            ========================================== */}

            <div className="achievement-section">

                <div className="section-header">

                    <h2>

                        🏆 Security Achievements

                    </h2>

                </div>

                <div className="achievement-grid">

                    <div className="achievement-card">

                        <h1>

                            🥇

                        </h1>

                        <h3>

                            First Scan Completed

                        </h3>

                    </div>

                    <div className="achievement-card">

                        <h1>

                            🛡️

                        </h1>

                        <h3>

                            Secure Project

                        </h3>

                    </div>

                    <div className="achievement-card">

                        <h1>

                            📈

                        </h1>

                        <h3>

                            Security Improved

                        </h3>

                    </div>

                    <div className="achievement-card">

                        <h1>

                            🚀

                        </h1>

                        <h3>

                            Weekly Scanner

                        </h3>

                    </div>

                </div>

            </div>

            {/* ==========================================
                FOOTER
            ========================================== */}

            <footer className="dashboard-footer">

                <h3>

                    SecureScan AI

                </h3>

                <p>

                    AI Powered Cyber Security Vulnerability Scanner

                </p>

                <small>

                    © 2026 SecureScan AI • All Rights Reserved

                </small>

            </footer>

        </div>

    </div >

);

}

export default UserDashboard;