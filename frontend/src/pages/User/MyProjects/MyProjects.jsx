import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import "./MyProjects.css";

function MyProjects() {

    const navigate = useNavigate();

    // ==========================================
    // USER INFORMATION
    // ==========================================

    const [user, setUser] = useState({

        fullName: "",

        email: ""

    });

    // ==========================================
    // PROJECTS
    // ==========================================

    const [projects, setProjects] = useState([]);

    const [filteredProjects, setFilteredProjects] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    // ==========================================
    // SEARCH & FILTER
    // ==========================================

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("All");

    // ==========================================
    // LOAD PROJECTS
    // ==========================================

    useEffect(() => {

        loadProjects();

    }, []);

    const loadProjects = async () => {

        try {

            const email =
                localStorage.getItem("userEmail") || "";

            const fullName =
                localStorage.getItem("userName") || "User";

            setUser({

                fullName,

                email

            });

            const response = await api.get("/scans");

            const scans = response.data || [];

            // Only current user's projects
            const myScans = scans.filter(scan =>

                scan.userEmail === email ||

                scan.email === email ||

                !scan.userEmail

            );

            // Remove duplicate projects
            const uniqueProjects = [];

            const projectMap = {};

            myScans.forEach(scan => {

                if (!projectMap[scan.projectName]) {

                    projectMap[scan.projectName] = true;

                    uniqueProjects.push({

                        id: scan.id,

                        projectName: scan.projectName,

                        scanType: scan.scanType,

                        status: scan.status,

                        critical: scan.critical,

                        high: scan.high,

                        medium: scan.medium,

                        low: scan.low,

                        scanDate: scan.scanDate,

                        fileName: scan.fileName

                    });

                }

            });

            setProjects(uniqueProjects);

            setFilteredProjects(uniqueProjects);

        }

        catch (err) {

            console.error(err);

            setError("Failed to load projects.");

        }

        finally {

            setLoading(false);

        }

    };

    // ==========================================
    // SEARCH & FILTER PROJECTS
    // ==========================================

    useEffect(() => {

        let list = [...projects];

        if (search.trim() !== "") {

            list = list.filter(project =>

                project.projectName
                    ?.toLowerCase()
                    .includes(search.toLowerCase())

            );

        }

        if (statusFilter !== "All") {

            list = list.filter(project =>

                project.status === statusFilter

            );

        }

        setFilteredProjects(list);

    }, [search, statusFilter, projects]);

    // ==========================================
    // DASHBOARD STATS
    // ==========================================

    const totalProjects = projects.length;

    const completedProjects = projects.filter(

        project => project.status === "Completed"

    ).length;

    const runningProjects = projects.filter(

        project => project.status === "Running"

    ).length;

    const totalCritical = projects.reduce(

        (sum, project) => sum + (project.critical || 0),

        0

    );

    // ==========================================
    // JSX STARTS HERE
    // ==========================================

    return (

        <div className="projects-page">
                 

    <div className="projects-header">

        <div>

            <h1>

                📁 My Projects

            </h1>
             </div>
             
            <p>

                Welcome back,
                {" "}
                <strong>

                    {user.fullName}

                </strong>

                {" "}
                Manage all your scanned projects
                from one place.

            </p>

        </div>

        <button
            className="new-project-btn"
            onClick={() => navigate("/new-scan")}
        >

            + New Scan

        </button>

    {/* ==========================================
                SEARCH & FILTER
            ========================================== */}

    <div className="filter-container">

        <div className="search-box">

            <input
                type="text"
                placeholder="🔍 Search Project..."
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
            />

        </div>

        <div className="filter-box">

            <select
                value={statusFilter}
                onChange={(e) =>
                    setStatusFilter(e.target.value)
                }
            >

                <option value="All">

                    All Status

                </option>

                <option value="Completed">

                    Completed

                </option>

                <option value="Running">

                    Running

                </option>

                <option value="Pending">

                    Pending

                </option>

            </select>

        </div>

    </div>

    {/* ==========================================
                STATISTICS CARDS
            ========================================== */}

    <div className="project-stats-grid">

        <div className="project-stat-card">

            <div className="stat-icon">

                📂

            </div>

            <div>

                <h2>

                    {totalProjects}

                </h2>

                <p>

                    Total Projects

                </p>

            </div>

        </div>

        <div className="project-stat-card">

            <div className="stat-icon">

                ✅

            </div>

            <div>

                <h2>

                    {completedProjects}

                </h2>

                <p>

                    Completed

                </p>

            </div>

        </div>

        <div className="project-stat-card">

            <div className="stat-icon">

                🚀

            </div>

            <div>

                <h2>

                    {runningProjects}

                </h2>

                <p>

                    Running

                </p>

            </div>

        </div>

        <div className="project-stat-card">

            <div className="stat-icon">

                🔴

            </div>

            <div>

                <h2>

                    {totalCritical}

                </h2>

                <p>

                    Critical Issues

                </p>

            </div>

        </div>

    </div>

    {/* ==========================================
                PROJECT LIST START
            ========================================== */}

    <div className="projects-grid">
        {

            loading ?

                (

                    <div className="loading-box">

                        <h2>

                            Loading Projects...

                        </h2>

                    </div>

                )

                :

                filteredProjects.length === 0 ?

                    (

                        <div className="empty-project">

                            <div className="empty-icon">

                                📂

                            </div>

                            <h2>

                                No Projects Found

                            </h2>

                            <p>

                                Start your first security scan to
                                create a project.

                            </p>

                            <button
                                className="new-project-btn"
                                onClick={() =>
                                    navigate("/new-scan")
                                }
                            >

                                Start New Scan

                            </button>

                        </div>

                    )

                    :

                    (

                        filteredProjects.map((project) => (

                            <div
                                className="project-card"
                                key={project.id}
                            >

                                {/* ==========================
                                    CARD HEADER
                                =========================== */}

                                <div className="project-card-header">

                                    <div>

                                        <h2>

                                            📁 {project.projectName}

                                        </h2>

                                        <small>

                                            {project.fileName}

                                        </small>

                                    </div>

                                    <span
                                        className={
                                            project.status === "Completed"

                                                ?

                                                "status completed"

                                                :

                                                project.status === "Running"

                                                    ?

                                                    "status running"

                                                    :

                                                    "status pending"
                                        }
                                    >

                                        {project.status}

                                    </span>

                                </div>

                                {/* ==========================
                                    PROJECT DETAILS
                                =========================== */}

                                <div className="project-details">

                                    <div>

                                        <strong>

                                            Scan Type

                                        </strong>

                                        <p>

                                            {project.scanType}

                                        </p>

                                    </div>

                                    <div>

                                        <strong>

                                            Scan Date

                                        </strong>

                                        <p>

                                            {

                                                project.scanDate ?

                                                    new Date(
                                                        project.scanDate
                                                    ).toLocaleDateString()

                                                    :

                                                    "-"

                                            }

                                        </p>

                                    </div>

                                </div>

                                {/* ==========================
                                    VULNERABILITY SUMMARY
                                =========================== */}

                                <div className="vulnerability-summary">

                                    <div className="critical-box">

                                        <h4>

                                            Critical

                                        </h4>

                                        <span>

                                            {project.critical}

                                        </span>

                                    </div>

                                    <div className="high-box">

                                        <h4>

                                            High

                                        </h4>

                                        <span>

                                            {project.high}

                                        </span>

                                    </div>

                                    <div className="medium-box">

                                        <h4>

                                            Medium

                                        </h4>

                                        <span>

                                            {project.medium}

                                        </span>

                                    </div>

                                    <div className="low-box">

                                        <h4>

                                            Low

                                        </h4>

                                        <span>

                                            {project.low}

                                        </span>

                                    </div>

                                </div>

                                {/* ==========================
                                    ACTION BUTTONS
                                =========================== */}

                                <div className="project-actions">

                                    <button
                                        className="view-btn"
                                        onClick={() =>
                                            navigate("/history")
                                        }
                                    >

                                        👁 View Details

                                    </button>

                                    <button
                                        className="report-btn"
                                        onClick={() =>
                                            navigate("/reports")
                                        }
                                    >

                                        📄 Reports

                                    </button>

                                    <button
                                        className="scan-btn"
                                        onClick={() =>
                                            navigate("/new-scan")
                                        }
                                    >

                                        🔍 Scan Again

                                    </button>

                                </div>

                            </div>

                        ))

                    )

        }

    </div>
    {/* ==========================================
                PROJECT SECURITY SUMMARY
            ========================================== */}

    <div className="security-summary-section">

        <div className="section-title">

            <h2>

                🛡 Project Security Summary

            </h2>

        </div>

        <div className="security-summary-grid">

            <div className="summary-box security-score">

                <h4>

                    Security Score

                </h4>

                <h1>

                    {

                        totalCritical === 0

                            ?

                            "98%"

                            :

                            totalCritical <= 5

                                ?

                                "85%"

                                :

                                "65%"

                    }

                </h1>

                <p>

                    Overall Project Health

                </p>

            </div>

            <div className="summary-box protected-projects">

                <h4>

                    Protected Projects

                </h4>

                <h1>

                    {completedProjects}

                </h1>

                <p>

                    Successfully Secured

                </p>

            </div>

            <div className="summary-box risk-level">

                <h4>

                    Risk Level

                </h4>

                <h1>

                    {

                        totalCritical === 0

                            ?

                            "Low"

                            :

                            totalCritical <= 5

                                ?

                                "Medium"

                                :

                                "High"

                    }

                </h1>

                <p>

                    Current Risk Assessment

                </p>

            </div>

            <div className="summary-box scan-status">

                <h4>

                    Scan Coverage

                </h4>

                <h1>

                    100%

                </h1>

                <p>

                    Projects Successfully Scanned

                </p>

            </div>

        </div>

    </div>

    {/* ==========================================
                AI SECURITY RECOMMENDATIONS
            ========================================== */}

    <div className="recommendation-section">

        <div className="section-title">

            <h2>

                🤖 AI Security Recommendations

            </h2>

        </div>

        <div className="recommendation-banner">

            {

                totalCritical > 5 ?

                    (

                        <>

                            <h3>

                                🔴 High Risk Detected

                            </h3>

                            <p>

                                Multiple critical vulnerabilities
                                have been detected. Run another
                                scan after fixing the issues.

                            </p>

                        </>

                    )

                    :

                    totalCritical > 0 ?

                        (

                            <>

                                <h3>

                                    🟡 Medium Risk

                                </h3>

                                <p>

                                    A few vulnerabilities require
                                    attention. Update dependencies
                                    and perform another scan.

                                </p>

                            </>

                        )

                        :

                        (

                            <>

                                <h3>

                                    🟢 Excellent Security

                                </h3>

                                <p>

                                    Great job! Your scanned projects
                                    currently have no critical
                                    vulnerabilities.

                                </p>

                            </>

                        )

            }

        </div>

    </div>

    {/* ==========================================
                RECENT ACTIVITY
            ========================================== */}

    <div className="recent-activity">

        <div className="section-title">

            <h2>

                📈 Recent Activity

            </h2>

        </div>

        <div className="activity-list">

            {

                filteredProjects.slice(0, 5).map((project) => (

                    <div
                        className="activity-item"
                        key={project.id}
                    >

                        <div className="activity-icon">

                            🔍

                        </div>

                        <div>

                            <h4>

                                {project.projectName}

                            </h4>

                            <p>

                                {project.scanType} Scan Completed

                            </p>

                        </div>

                        <span>

                            {

                                project.scanDate ?

                                    new Date(project.scanDate)
                                        .toLocaleDateString()

                                    :

                                    "-"

                            }

                        </span>

                    </div>

                ))

            }

        </div>

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
                onClick={() => navigate("/new-scan")}
            >

                🔍 New Scan

            </button>

            <button
                className="action-btn"
                onClick={() => navigate("/reports")}
            >

                📄 View Reports

            </button>

            <button
                className="action-btn"
                onClick={() => navigate("/history")}
            >

                📜 Scan History

            </button>

            <button
                className="action-btn"
                onClick={() => navigate("/dashboard")}
            >

                🏠 Dashboard

            </button>

        </div>

    </div>

    {/* ==========================================
                FOOTER STATISTICS
            ========================================== */}

    <div className="footer-stats">

        <div className="footer-card">

            <h3>

                Total Projects

            </h3>

            <h1>

                {totalProjects}

            </h1>

        </div>

        <div className="footer-card">

            <h3>

                Completed Scans

            </h3>

            <h1>

                {completedProjects}

            </h1>

        </div>

        <div className="footer-card">

            <h3>

                Running Scans

            </h3>

            <h1>

                {runningProjects}

            </h1>

        </div>

        <div className="footer-card">

            <h3>

                Critical Issues

            </h3>

            <h1>

                {totalCritical}

            </h1>

        </div>

    </div>

    {/* ==========================================
                FOOTER
            ========================================== */}

    <footer className="projects-footer">

        <h2>

            SecureScan AI

        </h2>

        <p>

            AI Powered Security Vulnerability Scanner

        </p>

        <small>

            © 2026 SecureScan AI. All Rights Reserved.

        </small>

    </footer>

        </div >

    );

}

export default MyProjects;