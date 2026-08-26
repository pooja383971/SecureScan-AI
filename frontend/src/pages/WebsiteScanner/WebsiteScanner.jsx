import { useState } from "react";
import api from "../../services/api";
import "./WebsiteScanner.css";

function WebsiteScanner() {
    const [websiteUrl, setWebsiteUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [result, setResult] = useState(null);

    const validateUrl = (url) => {
        try {
            const formattedUrl = url.startsWith("http")
                ? url
                : `https://${url}`;

            new URL(formattedUrl);
            return true;
        } catch {
            return false;
        }
    };

    const startScan = async () => {
        if (!websiteUrl.trim()) {
            alert("Please enter a Website URL.");
            return;
        }

        if (!validateUrl(websiteUrl.trim())) {
            alert("Please enter a valid Website URL.");
            return;
        }

        setLoading(true);
        setProgress(0);
        setResult(null);

        let value = 0;

        const timer = setInterval(() => {
            value += 10;

            if (value <= 90) {
                setProgress(value);
            }
        }, 300);

        try {
            const response = await api.post(
                "/website/scan",
                {
                    url: websiteUrl.trim()
                }
            );

            console.log("WEBSITE SCAN RESPONSE:", response.data);

            clearInterval(timer);
            setProgress(100);

            setTimeout(() => {
                setResult(response.data);
                setLoading(false);
            }, 300);

        } catch (error) {
            clearInterval(timer);

            console.error("Website Scan Error:", error);

            setLoading(false);
            setProgress(0);

            if (error.response) {
                console.error(
                    "Backend Status:",
                    error.response.status
                );

                console.error(
                    "Backend Response:",
                    error.response.data
                );

                const message =
                    error.response.data?.message ||
                    error.response.data?.error ||
                    (
                        typeof error.response.data === "string"
                            ? error.response.data
                            : "Website Scan Failed."
                    );

                alert(
                    `Website Scan Failed\n\n${message}`
                );

            } else if (error.request) {
                alert(
                    "Cannot connect to backend. Please check the Render backend."
                );

            } else {
                alert(
                    error.message ||
                    "Website Scan Failed."
                );
            }
        }
    };

    const scanAgain = () => {
        setWebsiteUrl("");
        setProgress(0);
        setResult(null);
    };

    const downloadReport = async () => {
        if (!result) {
            alert("No scan result found.");
            return;
        }

        try {
            const response = await api.post(
                "/reports/website/pdf",
                result,
                {
                    responseType: "blob",
                }
            );

            const file = new Blob(
                [response.data],
                {
                    type: "application/pdf",
                }
            );

            const fileURL =
                window.URL.createObjectURL(file);

            const link =
                document.createElement("a");

            link.href = fileURL;
            link.download =
                "Website_Security_Report.pdf";

            document.body.appendChild(link);
            link.click();
            link.remove();

            window.URL.revokeObjectURL(fileURL);

        } catch (error) {
            console.error(
                "PDF Report Error:",
                error
            );

            if (error.response) {
                console.error(
                    "Backend Response:",
                    error.response.data
                );
            }

            alert(
                "Failed to generate PDF report."
            );
        }
    };

    return (
        <div className="scanner-page">

            <div className="scanner-card">

                <h1>
                    🌐 Website Security Scanner
                </h1>

                <p>
                    Scan websites for SSL, HTTPS, DNS,
                    Security Headers, Malware and
                    Overall Security Score.
                </p>

                <div className="input-group">

                    <label>
                        Website URL
                    </label>

                    <input
                        type="text"
                        placeholder="https://example.com"
                        value={websiteUrl}
                        onChange={(e) =>
                            setWebsiteUrl(e.target.value)
                        }
                    />

                </div>

                <button
                    className="scan-btn"
                    onClick={startScan}
                    disabled={loading}
                >
                    {loading
                        ? "Scanning..."
                        : "🔍 Start Website Scan"}
                </button>

            </div>

            {loading && (
                <div className="loading-card">

                    <h2>
                        Scanning Website...
                    </h2>

                    <div className="progress-bar">

                        <div
                            className="progress-fill"
                            style={{
                                width: `${progress}%`,
                            }}
                        >
                        </div>

                    </div>

                    <h3>
                        {progress}% Completed
                    </h3>

                </div>
            )}

            {!loading && result && (
                <div className="result-card">

                    <div className="result-header">

                        <h2>
                            Website Scan Report
                        </h2>

                        <div
                            className={`threat-badge ${result.risk?.toLowerCase() || ""
                                }`}
                        >
                            {result.risk || "UNKNOWN"}
                        </div>

                    </div>

                    <div className="result-grid">

                        <div className="result-item">

                            <h4>
                                Website
                            </h4>

                            <p>
                                {result.website || websiteUrl}
                            </p>

                        </div>

                        <div className="result-item">

                            <h4>
                                SSL Certificate
                            </h4>

                            <p>
                                {result.ssl || "N/A"}
                            </p>

                        </div>

                        <div className="result-item">

                            <h4>
                                HTTPS
                            </h4>

                            <p>
                                {result.https || "N/A"}
                            </p>

                        </div>

                        <div className="result-item">

                            <h4>
                                DNS
                            </h4>

                            <p>
                                {result.dns || "N/A"}
                            </p>

                        </div>

                        <div className="result-item">

                            <h4>
                                Security Headers
                            </h4>

                            <p>
                                {result.headers || "N/A"}
                            </p>

                        </div>

                        <div className="result-item score-card">

                            <h4>
                                Security Score
                            </h4>

                            <h2>
                                {result.score ??
                                    result.securityScore ??
                                    0}
                                /100
                            </h2>

                        </div>

                    </div>

                    <div className="button-group">

                        <button
                            className="download-btn"
                            onClick={downloadReport}
                        >
                            📄 Download Report
                        </button>

                        <button
                            className="scan-again-btn"
                            onClick={scanAgain}
                        >
                            🔄 Scan Again
                        </button>

                    </div>

                </div>
            )}

        </div>
    );
}

export default WebsiteScanner;