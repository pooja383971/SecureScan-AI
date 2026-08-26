// import { useState } from "react";
// import api from "../../services/api";
// import "./ApkScanner.css";

// function ApkScanner() {

//   const [apkFile, setApkFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);

//   const handleFileChange = (e) => {
//     setApkFile(e.target.files[0]);
//   };

//   const handleScan = async () => {

//     if (!apkFile) {
//       alert("Please choose an APK file.");
//       return;
//     }

//     setLoading(true);

//     try {

//       const response = await api.post("/apk/scan", {
//         fileName: apkFile.name,
//       });

//       setResult(response.data);

//     } catch (error) {

//       console.error(error);

//       alert("APK Scan Failed");

//     } finally {

//       setLoading(false);

//     }
//   };

//   const scanAgain = () => {
//     setApkFile(null);
//     setResult(null);
//   };

//   return (

//     <div className="scanner-page">

//       <div className="scanner-card">

//         <h1>📱 APK Security Scanner</h1>

//         <p>
//           Analyze Android APK files for malware,
//           permissions and security risks.
//         </p>

//         <div className="input-group">

//           <label>Select APK File</label>

//           <input
//             type="file"
//             accept=".apk"
//             onChange={handleFileChange}
//           />

//         </div>

//         <button
//           className="scan-btn"
//           onClick={handleScan}
//           disabled={loading}
//         >
//           {loading ? "Scanning..." : "🔍 Scan APK"}
//         </button>

//       </div>

//       {result && (

//         <div className="result-card">

//           <div className="result-header">

//             <h2>APK Scan Result</h2>

//             <div className={`threat-badge ${result.risk?.toLowerCase()}`}>
//               {result.risk}
//             </div>

//           </div>

//           <div className="result-grid">

//             <div className="result-item">
//               <h4>Package Name</h4>
//               <p>{result.packageName}</p>
//             </div>

//             <div className="result-item">
//               <h4>Certificate</h4>
//               <p>{result.certificate}</p>
//             </div>

//             <div className="result-item">
//               <h4>Permissions</h4>
//               <p>{result.permissions}</p>
//             </div>

//             <div className="result-item">
//               <h4>Malware</h4>
//               <p>{result.malware}</p>
//             </div>

//           </div>

//           <div className="button-group">

//             <button
//               className="scan-again-btn"
//               onClick={scanAgain}
//             >
//               🔄 Scan Again
//             </button>

//           </div>

//         </div>

//       )}

//     </div>

//   );
// }

// export default ApkScanner;
import { useState } from "react";
import api from "../../services/api";
import "./ApkScanner.css";

function ApkScanner() {

  const [apkFile, setApkFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {

    if (e.target.files.length > 0) {

      setApkFile(e.target.files[0]);

    }

  };

  const handleScan = async () => {

    if (!apkFile) {

      alert("Please select an APK file.");

      return;

    }

    setLoading(true);
    setResult(null);

    try {

      console.log("Scanning APK:", apkFile.name);

      const response = await api.post("/apk/scan", {

        fileName: apkFile.name

      });

      console.log(response.data);

      setResult(response.data);

    } catch (error) {

      console.error(error);

      if (error.response) {

        alert(
          "APK Scan Failed\n\n" +
          JSON.stringify(error.response.data)
        );

      } else {

        alert("Unable to connect to backend.");

      }

    } finally {

      setLoading(false);

    }

  };

  const handleScanAgain = () => {

    setApkFile(null);
    setResult(null);

  };

  return (

    <div className="scanner-page">

      <div className="scanner-card">

        <h1>📱 APK Security Scanner</h1>

        <p>

          Upload an Android APK file to analyze
          permissions, malware and certificate.

        </p>

        <div className="input-group">

          <label>Select APK File</label>

          <input
            type="file"
            accept=".apk"
            onChange={handleFileChange}
          />

        </div>

        <button
          className="scan-btn"
          onClick={handleScan}
          disabled={loading}
        >

          {loading ? "Scanning..." : "🔍 Start APK Scan"}

        </button>

      </div>

      {loading && (

        <div className="loading-card">

          <h2>Scanning APK...</h2>

          <p>Please wait while SecureScan AI analyzes your APK.</p>

        </div>

      )}

      {!loading && result && (

        <div className="result-card">

          <div className="result-header">

            <h2>APK Scan Result</h2>

            <div
              className={`threat-badge ${result.risk?.toLowerCase()}`}
            >

              {result.risk}

            </div>

          </div>

          <div className="result-grid">

            <div className="result-item">

              <h4>Package Name</h4>

              <p>{result.packageName}</p>

            </div>

            <div className="result-item">

              <h4>Certificate</h4>

              <p>{result.certificate}</p>

            </div>

            <div className="result-item">

              <h4>Total Permissions</h4>

              <p>{result.permissions}</p>

            </div>

            <div className="result-item">

              <h4>Malware Detection</h4>

              <p>{result.malware}</p>

            </div>

            <div className="result-item">

              <h4>Risk Level</h4>

              <p>{result.risk}</p>

            </div>

          </div>

          <div className="button-group">

            <button
              className="scan-again-btn"
              onClick={handleScanAgain}
            >

              🔄 Scan Again

            </button>

          </div>

        </div>

      )}

    </div>

  );

}

export default ApkScanner;