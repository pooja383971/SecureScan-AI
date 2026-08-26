import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import "./MyReports.css";

function MyReports() {

    const navigate = useNavigate();

    // ==========================================
    // USER INFORMATION
    // ==========================================

    const [user, setUser] = useState({

        fullName: "",

        email: ""

    });

    // ==========================================
    // REPORT DATA
    // ==========================================

    const [reports, setReports] = useState([]);

    const [filteredReports, setFilteredReports] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    // ==========================================
    // SEARCH & FILTER
    // ==========================================

    const [search, setSearch] = useState("");

    const [scanTypeFilter, setScanTypeFilter] = useState("All");

    // ==========================================
    // LOAD REPORTS
    // ==========================================

    useEffect(() => {

        loadReports();

    }, []);

    const loadReports = async () => {

        try {

            const email =
                localStorage.getItem("userEmail") || "";

            const fullName =
                localStorage.getItem("userName") || "User";

            setUser({

                fullName,

                email

            });

            const response =
                await api.get("/reports");

            const reportData =
                response.data || [];

            // Show only current user's reports
            const myReports =
                reportData.filter(report =>

                    report.userEmail === email ||

                    report.email === email ||

                    !report.userEmail

                );

            setReports(myReports);

            setFilteredReports(myReports);

        }

        catch (err) {

            console.error(err);

            setError("Unable to load reports.");

        }

        finally {

            setLoading(false);

        }

    };

    // ==========================================
    // SEARCH & FILTER REPORTS
    // ==========================================

    useEffect(() => {

        let list = [...reports];

        if (search.trim() !== "") {

            list = list.filter(report =>

                report.projectName
                    ?.toLowerCase()
                    .includes(search.toLowerCase())

            );

        }

        if (scanTypeFilter !== "All") {

            list = list.filter(report =>

                report.scanType === scanTypeFilter

            );

        }

        setFilteredReports(list);

    }, [

        search,

        scanTypeFilter,

        reports

    ]);

    // ==========================================
    // REPORT STATISTICS
    // ==========================================

    const totalReports = reports.length;

    const quickReports = reports.filter(

        report => report.scanType === "quick"

    ).length;

    const fullReports = reports.filter(

        report => report.scanType === "full"

    ).length;

    const criticalIssues = reports.reduce(

        (sum, report) =>

            sum + (report.critical || 0),

        0

    );

    // ==========================================
    // DOWNLOAD PDF
    // ==========================================

    const downloadReport = (report) => {

        alert(

            `Downloading report for ${report.projectName}`

        );

        // Later replace this with
        // real PDF download API

    };

    // ==========================================
    // VIEW REPORT
    // ==========================================

    const viewReport = (report) => {

        navigate("/history");

    };

    // ==========================================
    // JSX STARTS HERE
    // ==========================================

    return (

        <div className="reports-page">
                    {/* ==========================================
                PAGE HEADER
            ========================================== */}

            <div className="reports-header">

                <div>

                    <h1>

                        📄 My Security Reports
                    </h1>

                    <p>

                        Welcome back,

                        {" "}

                        <strong>

                            {user.fullName}

                        </strong>

                        {" "}

                        View, search and download all your
                        security scan reports.

                    </p>

                </div>

                <button
                    className="new-scan-btn"
                    onClick={() => navigate("/new-scan")}
                >

                    + New Scan

                </button>

            </div>

            {/* ==========================================
                SEARCH & FILTER
            ========================================== */}

            <div className="filter-container">

                <div className="search-box">

                    <input
                        type="text"
                        placeholder="🔍 Search by Project Name..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>

                <div className="filter-box">

                    <select
                        value={scanTypeFilter}
                        onChange={(e) =>
                            setScanTypeFilter(e.target.value)
                        }
                    >

                        <option value="All">

                            All Reports

                        </option>

                        <option value="quick">

                            Quick Scan

                        </option>

                        <option value="full">

                            Full Scan

                        </option>

                    </select>

                </div>

            </div>

            {/* ==========================================
                REPORT STATISTICS
            ========================================== */}

            <div className="report-stats-grid">

                <div className="report-stat-card">

                    <div className="stat-icon">

                        📄

                    </div>

                    <div>

                        <h2>

                            {totalReports}

                        </h2>

                        <p>

                            Total Reports

                        </p>

                    </div>

                </div>

                <div className="report-stat-card">

                    <div className="stat-icon">

                        ⚡

                    </div>

                    <div>

                        <h2>

                            {quickReports}

                        </h2>

                        <p>

                            Quick Reports

                        </p>

                    </div>

                </div>

                <div className="report-stat-card">

                    <div className="stat-icon">

                        🛡

                    </div>

                    <div>

                        <h2>

                            {fullReports}

                        </h2>

                        <p>

                            Full Reports

                        </p>

                    </div>

                </div>

                <div className="report-stat-card">

                    <div className="stat-icon">

                        🚨

                    </div>

                    <div>

                        <h2>

                            {criticalIssues}

                        </h2>

                        <p>

                            Critical Issues

                        </p>

                    </div>

                </div>

            </div>

            {/* ==========================================
                REPORT LIST START
            ========================================== */}

            <div className="reports-grid"></div>
    {/* ==========================================
                REPORT SUMMARY
            ========================================== */}

    <div className="report-summary-section">

        <div className="section-title">

            <h2>

                📊 Security Report Summary

            </h2>

        </div>

        <div className="summary-grid">

            <div className="summary-card security-score">

                <h4>

                    Security Score

                </h4>

                <h1>

                    {

                        criticalIssues === 0

                            ?

                            "98%"

                            :

                            criticalIssues <= 5

                                ?

                                "85%"

                                :

                                "65%"

                    }

                </h1>

                <p>

                    Overall Security Rating

                </p>

            </div>

            <div className="summary-card success-rate">

                <h4>

                    Scan Success Rate

                </h4>

                <h1>

                    99%

                </h1>

                <p>

                    Successful Scan Reports

                </p>

            </div>

            <div className="summary-card projects-covered">

                <h4>

                    Projects Covered

                </h4>

                <h1>

                    {totalReports}

                </h1>

                <p>

                    Reports Generated

                </p>

            </div>

            <div className="summary-card risk-level">

                <h4>

                    Overall Risk

                </h4>

                <h1>

                    {

                        criticalIssues === 0

                            ?

                            "Low"

                            :

                            criticalIssues <= 5

                                ?

                                "Medium"

                                :

                                "High"

                    }

                </h1>

                <p>

                    Current Risk Level

                </p>

            </div>

        </div>

    </div>

    {/* ==========================================
                AI SECURITY ANALYSIS
            ========================================== */}

    <div className="ai-analysis">

        <div className="section-title">

            <h2>

                🤖 AI Security Analysis

            </h2>

        </div>

        <div className="analysis-card">

            {

                criticalIssues > 5 ?

                    (

                        <>

                            <h3>

                                🔴 High Risk Detected

                            </h3>

                            <p>

                                Multiple critical vulnerabilities
                                were found. Fix them immediately
                                and perform another scan.

                            </p>

                        </>

                    )

                    :

                    criticalIssues > 0 ?

                        (

                            <>

                                <h3>

                                    🟡 Medium Risk

                                </h3>

                                <p>

                                    Some vulnerabilities require
                                    attention. Update your
                                    dependencies and rescan.

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

                                    Great work! No critical
                                    vulnerabilities were detected.

                                </p>

                            </>

                        )

            }

        </div>

    </div>

    {/* ==========================================
                RECENT REPORT ACTIVITY
            ========================================== */}

    <div className="recent-report-section">

        <div className="section-title">

            <h2>

                📅 Recent Reports

            </h2>

        </div>

        <div className="activity-list">

            {

                filteredReports.slice(0, 5).map((report) => (

                    <div
                        className="activity-item"
                        key={report.id}
                    >

                        <div className="activity-icon">

                            📄

                        </div>

                        <div>

                            <h4>

                                {report.projectName}

                            </h4>

                            <p>

                                {report.scanType} Report Generated

                            </p>

                        </div>

                        <span>

                            {

                                report.scanDate

                                    ?

                                    new Date(
                                        report.scanDate
                                    ).toLocaleDateString()

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
                onClick={() => navigate("/history")}
            >

                📜 Scan History

            </button>

            <button
                className="action-btn"
                onClick={() => navigate("/dashboard")}
            >

                📊 Dashboard

            </button>

            <button
                className="action-btn"
                onClick={() => loadReports()}
            >

                🔄 Refresh Reports

            </button>

        </div>

    </div>

    {/* ==========================================
                FOOTER STATISTICS
            ========================================== */}

    <div className="footer-stats">

        <div className="footer-card">

            <h3>

                Total Reports

            </h3>

            <h1>

                {totalReports}

            </h1>

        </div>

        <div className="footer-card">

            <h3>

                Quick Reports

            </h3>

            <h1>

                {quickReports}

            </h1>

        </div>

        <div className="footer-card">

            <h3>

                Full Reports

            </h3>

            <h1>

                {fullReports}

            </h1>

        </div>

        <div className="footer-card">

            <h3>

                Critical Issues

            </h3>

            <h1>

                {criticalIssues}

            </h1>

        </div>

    </div>

    {/* ==========================================
                FOOTER
            ========================================== */}

    <footer className="reports-footer">

        <h2>

            SecureScan AI

        </h2>

        <p>

            AI Powered Security Report Center

        </p>

        <small>

            © 2026 SecureScan AI • All Rights Reserved

        </small>

    </footer>

        </div >

    );

}

export default MyReports;