// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import api from "../../services/api";
// // import "./MyScan.css";

// // function MyScan() {

// //     const navigate = useNavigate();

// //     // ==========================================
// //     // USER INFO
// //     // ==========================================

// //     const [user, setUser] = useState({

// //         fullName: "",

// //         email: ""

// //     });

// //     // ==========================================
// //     // SCAN FORM
// //     // ==========================================

// //     const [projectName, setProjectName] = useState("");

// //     const [scanType, setScanType] = useState("website");

// //     const [websiteUrl, setWebsiteUrl] = useState("");

// //     const [apkFile, setApkFile] = useState(null);

// //     const [scanMode, setScanMode] = useState("Quick");

// //     // ==========================================
// //     // SCAN STATUS
// //     // ==========================================

// //     const [loading, setLoading] = useState(false);

// //     const [progress, setProgress] = useState(0);

// //     const [scanCompleted, setScanCompleted] = useState(false);

// //     const [error, setError] = useState("");

// //     // ==========================================
// //     // SCAN RESULT
// //     // ==========================================

// //     const [result, setResult] = useState({

// //         securityScore: 0,

// //         critical: 0,

// //         high: 0,

// //         medium: 0,

// //         low: 0,

// //         totalIssues: 0,

// //         recommendation: ""

// //     });

// //     // ==========================================
// //     // RECENT SCANS
// //     // ==========================================

// //     const [recentScans, setRecentScans] = useState([]);

// //     // ==========================================
// //     // LOAD USER
// //     // ==========================================

// //     useEffect(() => {

// //         const fullName =
// //             localStorage.getItem("userName") || "User";

// //         const email =
// //             localStorage.getItem("userEmail") || "";

// //         setUser({

// //             fullName,

// //             email

// //         });

// //         loadRecentScans();

// //     }, []);

// //     // ==========================================
// //     // LOAD RECENT SCANS
// //     // ==========================================

// //     const loadRecentScans = async () => {

// //         try {

// //             const response = await api.get("/scans");

// //             const scans = response.data || [];

// //             setRecentScans(scans);

// //         }

// //         catch (err) {

// //             console.error(err);

// //         }

// //     };

// //     // ==========================================
// //     // START SCAN
// //     // ==========================================

// //     const startScan = async () => {

// //         setError("");

// //         if (projectName.trim() === "") {

// //             setError("Project Name is required.");

// //             return;

// //         }

// //         if (

// //             scanType === "website" &&

// //             websiteUrl.trim() === ""

// //         ) {

// //             setError("Please enter Website URL.");

// //             return;

// //         }

// //         if (

// //             scanType === "apk" &&

// //             !apkFile

// //         ) {

// //             setError("Please upload APK file.");

// //             return;

// //         }

// //         try {

// //             setLoading(true);

// //             setProgress(0);

// //             setScanCompleted(false);

// //             const timer = setInterval(() => {

// //                 setProgress(prev => {

// //                     if (prev >= 100) {

// //                         clearInterval(timer);

// //                         return 100;

// //                     }

// //                     return prev + 10;

// //                 });

// //             }, 250);

// //             const formData = new FormData();

// //             formData.append("projectName", projectName);

// //             formData.append("scanMode", scanMode);

// //             formData.append("scanType", scanType);

// //             formData.append("email", user.email);

// //             if (scanType === "website") {

// //                 formData.append("websiteUrl", websiteUrl);

// //             }

// //             if (scanType === "apk") {

// //                 formData.append("file", apkFile);

// //             }

// //             const response = await api.post(

// //                 "/scans",

// //                 formData,

// //                 {

// //                     headers: {

// //                         "Content-Type": "multipart/form-data"

// //                     }

// //                 }

// //             );

// //             setResult(response.data);

// //             setScanCompleted(true);

// //             loadRecentScans();

// //         }

// //         catch (err) {

// //             console.error(err);

// //             setError("Scan failed. Please try again.");

// //         }

// //         finally {

// //             setLoading(false);

// //         }

// //     };

// //     // ==========================================
// //     // RESET FORM
// //     // ==========================================

// //     const resetScan = () => {

// //         setProjectName("");

// //         setWebsiteUrl("");

// //         setApkFile(null);

// //         setProgress(0);

// //         setScanCompleted(false);

// //         setError("");

// //         setResult({

// //             securityScore: 0,

// //             critical: 0,

// //             high: 0,

// //             medium: 0,

// //             low: 0,

// //             totalIssues: 0,

// //             recommendation: ""

// //         });

// //     };

// //     // ==========================================
// //     // JSX STARTS HERE
// //     // ==========================================

// //     return (

// //         <div className="scan-page"></div>
// //                     {/* ==========================================
// //                 PAGE HEADER
// //             ========================================== */}

// //     <div className="scan-header">

// //         <div>

// //             <h1>

// //                 🔍 My Security Scanner

// //             </h1>

// //             <p>

// //                 Welcome back,

// //                 {" "}

// //                 <strong>

// //                     {user.fullName}

// //                 </strong>

// //                 {" "}

// //                 Scan websites and Android applications
// //                 for security vulnerabilities.

// //             </p>

// //         </div>

// //         <button
// //             className="history-btn"
// //             onClick={() => navigate("/history")}
// //         >

// //             📜 Scan History

// //         </button>

// //     </div>

// //     {/* ==========================================
// //                 SCAN TYPE
// //             ========================================== */}

// //     <div className="scan-type-section">

// //         <h2>

// //             Choose Scan Type

// //         </h2>

// //         <div className="scan-type-grid">

// //             <div

// //                 className={

// //                     scanType === "website"

// //                         ?

// //                         "scan-type-card active"

// //                         :

// //                         "scan-type-card"

// //                 }

// //                 onClick={() =>

// //                     setScanType("website")

// //                 }

// //             >

// //                 <div className="scan-icon">

// //                     🌐

// //                 </div>

// //                 <h3>

// //                     Website Scan

// //                 </h3>

// //                 <p>

// //                     Scan websites for vulnerabilities,
// //                     SSL issues, headers, and security risks.

// //                 </p>

// //             </div>

// //             <div

// //                 className={

// //                     scanType === "apk"

// //                         ?

// //                         "scan-type-card active"

// //                         :

// //                         "scan-type-card"

// //                 }

// //                 onClick={() =>

// //                     setScanType("apk")

// //                 }

// //             >

// //                 <div className="scan-icon">

// //                     📱

// //                 </div>

// //                 <h3>

// //                     APK Scan

// //                 </h3>

// //                 <p>

// //                     Analyze Android APK files for
// //                     malware, permissions, and threats.

// //                 </p>

// //             </div>

// //         </div>

// //     </div>

// //     {/* ==========================================
// //                 SCAN MODE
// //             ========================================== */}

// //     <div className="scan-mode-section">

// //         <h2>

// //             Scan Mode

// //         </h2>

// //         <div className="scan-mode-buttons">

// //             <button

// //                 className={

// //                     scanMode === "Quick"

// //                         ?

// //                         "mode-btn active"

// //                         :

// //                         "mode-btn"

// //                 }

// //                 onClick={() =>

// //                     setScanMode("Quick")

// //                 }

// //             >

// //                 ⚡ Quick Scan

// //             </button>

// //             <button

// //                 className={

// //                     scanMode === "Full"

// //                         ?

// //                         "mode-btn active"

// //                         :

// //                         "mode-btn"

// //                 }

// //                 onClick={() =>

// //                     setScanMode("Full")

// //                 }

// //             >

// //                 🛡 Full Scan

// //             </button>

// //         </div>

// //     </div>

// //     {/* ==========================================
// //                 SCAN FORM START
// //             ========================================== */}

// //     <div className="scan-form-card">
// //         {/* ==========================================
// //                 PROJECT NAME
// //             ========================================== */}

// //         <div className="form-group">

// //             <label>

// //                 Project Name

// //             </label>

// //             <input
// //                 type="text"
// //                 placeholder="Enter Project Name"
// //                 value={projectName}
// //                 onChange={(e) =>
// //                     setProjectName(e.target.value)
// //                 }
// //             />

// //         </div>

// //         {/* ==========================================
// //                 WEBSITE SCAN
// //             ========================================== */}

// //         {

// //             scanType === "website" && (

// //                 <div className="form-group">

// //                     <label>

// //                         Website URL

// //                     </label>

// //                     <input
// //                         type="url"
// //                         placeholder="https://example.com"
// //                         value={websiteUrl}
// //                         onChange={(e) =>
// //                             setWebsiteUrl(e.target.value)
// //                         }
// //                     />

// //                 </div>

// //             )

// //         }

// //         {/* ==========================================
// //                 APK SCAN
// //             ========================================== */}

// //         {

// //             scanType === "apk" && (

// //                 <div className="form-group">

// //                     <label>

// //                         Upload APK File

// //                     </label>

// //                     <input
// //                         type="file"
// //                         accept=".apk"
// //                         onChange={(e) =>
// //                             setApkFile(e.target.files[0])
// //                         }
// //                     />

// //                     {

// //                         apkFile && (

// //                             <div className="selected-file">

// //                                 📦 {apkFile.name}

// //                             </div>

// //                         )

// //                     }

// //                 </div>

// //             )

// //         }

// //         {/* ==========================================
// //                 SCAN INFORMATION
// //             ========================================== */}

// //         <div className="scan-info">

// //             <div className="info-card">

// //                 <h4>

// //                     Scan Type

// //                 </h4>

// //                 <p>

// //                     {scanType === "website"

// //                         ? "Website Security Scan"

// //                         : "Android APK Security Scan"}

// //                 </p>

// //             </div>

// //             <div className="info-card">

// //                 <h4>

// //                     Scan Mode

// //                 </h4>

// //                 <p>

// //                     {scanMode}

// //                 </p>

// //             </div>

// //             <div className="info-card">

// //                 <h4>

// //                     Estimated Time

// //                 </h4>

// //                 <p>

// //                     {

// //                         scanMode === "Quick"

// //                             ?

// //                             "1 - 2 Minutes"

// //                             :

// //                             "3 - 5 Minutes"

// //                     }

// //                 </p>

// //             </div>

// //         </div>

// //         {/* ==========================================
// //                 ERROR MESSAGE
// //             ========================================== */}

// //         {

// //             error && (

// //                 <div className="error-message">

// //                     ⚠ {error}

// //                 </div>

// //             )

// //         }

// //         {/* ==========================================
// //                 ACTION BUTTONS
// //             ========================================== */}

// //         <div className="scan-buttons">

// //             <button
// //                 className="start-btn"
// //                 onClick={startScan}
// //                 disabled={loading}
// //             >

// //                 {

// //                     loading

// //                         ?

// //                         "Scanning..."

// //                         :

// //                         "▶ Start Scan"

// //                 }

// //             </button>

// //             <button
// //                 className="reset-btn"
// //                 onClick={resetScan}
// //                 disabled={loading}
// //             >

// //                 🔄 Reset

// //             </button>

// //         </div>

// //     </div>
// //     {/* ==========================================
// //                 SCAN PROGRESS
// //             ========================================== */}

// //     {

// //         loading && (

// //             <div className="progress-section">

// //                 <h2>

// //                     🔍 Scanning in Progress...

// //                 </h2>

// //                 <div className="progress-bar">

// //                     <div

// //                         className="progress-fill"

// //                         style={{

// //                             width: `${progress}%`

// //                         }}

// //                     ></div>

// //                 </div>

// //                 <h3>

// //                     {progress}%

// //                 </h3>

// //                 <p>

// //                     Please wait while SecureScan AI
// //                     analyzes your application...

// //                 </p>

// //             </div>

// //         )

// //     }

// //     {/* ==========================================
// //                 SCAN RESULT
// //             ========================================== */}

// //     {

// //         scanCompleted && (

// //             <>

// //                 <div className="result-header">

// //                     <h2>

// //                         ✅ Scan Completed Successfully

// //                     </h2>

// //                     <p>

// //                         Your security analysis has been
// //                         completed successfully.

// //                     </p>

// //                 </div>

// //                 {/* ==============================
// //                             SECURITY SCORE
// //                         ============================== */}

// //                 <div className="security-score-card">

// //                     <h3>

// //                         Security Score

// //                     </h3>

// //                     <h1>

// //                         {result.securityScore}%

// //                     </h1>

// //                     <p>

// //                         Overall Security Rating

// //                     </p>

// //                 </div>

// //                 {/* ==============================
// //                             RESULT SUMMARY
// //                         ============================== */}

// //                 <div className="result-grid">

// //                     <div className="result-card critical">

// //                         <h4>

// //                             🔴 Critical

// //                         </h4>

// //                         <h1>

// //                             {result.critical}

// //                         </h1>

// //                     </div>

// //                     <div className="result-card high">

// //                         <h4>

// //                             🟠 High

// //                         </h4>

// //                         <h1>

// //                             {result.high}

// //                         </h1>

// //                     </div>

// //                     <div className="result-card medium">

// //                         <h4>

// //                             🟡 Medium

// //                         </h4>

// //                         <h1>

// //                             {result.medium}

// //                         </h1>

// //                     </div>

// //                     <div className="result-card low">

// //                         <h4>

// //                             🟢 Low

// //                         </h4>

// //                         <h1>

// //                             {result.low}

// //                         </h1>

// //                     </div>

// //                 </div>

// //                 {/* ==============================
// //                             TOTAL ISSUES
// //                         ============================== */}

// //                 <div className="issues-card">

// //                     <h3>

// //                         Total Vulnerabilities Found

// //                     </h3>

// //                     <h1>

// //                         {result.totalIssues}

// //                     </h1>

// //                 </div>

// //                 {/* ==============================
// //                             AI RECOMMENDATION
// //                         ============================== */}

// //                 <div className="recommendation-card">

// //                     <h2>

// //                         🤖 AI Security Recommendation

// //                     </h2>

// //                     <p>

// //                         {

// //                             result.recommendation ||

// //                             "Your scan has been completed successfully. Review the detected vulnerabilities and fix high-priority issues before deployment."

// //                         }

// //                     </p>

// //                 </div>

// //             </>

// //         )

// //     }
// //     {/* ==========================================
// //                 RECENT SCANS
// //             ========================================== */}

// //     <div className="recent-scans-section">

// //         <div className="section-title">

// //             <h2>

// //                 📜 Recent Scans

// //             </h2>

// //         </div>

// //         {

// //             recentScans.length === 0 ?

// //                 (

// //                     <div className="empty-recent">

// //                         <h3>

// //                             No Recent Scans

// //                         </h3>

// //                         <p>

// //                             Start your first scan to see it here.

// //                         </p>

// //                     </div>

// //                 )

// //                 :

// //                 (

// //                     <div className="recent-scans-grid">

// //                         {

// //                             recentScans.slice(0, 5).map((scan) => (

// //                                 <div
// //                                     className="recent-scan-card"
// //                                     key={scan.id}
// //                                 >

// //                                     <div className="recent-header">

// //                                         <h3>

// //                                             📁 {scan.projectName}

// //                                         </h3>

// //                                         <span
// //                                             className={
// //                                                 scan.status === "Completed"

// //                                                     ?

// //                                                     "status completed"

// //                                                     :

// //                                                     "status running"
// //                                             }
// //                                         >

// //                                             {scan.status}

// //                                         </span>

// //                                     </div>

// //                                     <div className="recent-details">

// //                                         <p>

// //                                             <strong>

// //                                                 Scan Type:

// //                                             </strong>

// //                                             {" "}

// //                                             {scan.scanType}

// //                                         </p>

// //                                         <p>

// //                                             <strong>

// //                                                 Scan Date:

// //                                             </strong>

// //                                             {" "}

// //                                             {

// //                                                 scan.scanDate

// //                                                     ?

// //                                                     new Date(
// //                                                         scan.scanDate
// //                                                     ).toLocaleDateString()

// //                                                     :

// //                                                     "-"

// //                                             }

// //                                         </p>

// //                                         <p>

// //                                             <strong>

// //                                                 Security Score:

// //                                             </strong>

// //                                             {" "}

// //                                             {

// //                                                 scan.securityScore

// //                                             }%

// //                                         </p>

// //                                     </div>

// //                                     <div className="recent-actions">

// //                                         <button
// //                                             className="view-btn"
// //                                             onClick={() =>
// //                                                 navigate("/reports")
// //                                             }
// //                                         >

// //                                             👁 View Report

// //                                         </button>

// //                                         <button
// //                                             className="history-btn"
// //                                             onClick={() =>
// //                                                 navigate("/history")
// //                                             }
// //                                         >

// //                                             📜 History

// //                                         </button>

// //                                     </div>

// //                                 </div>

// //                             ))

// //                         }

// //                     </div>

// //                 )

// //         }

// //     </div>

// //     {/* ==========================================
// //                 QUICK ACTIONS
// //             ========================================== */}

// //     <div className="quick-actions-section">

// //         <div className="section-title">

// //             <h2>

// //                 ⚡ Quick Actions

// //             </h2>

// //         </div>

// //         <div className="quick-actions-grid">

// //             <button
// //                 className="action-btn"
// //                 onClick={resetScan}
// //             >

// //                 🔄 New Scan

// //             </button>

// //             <button
// //                 className="action-btn"
// //                 onClick={() => navigate("/reports")}
// //             >

// //                 📄 Reports

// //             </button>

// //             <button
// //                 className="action-btn"
// //                 onClick={() => navigate("/history")}
// //             >

// //                 📜 History

// //             </button>

// //             <button
// //                 className="action-btn"
// //                 onClick={() => navigate("/dashboard")}
// //             >

// //                 🏠 Dashboard

// //             </button>

// //         </div>

// //     </div>
// //     {/* ==========================================
// //                 SCAN STATISTICS
// //             ========================================== */}

// //     <div className="scan-statistics-section">

// //         <div className="section-title">

// //             <h2>

// //                 📊 Scan Statistics

// //             </h2>

// //         </div>

// //         <div className="statistics-grid">

// //             <div className="statistics-card">

// //                 <div className="statistics-icon">

// //                     📁

// //                 </div>

// //                 <h3>

// //                     Total Scans

// //                 </h3>

// //                 <h1>

// //                     {recentScans.length}

// //                 </h1>

// //             </div>

// //             <div className="statistics-card">

// //                 <div className="statistics-icon">

// //                     🛡

// //                 </div>

// //                 <h3>

// //                     Average Security Score

// //                 </h3>

// //                 <h1>

// //                     {

// //                         scanCompleted

// //                             ? `${result.securityScore}%`

// //                             : "--"

// //                     }

// //                 </h1>

// //             </div>

// //             <div className="statistics-card">

// //                 <div className="statistics-icon">

// //                     🔴

// //                 </div>

// //                 <h3>

// //                     Critical Issues

// //                 </h3>

// //                 <h1>

// //                     {

// //                         scanCompleted

// //                             ? result.critical

// //                             : 0

// //                     }

// //                 </h1>

// //             </div>

// //             <div className="statistics-card">

// //                 <div className="statistics-icon">

// //                     ✅

// //                 </div>

// //                 <h3>

// //                     Successful Scans

// //                 </h3>

// //                 <h1>

// //                     {recentScans.length}

// //                 </h1>

// //             </div>

// //         </div>

// //     </div>

// //     {/* ==========================================
// //                 AI SECURITY TIPS
// //             ========================================== */}

// //     <div className="security-tips-section">

// //         <div className="section-title">

// //             <h2>

// //                 💡 AI Security Tips

// //             </h2>

// //         </div>

// //         <div className="tips-grid">

// //             <div className="tip-card">

// //                 <div className="tip-icon">

// //                     🔐

// //                 </div>

// //                 <h3>

// //                     Strong Authentication

// //                 </h3>

// //                 <p>

// //                     Use multi-factor authentication and
// //                     strong passwords for all accounts.

// //                 </p>

// //             </div>

// //             <div className="tip-card">

// //                 <div className="tip-icon">

// //                     🔄

// //                 </div>

// //                 <h3>

// //                     Keep Software Updated

// //                 </h3>

// //                 <p>

// //                     Regularly update your applications
// //                     and dependencies to patch known
// //                     vulnerabilities.

// //                 </p>

// //             </div>

// //             <div className="tip-card">

// //                 <div className="tip-icon">

// //                     🛡

// //                 </div>

// //                 <h3>

// //                     Scan Regularly

// //                 </h3>

// //                 <p>

// //                     Perform security scans frequently to
// //                     identify and resolve issues before
// //                     deployment.

// //                 </p>

// //             </div>

// //         </div>

// //     </div>

// //     {/* ==========================================
// //                 SECURITY STATUS
// //             ========================================== */}

// //     <div className="security-status-banner">

// //         <div className="status-left">

// //             <h2>

// //                 🎯 Overall Security Status

// //             </h2>

// //             <p>

// //                 {

// //                     scanCompleted

// //                         ? result.recommendation

// //                         : "Run a scan to evaluate your application's security posture."

// //                 }

// //             </p>

// //         </div>

// //         <div className="status-right">

// //             <div className="status-circle">

// //                 <h1>

// //                     {

// //                         scanCompleted

// //                             ? `${result.securityScore}%`

// //                             : "--"

// //                     }

// //                 </h1>

// //             </div>

// //         </div>

// //     </div>
// //     {/* ==========================================
// //                 QUICK NAVIGATION
// //             ========================================== */}

// //     <div className="quick-navigation">

// //         <div className="section-title">

// //             <h2>

// //                 🚀 Quick Navigation

// //             </h2>

// //         </div>

// //         <div className="navigation-grid">

// //             <button
// //                 className="nav-card"
// //                 onClick={() => navigate("/dashboard")}
// //             >

// //                 <span className="nav-icon">

// //                     📊

// //                 </span>

// //                 <h3>

// //                     Dashboard

// //                 </h3>

// //                 <p>

// //                     View your security dashboard

// //                 </p>

// //             </button>

// //             <button
// //                 className="nav-card"
// //                 onClick={() => navigate("/history")}
// //             >

// //                 <span className="nav-icon">

// //                     📜

// //                 </span>

// //                 <h3>

// //                     Scan History

// //                 </h3>

// //                 <p>

// //                     Review previous scans

// //                 </p>

// //             </button>

// //             <button
// //                 className="nav-card"
// //                 onClick={() => navigate("/reports")}
// //             >

// //                 <span className="nav-icon">

// //                     📄

// //                 </span>

// //                 <h3>

// //                     Reports

// //                 </h3>

// //                 <p>

// //                     Download security reports

// //                 </p>

// //             </button>

// //             <button
// //                 className="nav-card"
// //                 onClick={() => navigate("/profile")}
// //             >

// //                 <span className="nav-icon">

// //                     👤

// //                 </span>

// //                 <h3>

// //                     Profile

// //                 </h3>

// //                 <p>

// //                     Manage your account

// //                 </p>

// //             </button>

// //         </div>

// //     </div>

// //     {/* ==========================================
// //                 FOOTER
// //             ========================================== */}

// //     <footer className="scan-footer">

// //         <div className="footer-content">

// //             <h2>

// //                 🛡 SecureScan AI

// //             </h2>

// //             <p>

// //                 AI Powered Vulnerability Scanner for
// //                 Websites and Android Applications

// //             </p>

// //             <div className="footer-info">

// //                 <span>

// //                     🌐 Website Security

// //                 </span>

// //                 <span>

// //                     📱 APK Analysis

// //                 </span>

// //                 <span>

// //                     🤖 AI Recommendations

// //                 </span>

// //                 <span>

// //                     📊 Security Reports

// //                 </span>

// //             </div>

// //             <hr />

// //             <small>

// //                 © 2026 SecureScan AI | All Rights Reserved

// //             </small>

// //         </div>

// //     </footer>

// //         </div >

// //     );


// // }

// // export default MyScan;
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../services/api";
// import "./MyScan.css";

// function MyScan() {

//     const navigate = useNavigate();

//     /* ==========================================
//        USER INFORMATION
//     ========================================== */

//     const [user, setUser] = useState({
//         fullName: "",
//         email: ""
//     });

//     /* ==========================================
//        SCAN FORM
//     ========================================== */

//     const [projectName, setProjectName] = useState("");

//     const [scanType, setScanType] = useState("website");

//     const [websiteUrl, setWebsiteUrl] = useState("");

//     const [apkFile, setApkFile] = useState(null);

//     const [scanMode, setScanMode] = useState("Quick");

//     /* ==========================================
//        SCAN STATUS
//     ========================================== */

//     const [loading, setLoading] = useState(false);

//     const [progress, setProgress] = useState(0);

//     const [scanCompleted, setScanCompleted] = useState(false);

//     const [error, setError] = useState("");

//     /* ==========================================
//        SCAN RESULT
//     ========================================== */

//     const [result, setResult] = useState({

//         securityScore: 0,

//         critical: 0,

//         high: 0,

//         medium: 0,

//         low: 0,

//         totalIssues: 0,

//         recommendation: ""

//     });

//     /* ==========================================
//        RECENT SCANS
//     ========================================== */

//     const [recentScans, setRecentScans] = useState([]);

//     /* ==========================================
//        LOAD USER
//     ========================================== */

//     useEffect(() => {

//         const storedUser = JSON.parse(
//             localStorage.getItem("user")
//         );

//         if (storedUser) {

//             setUser({
//                 fullName: storedUser.fullName || "",
//                 email: storedUser.email || ""
//             });

//         }

//         loadRecentScans();

//     }, []);

//     /* ==========================================
//        LOAD RECENT SCANS
//     ========================================== */

//     const loadRecentScans = async () => {

//         try {

//             const response = await api.get("/scans");

//             setRecentScans(response.data || []);

//         } catch (err) {

//             console.error(err);

//         }

//     };

//     /* ==========================================
//        START SCAN
//     ========================================== */

//     const startScan = async () => {

//         setError("");

//         if (!projectName.trim()) {
//             setError("Project Name is required.");
//             return;
//         }

//         if (scanType === "website" && !websiteUrl.trim()) {
//             setError("Website URL is required.");
//             return;
//         }

//         if (scanType === "apk" && !apkFile) {
//             setError("Please upload an APK file.");
//             return;
//         }

//         try {

//             setLoading(true);
//             setProgress(0);
//             setScanCompleted(false);

//             const timer = setInterval(() => {
//                 setProgress((prev) => {
//                     if (prev >= 90) {
//                         clearInterval(timer);
//                         return 90;
//                     }
//                     return prev + 10;
//                 });
//             }, 250);

//             let response;
//             let scanResult;

//             // ============================
//             // WEBSITE SCAN
//             // ============================

//             if (scanType === "website") {

//                 response = await api.post("/website/scan", {
//                     url: websiteUrl.trim()
//                 });

//                 const data = response.data;

//                 let critical = 0;
//                 let high = 0;
//                 let medium = 0;
//                 let low = 0;

//                 if (data.risk === "HIGH") {
//                     high = 1;
//                 } else if (data.risk === "MEDIUM") {
//                     medium = 1;
//                 } else {
//                     low = 0;
//                 }

//                 scanResult = {
//                     securityScore: data.score,
//                     critical: critical,
//                     high: high,
//                     medium: medium,
//                     low: low,
//                     totalIssues: critical + high + medium + low,
//                     recommendation:
//                         data.risk === "LOW"
//                             ? "Website security looks good."
//                             : "Review the detected security risks.",
//                     website: data.website,
//                     ssl: data.ssl,
//                     https: data.https,
//                     dns: data.dns,
//                     headers: data.headers,
//                     risk: data.risk
//                 };

//             }

//             // ============================
//             // APK SCAN
//             // ============================

//             else {

//                 response = await api.post("/apk/scan", {
//                     fileName: apkFile.name
//                 });

//                 const data = response.data;

//                 let critical = 0;
//                 let high = 0;
//                 let medium = 0;
//                 let low = 0;

//                 if (data.risk === "HIGH") {
//                     high = 1;
//                 } else if (data.risk === "MEDIUM") {
//                     medium = 1;
//                 } else {
//                     low = 1;
//                 }

//                 let score = 95;

//                 if (data.risk === "HIGH") {
//                     score = 50;
//                 } else if (data.risk === "MEDIUM") {
//                     score = 75;
//                 }

//                 scanResult = {
//                     securityScore: score,
//                     critical: critical,
//                     high: high,
//                     medium: medium,
//                     low: low,
//                     totalIssues: critical + high + medium + low,
//                     recommendation:
//                         data.risk === "HIGH"
//                             ? "High security risk detected."
//                             : data.risk === "MEDIUM"
//                                 ? "Some security concerns were detected."
//                                 : "No major security risk detected.",
//                     packageName: data.packageName,
//                     certificate: data.certificate,
//                     permissions: data.permissions,
//                     malware: data.malware,
//                     risk: data.risk
//                 };
//             }

//             clearInterval(timer);

//             setProgress(100);

//             setResult(scanResult);

//             setScanCompleted(true);

//             loadRecentScans();

//         } catch (err) {

//             console.error("SCAN ERROR:", err);

//             console.error(
//                 "Backend response:",
//                 err.response?.data
//             );

//             setError(
//                 err.response?.data ||
//                 "Scan failed. Make sure the backend is running."
//             );

//         } finally {

//             setLoading(false);

//         }
//     };/* ==========================================
//     WELCOME CARD
// ========================================== */}

//             <div className="welcome-card">

//                 <div className="welcome-left">

//                     <h2>

//                         Welcome Back,

//                         {" "}

//                         <span>

//                             {user.fullName || "User"}

//                         </span>

//                         👋

//                     </h2>

//                     <p>

//                         SecureScan AI helps you identify security
//                         vulnerabilities, malware, weak configurations,
//                         SSL issues, exposed ports, and application
//                         risks before deployment.

//                     </p>

//                 </div>

//                 <div className="welcome-right">

//                     <div className="welcome-icon">

//                         🛡️

//                     </div>

//                 </div>

//             </div>

//             {/* ==========================================
//     USER INFORMATION
// ========================================== */}

//             <div className="user-info-section">

//                 <div className="section-title">

//                     <h2>

//                         👤 User Information

//                     </h2>

//                 </div>

//                 <div className="user-info-grid">

//                     <div className="user-card">

//                         <h4>

//                             Full Name

//                         </h4>

//                         <p>

//                             {user.fullName || "Not Available"}

//                         </p>

//                     </div>

//                     <div className="user-card">

//                         <h4>

//                             Email Address

//                         </h4>

//                         <p>

//                             {user.email || "Not Available"}

//                         </p>

//                     </div>

//                     <div className="user-card">

//                         <h4>

//                             Account Type

//                         </h4>

//                         <p>

//                             Standard User

//                         </p>

//                     </div>

//                     <div className="user-card">

//                         <h4>

//                             Scanner Version

//                         </h4>

//                         <p>

//                             SecureScan AI v2.0

//                         </p>

//                     </div>

//                 </div>

//             </div>

//             {/* ==========================================
//     QUICK NAVIGATION
// ========================================== */}

//             <div className="navigation-section">

//                 <div className="section-title">

//                     <h2>

//                         🚀 Quick Navigation

//                     </h2>

//                 </div>

//                 <div className="navigation-grid">

//                     <button
//                         className="nav-card"
//                         onClick={() => navigate("/dashboard")}
//                     >

//                         <div className="nav-icon">

//                             📊

//                         </div>

//                         <h3>

//                             Dashboard

//                         </h3>

//                         <p>

//                             View security overview

//                         </p>

//                     </button>

//                     <button
//                         className="nav-card"
//                         onClick={() => navigate("/myreports")}
//                     >

//                         <div className="nav-icon">

//                             📄

//                         </div>

//                         <h3>

//                             Reports

//                         </h3>

//                         <p>

//                             View generated reports

//                         </p>

//                     </button>

//                     <button
//                         className="nav-card"
//                         onClick={() => navigate("/history")}
//                     >

//                         <div className="nav-icon">

//                             📜

//                         </div>

//                         <h3>

//                             History

//                         </h3>

//                         <p>

//                             Previous security scans

//                         </p>

//                     </button>

//                     <button
//                         className="nav-card"
//                         onClick={() => navigate("/profile")}
//                     >

//                         <div className="nav-icon">

//                             👤

//                         </div>

//                         <h3>

//                             Profile

//                         </h3>

//                         <p>

//                             Manage your account

//                         </p>

//                     </button>

//                 </div>

//             </div>

//             {/* ==========================================
//     Part 3 Starts Here
// ========================================== */}{/* ==========================================
//     SCAN TYPE
// ========================================== */}

//             <div className="scan-type-section">

//                 <div className="section-title">

//                     <h2>

//                         🔍 Choose Scan Type

//                     </h2>

//                     <p>

//                         Select the type of security scan you want to perform.

//                     </p>

//                 </div>

//                 <div className="scan-type-grid">

//                     <div
//                         className={
//                             scanType === "website"
//                                 ? "scan-type-card active"
//                                 : "scan-type-card"
//                         }
//                         onClick={() => setScanType("website")}
//                     >

//                         <div className="scan-icon">

//                             🌐

//                         </div>

//                         <h3>

//                             Website Scan

//                         </h3>

//                         <p>

//                             Scan websites for SSL issues, HTTP headers,
//                             OWASP vulnerabilities, and configuration problems.

//                         </p>

//                     </div>

//                     <div
//                         className={
//                             scanType === "apk"
//                                 ? "scan-type-card active"
//                                 : "scan-type-card"
//                         }
//                         onClick={() => setScanType("apk")}
//                     >

//                         <div className="scan-icon">

//                             📱

//                         </div>

//                         <h3>

//                             APK Scan

//                         </h3>

//                         <p>

//                             Analyze Android APK files for malware,
//                             dangerous permissions, and security threats.

//                         </p>

//                     </div>

//                 </div>

//             </div>

//             {/* ==========================================
//     SCAN MODE
// ========================================== */}

//             <div className="scan-mode-section">

//                 <div className="section-title">

//                     <h2>

//                         ⚙ Scan Mode

//                     </h2>

//                 </div>

//                 <div className="scan-mode-buttons">

//                     <button
//                         className={
//                             scanMode === "Quick"
//                                 ? "mode-btn active"
//                                 : "mode-btn"
//                         }
//                         onClick={() => setScanMode("Quick")}
//                     >

//                         ⚡ Quick Scan

//                     </button>

//                     <button
//                         className={
//                             scanMode === "Full"
//                                 ? "mode-btn active"
//                                 : "mode-btn"
//                         }
//                         onClick={() => setScanMode("Full")}
//                     >

//                         🛡 Full Scan

//                     </button>

//                 </div>

//             </div>

//             {/* ==========================================
//     PROJECT DETAILS
// ========================================== */}

//             <div className="scan-form-card">

//                 <div className="section-title">

//                     <h2>

//                         📂 Project Details

//                     </h2>

//                 </div>

//                 <div className="form-group">

//                     <label>

//                         Project Name

//                     </label>

//                     <input
//                         type="text"
//                         placeholder="Enter Project Name"
//                         value={projectName}
//                         onChange={(e) =>
//                             setProjectName(e.target.value)
//                         }
//                     />

//                 </div>

//                 {

//                     scanType === "website" && (

//                         <div className="form-group">

//                             <label>

//                                 Website URL

//                             </label>

//                             <input
//                                 type="url"
//                                 placeholder="https://example.com"
//                                 value={websiteUrl}
//                                 onChange={(e) =>
//                                     setWebsiteUrl(e.target.value)
//                                 }
//                             />

//                         </div>

//                     )

//                 }

//                 {

//                     scanType === "apk" && (

//                         <div className="form-group">

//                             <label>

//                                 Upload APK

//                             </label>

//                             <input
//                                 type="file"
//                                 accept=".apk"
//                                 onChange={(e) =>
//                                     setApkFile(e.target.files[0])
//                                 }
//                             />

//                             {

//                                 apkFile && (

//                                     <div className="selected-file">

//                                         📦 {apkFile.name}

//                                     </div>

//                                 )

//                             }

//                         </div>

//                     )

//                 }

//                 {/* ======================================
//         SCAN INFORMATION
//     ====================================== */}

//                 <div className="scan-info">

//                     <div className="info-card">

//                         <h4>

//                             Scan Type

//                         </h4>

//                         <p>

//                             {

//                                 scanType === "website"

//                                     ? "Website Security"

//                                     : "Android APK"

//                             }

//                         </p>

//                     </div>

//                     <div className="info-card">

//                         <h4>

//                             Scan Mode

//                         </h4>

//                         <p>

//                             {scanMode}

//                         </p>

//                     </div>

//                     <div className="info-card">

//                         <h4>

//                             Estimated Time

//                         </h4>

//                         <p>

//                             {

//                                 scanMode === "Quick"

//                                     ? "1 - 2 Minutes"

//                                     : "3 - 5 Minutes"

//                             }

//                         </p>

//                     </div>

//                 </div>

//                 {/* ======================================
//         ERROR MESSAGE
//     ====================================== */}

//                 {

//                     error && (

//                         <div className="error-message">

//                             ⚠ {error}

//                         </div>

//                     )

//                 }

//                 {/* ======================================
//         ACTION BUTTONS
//     ====================================== */}

//                 <div className="scan-buttons">

//                     <button
//                         className="start-btn"
//                         onClick={startScan}
//                         disabled={loading}
//                     >

//                         {

//                             loading

//                                 ? "Scanning..."

//                                 : "▶ Start Scan"

//                         }

//                     </button>

//                     <button
//                         className="reset-btn"
//                         onClick={resetScan}
//                         disabled={loading}
//                     >

//                         🔄 Reset

//                     </button>

//                 </div>

//             </div>

//             {/* ==========================================
//     Part 4 Starts Here
// ========================================== */}{/* ==========================================
//     SCAN PROGRESS
// ========================================== */}

//             {

//                 loading && (

//                     <div className="progress-section">

//                         <div className="section-title">

//                             <h2>

//                                 🔍 Scan In Progress

//                             </h2>

//                             <p>

//                                 SecureScan AI is analyzing your application.
//                                 Please wait...

//                             </p>

//                         </div>

//                         <div className="progress-bar">

//                             <div
//                                 className="progress-fill"
//                                 style={{
//                                     width: `${progress}%`
//                                 }}
//                             ></div>

//                         </div>

//                         <div className="progress-text">

//                             <h3>

//                                 {progress}%

//                             </h3>

//                         </div>

//                     </div>

//                 )

//             }

//             {/* ==========================================
//     SCAN COMPLETED
// ========================================== */}

//             {

//                 scanCompleted && (

//                     <>

//                         <div className="result-header">

//                             <h2>

//                                 ✅ Scan Completed Successfully

//                             </h2>

//                             <p>

//                                 SecureScan AI has completed the security
//                                 assessment successfully.

//                             </p>

//                         </div>

//                         {/* ======================================
//                 SECURITY SCORE
//             ====================================== */}

//                         <div className="security-score-card">

//                             <div className="score-circle">

//                                 <h1>

//                                     {result.securityScore}%

//                                 </h1>

//                             </div>

//                             <div className="score-details">

//                                 <h2>

//                                     Security Score

//                                 </h2>

//                                 <p>

//                                     Overall security posture of your
//                                     application.

//                                 </p>

//                             </div>

//                         </div>

//                         {/* ======================================
//                 VULNERABILITY SUMMARY
//             ====================================== */}

//                         <div className="result-grid">

//                             <div className="result-card critical">

//                                 <h3>

//                                     🔴 Critical

//                                 </h3>

//                                 <h1>

//                                     {result.critical}

//                                 </h1>

//                             </div>

//                             <div className="result-card high">

//                                 <h3>

//                                     🟠 High

//                                 </h3>

//                                 <h1>

//                                     {result.high}

//                                 </h1>

//                             </div>

//                             <div className="result-card medium">

//                                 <h3>

//                                     🟡 Medium

//                                 </h3>

//                                 <h1>

//                                     {result.medium}

//                                 </h1>

//                             </div>

//                             <div className="result-card low">

//                                 <h3>

//                                     🟢 Low

//                                 </h3>

//                                 <h1>

//                                     {result.low}

//                                 </h1>

//                             </div>

//                         </div>

//                         {/* ======================================
//                 TOTAL ISSUES
//             ====================================== */}

//                         <div className="issues-card">

//                             <h2>

//                                 🚨 Total Vulnerabilities

//                             </h2>

//                             <h1>

//                                 {result.totalIssues}

//                             </h1>

//                             <p>

//                                 Total security issues detected
//                                 during the scan.

//                             </p>

//                         </div>

//                         {/* ======================================
//                 AI RECOMMENDATION
//             ====================================== */}

//                         <div className="recommendation-card">

//                             <div className="recommendation-header">

//                                 <h2>

//                                     🤖 AI Security Recommendation

//                                 </h2>

//                             </div>

//                             <div className="recommendation-body">

//                                 <p>

//                                     {

//                                         result.recommendation ||

//                                         "The scan completed successfully. Review all Critical and High vulnerabilities before deploying the application. Apply security patches, enable HTTPS, validate user inputs, remove unnecessary permissions, and perform another scan after implementing the fixes."

//                                     }

//                                 </p>

//                             </div>

//                         </div>

//                     </>

//                 )

//             }

//             {/* ==========================================
//     Part 5 Starts Here
// ========================================== */}{/* ==========================================
//     RECENT SCANS
// ========================================== */}

//             <div className="recent-scans-section">

//                 <div className="section-title">

//                     <h2>

//                         📜 Recent Scans

//                     </h2>

//                     <p>

//                         View your recently completed security scans.

//                     </p>

//                 </div>

//                 {

//                     recentScans.length === 0 ? (

//                         <div className="empty-scans">

//                             <h3>

//                                 No Recent Scans

//                             </h3>

//                             <p>

//                                 Your completed scans will appear here.

//                             </p>

//                         </div>

//                     ) : (

//                         <div className="recent-scans-grid">

//                             {

//                                 recentScans.slice(0, 5).map((scan) => (

//                                     <div
//                                         className="recent-scan-card"
//                                         key={scan.id}
//                                     >

//                                         <div className="recent-card-header">

//                                             <h3>

//                                                 📁 {scan.projectName}

//                                             </h3>

//                                             <span
//                                                 className={
//                                                     scan.status === "Completed"
//                                                         ? "status completed"
//                                                         : "status running"
//                                                 }
//                                             >

//                                                 {scan.status}

//                                             </span>

//                                         </div>

//                                         <div className="recent-card-body">

//                                             <p>

//                                                 <strong>

//                                                     Scan Type:

//                                                 </strong>

//                                                 {" "}

//                                                 {scan.scanType}

//                                             </p>

//                                             <p>

//                                                 <strong>

//                                                     Security Score:

//                                                 </strong>

//                                                 {" "}

//                                                 {scan.securityScore}%

//                                             </p>

//                                             <p>

//                                                 <strong>

//                                                     Scan Date:

//                                                 </strong>

//                                                 {" "}

//                                                 {

//                                                     scan.scanDate

//                                                         ? new Date(
//                                                             scan.scanDate
//                                                         ).toLocaleDateString()

//                                                         : "N/A"

//                                                 }

//                                             </p>

//                                         </div>

//                                         <div className="recent-card-footer">

//                                             <button
//                                                 className="view-report-btn"
//                                                 onClick={() =>
//                                                     navigate("/myreports")
//                                                 }
//                                             >

//                                                 👁 View Report

//                                             </button>

//                                             <button
//                                                 className="history-btn"
//                                                 onClick={() =>
//                                                     navigate("/history")
//                                                 }
//                                             >

//                                                 📂 History

//                                             </button>

//                                         </div>

//                                     </div>

//                                 ))

//                             }

//                         </div>

//                     )

//                 }

//             </div>

//             {/* ==========================================
//     QUICK ACTIONS
// ========================================== */}

//             <div className="quick-actions-section">

//                 <div className="section-title">

//                     <h2>

//                         ⚡ Quick Actions

//                     </h2>

//                     <p>

//                         Quickly access frequently used features.

//                     </p>

//                 </div>

//                 <div className="quick-actions-grid">

//                     <button
//                         className="action-card"
//                         onClick={resetScan}
//                     >

//                         <div className="action-icon">

//                             🔄

//                         </div>

//                         <h3>

//                             New Scan

//                         </h3>

//                         <p>

//                             Reset the current form and start a new scan.

//                         </p>

//                     </button>

//                     <button
//                         className="action-card"
//                         onClick={() => navigate("/dashboard")}
//                     >

//                         <div className="action-icon">

//                             🏠

//                         </div>

//                         <h3>

//                             Dashboard

//                         </h3>

//                         <p>

//                             View your security dashboard.

//                         </p>

//                     </button>

//                     <button
//                         className="action-card"
//                         onClick={() => navigate("/myreports")}
//                     >

//                         <div className="action-icon">

//                             📄

//                         </div>

//                         <h3>

//                             Reports

//                         </h3>

//                         <p>

//                             Open generated security reports.

//                         </p>

//                     </button>

//                     <button
//                         className="action-card"
//                         onClick={() => navigate("/history")}
//                     >

//                         <div className="action-icon">

//                             📜

//                         </div>

//                         <h3>

//                             History

//                         </h3>

//                         <p>

//                             Browse previous scan history.

//                         </p>

//                     </button>

//                 </div>

//             </div>

//             {/* ==========================================
//     Part 6 Starts Here
// ========================================== */}{/* ==========================================
//     SCAN STATISTICS
// ========================================== */}

//             <div className="statistics-section">

//                 <div className="section-title">

//                     <h2>

//                         📊 Scan Statistics

//                     </h2>

//                     <p>

//                         Overview of your recent security scanning activity.

//                     </p>

//                 </div>

//                 <div className="statistics-grid">

//                     <div className="statistics-card">

//                         <div className="statistics-icon">

//                             📁

//                         </div>

//                         <h3>

//                             Total Scans

//                         </h3>

//                         <h1>

//                             {recentScans.length}

//                         </h1>

//                         <p>

//                             Scans completed

//                         </p>

//                     </div>

//                     <div className="statistics-card">

//                         <div className="statistics-icon">

//                             🛡

//                         </div>

//                         <h3>

//                             Average Security Score

//                         </h3>

//                         <h1>

//                             {

//                                 scanCompleted

//                                     ? `${result.securityScore}%`

//                                     : "--"

//                             }

//                         </h1>

//                         <p>

//                             Latest scan rating

//                         </p>

//                     </div>

//                     <div className="statistics-card">

//                         <div className="statistics-icon">

//                             🔴

//                         </div>

//                         <h3>

//                             Critical Issues

//                         </h3>

//                         <h1>

//                             {

//                                 scanCompleted

//                                     ? result.critical

//                                     : 0

//                             }

//                         </h1>

//                         <p>

//                             High priority vulnerabilities

//                         </p>

//                     </div>

//                     <div className="statistics-card">

//                         <div className="statistics-icon">

//                             ✅

//                         </div>

//                         <h3>

//                             Successful Scans

//                         </h3>

//                         <h1>

//                             {

//                                 recentScans.filter(
//                                     scan => scan.status === "Completed"
//                                 ).length

//                             }

//                         </h1>

//                         <p>

//                             Completed successfully

//                         </p>

//                     </div>

//                 </div>

//             </div>

//             {/* ==========================================
//     AI SECURITY TIPS
// ========================================== */}

//             <div className="security-tips-section">

//                 <div className="section-title">

//                     <h2>

//                         🤖 AI Security Tips

//                     </h2>

//                     <p>

//                         Best practices to improve your application's security.

//                     </p>

//                 </div>

//                 <div className="tips-grid">

//                     <div className="tip-card">

//                         <div className="tip-icon">

//                             🔐

//                         </div>

//                         <h3>

//                             Use Strong Authentication

//                         </h3>

//                         <p>

//                             Enable Multi-Factor Authentication (MFA)
//                             and enforce strong password policies.

//                         </p>

//                     </div>

//                     <div className="tip-card">

//                         <div className="tip-icon">

//                             🔄

//                         </div>

//                         <h3>

//                             Keep Software Updated

//                         </h3>

//                         <p>

//                             Regularly update libraries,
//                             frameworks, and dependencies.

//                         </p>

//                     </div>

//                     <div className="tip-card">

//                         <div className="tip-icon">

//                             🛡

//                         </div>

//                         <h3>

//                             Scan Regularly

//                         </h3>

//                         <p>

//                             Schedule routine security scans
//                             to detect vulnerabilities early.

//                         </p>

//                     </div>

//                     <div className="tip-card">

//                         <div className="tip-icon">

//                             🌐

//                         </div>

//                         <h3>

//                             Enable HTTPS

//                         </h3>

//                         <p>

//                             Protect communication using SSL/TLS
//                             certificates across all endpoints.

//                         </p>

//                     </div>

//                     <div className="tip-card">

//                         <div className="tip-icon">

//                             🔍

//                         </div>

//                         <h3>

//                             Validate User Input

//                         </h3>

//                         <p>

//                             Prevent SQL Injection, XSS,
//                             and other common attacks.

//                         </p>

//                     </div>

//                     <div className="tip-card">

//                         <div className="tip-icon">

//                             📦

//                         </div>

//                         <h3>

//                             Minimize Permissions

//                         </h3>

//                         <p>

//                             Grant only the permissions
//                             required by your application.

//                         </p>

//                     </div>

//                 </div>

//             </div>

//             {/* ==========================================
//     SECURITY STATUS
// ========================================== */}

//             <div className="security-status-banner">

//                 <div className="status-left">

//                     <h2>

//                         🎯 Overall Security Status

//                     </h2>

//                     <p>

//                         {

//                             scanCompleted

//                                 ? result.recommendation

//                                 : "Run a security scan to evaluate your application's security posture."

//                         }

//                     </p>

//                 </div>

//                 <div className="status-right">

//                     <div className="status-circle">

//                         <h1>

//                             {

//                                 scanCompleted

//                                     ? `${result.securityScore}%`

//                                     : "--"

//                             }

//                         </h1>

//                         <span>

//                             Security Health

//                         </span>

//                     </div>

//                 </div>

//             </div>

//             {/* ==========================================
//     Part 7 Starts Here
// ========================================== */}

//             {/* ==========================================
//     QUICK NAVIGATION
// ========================================== */}

//             <div className="quick-navigation-section">

//                 <div className="section-title">

//                     <h2>

//                         🚀 Quick Navigation

//                     </h2>

//                     <p>

//                         Access important SecureScan AI modules quickly.

//                     </p>

//                 </div>

//                 <div className="navigation-grid">

//                     <button
//                         className="nav-card"
//                         onClick={() => navigate("/dashboard")}
//                     >

//                         <div className="nav-icon">

//                             📊

//                         </div>

//                         <h3>

//                             Dashboard

//                         </h3>

//                         <p>

//                             View overall security overview.

//                         </p>

//                     </button>

//                     <button
//                         className="nav-card"
//                         onClick={() => navigate("/myreports")}
//                     >

//                         <div className="nav-icon">

//                             📄

//                         </div>

//                         <h3>

//                             Reports

//                         </h3>

//                         <p>

//                             Download and review scan reports.

//                         </p>

//                     </button>

//                     <button
//                         className="nav-card"
//                         onClick={() => navigate("/history")}
//                     >

//                         <div className="nav-icon">

//                             📜

//                         </div>

//                         <h3>

//                             History

//                         </h3>

//                         <p>

//                             View previous security scans.

//                         </p>

//                     </button>

//                     <button
//                         className="nav-card"
//                         onClick={() => navigate("/profile")}
//                     >

//                         <div className="nav-icon">

//                             👤

//                         </div>

//                         <h3>

//                             Profile

//                         </h3>

//                         <p>

//                             Manage your account information.

//                         </p>

//                     </button>

//                 </div>

//             </div>

//             {/* ==========================================
//     CONTACT & SUPPORT
// ========================================== */}

//             <div className="support-section">

//                 <div className="section-title">

//                     <h2>

//                         📞 Contact & Support

//                     </h2>

//                 </div>

//                 <div className="support-grid">

//                     <div className="support-card">

//                         <h3>

//                             📧 Email Support

//                         </h3>

//                         <p>

//                             support@securescan.ai

//                         </p>

//                     </div>

//                     <div className="support-card">

//                         <h3>

//                             💬 Live Chat

//                         </h3>

//                         <p>

//                             Monday - Friday (9:00 AM - 6:00 PM)

//                         </p>

//                     </div>

//                     <div className="support-card">

//                         <h3>

//                             📚 Documentation

//                         </h3>

//                         <p>

//                             Security guides and API documentation.

//                         </p>

//                     </div>

//                 </div>

//             </div>

//             {/* ==========================================
//     FOOTER
// ========================================== */}

//             <footer className="scan-footer">

//                 <div className="footer-top">

//                     <div className="footer-about">

//                         <h2>

//                             🛡 SecureScan AI

//                         </h2>

//                         <p>

//                             AI-powered vulnerability scanner for
//                             websites and Android applications.

//                         </p>

//                     </div>

//                     <div className="footer-links">

//                         <h3>

//                             Quick Links

//                         </h3>

//                         <ul>

//                             <li>

//                                 <button onClick={() => navigate("/dashboard")}>

//                                     Dashboard

//                                 </button>

//                             </li>

//                             <li>

//                                 <button onClick={() => navigate("/myscan")}>

//                                     My Scan

//                                 </button>

//                             </li>

//                             <li>

//                                 <button onClick={() => navigate("/myreports")}>

//                                     Reports

//                                 </button>

//                             </li>

//                             <li>

//                                 <button onClick={() => navigate("/history")}>

//                                     History

//                                 </button>

//                             </li>

//                         </ul>

//                     </div>

//                     <div className="footer-links">

//                         <h3>

//                             Resources

//                         </h3>

//                         <ul>

//                             <li>OWASP Top 10</li>
//                             <li>SSL Security</li>
//                             <li>Android Security</li>
//                             <li>Cybersecurity Tips</li>

//                         </ul>

//                     </div>

//                 </div>

//                 <hr />

//                 <div className="footer-bottom">

//                     <p>

//                         © 2026 SecureScan AI. All Rights Reserved.

//                     </p>

//                     <p>

//                         Built with ❤️ using React, Spring Boot & AI.

//                     </p>

//                 </div>

//             </footer>

//         </div>

//     );

// }

// export default MyScan;
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
        email: ""
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
        website: "",
        ssl: "",
        https: "",
        dns: "",
        headers: "",
        packageName: "",
        certificate: "",
        permissions: [],
        malware: "",
        risk: ""
    });

    // ==============================
    // RECENT SCANS
    // ==============================
    const [recentScans, setRecentScans] = useState([]);

    // ==============================
    // LOAD USER
    // ==============================
    useEffect(() => {
        try {
            const storedUser = JSON.parse(
                localStorage.getItem("user") || "null"
            );

            if (storedUser) {
                setUser({
                    fullName: storedUser.fullName || storedUser.name || "User",
                    email: storedUser.email || ""
                });
            } else {
                setUser({
                    fullName:
                        localStorage.getItem("userName") || "User",
                    email:
                        localStorage.getItem("userEmail") || ""
                });
            }
        } catch (err) {
            console.error("USER LOAD ERROR:", err);
        }

        loadRecentScans();
    }, []);

    // ==============================
    // LOAD RECENT SCANS
    // ==============================
    const loadRecentScans = async () => {
        try {
            const response = await api.get("/scans");

            setRecentScans(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );
        } catch (err) {
            console.error("RECENT SCANS ERROR:", err);
            setRecentScans([]);
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
            website: "",
            ssl: "",
            https: "",
            dns: "",
            headers: "",
            packageName: "",
            certificate: "",
            permissions: [],
            malware: "",
            risk: ""
        });
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

        if (
            scanType === "website" &&
            !websiteUrl.trim()
        ) {
            setError("Website URL is required.");
            return;
        }

        if (
            scanType === "apk" &&
            !apkFile
        ) {
            setError("Please upload an APK file.");
            return;
        }

        let timer;

        try {
            setLoading(true);
            setProgress(0);
            setScanCompleted(false);

            // Progress animation
            timer = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 90) {
                        clearInterval(timer);
                        return 90;
                    }

                    return prev + 10;
                });
            }, 300);

            let response;
            let scanResult;

            // =================================
            // WEBSITE SCAN
            // =================================
            if (scanType === "website") {
                response = await api.post(
                    "/website/scan",
                    {
                        url: websiteUrl.trim(),
                        projectName: projectName.trim(),
                        scanMode: scanMode
                    }
                );

                const data = response.data || {};

                let critical = 0;
                let high = 0;
                let medium = 0;
                let low = 0;

                if (data.risk === "CRITICAL") {
                    critical = 1;
                } else if (data.risk === "HIGH") {
                    high = 1;
                } else if (data.risk === "MEDIUM") {
                    medium = 1;
                } else if (data.risk === "LOW") {
                    low = 0;
                }

                scanResult = {
                    securityScore:
                        Number(data.score ?? data.securityScore ?? 0),

                    critical,
                    high,
                    medium,
                    low,

                    totalIssues:
                        critical +
                        high +
                        medium +
                        low,

                    recommendation:
                        data.recommendation ||
                        (
                            data.risk === "LOW"
                                ? "Website security looks good."
                                : "Review the detected security risks."
                        ),

                    website:
                        data.website || websiteUrl,

                    ssl: data.ssl || "",
                    https: data.https || "",
                    dns: data.dns || "",
                    headers: data.headers || "",
                    risk: data.risk || "UNKNOWN"
                };
            }

            // =================================
            // APK SCAN
            // =================================
            else {
                /*
                 * Your current backend endpoint appears
                 * to accept the APK filename.
                 *
                 * If your backend later requires the
                 * actual file upload, this section can
                 * be changed to FormData.
                 */
                response = await api.post(
                    "/apk/scan",
                    {
                        fileName: apkFile.name,
                        projectName: projectName.trim(),
                        scanMode: scanMode
                    }
                );

                const data = response.data || {};

                let critical = 0;
                let high = 0;
                let medium = 0;
                let low = 0;

                if (data.risk === "CRITICAL") {
                    critical = 1;
                } else if (data.risk === "HIGH") {
                    high = 1;
                } else if (data.risk === "MEDIUM") {
                    medium = 1;
                } else {
                    low = 1;
                }

                let score =
                    Number(
                        data.score ??
                        data.securityScore ??
                        95
                    );

                if (data.risk === "CRITICAL") {
                    score = 25;
                } else if (data.risk === "HIGH") {
                    score = 50;
                } else if (data.risk === "MEDIUM") {
                    score = 75;
                }

                scanResult = {
                    securityScore: score,

                    critical,
                    high,
                    medium,
                    low,

                    totalIssues:
                        critical +
                        high +
                        medium +
                        low,

                    recommendation:
                        data.recommendation ||
                        (
                            data.risk === "HIGH"
                                ? "High security risk detected."
                                : data.risk === "MEDIUM"
                                    ? "Some security concerns were detected."
                                    : "No major security risk detected."
                        ),

                    packageName:
                        data.packageName || "",

                    certificate:
                        data.certificate || "",

                    permissions:
                        data.permissions || [],

                    malware:
                        data.malware || "",

                    risk:
                        data.risk || "LOW"
                };
            }

            // =================================
            // SCAN SUCCESS
            // =================================

            if (timer) {
                clearInterval(timer);
            }

            setProgress(100);

            setResult(scanResult);

            setScanCompleted(true);

            await loadRecentScans();

        } catch (err) {
            console.error("SCAN ERROR:", err);

            console.error(
                "Backend response:",
                err.response?.data
            );

            if (timer) {
                clearInterval(timer);
            }

            const backendMessage =
                err.response?.data?.message ||
                err.response?.data?.error ||
                err.response?.data;

            setError(
                typeof backendMessage === "string"
                    ? backendMessage
                    : "Scan failed. Make sure the backend is running."
            );

        } finally {
            setLoading(false);
        }
    };

    // ==============================
    // JSX
    // ==============================
    return (
        <div className="scan-page">

            {/* =================================
                WELCOME
            ================================= */}

            <div className="welcome-card">

                <div className="welcome-left">

                    <h2>
                        Welcome Back,{" "}
                        <span>
                            {user.fullName || "User"}
                        </span>{" "}
                        👋
                    </h2>

                    <p>
                        SecureScan AI helps you identify
                        security vulnerabilities, malware,
                        weak configurations, SSL issues,
                        exposed ports and application risks.
                    </p>

                </div>

                <div className="welcome-right">

                    <div className="welcome-icon">
                        🛡️
                    </div>

                </div>

            </div>


            {/* =================================
                USER INFORMATION
            ================================= */}

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


            {/* =================================
                QUICK NAVIGATION
            ================================= */}

            <div className="navigation-section">

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
                        📊
                        <h3>Dashboard</h3>
                        <p>View security overview</p>
                    </button>

                    <button
                        className="nav-card"
                        onClick={() =>
                            navigate("/myreports")
                        }
                    >
                        📄
                        <h3>Reports</h3>
                        <p>View generated reports</p>
                    </button>

                    <button
                        className="nav-card"
                        onClick={() =>
                            navigate("/history")
                        }
                    >
                        📜
                        <h3>History</h3>
                        <p>Previous security scans</p>
                    </button>

                    <button
                        className="nav-card"
                        onClick={() =>
                            navigate("/profile")
                        }
                    >
                        👤
                        <h3>Profile</h3>
                        <p>Manage your profile</p>
                    </button>

                </div>

            </div>


            {/* =================================
                SCAN TYPE
            ================================= */}

            <div className="scan-type-section">

                <div className="section-title">

                    <h2>
                        🔍 Choose Scan Type
                    </h2>

                    <p>
                        Select the type of security scan.
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

                        <h3>
                            Website Scan
                        </h3>

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

                        <h3>
                            APK Scan
                        </h3>

                        <p>
                            Analyze Android APK files
                            for security threats.
                        </p>

                    </div>

                </div>

            </div>


            {/* =================================
                SCAN MODE
            ================================= */}

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


            {/* =================================
                PROJECT DETAILS
            ================================= */}

            <div className="scan-form-card">

                <div className="section-title">

                    <h2>
                        📂 Project Details
                    </h2>

                </div>


                {/* PROJECT NAME */}

                <div className="form-group">

                    <label>
                        Project Name
                    </label>

                    <input
                        type="text"
                        placeholder="Enter Project Name"
                        value={projectName}
                        onChange={(e) =>
                            setProjectName(e.target.value)
                        }
                    />

                </div>


                {/* WEBSITE */}

                {scanType === "website" && (

                    <div className="form-group">

                        <label>
                            Website URL
                        </label>

                        <input
                            type="url"
                            placeholder="https://example.com"
                            value={websiteUrl}
                            onChange={(e) =>
                                setWebsiteUrl(e.target.value)
                            }
                        />

                    </div>

                )}


                {/* APK */}

                {scanType === "apk" && (

                    <div className="form-group">

                        <label>
                            Upload APK
                        </label>

                        <input
                            type="file"
                            accept=".apk"
                            onChange={(e) =>
                                setApkFile(
                                    e.target.files?.[0] || null
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


                {/* SCAN INFORMATION */}

                <div className="scan-info">

                    <div className="info-card">

                        <h4>
                            Scan Type
                        </h4>

                        <p>
                            {scanType === "website"
                                ? "Website Security"
                                : "Android APK"}
                        </p>

                    </div>


                    <div className="info-card">

                        <h4>
                            Scan Mode
                        </h4>

                        <p>
                            {scanMode}
                        </p>

                    </div>


                    <div className="info-card">

                        <h4>
                            Estimated Time
                        </h4>

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


            {/* =================================
                PROGRESS
            ================================= */}

            {loading && (

                <div className="progress-section">

                    <div className="section-title">

                        <h2>
                            🔍 Scan In Progress
                        </h2>

                        <p>
                            SecureScan AI is analyzing
                            your application...
                        </p>

                    </div>

                    <div className="progress-bar">

                        <div
                            className="progress-fill"
                            style={{
                                width: `${progress}%`
                            }}
                        />

                    </div>

                    <div className="progress-text">

                        <h3>
                            {progress}%
                        </h3>

                    </div>

                </div>

            )}


            {/* =================================
                RESULT
            ================================= */}

            {scanCompleted && (

                <div className="scan-result-section">

                    <div className="result-header">

                        <h2>
                            ✅ Scan Completed Successfully
                        </h2>

                        <p>
                            SecureScan AI completed the
                            security assessment.
                        </p>

                    </div>


                    {/* SCORE */}

                    <div className="security-score-card">

                        <div className="score-circle">

                            <h1>
                                {result.securityScore}%
                            </h1>

                        </div>

                        <div className="score-details">

                            <h2>
                                Security Score
                            </h2>

                            <p>
                                Overall security posture
                                of your application.
                            </p>

                        </div>

                    </div>


                    {/* VULNERABILITIES */}

                    <div className="result-grid">

                        <div className="result-card critical">

                            <h3>
                                🔴 Critical
                            </h3>

                            <h1>
                                {result.critical}
                            </h1>

                        </div>


                        <div className="result-card high">

                            <h3>
                                🟠 High
                            </h3>

                            <h1>
                                {result.high}
                            </h1>

                        </div>


                        <div className="result-card medium">

                            <h3>
                                🟡 Medium
                            </h3>

                            <h1>
                                {result.medium}
                            </h1>

                        </div>


                        <div className="result-card low">

                            <h3>
                                🟢 Low
                            </h3>

                            <h1>
                                {result.low}
                            </h1>

                        </div>

                    </div>


                    {/* TOTAL */}

                    <div className="issues-card">

                        <h2>
                            🚨 Total Vulnerabilities
                        </h2>

                        <h1>
                            {result.totalIssues}
                        </h1>

                        <p>
                            Total security issues
                            detected during the scan.
                        </p>

                    </div>


                    {/* RECOMMENDATION */}

                    <div className="recommendation-card">

                        <h2>
                            🤖 AI Security Recommendation
                        </h2>

                        <p>
                            {result.recommendation ||
                                "Review all detected vulnerabilities before deployment."}
                        </p>

                    </div>


                    {/* EXTRA WEBSITE RESULT */}

                    {scanType === "website" && (

                        <div className="details-card">

                            <h2>
                                🌐 Website Scan Details
                            </h2>

                            <p>
                                <strong>Website:</strong>{" "}
                                {result.website || websiteUrl}
                            </p>

                            <p>
                                <strong>Risk:</strong>{" "}
                                {result.risk || "N/A"}
                            </p>

                            <p>
                                <strong>HTTPS:</strong>{" "}
                                {String(result.https || "N/A")}
                            </p>

                            <p>
                                <strong>SSL:</strong>{" "}
                                {String(result.ssl || "N/A")}
                            </p>

                            <p>
                                <strong>DNS:</strong>{" "}
                                {String(result.dns || "N/A")}
                            </p>

                        </div>

                    )}


                    {/* EXTRA APK RESULT */}

                    {scanType === "apk" && (

                        <div className="details-card">

                            <h2>
                                📱 APK Scan Details
                            </h2>

                            <p>
                                <strong>Package:</strong>{" "}
                                {result.packageName || "N/A"}
                            </p>

                            <p>
                                <strong>Risk:</strong>{" "}
                                {result.risk || "N/A"}
                            </p>

                            <p>
                                <strong>Certificate:</strong>{" "}
                                {result.certificate || "N/A"}
                            </p>

                            <p>
                                <strong>Malware:</strong>{" "}
                                {String(result.malware || "N/A")}
                            </p>

                            <p>
                                <strong>Permissions:</strong>{" "}
                                {Array.isArray(result.permissions)
                                    ? result.permissions.join(", ")
                                    : String(
                                        result.permissions || "N/A"
                                    )}
                            </p>

                        </div>

                    )}

                </div>

            )}


            {/* =================================
                RECENT SCANS
            ================================= */}

            <div className="recent-scans-section">

                <div className="section-title">

                    <h2>
                        📜 Recent Scans
                    </h2>

                    <p>
                        View your recently completed
                        security scans.
                    </p>

                </div>


                {recentScans.length === 0 ? (

                    <div className="empty-scans">

                        <h3>
                            No Recent Scans
                        </h3>

                        <p>
                            Your completed scans will
                            appear here.
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
                                        scan._id ||
                                        index
                                    }
                                >

                                    <div className="recent-card-header">

                                        <h3>
                                            📁{" "}
                                            {scan.projectName ||
                                                "Unnamed Project"}
                                        </h3>

                                        <span>
                                            {scan.status ||
                                                "Completed"}
                                        </span>

                                    </div>


                                    <div className="recent-card-body">

                                        <p>
                                            <strong>
                                                Scan Type:
                                            </strong>{" "}
                                            {scan.scanType ||
                                                "N/A"}
                                        </p>

                                        <p>
                                            <strong>
                                                Security Score:
                                            </strong>{" "}
                                            {scan.securityScore ??
                                                0}%
                                        </p>

                                        <p>
                                            <strong>
                                                Scan Date:
                                            </strong>{" "}
                                            {scan.scanDate
                                                ? new Date(
                                                    scan.scanDate
                                                ).toLocaleDateString()
                                                : "N/A"}
                                        </p>

                                    </div>


                                    <div className="recent-card-footer">

                                        <button
                                            onClick={() =>
                                                navigate(
                                                    "/myreports"
                                                )
                                            }
                                        >
                                            👁 View Report
                                        </button>

                                        <button
                                            onClick={() =>
                                                navigate(
                                                    "/history"
                                                )
                                            }
                                        >
                                            📂 History
                                        </button>

                                    </div>

                                </div>

                            ))}

                    </div>

                )}

            </div>


            {/* =================================
                QUICK ACTIONS
            ================================= */}

            <div className="quick-actions-section">

                <div className="section-title">

                    <h2>
                        ⚡ Quick Actions
                    </h2>

                </div>

                <div className="quick-actions-grid">

                    <button
                        className="action-card"
                        onClick={resetScan}
                    >
                        🔄
                        <h3>
                            New Scan
                        </h3>
                        <p>
                            Start a new security scan.
                        </p>
                    </button>


                    <button
                        className="action-card"
                        onClick={() =>
                            navigate("/dashboard")
                        }
                    >
                        🏠
                        <h3>
                            Dashboard
                        </h3>
                        <p>
                            View security dashboard.
                        </p>
                    </button>


                    <button
                        className="action-card"
                        onClick={() =>
                            navigate("/myreports")
                        }
                    >
                        📄
                        <h3>
                            Reports
                        </h3>
                        <p>
                            Open security reports.
                        </p>
                    </button>


                    <button
                        className="action-card"
                        onClick={() =>
                            navigate("/history")
                        }
                    >
                        📜
                        <h3>
                            History
                        </h3>
                        <p>
                            Browse previous scans.
                        </p>
                    </button>

                </div>

            </div>


            {/* =================================
                STATISTICS
            ================================= */}

            <div className="statistics-section">

                <div className="section-title">

                    <h2>
                        📊 Scan Statistics
                    </h2>

                </div>

                <div className="statistics-grid">

                    <div className="statistics-card">

                        <h3>
                            Total Scans
                        </h3>

                        <h1>
                            {recentScans.length}
                        </h1>

                    </div>


                    <div className="statistics-card">

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

                        <h3>
                            Critical Issues
                        </h3>

                        <h1>
                            {scanCompleted
                                ? result.critical
                                : 0}
                        </h1>

                    </div>


                    <div className="statistics-card">

                        <h3>
                            Successful Scans
                        </h3>

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


            {/* =================================
                SECURITY TIPS
            ================================= */}

            <div className="security-tips-section">

                <div className="section-title">

                    <h2>
                        🤖 AI Security Tips
                    </h2>

                </div>

                <div className="tips-grid">

                    <div className="tip-card">
                        🔐
                        <h3>
                            Strong Authentication
                        </h3>
                        <p>
                            Use MFA and strong passwords.
                        </p>
                    </div>

                    <div className="tip-card">
                        🔄
                        <h3>
                            Keep Software Updated
                        </h3>
                        <p>
                            Update libraries and dependencies.
                        </p>
                    </div>

                    <div className="tip-card">
                        🛡
                        <h3>
                            Scan Regularly
                        </h3>
                        <p>
                            Perform regular security scans.
                        </p>
                    </div>

                    <div className="tip-card">
                        🌐
                        <h3>
                            Enable HTTPS
                        </h3>
                        <p>
                            Protect communication using SSL/TLS.
                        </p>
                    </div>

                    <div className="tip-card">
                        🔍
                        <h3>
                            Validate User Input
                        </h3>
                        <p>
                            Prevent injection and XSS attacks.
                        </p>
                    </div>

                    <div className="tip-card">
                        📦
                        <h3>
                            Minimize Permissions
                        </h3>
                        <p>
                            Grant only required permissions.
                        </p>
                    </div>

                </div>

            </div>


            {/* =================================
                SECURITY STATUS
            ================================= */}

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

                        <span>
                            Security Health
                        </span>

                    </div>

                </div>

            </div>


            {/* =================================
                FOOTER
            ================================= */}

            <footer className="scan-footer">

                <div className="footer-top">

                    <div className="footer-about">

                        <h2>
                            🛡 SecureScan AI
                        </h2>

                        <p>
                            AI-powered vulnerability scanner
                            for websites and Android applications.
                        </p>

                    </div>


                    <div className="footer-links">

                        <h3>
                            Quick Links
                        </h3>

                        <ul>

                            <li>
                                <button
                                    onClick={() =>
                                        navigate("/dashboard")
                                    }
                                >
                                    Dashboard
                                </button>
                            </li>

                            <li>
                                <button
                                    onClick={() =>
                                        navigate("/myscan")
                                    }
                                >
                                    My Scan
                                </button>
                            </li>

                            <li>
                                <button
                                    onClick={() =>
                                        navigate("/myreports")
                                    }
                                >
                                    Reports
                                </button>
                            </li>

                            <li>
                                <button
                                    onClick={() =>
                                        navigate("/history")
                                    }
                                >
                                    History
                                </button>
                            </li>

                        </ul>

                    </div>


                    <div className="footer-links">

                        <h3>
                            Resources
                        </h3>

                        <ul>
                            <li>OWASP Top 10</li>
                            <li>SSL Security</li>
                            <li>Android Security</li>
                            <li>Cybersecurity Tips</li>
                        </ul>

                    </div>

                </div>


                <hr />


                <div className="footer-bottom">

                    <p>
                        © 2026 SecureScan AI.
                        All Rights Reserved.
                    </p>

                    <p>
                        Built with ❤️ using React,
                        Spring Boot & AI.
                    </p>

                </div>

            </footer>

        </div>
    );
}

export default MyScan;
