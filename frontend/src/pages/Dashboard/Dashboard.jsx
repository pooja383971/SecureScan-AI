
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./Dashboard.css";

function Dashboard() {

  const navigate = useNavigate();

  // ============================
  // STATES
  // ============================

  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ============================
  // LOAD DASHBOARD DATA
  // ============================

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard = async () => {

    try {

      const response = await api.get("/scans");

      setHistory(response.data);

    } catch (err) {

      console.error(err);

      setError("Failed to load dashboard data.");

    } finally {

      setLoading(false);

    }

  };

  // ============================
  // DASHBOARD VARIABLES
  // ============================

  const totalScans = history.length;

  const critical = history.reduce(
    (sum, scan) => sum + (scan.critical || 0),
    0
  );

  const high = history.reduce(
    (sum, scan) => sum + (scan.high || 0),
    0
  );

  const medium = history.reduce(
    (sum, scan) => sum + (scan.medium || 0),
    0
  );

  const low = history.reduce(
    (sum, scan) => sum + (scan.low || 0),
    0
  );

  const totalVulnerabilities =
    critical +
    high +
    medium +
    low;

  const activeThreats =
    critical +
    high;

  const resolvedThreats =
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

  // ============================
  // LOADING SCREEN
  // ============================

  if (loading) {

    return (

      <div className="dashboard">

        <h2>Loading Dashboard...</h2>

      </div>

    );

  }

  // ============================
  // ERROR SCREEN
  // ============================

  if (error) {

    return (

      <div className="dashboard">

        <h2>{error}</h2>

      </div>

    );

  }

  // ============================
  // RETURN STARTS HERE
  // ============================

  return (

    <div className="dashboard">

      <div className="dashboard-container">
        {/* ===========================
                DASHBOARD HEADER
            ============================ */}

        <div className="dashboard-header">

          <div>

            <h1>
              Welcome Back, Admin 👋
            </h1>

            <p>

              Monitor your applications,
              vulnerabilities,
              reports and overall
              cyber security posture.

            </p>

          </div>

          <button
            className="primary-btn"
            onClick={() => navigate("/myscan")}
          >

            Run New Scan

          </button>

        </div>

        {/* ===========================
                TOP STATISTICS
            ============================ */}

        <div className="dashboard-cards">

          <div className="card">

            <h3>

              Security Score

            </h3>

            <h2>

              {securityScore}

            </h2>

            <p>

              Overall System Health

            </p>

          </div>

          <div className="card">

            <h3>

              Total Scans

            </h3>

            <h2>

              {totalScans}

            </h2>

            <p>

              Completed Scans

            </p>

          </div>

          <div className="card">

            <h3>

              Active Threats

            </h3>

            <h2>

              {activeThreats}

            </h2>

            <p>

              Immediate Attention

            </p>

          </div>

          <div className="card">

            <h3>

              Resolved

            </h3>

            <h2>

              {resolvedThreats}

            </h2>

            <p>

              Successfully Fixed

            </p>

          </div>

        </div>
        {/* ===========================
                SECURITY OVERVIEW
            ============================ */}

        <div className="section">

          <div className="section-header">

            <h2>

              Security Overview

            </h2>

          </div>

          <div className="security-overview">

            <div className="security-card total">

              <h2>

                {totalScans}

              </h2>

              <h4>

                Total Scans

              </h4>

              <p>

                +12% This Week

              </p>

            </div>

            <div className="security-card critical">

              <h2>

                {critical}

              </h2>

              <h4>

                Critical

              </h4>

              <p>

                Immediate Action Required

              </p>

            </div>

            <div className="security-card high">

              <h2>

                {high}

              </h2>

              <h4>

                High Risk

              </h4>

              <p>

                Patch Recommended

              </p>

            </div>

            <div className="security-card medium">

              <h2>

                {medium}

              </h2>

              <h4>

                Medium Risk

              </h4>

              <p>

                Monitor Regularly

              </p>

            </div>

            <div className="security-card low">

              <h2>

                {low}

              </h2>

              <h4>

                Low Risk

              </h4>

              <p>

                Secure

              </p>

            </div>

          </div>

        </div>
        {/* ===========================
                VULNERABILITY DISTRIBUTION
            ============================ */}

        <div className="vulnerability-section">

          <div className="section-header">

            <h2>

              Vulnerability Distribution

            </h2>

            <span>

              Total Vulnerabilities : {totalVulnerabilities}

            </span>

          </div>

          <div className="vulnerability-grid">

            <div className="vulnerability-card critical">

              <h4>

                🔴 Critical

              </h4>

              <h2>

                {critical}

              </h2>

              <p>

                Immediate Fix Required

              </p>

            </div>

            <div className="vulnerability-card high">

              <h4>

                🟠 High

              </h4>

              <h2>

                {high}

              </h2>

              <p>

                Patch Soon

              </p>

            </div>

            <div className="vulnerability-card medium">

              <h4>

                🟡 Medium

              </h4>

              <h2>

                {medium}

              </h2>

              <p>

                Review Regularly

              </p>

            </div>

            <div className="vulnerability-card low">

              <h4>

                🟢 Low

              </h4>

              <h2>

                {low}

              </h2>

              <p>

                Continue Monitoring

              </p>

            </div>

          </div>

        </div>
        {/* ===========================
                RISK ANALYSIS
            ============================ */}

        <div className="risk-section">

          <div className="risk-card">

            <div className="risk-header">

              <h2>
                🎯 Risk Analysis
              </h2>

              <div className="risk-score">

                Security Score : {securityScore}/100

              </div>

            </div>

            <div className="risk-body">

              <div className="risk-box critical-box">

                <h3>
                  🔴 Critical Risk
                </h3>

                <h1>

                  {critical}

                </h1>

                <p>

                  Vulnerabilities requiring
                  immediate attention.

                </p>

              </div>

              <div className="risk-box high-box">

                <h3>
                  🟠 High Risk
                </h3>

                <h1>

                  {high}

                </h1>

                <p>

                  Should be patched
                  as soon as possible.

                </p>

              </div>

              <div className="risk-box medium-box">

                <h3>
                  🟡 Medium Risk
                </h3>

                <h1>

                  {medium}

                </h1>

                <p>

                  Review during
                  regular maintenance.

                </p>

              </div>

              <div className="risk-box low-box">

                <h3>
                  🟢 Low Risk
                </h3>

                <h1>

                  {low}

                </h1>

                <p>

                  Continue monitoring
                  periodically.

                </p>

              </div>

            </div>

          </div>

        </div>
        {/* ===========================
                RISK ANALYSIS
            ============================ */}

        <div className="risk-section">

          <div className="risk-card">

            <div className="risk-header">

              <h2>
                🎯 Risk Analysis
              </h2>

              <div className="risk-score">

                Security Score : {securityScore}/100

              </div>

            </div>

            <div className="risk-body">

              <div className="risk-box critical-box">

                <h3>
                  🔴 Critical Risk
                </h3>

                <h1>

                  {critical}

                </h1>

                <p>

                  Vulnerabilities requiring
                  immediate attention.

                </p>

              </div>

              <div className="risk-box high-box">

                <h3>
                  🟠 High Risk
                </h3>

                <h1>

                  {high}

                </h1>

                <p>

                  Should be patched
                  as soon as possible.

                </p>

              </div>

              <div className="risk-box medium-box">

                <h3>
                  🟡 Medium Risk
                </h3>

                <h1>

                  {medium}

                </h1>

                <p>

                  Review during
                  regular maintenance.

                </p>

              </div>

              <div className="risk-box low-box">

                <h3>
                  🟢 Low Risk
                </h3>

                <h1>

                  {low}

                </h1>

                <p>

                  Continue monitoring
                  periodically.

                </p>

              </div>

            </div>

          </div>

        </div>
        {/* ===========================
                SECURITY RECOMMENDATIONS
            ============================ */}

        <div className="recommendation-section">

          <div className="section-header">

            <h2>

              🛡 Security Recommendations

            </h2>

          </div>

          <div className="recommendation-grid">

            <div className="recommendation-card critical">

              <h3>

                🔴 Critical Vulnerabilities

              </h3>

              <p>

                Immediately fix all critical
                vulnerabilities to reduce the
                overall security risk.

              </p>

            </div>

            <div className="recommendation-card high">

              <h3>

                🟠 Update Software

              </h3>

              <p>

                Update vulnerable software,
                libraries, frameworks,
                and dependencies.

              </p>

            </div>

            <div className="recommendation-card medium">

              <h3>

                🟡 Enable MFA

              </h3>

              <p>

                Enable Multi-Factor
                Authentication for all users.

              </p>

            </div>

            <div className="recommendation-card info">

              <h3>

                🔵 Update Servers

              </h3>

              <p>

                Keep operating systems
                and web servers updated
                with the latest patches.

              </p>

            </div>

            <div className="recommendation-card success">

              <h3>

                🟢 Weekly Scan

              </h3>

              <p>

                Perform vulnerability
                assessments every week
                to detect new threats.

              </p>

            </div>

            <div className="recommendation-card secure">

              <h3>

                🔒 HTTPS Protection

              </h3>

              <p>

                Enable HTTPS, HSTS,
                and secure HTTP headers
                for better protection.

              </p>

            </div>

          </div>

        </div>
        {/* ===========================
                RECENT SCAN HISTORY
            ============================ */}

        <div className="history-section">

          <div className="section-header">

            <h2>

              📋 Recent Scan History

            </h2>

            <button
              className="view-btn"
              onClick={() => navigate("/history")}
            >

              View All

            </button>

          </div>

          <div className="history-card">

            <table className="history-preview-table">

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

                  <th>Action</th>

                </tr>

              </thead>

              <tbody>

                {history.length > 0 ? (

                  history
                    .slice(0, 5)
                    .map((scan) => (

                      <tr key={scan.id}>

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

                        <td>

                          <span className="critical-text">

                            {scan.critical}

                          </span>

                        </td>

                        <td>

                          <span className="high-text">

                            {scan.high}

                          </span>

                        </td>

                        <td>

                          {scan.medium}

                        </td>

                        <td>

                          {scan.low}

                        </td>

                        <td>

                          {scan.scanDate
                            ? new Date(
                              scan.scanDate
                            ).toLocaleDateString()
                            : "-"}

                        </td>

                        <td>

                          <button
                            className="table-btn"
                            onClick={() =>
                              navigate(
                                `/reports/${scan.id}`
                              )
                            }
                          >

                            View

                          </button>

                        </td>

                      </tr>

                    ))

                ) : (

                  <tr>

                    <td
                      colSpan="9"
                      style={{
                        textAlign: "center",
                        padding: "30px",
                      }}
                    >

                      No Scan History Available

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>
        {/* ===========================
                LATEST SECURITY REPORTS
            ============================ */}

        <div className="reports-section">

          <div className="section-header">

            <h2>

              📄 Latest Security Reports

            </h2>

            <button
              className="view-btn"
              onClick={() => navigate("/reports")}
            >

              View Reports

            </button>

          </div>

          <div className="reports-grid">

            {history.length > 0 ? (

              history
                .slice(0, 3)
                .map((scan) => (

                  <div
                    className="report-card"
                    key={scan.id}
                  >

                    <div className="report-top">

                      <h3>

                        {scan.projectName}

                      </h3>

                      <span className="report-status">

                        {scan.status}

                      </span>

                    </div>

                    <div className="report-body">

                      <p>

                        <strong>

                          Scan Type :

                        </strong>

                        {" "}

                        {scan.scanType}

                      </p>

                      <p>

                        <strong>

                          Generated :

                        </strong>

                        {" "}

                        {scan.scanDate
                          ? new Date(
                            scan.scanDate
                          ).toLocaleDateString()
                          : "-"}

                      </p>

                      <hr />

                      <div className="report-stats">

                        <div>

                          <span>🔴</span>

                          <h4>

                            {scan.critical}

                          </h4>

                          <small>

                            Critical

                          </small>

                        </div>

                        <div>

                          <span>🟠</span>

                          <h4>

                            {scan.high}

                          </h4>

                          <small>

                            High

                          </small>

                        </div>

                        <div>

                          <span>🟡</span>

                          <h4>

                            {scan.medium}

                          </h4>

                          <small>

                            Medium

                          </small>

                        </div>

                        <div>

                          <span>🟢</span>

                          <h4>

                            {scan.low}

                          </h4>

                          <small>

                            Low

                          </small>

                        </div>

                      </div>

                    </div>

                    <div className="report-footer">

                      <button
                        className="table-btn"
                        onClick={() =>
                          navigate(
                            `/reports/${scan.id}`
                          )
                        }
                      >

                        View Report

                      </button>

                      <button
                        className="download-btn"
                        onClick={() =>
                          window.open(
                            `https://securescan-ai-1.onrender.com/api/reports/${scan.id}/pdf`,
                            "_blank"
                          )
                        }
                      >

                        Download PDF

                      </button>

                    </div>

                  </div>

                ))

            ) : (

              <div className="empty-card">

                <h3>

                  No Reports Available

                </h3>

                <p>

                  Run a security scan to
                  generate reports.

                </p>

              </div>

            )}

          </div>

        </div>
        {/* ===========================
                CRITICAL ALERTS
            ============================ */}

        <div className="alerts-section">

          <div className="section-header">

            <h2>

              🚨 Critical Alerts

            </h2>

          </div>

          <div className="alerts-grid">

            <div className="alert-card critical">

              <div className="alert-icon">

                🔴

              </div>

              <h2>

                {critical}

              </h2>

              <h4>

                Critical Vulnerabilities

              </h4>

              <p>

                Require immediate remediation.

              </p>

            </div>

            <div className="alert-card high">

              <div className="alert-icon">

                🟠

              </div>

              <h2>

                {high}

              </h2>

              <h4>

                High Vulnerabilities

              </h4>

              <p>

                Patch these as soon as possible.

              </p>

            </div>

            <div className="alert-card info">

              <div className="alert-icon">

                🛡

              </div>

              <h2>

                {critical > 0
                  ? "Needs Attention"
                  : "Secure"}

              </h2>

              <h4>

                Security Status

              </h4>

              <p>

                Current overall protection level.

              </p>

            </div>

          </div>

        </div>
        {/* ===========================
                RECENT ACTIVITY
            ============================ */}

        <div className="timeline-section">

          <div className="section-header">

            <h2>

              📅 Recent Activity

            </h2>

          </div>

          <div className="timeline">

            {history.length > 0 ? (

              history.slice(0, 5).map((scan) => (

                <div
                  className="timeline-item"
                  key={scan.id}
                >

                  <div className="timeline-dot"></div>

                  <div className="timeline-content">

                    <h4>

                      {scan.projectName}

                    </h4>

                    <p>

                      {scan.scanType} Scan Completed

                    </p>

                    <small>

                      {scan.scanDate
                        ? new Date(
                          scan.scanDate
                        ).toLocaleString()
                        : "-"}

                    </small>

                  </div>

                </div>

              ))

            ) : (

              <p>No Recent Activity</p>

            )}

          </div>

        </div>
        {/* ===========================
                QUICK ACTIONS
            ============================ */}

        <div className="quick-tools">

          <div className="section-header">

            <h2>

              ⚡ Quick Actions

            </h2>

          </div>

          <div className="quick-tool-grid">

            <div
              className="tool-card"
              onClick={() => navigate("/myscan")}
            >

              <h1>🔍</h1>

              <h3>New Scan</h3>

            </div>

            <div
              className="tool-card"
              onClick={() => navigate("/reports")}
            >

              <h1>📄</h1>

              <h3>Reports</h3>

            </div>

            <div
              className="tool-card"
              onClick={() => navigate("/history")}
            >

              <h1>📋</h1>

              <h3>History</h3>

            </div>

            <div
              className="tool-card"
              onClick={() => navigate("/settings")}
            >

              <h1>⚙</h1>

              <h3>Settings</h3>

            </div>

          </div>

        </div>
        {/* ===========================
                FOOTER
            ============================ */}

        <footer className="dashboard-footer">

          <h3>

            SecureScan AI

          </h3>

          <p>

            AI Powered Vulnerability Assessment Platform

          </p>

        </footer>
      </div>

    </div>

  );

}

export default Dashboard;