// // import { useState } from "react";
// // import api from "../../services/api";
// // import "./NewScan.css";

// // function NewScan() {
// //   const [projectName, setProjectName] = useState("");
// //   const [scanType, setScanType] = useState("quick");
// //   const [selectedFile, setSelectedFile] = useState(null);
// //   const [progress, setProgress] = useState(0);
// //   const [status, setStatus] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   const handleFileChange = (e) => {
// //     setSelectedFile(e.target.files[0]);
// //   };

// //   const startScan = async () => {
// //     if (!projectName.trim()) {
// //       alert("Enter Project Name");
// //       return;
// //     }

// //     if (!selectedFile) {
// //       alert("Upload ZIP File");
// //       return;
// //     }

// //     setLoading(true);
// //     setProgress(0);
// //     setStatus("Starting Scan...");

// //     let value = 0;

// //     const timer = setInterval(() => {
// //       value += 10;
// //       setProgress(value);

// //       if (value === 20) setStatus("Uploading Project...");
// //       if (value === 40) setStatus("Analyzing Files...");
// //       if (value === 60) setStatus("Detecting Vulnerabilities...");
// //       if (value === 80) setStatus("Generating Report...");
// //     }, 250);

// //     await new Promise((resolve) => setTimeout(resolve, 2600));

// //     clearInterval(timer);
// //     setProgress(100);

// //     const critical = Math.floor(Math.random() * 3);
// //     const high = Math.floor(Math.random() * 5);
// //     const medium = Math.floor(Math.random() * 8);
// //     const low = Math.floor(Math.random() * 12);

// //     const total = critical + high + medium + low;

// //     const scanData = {
// //       projectName: projectName,
// //       fileName: selectedFile.name,
// //       scanType: scanType,
// //       critical: critical,
// //       high: high,
// //       medium: medium,
// //       low: low,
// //       totalVulnerabilities: total,
// //       status: "Completed",
// //       scanDate: new Date().toISOString(),
// //       uploadedAt: new Date().toISOString(),
// //       userId: 1
// //     };

// //     try {

// //       // Save Scan
// //       const scanResponse = await api.post("/scans", scanData);

// //       // Save Report
// //       await api.post("/reports", {
// //         target: projectName,
// //         scanType: scanType,
// //         critical: critical,
// //         high: high,
// //         medium: medium,
// //         low: low,
// //         generatedAt: new Date().toISOString(),
// //         summary:
// //           `Security scan completed.\n` +
// //           `Critical: ${critical}\n` +
// //           `High: ${high}\n` +
// //           `Medium: ${medium}\n` +
// //           `Low: ${low}`
// //       });

// //       console.log("Saved Scan :", scanResponse.data);

// //       setStatus("✅ Scan Completed Successfully");

// //       alert("Scan Saved Successfully");

// //       setProjectName("");
// //       setSelectedFile(null);
// //       setScanType("quick");

// //     } catch (error) {
// //       console.error(error);
// //       setStatus("❌ Failed to Save Scan");
// //       alert("Unable to save scan.");
// //     }

// //     setLoading(false);
// //   };

// //   return (
// //     <div className="scan-page">

// //       <h1>New Security Scan</h1>

// //       <div className="scan-card">

// //         <div className="form-group">
// //           <label>Project Name</label>

// //           <input
// //             type="text"
// //             placeholder="Enter Project Name"
// //             value={projectName}
// //             onChange={(e) => setProjectName(e.target.value)}
// //           />
// //         </div>

// //         <div className="form-group">

// //           <label>Upload ZIP File</label>

// //           <input
// //             type="file"
// //             accept=".zip"
// //             onChange={handleFileChange}
// //           />

// //         </div>

// //         <div className="form-group">

// //           <label>Scan Type</label>

// //           <div className="radio-group">

// //             <label>
// //               <input
// //                 type="radio"
// //                 value="quick"
// //                 checked={scanType === "quick"}
// //                 onChange={(e) => setScanType(e.target.value)}
// //               />
// //               Quick Scan
// //             </label>

// //             <label>
// //               <input
// //                 type="radio"
// //                 value="full"
// //                 checked={scanType === "full"}
// //                 onChange={(e) => setScanType(e.target.value)}
// //               />
// //               Full Scan
// //             </label>

// //           </div>

// //         </div>

// //         <button
// //           className="scan-btn"
// //           onClick={startScan}
// //           disabled={loading}
// //         >
// //           {loading ? "Scanning..." : "Start Scan"}
// //         </button>

// //         <div className="progress-section">

// //           <div className="progress-bar">

// //             <div
// //               className="progress-fill"
// //               style={{ width: progress + "%" }}
// //             ></div>

// //           </div>

// //           <h3>{progress}%</h3>

// //           <p>{status}</p>

// //         </div>

// //       </div>

// //     </div>
// //   );
// // }

// // export default NewScan;


// // import { useState } from "react";
// // import api from "../../services/api";
// // import "./NewScan.css";

// // function NewScan() {

// //   const [projectName, setProjectName] = useState("");
// //   const [scanType, setScanType] = useState("quick");
// //   const [selectedFile, setSelectedFile] = useState(null);

// //   const [progress, setProgress] = useState(0);
// //   const [status, setStatus] = useState("");

// //   const handleFileChange = (e) => {
// //     setSelectedFile(e.target.files[0]);
// //   };

// //   const startScan = async () => {

// //     if (!projectName) {
// //       alert("Enter Project Name");
// //       return;
// //     }

// //     if (!selectedFile) {
// //       alert("Upload ZIP File");
// //       return;
// //     }

// //     setStatus("Starting Scan...");
// //     setProgress(10);

// //     try {

// //       const scan = {

// //         projectName: projectName,

// //         fileName: selectedFile.name,

// //         scanType: scanType,

// //         status: "Completed",

// //         critical: Math.floor(Math.random() * 3),

// //         high: Math.floor(Math.random() * 5),

// //         medium: Math.floor(Math.random() * 8),

// //         low: Math.floor(Math.random() * 10),

// //         userId: 1

// //       };

// //       setProgress(40);
// //       setStatus("Uploading...");

// //       await api.post("/scans", scan);

// //       setProgress(100);
// //       setStatus("Scan Completed Successfully");

// //       alert("Scan Saved Successfully");

// //     } catch (err) {

// //       console.error(err);

// //       alert("Failed to save scan");

// //       setStatus("Failed");

// //     }

// //   };

// //   return (

// //     <div className="scan-page">

// //       <h1>New Security Scan</h1>

// //       <div className="scan-card">

// //         <label>Project Name</label>

// //         <input
// //           value={projectName}
// //           onChange={(e) => setProjectName(e.target.value)}
// //         />

// //         <label>Upload ZIP</label>

// //         <input
// //           type="file"
// //           accept=".zip"
// //           onChange={handleFileChange}
// //         />

// //         <label>Scan Type</label>

// //         <select
// //           value={scanType}
// //           onChange={(e) => setScanType(e.target.value)}
// //         >
// //           <option value="quick">Quick Scan</option>
// //           <option value="full">Full Scan</option>
// //         </select>

// //         <button
// //           className="scan-btn"
// //           onClick={startScan}
// //         >
// //           Start Scan
// //         </button>

// //         <br /><br />

// //         <progress
// //           value={progress}
// //           max="100"
// //           style={{ width: "100%" }}
// //         />

// //         <h3>{status}</h3>

// //       </div>

// //     </div>

// //   );

// // }

// // export default NewScan;
// import { useState } from "react";
// import api from "../../services/api";
// import "./NewScan.css";

// function NewScan() {

//   const [projectName, setProjectName] = useState("");
//   const [scanType, setScanType] = useState("quick");
//   const [selectedFile, setSelectedFile] = useState(null);

//   const [progress, setProgress] = useState(0);
//   const [status, setStatus] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (e) => {

//     if (e.target.files.length > 0) {
//       setSelectedFile(e.target.files[0]);
//     }

//   };

//   const startScan = async () => {

//     if (!projectName.trim()) {
//       alert("Please enter Project Name");
//       return;
//     }

//     if (!selectedFile) {
//       alert("Please upload a ZIP file");
//       return;
//     }

//     setLoading(true);
//     setProgress(10);
//     setStatus("Preparing Scan...");

//     const scan = {

//       projectName: projectName.trim(),

//       fileName: selectedFile.name,

//       scanType: scanType.toUpperCase(),

//       status: "Completed",

//       critical: Math.floor(Math.random() * 3),

//       high: Math.floor(Math.random() * 5),

//       medium: Math.floor(Math.random() * 8),

//       low: Math.floor(Math.random() * 10),

//       userId: 1

//     };

//     console.log("Sending Scan Data:", scan);

//     try {

//       setProgress(40);
//       setStatus("Uploading Scan...");

//       const response = await api.post("/scans", scan);

//       console.log("Backend Response:", response.data);

//       setProgress(100);
//       setStatus("Scan Completed Successfully");

//       alert("Scan Saved Successfully");

//       setProjectName("");
//       setScanType("quick");
//       setSelectedFile(null);

//       const fileInput = document.querySelector("input[type='file']");
//       if (fileInput) {
//         fileInput.value = "";
//       }

//     } catch (error) {

//       console.error("Scan Error:", error);

//       setStatus("Failed");
//       setProgress(0);

//       if (error.response) {

//         console.log("Status:", error.response.status);
//         console.log("Backend Error:", error.response.data);

//         alert(
//           "Failed to save scan\n\n" +
//           JSON.stringify(error.response.data, null, 2)
//         );

//       } else {

//         alert("Cannot connect to backend.");

//       }

//     } finally {

//       setLoading(false);

//     }

//   };

//   return (

//     <div className="scan-page">

//       <h1>New Security Scan</h1>

//       <div className="scan-card">

//         <label>Project Name</label>

//         <input
//           type="text"
//           value={projectName}
//           onChange={(e) => setProjectName(e.target.value)}
//           placeholder="Enter Project Name"
//         />

//         <label>Upload ZIP File</label>

//         <input
//           type="file"
//           accept=".zip"
//           onChange={handleFileChange}
//         />

//         <label>Scan Type</label>

//         <select
//           value={scanType}
//           onChange={(e) => setScanType(e.target.value)}
//         >
//           <option value="quick">Quick Scan</option>
//           <option value="full">Full Scan</option>
//         </select>

//         <button
//           className="scan-btn"
//           onClick={startScan}
//           disabled={loading}
//         >
//           {loading ? "Scanning..." : "Start Scan"}
//         </button>

//         <br /><br />

//         <progress
//           value={progress}
//           max="100"
//           style={{ width: "100%" }}
//         />

//         <h3>{status}</h3>

//       </div>

//     </div>

//   );

// }

// export default NewScan;
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
    setProgress(0);
    setScanCompleted(false);
    setResult(null);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(timer);
          return 90;
        }
        return prev + 10;
      });
    }, 250);

    let response;

    // ==============================
    // WEBSITE SCAN
    // ==============================

    if (scanType === "website") {

      response = await api.post(
        "/website/scan",
        {
          url: websiteUrl.trim()
        }
      );

      clearInterval(timer);
      setProgress(100);

      const websiteData = response.data;

      const websiteResult = {
        securityScore: websiteData.score || 0,

        critical: 0,

        high:
          websiteData.risk === "HIGH"
            ? 1
            : 0,

        medium:
          websiteData.risk === "MEDIUM"
            ? 1
            : 0,

        low:
          websiteData.risk === "LOW"
            ? 1
            : 0,

        totalIssues:
          websiteData.risk === "LOW"
            ? 0
            : 1,

        recommendation:
          websiteData.risk === "LOW"
            ? "Website security looks good."
            : "Review the reported security issues.",

        website: websiteData.website,

        ssl: websiteData.ssl,

        https: websiteData.https,

        dns: websiteData.dns,

        headers: websiteData.headers,

        risk: websiteData.risk
      };

      setResult(websiteResult);

    }

    // ==============================
    // APK SCAN
    // ==============================

    else {

      response = await api.post(
        "/apk/scan",
        {
          fileName: apkFile.name
        }
      );

      clearInterval(timer);
      setProgress(100);

      const apkData = response.data;

      let critical = 0;
      let high = 0;
      let medium = 0;
      let low = 0;

      if (apkData.risk === "HIGH") {
        high = 1;
      }
      else if (apkData.risk === "MEDIUM") {
        medium = 1;
      }
      else {
        low = 1;
      }

      const apkResult = {

        securityScore:
          apkData.risk === "HIGH"
            ? 50
            : apkData.risk === "MEDIUM"
              ? 75
              : 95,

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
          apkData.risk === "HIGH"
            ? "High risk detected. Review this APK carefully."
            : apkData.risk === "MEDIUM"
              ? "Some security concerns were detected."
              : "No major security risk detected.",

        packageName:
          apkData.packageName,

        certificate:
          apkData.certificate,

        permissions:
          apkData.permissions,

        malware:
          apkData.malware,

        risk:
          apkData.risk
      };

      setResult(apkResult);
    }

    setScanCompleted(true);

    // Load recent scans if available
    loadRecentScans();

  }
  catch (err) {

    console.error("SCAN ERROR:", err);

    if (err.response) {

      console.error(
        "Backend response:",
        err.response.data
      );

      setError(
        typeof err.response.data === "string"
          ? err.response.data
          : "Scan failed. Backend returned an error."
      );

    }
    else {

      setError(
        "Cannot connect to backend. Make sure Spring Boot is running."
      );

    }

  }
  finally {

    setLoading(false);

  }
};