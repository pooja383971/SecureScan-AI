import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./History.css";

function History() {

    const navigate = useNavigate();

    // ==========================================
    // STATES
    // ==========================================

    const [history, setHistory] = useState([]);

    const [filteredHistory, setFilteredHistory] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [filter, setFilter] = useState("ALL");

    const [selectedHistory, setSelectedHistory] = useState(null);

    const [stats, setStats] = useState({

        totalScans:0,

        safeScans:0,

        vulnerableScans:0,

        criticalScans:0,

        averageSecurityScore:0

    });

    // ==========================================
    // LOAD HISTORY
    // ==========================================

    useEffect(() => {

        loadHistory();

    }, []);

    useEffect(() => {

        filterHistory();

    }, [history, search, filter]);

    // ==========================================
    // FETCH HISTORY
    // ==========================================

    const loadHistory = async () => {

        try{

            setLoading(true);

            const response = await api.get("/history");

            const data = response.data || [];

            setHistory(data);

            calculateStatistics(data);

        }

        catch(error){

            console.error(error);

        }

        finally{

            setLoading(false);

        }

    };

    // ==========================================
    // FILTER HISTORY
    // ==========================================

    const filterHistory = () => {

        let data = [...history];

        if(search){

            data = data.filter(item =>

                item.projectName?.toLowerCase().includes(search.toLowerCase()) ||

                item.scanType?.toLowerCase().includes(search.toLowerCase()) ||

                item.status?.toLowerCase().includes(search.toLowerCase())

            );

        }

        if(filter !== "ALL"){

            data = data.filter(

                item => item.status === filter

            );

        }

        setFilteredHistory(data);

    };

    // ==========================================
    // CALCULATE STATISTICS
    // ==========================================

    const calculateStatistics = (data) => {

        const safe = data.filter(

            item => item.status === "SAFE"

        ).length;

        const vulnerable = data.filter(

            item => item.status === "VULNERABLE"

        ).length;

        const critical = data.filter(

            item => item.status === "CRITICAL"

        ).length;

        const avgScore =

            data.length > 0

            ?

            Math.round(

                data.reduce(

                    (sum,item)=>

                    sum+(item.securityScore || 0),

                    0

                )/data.length

            )

            :

            0;

        setStats({

            totalScans:data.length,

            safeScans:safe,

            vulnerableScans:vulnerable,

            criticalScans:critical,

            averageSecurityScore:avgScore

        });

    };

    // ==========================================
    // EXPORT HISTORY
    // ==========================================

    const exportHistory = () => {

        const data = JSON.stringify(

            filteredHistory,

            null,

            2

        );

        const blob = new Blob(

            [data],

            {

                type:"application/json"

            }

        );

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;

        link.download = "scan-history.json";

        link.click();

    };

    // ==========================================
    // DELETE HISTORY
    // ==========================================

    const deleteHistory = async(id)=>{

        if(!window.confirm(

            "Delete this history record?"

        )) return;

        try{

            await api.delete(

                `/history/${id}`

            );

            loadHistory();

        }

        catch(error){

            console.error(error);

        }

    };

    // ==========================================
    // FORMAT DATE
    // ==========================================

    const formatDate = (date)=>{

        return new Date(date).toLocaleString();

    };

    // ==========================================
    // START JSX
    // ==========================================

    return(

        <div className="history-page"></div>
                    {/* ==========================================
                HISTORY HEADER
            ========================================== */}

    <div className="history-header">

        <div className="header-left">

            <h1>

                📜 Scan History

            </h1>

            <p>

                View, search and manage all your previous
                vulnerability scans and security reports.

            </p>

        </div>

        <div className="header-right">

            <button

                className="export-btn"

                onClick={exportHistory}

            >

                📥 Export History

            </button>

        </div>

    </div>

    {/* ==========================================
                SEARCH & FILTER
            ========================================== */}

    <div className="history-toolbar">

        <div className="search-box">

            <input

                type="text"

                placeholder="🔍 Search by project, scan type or status..."

                value={search}

                onChange={(e) => setSearch(e.target.value)}

            />

        </div>

        <div className="filter-box">

            <select

                value={filter}

                onChange={(e) => setFilter(e.target.value)}

            >

                <option value="ALL">

                    All History

                </option>

                <option value="SAFE">

                    Safe

                </option>

                <option value="VULNERABLE">

                    Vulnerable

                </option>

                <option value="CRITICAL">

                    Critical

                </option>

            </select>

        </div>

    </div>

    {/* ==========================================
                STATISTICS
            ========================================== */}

    <div className="statistics-grid">

        <div className="statistics-card">

            <div className="statistics-icon">

                📁

            </div>

            <h3>

                Total Scans

            </h3>

            <h1>

                {stats.totalScans}

            </h1>

        </div>

        <div className="statistics-card">

            <div className="statistics-icon">

                ✅

            </div>

            <h3>

                Safe Scans

            </h3>

            <h1>

                {stats.safeScans}

            </h1>

        </div>

        <div className="statistics-card">

            <div className="statistics-icon">

                ⚠️

            </div>

            <h3>

                Vulnerable

            </h3>

            <h1>

                {stats.vulnerableScans}

            </h1>

        </div>

        <div className="statistics-card">

            <div className="statistics-icon">

                🚨

            </div>

            <h3>

                Critical

            </h3>

            <h1>

                {stats.criticalScans}

            </h1>

        </div>

        <div className="statistics-card">

            <div className="statistics-icon">

                🛡️

            </div>

            <h3>

                Avg. Security Score

            </h3>

            <h1>

                {stats.averageSecurityScore}%

            </h1>

        </div>

    </div>

    {/* ==========================================
                SECURITY SUMMARY
            ========================================== */}

    <div className="security-summary-card">

        <div className="summary-left">

            <h2>

                🛡 Security Overview

            </h2>

            <p>

                Review your scan history to identify recurring
                vulnerabilities, monitor security improvements,
                and ensure continuous protection of your projects.

            </p>

        </div>

        <div className="summary-right">

            <div className="score-circle">

                <h1>

                    {stats.averageSecurityScore}%

                </h1>

                <span>

                    Overall Score

                </span>

            </div>

        </div>

    </div>
    {/* ==========================================
                HISTORY LIST
            ========================================== */}

    <div className="history-section">

        <div className="section-title">

            <h2>

                📋 Scan History

            </h2>

        </div>

        {

            loading ?

                (

                    <div className="loading-card">

                        <h3>

                            Loading history...

                        </h3>

                    </div>

                )

                :

                filteredHistory.length === 0 ?

                    (

                        <div className="empty-card">

                            <h2>

                                📂 No Scan History Found

                            </h2>

                            <p>

                                Your completed scans will appear here.

                            </p>

                        </div>

                    )

                    :

                    (

                        filteredHistory.map((item, index) => (

                            <div

                                className="history-card"

                                key={item.id || index}

                            >

                                {/* LEFT */}

                                <div className="history-left">

                                    <div className="history-icon">

                                        {

                                            item.scanType === "APK"

                                                ?

                                                "📱"

                                                :

                                                "🌐"

                                        }

                                    </div>

                                </div>

                                {/* CENTER */}

                                <div className="history-center">

                                    <h2>

                                        {

                                            item.projectName ||

                                            "Unknown Project"

                                        }

                                    </h2>

                                    <p>

                                        <strong>

                                            Scan Type :

                                        </strong>

                                        {

                                            item.scanType ||

                                            "Website"

                                        }

                                    </p>

                                    <p>

                                        <strong>

                                            Target :

                                        </strong>

                                        {

                                            item.target ||

                                            "-"

                                        }

                                    </p>

                                    <p>

                                        <strong>

                                            Scan Date :

                                        </strong>

                                        {

                                            item.createdAt

                                                ?

                                                formatDate(

                                                    item.createdAt

                                                )

                                                :

                                                "-"

                                        }

                                    </p>

                                </div>

                                {/* RIGHT */}

                                <div className="history-right">

                                    <div

                                        className={`status-badge ${item.status === "SAFE"

                                                ?

                                                "safe"

                                                :

                                                item.status === "CRITICAL"

                                                    ?

                                                    "critical"

                                                    :

                                                    "warning"

                                            }`}

                                    >

                                        {

                                            item.status ||

                                            "UNKNOWN"

                                        }

                                    </div>

                                    <div className="score-box">

                                        <span>

                                            Security Score

                                        </span>

                                        <h2>

                                            {

                                                item.securityScore || 0

                                            }%

                                        </h2>

                                    </div>

                                    <div className="history-actions">

                                        <button

                                            className="view-btn"

                                            onClick={() =>

                                                setSelectedHistory(item)

                                            }

                                        >

                                            👁 View

                                        </button>

                                        <button

                                            className="delete-btn"

                                            onClick={() =>

                                                deleteHistory(item.id)

                                            }

                                        >

                                            🗑 Delete

                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))

                    )

        }

    </div>

    {/* ==========================================
                HISTORY DETAILS MODAL
            ========================================== */}

    {

        selectedHistory &&

            <div className="history-modal">

                <div className="history-modal-content">

                    <div className="modal-header">

                        <h2>

                            📄 Scan Details

                        </h2>

                        <button

                            className="close-btn"

                            onClick={() =>

                                setSelectedHistory(null)

                            }

                        >

                            ✖

                        </button>

                    </div>

                    <div className="modal-body">

                        <p>

                            <strong>

                                Project :

                            </strong>

                            {selectedHistory.projectName}

                        </p>

                        <p>

                            <strong>

                                Scan Type :

                            </strong>

                            {selectedHistory.scanType}

                        </p>

                        <p>

                            <strong>

                                Target :

                            </strong>

                            {selectedHistory.target}

                        </p>

                        <p>

                            <strong>

                                Status :

                            </strong>

                            {selectedHistory.status}

                        </p>

                        <p>

                            <strong>

                                Security Score :

                            </strong>

                            {selectedHistory.securityScore}%

                        </p>

                        <p>

                            <strong>

                                Vulnerabilities :

                            </strong>

                            {

                                selectedHistory.totalVulnerabilities ||

                                0

                            }

                        </p>

                        <p>

                            <strong>

                                Scan Time :

                            </strong>

                            {

                                formatDate(

                                    selectedHistory.createdAt

                                )

                            }

                        </p>

                    </div>

                </div>

            </div>

    }
    {/* ==========================================
                VULNERABILITY SUMMARY
            ========================================== */}

    <div className="summary-section">

        <div className="section-title">

            <h2>

                🛡 Vulnerability Summary

            </h2>

        </div>

        <div className="summary-grid">

            <div className="summary-card safe-card">

                <div className="summary-icon">

                    ✅

                </div>

                <h3>

                    Safe Scans

                </h3>

                <h1>

                    {stats.safeScans}

                </h1>

                <p>

                    Projects with no major vulnerabilities detected.

                </p>

            </div>

            <div className="summary-card warning-card">

                <div className="summary-icon">

                    ⚠️

                </div>

                <h3>

                    Vulnerable Scans

                </h3>

                <h1>

                    {stats.vulnerableScans}

                </h1>

                <p>

                    Projects requiring security improvements.

                </p>

            </div>

            <div className="summary-card critical-card">

                <div className="summary-icon">

                    🚨

                </div>

                <h3>

                    Critical Scans

                </h3>

                <h1>

                    {stats.criticalScans}

                </h1>

                <p>

                    High-risk vulnerabilities requiring immediate action.

                </p>

            </div>

        </div>

    </div>

    {/* ==========================================
                SECURITY ANALYSIS
            ========================================== */}

    <div className="analysis-section">

        <div className="section-title">

            <h2>

                📊 Security Analysis

            </h2>

        </div>

        <div className="analysis-grid">

            <div className="analysis-card">

                <h3>

                    📈 Overall Security Score

                </h3>

                <div className="score-circle large">

                    <h1>

                        {stats.averageSecurityScore}%

                    </h1>

                </div>

                <p>

                    Average security score calculated from all completed scans.

                </p>

            </div>

            <div className="analysis-card">

                <h3>

                    📉 Risk Level

                </h3>

                <div className="risk-indicator">

                    {

                        stats.averageSecurityScore >= 90 ?

                            "🟢 Low Risk"

                            :

                            stats.averageSecurityScore >= 70 ?

                                "🟡 Medium Risk"

                                :

                                "🔴 High Risk"

                    }

                </div>

                <p>

                    Risk level is determined based on your overall security score.

                </p>

            </div>

            <div className="analysis-card">

                <h3>

                    📋 Scan Coverage

                </h3>

                <h1>

                    {stats.totalScans}

                </h1>

                <p>

                    Total completed security scans available in history.

                </p>

            </div>

        </div>

    </div>

    {/* ==========================================
                AI SECURITY SUMMARY
            ========================================== */}

    <div className="ai-summary-card">

        <div className="ai-summary-icon">

            🤖

        </div>

        <div className="ai-summary-content">

            <h2>

                AI Security Summary

            </h2>

            <p>

                Based on your scan history, SecureScan AI recommends
                regularly reviewing projects marked as
                <strong> Vulnerable </strong>
                or
                <strong> Critical </strong>.
                Address high-risk findings first, then rerun scans to
                verify that issues have been resolved and your overall
                security posture continues to improve.

            </p>

        </div>

    </div>
    {/* ==========================================
                AI RECOMMENDATIONS
            ========================================== */}

    <div className="recommendation-section">

        <div className="section-title">

            <h2>

                🤖 AI Recommendations

            </h2>

        </div>

        <div className="recommendation-grid">

            <div className="recommendation-card">

                <div className="recommendation-icon">

                    🛡️

                </div>

                <h3>

                    Improve Security

                </h3>

                <p>

                    Review projects with low security scores and
                    immediately fix critical vulnerabilities.

                </p>

            </div>

            <div className="recommendation-card">

                <div className="recommendation-icon">

                    🔄

                </div>

                <h3>

                    Schedule Weekly Scans

                </h3>

                <p>

                    Run automated scans every week to detect new
                    vulnerabilities before deployment.

                </p>

            </div>

            <div className="recommendation-card">

                <div className="recommendation-icon">

                    📄

                </div>

                <h3>

                    Generate Reports

                </h3>

                <p>

                    Export detailed reports regularly for auditing
                    and compliance documentation.

                </p>

            </div>

        </div>

    </div>

    {/* ==========================================
                SECURITY TIMELINE
            ========================================== */}

    <div className="timeline-section">

        <div className="section-title">

            <h2>

                📅 Recent Timeline

            </h2>

        </div>

        <div className="timeline">

            {

                filteredHistory.slice(0, 5).map((item, index) => (

                    <div

                        className="timeline-item"

                        key={item.id || index}

                    >

                        <div className="timeline-dot">

                            {

                                item.status === "SAFE"

                                    ?

                                    "🟢"

                                    :

                                    item.status === "CRITICAL"

                                        ?

                                        "🔴"

                                        :

                                        "🟡"

                            }

                        </div>

                        <div className="timeline-content">

                            <h3>

                                {

                                    item.projectName

                                }

                            </h3>

                            <p>

                                {

                                    item.scanType

                                }

                                {" "}Scan Completed

                            </p>

                            <small>

                                {

                                    item.createdAt

                                        ?

                                        formatDate(item.createdAt)

                                        :

                                        "-"

                                }

                            </small>

                        </div>

                    </div>

                ))

            }

        </div>

    </div>

    {/* ==========================================
                EXPORT OPTIONS
            ========================================== */}

    <div className="export-section">

        <div className="section-title">

            <h2>

                📥 Export History

            </h2>

        </div>

        <div className="export-buttons">

            <button

                className="export-json-btn"

                onClick={exportHistory}

            >

                📄 Export JSON

            </button>

            <button

                className="export-pdf-btn"

                onClick={() =>

                    window.print()

                }

            >

                🖨 Export PDF

            </button>

        </div>

    </div>

    {/* ==========================================
                PROGRESS SUMMARY
            ========================================== */}

    <div className="progress-summary-card">

        <div className="progress-left">

            <h2>

                📈 Security Progress

            </h2>

            <p>

                {

                    stats.averageSecurityScore >= 90

                        ?

                        "Excellent! Your projects maintain a strong security posture."

                        :

                        stats.averageSecurityScore >= 70

                            ?

                            "Good progress. Continue resolving medium-risk issues."

                            :

                            "Your projects require immediate security improvements."

                }

            </p>

        </div>

        <div className="progress-right">

            <div className="progress-circle">

                <h1>

                    {stats.averageSecurityScore}%

                </h1>

            </div>

        </div>

    </div>
    {/* ==========================================
                QUICK ACTIONS
            ========================================== */}

    <div className="quick-actions-section">

        <div className="section-title">

            <h2>

                🚀 Quick Actions

            </h2>

        </div>

        <div className="quick-actions-grid">

            <button
                className="action-btn primary"
                onClick={() => navigate("/myscan")}
            >
                🔍 New Scan
            </button>

            <button
                className="action-btn"
                onClick={() => navigate("/myprojects")}
            >
                📁 My Projects
            </button>

            <button
                className="action-btn"
                onClick={() => navigate("/myreports")}
            >
                📄 Reports
            </button>

            <button
                className="action-btn"
                onClick={() => navigate("/notification")}
            >
                🔔 Notifications
            </button>

            <button
                className="action-btn"
                onClick={() => navigate("/dashboard")}
            >
                📊 Dashboard
            </button>

            <button
                className="action-btn"
                onClick={() => navigate("/profile")}
            >
                👤 Profile
            </button>

        </div>

    </div>

    {/* ==========================================
                SECURITY SUMMARY
            ========================================== */}

    <div className="security-summary-section">

        <div className="section-title">

            <h2>

                🛡 Final Security Summary

            </h2>

        </div>

        <div className="security-summary-grid">

            <div className="security-summary-item">

                <h3>

                    🔍 Total Scans

                </h3>

                <h1>

                    {stats.totalScans}

                </h1>

            </div>

            <div className="security-summary-item">

                <h3>

                    🟢 Safe Projects

                </h3>

                <h1>

                    {stats.safeScans}

                </h1>

            </div>

            <div className="security-summary-item">

                <h3>

                    🔴 Critical Issues

                </h3>

                <h1>

                    {stats.criticalScans}

                </h1>

            </div>

            <div className="security-summary-item">

                <h3>

                    📊 Avg Security

                </h3>

                <h1>

                    {stats.averageSecurityScore}%

                </h1>

            </div>

        </div>

    </div>

    {/* ==========================================
                ACCOUNT HEALTH
            ========================================== */}

    <div className="health-card">

        <div className="health-content">

            <h2>

                ❤️ Overall Security Health

            </h2>

            <p>

                {

                    stats.averageSecurityScore >= 90

                        ?

                        "Excellent security posture. Continue regular vulnerability scanning and maintain your current security practices."

                        :

                        stats.averageSecurityScore >= 70

                            ?

                            "Your security posture is good. Address remaining vulnerabilities to further improve protection."

                            :

                            "Immediate attention is recommended. Resolve critical vulnerabilities and perform another security assessment."

                }

            </p>

            <ul>

                <li>✅ Keep dependencies updated</li>

                <li>✅ Run scans before deployment</li>

                <li>✅ Review AI recommendations regularly</li>

                <li>✅ Export reports for compliance</li>

            </ul>

        </div>

        <div className="health-score">

            <div className="health-circle">

                <h1>

                    {stats.averageSecurityScore}%

                </h1>

                <span>

                    Health Score

                </span>

            </div>

        </div>

    </div>

    {/* ==========================================
                AI FINAL MESSAGE
            ========================================== */}

    <div className="ai-final-card">

        <div className="ai-icon">

            🤖

        </div>

        <div>

            <h2>

                SecureScan AI Insight

            </h2>

            <p>

                Based on your scan history, the overall security posture
                of your projects is continuously monitored. Maintain
                regular scans, fix critical findings promptly, and
                review exported reports to improve long-term application
                security and compliance.

            </p>

        </div>

    </div>
    {/* ==========================================
                FOOTER
            ========================================== */}

    <footer className="history-footer">

        <div className="footer-content">

            <h2>

                🛡 SecureScan AI

            </h2>

            <p>

                AI Powered Vulnerability Assessment &
                Intelligent Security Analysis Platform

            </p>

            {/* ==========================================
                        QUICK NAVIGATION
                    ========================================== */}

            <div className="footer-links">

                <button
                    className="footer-btn"
                    onClick={() => navigate("/dashboard")}
                >
                    📊 Dashboard
                </button>

                <button
                    className="footer-btn"
                    onClick={() => navigate("/myscan")}
                >
                    🔍 My Scan
                </button>

                <button
                    className="footer-btn"
                    onClick={() => navigate("/myprojects")}
                >
                    📁 Projects
                </button>

                <button
                    className="footer-btn"
                    onClick={() => navigate("/myreports")}
                >
                    📄 Reports
                </button>

                <button
                    className="footer-btn"
                    onClick={() => navigate("/notification")}
                >
                    🔔 Notifications
                </button>

                <button
                    className="footer-btn"
                    onClick={() => navigate("/profile")}
                >
                    👤 Profile
                </button>

            </div>

            {/* ==========================================
                        EXPORT SUMMARY
                    ========================================== */}

            <div className="export-summary">

                <div className="export-card">

                    <h3>

                        📥 Export History

                    </h3>

                    <p>

                        Download your complete scan history for
                        compliance, auditing, and backup purposes.

                    </p>

                    <button
                        className="export-btn"
                        onClick={exportHistory}
                    >
                        Export JSON
                    </button>

                </div>

                <div className="export-card">

                    <h3>

                        🖨 Print Report

                    </h3>

                    <p>

                        Print your scan history and security
                        analysis in a clean report format.

                    </p>

                    <button
                        className="print-btn"
                        onClick={() => window.print()}
                    >
                        Print Report
                    </button>

                </div>

            </div>

            <hr />

            <div className="footer-bottom">

                <small>

                    © 2026 SecureScan AI. All Rights Reserved.

                </small>

                <small>

                    Version 1.0.0 | React • Spring Boot • MySQL

                </small>

            </div>

        </div>

    </footer>

        </div >

    );

}

export default History;