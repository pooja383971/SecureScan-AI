import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./MyScan.css";

function MyScan() {
    const navigate = useNavigate();

    // ==============================
    // USER
    // ==============================
    const [user, setUser] = useState({
        fullName: "",
        email: "",
    });

    // ==============================
    // SCAN FORM
    // ==============================
    const [projectName, setProjectName] = useState("");
    const [scanType, setScanType] = useState("website");
    const [websiteUrl, setWebsiteUrl] = useState("");
    const [apkFile, setApkFile] = useState(null);
    const [scanMode, setScanMode] = useState("Quick");

    // ==============================
    // SCAN STATUS
    // ==============================
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [scanCompleted, setScanCompleted] = useState(false);
    const [error, setError] = useState("");

    // ==============================
    // RESULT
    // ==============================
    const [result, setResult] = useState({
        securityScore: 0,
        critical: 0,
        high: 0,
        medium: 0,
        low: 0,
        totalIssues: 0,
        recommendation: "",
    });

    // ==============================
    // RECENT SCANS
    // ==============================
    const [recentScans, setRecentScans] = useState([]);

    // ==============================
    // LOAD USER
    // ==============================
    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);

                setUser({
                    fullName: parsedUser.fullName || parsedUser.name || "User",
                    email: parsedUser.email || "",
                });
            } catch (err) {
                console.error("User parsing error:", err);
            }
        } else {
            setUser({
                fullName: localStorage.getItem("userName") || "User",
                email: localStorage.getItem("userEmail") || "",
            });
        }

        loadRecentScans();
    }, []);

    // ==============================
    // LOAD RECENT SCANS
    // ==============================
    const loadRecentScans = async () => {
        try {
            const response = await api.get("/scans");

            const data = Array.isArray(response.data)
                ? response.data
                : [];

            setRecentScans(data);
        } catch (err) {
            console.log("Recent scans unavailable:", err);
            setRecentScans([]);
        }
    };

    // ==============================
    // START SCAN
    // ==============================
    const startScan = async () => {
        setError("");

        if (!projectName.trim()) {
            setError("Project Name is required.");
            return;
        }

        if (scanType === "website" && !websiteUrl.trim()) {
            setError("Website URL is required.");
            return;
        }

        if (scanType === "apk" && !apkFile) {
            setError("Please upload an APK file.");
            return;
        }

        try {
            setLoading(true);
            setProgress(10);
            setScanCompleted(false);

            let response;

            // ==============================
            // WEBSITE SCAN
            // ==============================
            if (scanType === "website") {
                response = await api.post("/website/scan", {
                    url: websiteUrl.trim(),
                });
            }

            // ==============================
            // APK SCAN
            // ==============================
            else {
                response = await api.post("/apk/scan", {
                    fileName: apkFile.name,
                });
            }

            setProgress(70);

            const data = response.data || {};

            let critical = Number(data.critical || 0);
            let high = Number(data.high || 0);
            let medium = Number(data.medium || 0);
            let low = Number(data.low || 0);

            // If backend only gives risk level
            if (
                critical === 0 &&
                high === 0 &&
                medium === 0 &&
                low === 0
            ) {
                if (data.risk === "CRITICAL") {
                    critical = 1;
                } else if (data.risk === "HIGH") {
                    high = 1;
                } else if (data.risk === "MEDIUM") {
                    medium = 1;
                } else if (data.risk === "LOW") {
                    low = 1;
                }
            }

            let score = Number(data.score);

            if (Number.isNaN(score)) {
                if (data.risk === "CRITICAL") {
                    score = 25;
                } else if (data.risk === "HIGH") {
                    score = 50;
                } else if (data.risk === "MEDIUM") {
                    score = 75;
                } else {
                    score = 95;
                }
            }

            const totalIssues =
                critical + high + medium + low;

            const recommendation =
                data.recommendation ||
                (data.risk === "LOW"
                    ? "Website security looks good."
                    : data.risk === "MEDIUM"
                        ? "Some security concerns were detected. Review the reported issues."
                        : data.risk === "HIGH"
                            ? "High security risks were detected. Fix high-priority vulnerabilities before deployment."
                            : "Review the detected security vulnerabilities carefully.");

            const scanResult = {
                ...data,
                securityScore: score,
                critical,
                high,
                medium,
                low,
                totalIssues,
                recommendation,
            };

            setProgress(100);
            setResult(scanResult);
            setScanCompleted(true);

            // Try to refresh history
            loadRecentScans();

        } catch (err) {
            console.error("SCAN ERROR:", err);
            console.error(
                "Backend response:",
                err.response?.data
            );

            const backendMessage =
                typeof err.response?.data === "string"
                    ? err.response.data
                    : err.response?.data?.message ||
                    err.response?.data?.error;

            setError(
                backendMessage ||
                "Scan failed. Please make sure the backend is running."
            );

            setProgress(0);
        } finally {
            setLoading(false);
        }
    };

    // ==============================
    // RESET
    // ==============================
    const resetScan = () => {
        setProjectName("");
        setWebsiteUrl("");
        setApkFile(null);
        setProgress(0);
        setScanCompleted(false);
        setError("");

        setResult({
            securityScore: 0,
            critical: 0,
            high: 0,
            medium: 0,
            low: 0,
            totalIssues: 0,
            recommendation: "",
        });
    };

    // ==============================
    // RENDER
    // ==============================
    return (
        <div className="scan-page">

            {/* ==============================
                HEADER
            ============================== */}
            <div className="scan-header">

                <div>
                    <h1>🔍 My Security Scanner</h1>

                    <p>
                        Welcome back{" "}
                        <strong>
                            {user.fullName || "User"}
                        </strong>
                        . Scan websites and Android
                        applications for security
                        vulnerabilities.
                    </p>
                </div>

                <button
                    className="history-btn"
                    onClick={() => navigate("/history")}
                >
                    📜 Scan History
                </button>

            </div>

            {/* ==============================
                USER INFORMATION
            ============================== */}
            <div className="user-info-section">

                <div className="section-title">
                    <h2>👤 User Information</h2>
                </div>

                <div className="user-info-grid">

                    <div className="user-card">
                        <h4>Full Name</h4>
                        <p>
                            {user.fullName || "Not Available"}
                        </p>
                    </div>

                    <div className="user-card">
                        <h4>Email Address</h4>
                        <p>
                            {user.email || "Not Available"}
                        </p>
                    </div>

                    <div className="user-card">
                        <h4>Account Type</h4>
                        <p>Standard User</p>
                    </div>

                    <div className="user-card">
                        <h4>Scanner Version</h4>
                        <p>SecureScan AI v2.0</p>
                    </div>

                </div>

            </div>

            {/* ==============================
                SCAN TYPE
            ============================== */}
            <div className="scan-type-section">

                <div className="section-title">
                    <h2>🔍 Choose Scan Type</h2>

                    <p>
                        Select the type of security
                        scan you want to perform.
                    </p>
                </div>

                <div className="scan-type-grid">

                    <div
                        className={
                            scanType === "website"
                                ? "scan-type-card active"
                                : "scan-type-card"
                        }
                        onClick={() =>
                            setScanType("website")
                        }
                    >
                        <div className="scan-icon">
                            🌐
                        </div>

                        <h3>Website Scan</h3>

                        <p>
                            Scan websites for SSL issues,
                            HTTP headers and security risks.
                        </p>
                    </div>

                    <div
                        className={
                            scanType === "apk"
                                ? "scan-type-card active"
                                : "scan-type-card"
                        }
                        onClick={() =>
                            setScanType("apk")
                        }
                    >
                        <div className="scan-icon">
                            📱
                        </div>

                        <h3>APK Scan</h3>

                        <p>
                            Analyze Android APK files for
                            malware and security threats.
                        </p>
                    </div>

                </div>

            </div>

            {/* ==============================
                SCAN MODE
            ============================== */}
            <div className="scan-mode-section">

                <div className="section-title">
                    <h2>⚙ Scan Mode</h2>
                </div>

                <div className="scan-mode-buttons">

                    <button
                        className={
                            scanMode === "Quick"
                                ? "mode-btn active"
                                : "mode-btn"
                        }
                        onClick={() =>
                            setScanMode("Quick")
                        }
                    >
                        ⚡ Quick Scan
                    </button>

                    <button
                        className={
                            scanMode === "Full"
                                ? "mode-btn active"
                                : "mode-btn"
                        }
                        onClick={() =>
                            setScanMode("Full")
                        }
                    >
                        🛡 Full Scan
                    </button>

                </div>

            </div>

            {/* ==============================
                PROJECT FORM
            ============================== */}
            <div className="scan-form-card">

                <div className="section-title">
                    <h2>📂 Project Details</h2>
                </div>

                <div className="form-group">

                    <label>Project Name</label>

                    <input
                        type="text"
                        placeholder="Enter Project Name"
                        value={projectName}
                        onChange={(e) =>
                            setProjectName(
                                e.target.value
                            )
                        }
                    />

                </div>

                {scanType === "website" && (
                    <div className="form-group">

                        <label>Website URL</label>

                        <input
                            type="url"
                            placeholder="https://example.com"
                            value={websiteUrl}
                            onChange={(e) =>
                                setWebsiteUrl(
                                    e.target.value
                                )
                            }
                        />

                    </div>
                )}

                {scanType === "apk" && (
                    <div className="form-group">

                        <label>Upload APK</label>

                        <input
                            type="file"
                            accept=".apk"
                            onChange={(e) =>
                                setApkFile(
                                    e.target.files?.[0] ||
                                    null
                                )
                            }
                        />

                        {apkFile && (
                            <div className="selected-file">
                                📦 {apkFile.name}
                            </div>
                        )}

                    </div>
                )}

                {/* ==============================
                    SCAN INFORMATION
                ============================== */}
                <div className="scan-info">

                    <div className="info-card">
                        <h4>Scan Type</h4>

                        <p>
                            {scanType === "website"
                                ? "Website Security"
                                : "Android APK"}
                        </p>
                    </div>

                    <div className="info-card">
                        <h4>Scan Mode</h4>
                        <p>{scanMode}</p>
                    </div>

                    <div className="info-card">
                        <h4>Estimated Time</h4>

                        <p>
                            {scanMode === "Quick"
                                ? "1 - 2 Minutes"
                                : "3 - 5 Minutes"}
                        </p>
                    </div>

                </div>

                {/* ERROR */}
                {error && (
                    <div className="error-message">
                        ⚠ {error}
                    </div>
                )}

                {/* BUTTONS */}
                <div className="scan-buttons">

                    <button
                        className="start-btn"
                        onClick={startScan}
                        disabled={loading}
                    >
                        {loading
                            ? "Scanning..."
                            : "▶ Start Scan"}
                    </button>

                    <button
                        className="reset-btn"
                        onClick={resetScan}
                        disabled={loading}
                    >
                        🔄 Reset
                    </button>

                </div>

            </div>

            {/* ==============================
                PROGRESS
            ============================== */}
            {loading && (
                <div className="progress-section">

                    <h2>
                        🔍 Scan In Progress
                    </h2>

                    <p>
                        SecureScan AI is analyzing
                        your application...
                    </p>

                    <div className="progress-bar">

                        <div
                            className="progress-fill"
                            style={{
                                width: `${progress}%`,
                            }}
                        />

                    </div>

                    <h3>{progress}%</h3>

                </div>
            )}

            {/* ==============================
                RESULT
            ============================== */}
            {scanCompleted && (
                <div className="scan-result-section">

                    <div className="result-header">

                        <h2>
                            ✅ Scan Completed Successfully
                        </h2>

                        <p>
                            SecureScan AI completed
                            the security assessment.
                        </p>

                    </div>

                    {/* SCORE */}
                    <div className="security-score-card">

                        <h3>Security Score</h3>

                        <h1>
                            {result.securityScore}%
                        </h1>

                        <p>
                            Overall Security Rating
                        </p>

                    </div>

                    {/* VULNERABILITIES */}
                    <div className="result-grid">

                        <div className="result-card critical">
                            <h4>🔴 Critical</h4>
                            <h1>{result.critical}</h1>
                        </div>

                        <div className="result-card high">
                            <h4>🟠 High</h4>
                            <h1>{result.high}</h1>
                        </div>

                        <div className="result-card medium">
                            <h4>🟡 Medium</h4>
                            <h1>{result.medium}</h1>
                        </div>

                        <div className="result-card low">
                            <h4>🟢 Low</h4>
                            <h1>{result.low}</h1>
                        </div>

                    </div>

                    {/* TOTAL */}
                    <div className="issues-card">

                        <h3>
                            Total Vulnerabilities Found
                        </h3>

                        <h1>
                            {result.totalIssues}
                        </h1>

                    </div>

                    {/* RECOMMENDATION */}
                    <div className="recommendation-card">

                        <h2>
                            🤖 AI Security Recommendation
                        </h2>

                        <p>
                            {result.recommendation ||
                                "Review the detected vulnerabilities and fix high-priority issues before deployment."}
                        </p>

                    </div>

                </div>
            )}

            {/* ==============================
                RECENT SCANS
            ============================== */}
            <div className="recent-scans-section">

                <div className="section-title">
                    <h2>📜 Recent Scans</h2>
                </div>

                {recentScans.length === 0 ? (

                    <div className="empty-recent">

                        <h3>No Recent Scans</h3>

                        <p>
                            Start your first scan to see
                            it here.
                        </p>

                    </div>

                ) : (

                    <div className="recent-scans-grid">

                        {recentScans
                            .slice(0, 5)
                            .map((scan, index) => (

                                <div
                                    className="recent-scan-card"
                                    key={
                                        scan.id ||
                                        scan.projectName ||
                                        index
                                    }
                                >

                                    <div className="recent-header">

                                        <h3>
                                            📁{" "}
                                            {scan.projectName ||
                                                "Security Scan"}
                                        </h3>

                                        <span>
                                            {scan.status ||
                                                "Completed"}
                                        </span>

                                    </div>

                                    <div className="recent-details">

                                        <p>
                                            <strong>
                                                Scan Type:
                                            </strong>{" "}
                                            {scan.scanType ||
                                                "Website"}
                                        </p>

                                        <p>
                                            <strong>
                                                Security Score:
                                            </strong>{" "}
                                            {scan.securityScore ??
                                                "--"}
                                            %
                                        </p>

                                        <p>
                                            <strong>
                                                Scan Date:
                                            </strong>{" "}
                                            {scan.scanDate
                                                ? new Date(
                                                    scan.scanDate
                                                ).toLocaleDateString()
                                                : "-"}
                                        </p>

                                    </div>

                                    <div className="recent-actions">

                                        <button
                                            className="view-btn"
                                            onClick={() =>
                                                navigate(
                                                    "/myreports"
                                                )
                                            }
                                        >
                                            👁 View Report
                                        </button>

                                        <button
                                            className="history-btn"
                                            onClick={() =>
                                                navigate(
                                                    "/history"
                                                )
                                            }
                                        >
                                            📜 History
                                        </button>

                                    </div>

                                </div>

                            ))}

                    </div>

                )}

            </div>

            {/* ==============================
                QUICK ACTIONS
            ============================== */}
            <div className="quick-actions-section">

                <div className="section-title">
                    <h2>⚡ Quick Actions</h2>
                </div>

                <div className="quick-actions-grid">

                    <button
                        className="action-btn"
                        onClick={resetScan}
                    >
                        🔄 New Scan
                    </button>

                    <button
                        className="action-btn"
                        onClick={() =>
                            navigate("/dashboard")
                        }
                    >
                        🏠 Dashboard
                    </button>

                    <button
                        className="action-btn"
                        onClick={() =>
                            navigate("/myreports")
                        }
                    >
                        📄 Reports
                    </button>

                    <button
                        className="action-btn"
                        onClick={() =>
                            navigate("/history")
                        }
                    >
                        📜 History
                    </button>

                </div>

            </div>

            {/* ==============================
                STATISTICS
            ============================== */}
            <div className="scan-statistics-section">

                <div className="section-title">
                    <h2>📊 Scan Statistics</h2>
                </div>

                <div className="statistics-grid">

                    <div className="statistics-card">

                        <div className="statistics-icon">
                            📁
                        </div>

                        <h3>Total Scans</h3>

                        <h1>
                            {recentScans.length}
                        </h1>

                    </div>

                    <div className="statistics-card">

                        <div className="statistics-icon">
                            🛡
                        </div>

                        <h3>
                            Latest Security Score
                        </h3>

                        <h1>
                            {scanCompleted
                                ? `${result.securityScore}%`
                                : "--"}
                        </h1>

                    </div>

                    <div className="statistics-card">

                        <div className="statistics-icon">
                            🔴
                        </div>

                        <h3>Critical Issues</h3>

                        <h1>
                            {scanCompleted
                                ? result.critical
                                : 0}
                        </h1>

                    </div>

                    <div className="statistics-card">

                        <div className="statistics-icon">
                            ✅
                        </div>

                        <h3>Successful Scans</h3>

                        <h1>
                            {
                                recentScans.filter(
                                    (scan) =>
                                        scan.status ===
                                        "Completed"
                                ).length
                            }
                        </h1>

                    </div>

                </div>

            </div>

            {/* ==============================
                SECURITY TIPS
            ============================== */}
            <div className="security-tips-section">

                <div className="section-title">
                    <h2>💡 AI Security Tips</h2>
                </div>

                <div className="tips-grid">

                    <div className="tip-card">
                        <div className="tip-icon">
                            🔐
                        </div>

                        <h3>
                            Strong Authentication
                        </h3>

                        <p>
                            Use MFA and strong passwords
                            for all accounts.
                        </p>
                    </div>

                    <div className="tip-card">
                        <div className="tip-icon">
                            🔄
                        </div>

                        <h3>
                            Keep Software Updated
                        </h3>

                        <p>
                            Regularly update libraries,
                            frameworks and dependencies.
                        </p>
                    </div>

                    <div className="tip-card">
                        <div className="tip-icon">
                            🛡
                        </div>

                        <h3>Scan Regularly</h3>

                        <p>
                            Perform regular security
                            scans to identify risks.
                        </p>
                    </div>

                    <div className="tip-card">
                        <div className="tip-icon">
                            🌐
                        </div>

                        <h3>Enable HTTPS</h3>

                        <p>
                            Protect communication using
                            SSL/TLS.
                        </p>
                    </div>

                </div>

            </div>

            {/* ==============================
                SECURITY STATUS
            ============================== */}
            <div className="security-status-banner">

                <div className="status-left">

                    <h2>
                        🎯 Overall Security Status
                    </h2>

                    <p>
                        {scanCompleted
                            ? result.recommendation
                            : "Run a security scan to evaluate your application's security posture."}
                    </p>

                </div>

                <div className="status-right">

                    <div className="status-circle">

                        <h1>
                            {scanCompleted
                                ? `${result.securityScore}%`
                                : "--"}
                        </h1>

                    </div>

                </div>

            </div>

            {/* ==============================
                QUICK NAVIGATION
            ============================== */}
            <div className="quick-navigation">

                <div className="section-title">
                    <h2>🚀 Quick Navigation</h2>
                </div>

                <div className="navigation-grid">

                    <button
                        className="nav-card"
                        onClick={() =>
                            navigate("/dashboard")
                        }
                    >
                        <span className="nav-icon">
                            📊
                        </span>

                        <h3>Dashboard</h3>

                        <p>
                            View your security dashboard.
                        </p>
                    </button>

                    <button
                        className="nav-card"
                        onClick={() =>
                            navigate("/myreports")
                        }
                    >
                        <span className="nav-icon">
                            📄
                        </span>

                        <h3>Reports</h3>

                        <p>
                            View generated reports.
                        </p>
                    </button>

                    <button
                        className="nav-card"
                        onClick={() =>
                            navigate("/history")
                        }
                    >
                        <span className="nav-icon">
                            📜
                        </span>

                        <h3>History</h3>

                        <p>
                            Review previous scans.
                        </p>
                    </button>

                    <button
                        className="nav-card"
                        onClick={() =>
                            navigate("/profile")
                        }
                    >
                        <span className="nav-icon">
                            👤
                        </span>

                        <h3>Profile</h3>

                        <p>
                            Manage your account.
                        </p>
                    </button>

                </div>

            </div>

            {/* ==============================
                FOOTER
            ============================== */}
            <footer className="scan-footer">

                <div className="footer-content">

                    <h2>
                        🛡 SecureScan AI
                    </h2>

                    <p>
                        AI Powered Vulnerability
                        Scanner for Websites and
                        Android Applications.
                    </p>

                    <div className="footer-info">

                        <span>
                            🌐 Website Security
                        </span>

                        <span>
                            📱 APK Analysis
                        </span>

                        <span>
                            🤖 AI Recommendations
                        </span>

                        <span>
                            📊 Security Reports
                        </span>

                    </div>

                    <hr />

                    <small>
                        © 2026 SecureScan AI |
                        All Rights Reserved
                    </small>

                </div>

            </footer>

        </div>
    );
}

export default MyScan;