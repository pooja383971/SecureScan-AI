// import { useState } from "react";
// import api from "../../services/api";
// import "./WebsiteScanner.css";

// function WebsiteScanner() {
//     const [websiteUrl, setWebsiteUrl] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [progress, setProgress] = useState(0);
//     const [result, setResult] = useState(null);

//     const validateUrl = (url) => {
//         const pattern =
//             /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/.*)?$/i;
//         return pattern.test(url);
//     };

//     const startScan = async () => {
//         if (!websiteUrl.trim()) {
//             alert("Please enter a Website URL.");
//             return;
//         }

//         if (!validateUrl(websiteUrl)) {
//             alert("Please enter a valid Website URL.");
//             return;
//         }

//         setLoading(true);
//         setProgress(0);
//         setResult(null);

//         let value = 0;

//         const timer = setInterval(() => {
//             value += 10;

//             if (value <= 90) {
//                 setProgress(value);
//             }
//         }, 300);

//         try {
//             const response = await api.post("/website/scan", {
//                 url: websiteUrl,
//             });

//             clearInterval(timer);

//             setProgress(100);

//             setTimeout(() => {
//                 setResult(response.data);
//                 setLoading(false);
//             }, 300);
//         } catch (error) {
//             clearInterval(timer);

//             console.error(error);

//             setLoading(false);

//             alert("Website Scan Failed.");
//         }
//     };

//     const scanAgain = () => {
//         setWebsiteUrl("");
//         setProgress(0);
//         setResult(null);
//     };

//     const downloadReport = () => {
//         alert("PDF Report feature coming soon.");
//     };

//     return (
//         <div className="scanner-page">
//             <div className="scanner-card">

//                 <h1>🌐 Website Security Scanner</h1>

//                 <p>
//                     Scan websites for SSL, HTTPS, DNS, Security Headers,
//                     Malware and Overall Security Score.
//                 </p>

//                 <div className="input-group">
//                     <label>Website URL</label>

//                     <input
//                         type="text"
//                         placeholder="https://example.com"
//                         value={websiteUrl}
//                         onChange={(e) => setWebsiteUrl(e.target.value)}
//                     />
//                 </div>

//                 <button
//                     className="scan-btn"
//                     onClick={startScan}
//                     disabled={loading}
//                 >
//                     {loading ? "Scanning..." : "🔍 Start Website Scan"}
//                 </button>
//             </div>

//             {loading && (
//                 <div className="loading-card">

//                     <h2>Scanning Website...</h2>

//                     <div className="progress-bar">
//                         <div
//                             className="progress-fill"
//                             style={{ width: `${progress}%` }}
//                         ></div>
//                     </div>

//                     <h3>{progress}% Completed</h3>

//                 </div>
//             )}

//             {!loading && result && (
//                 <div className="result-card">

//                     <div className="result-header">

//                         <h2>Website Scan Report</h2>

//                         <div
//                             className={`threat-badge ${result.risk?.toLowerCase()}`}
//                         >
//                             {result.risk}
//                         </div>

//                     </div>

//                     <div className="result-grid">

//                         <div className="result-item">
//                             <h4>Website</h4>
//                             <p>{result.website}</p>
//                         </div>

//                         <div className="result-item">
//                             <h4>SSL Certificate</h4>
//                             <p>{result.ssl}</p>
//                         </div>

//                         <div className="result-item">
//                             <h4>HTTPS</h4>
//                             <p>{result.https}</p>
//                         </div>

//                         <div className="result-item">
//                             <h4>DNS</h4>
//                             <p>{result.dns}</p>
//                         </div>

//                         <div className="result-item">
//                             <h4>Security Headers</h4>
//                             <p>{result.headers}</p>
//                         </div>

//                         <div className="result-item score-card">
//                             <h4>Security Score</h4>
//                             <h2>{result.score}/100</h2>
//                         </div>

//                     </div>

//                     <div className="button-group">

//                         <button
//                             className="download-btn"
//                             onClick={downloadReport}
//                         >
//                             📄 Download Report
//                         </button>

//                         <button
//                             className="scan-again-btn"
//                             onClick={scanAgain}
//                         >
//                             🔄 Scan Again
//                         </button>

//                     </div>

//                 </div>
//             )}
//         </div>
//     );
// }

// export default WebsiteScanner;
import { useState } from "react";
import api from "../../services/api";
import "./WebsiteScanner.css";

function WebsiteScanner() {

    const [websiteUrl, setWebsiteUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [result, setResult] = useState(null);

    const validateUrl = (url) => {
        const pattern =
            /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/.*)?$/i;
        return pattern.test(url);
    };

    const startScan = async () => {

        if (!websiteUrl.trim()) {
            alert("Please enter a Website URL.");
            return;
        }

        if (!validateUrl(websiteUrl)) {
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

            const response = await api.post("/website/scan", {
                url: websiteUrl,
            });

            clearInterval(timer);

            setProgress(100);

            setTimeout(() => {
                setResult(response.data);
                setLoading(false);
            }, 300);

        } catch (error) {

            clearInterval(timer);

            console.error(error);

            setLoading(false);

            if (error.response) {
                alert(error.response.data.message || "Website Scan Failed.");
            } else {
                alert("Cannot connect to backend.");
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

            const file = new Blob([response.data], {
                type: "application/pdf",
            });

            const fileURL = window.URL.createObjectURL(file);

            const link = document.createElement("a");

            link.href = fileURL;
            link.download = "Website_Security_Report.pdf";

            document.body.appendChild(link);

            link.click();

            link.remove();

            window.URL.revokeObjectURL(fileURL);

        } catch (error) {

            console.error(error);

            alert("Failed to generate PDF report.");

        }

    };

    return (

        <div className="scanner-page">

            <div className="scanner-card">

                <h1>🌐 Website Security Scanner</h1>

                <p>
                    Scan websites for SSL, HTTPS, DNS,
                    Security Headers, Malware and
                    Overall Security Score.
                </p>

                <div className="input-group">

                    <label>Website URL</label>

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

                    <h2>Scanning Website...</h2>

                    <div className="progress-bar">

                        <div
                            className="progress-fill"
                            style={{
                                width: `${progress}%`,
                            }}
                        ></div>

                    </div>

                    <h3>{progress}% Completed</h3>

                </div>

            )}

            {!loading && result && (

                <div className="result-card">

                    <div className="result-header">

                        <h2>Website Scan Report</h2>

                        <div
                            className={`threat-badge ${result.risk?.toLowerCase()}`}
                        >
                            {result.risk}
                        </div>

                    </div>

                    <div className="result-grid">

                        <div className="result-item">
                            <h4>Website</h4>
                            <p>{result.website}</p>
                        </div>

                        <div className="result-item">
                            <h4>SSL Certificate</h4>
                            <p>{result.ssl}</p>
                        </div>

                        <div className="result-item">
                            <h4>HTTPS</h4>
                            <p>{result.https}</p>
                        </div>

                        <div className="result-item">
                            <h4>DNS</h4>
                            <p>{result.dns}</p>
                        </div>

                        <div className="result-item">
                            <h4>Security Headers</h4>
                            <p>{result.headers}</p>
                        </div>

                        <div className="result-item score-card">
                            <h4>Security Score</h4>
                            <h2>{result.score}/100</h2>
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