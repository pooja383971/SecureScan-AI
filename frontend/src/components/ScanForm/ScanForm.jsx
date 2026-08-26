import { useState } from "react";
import "./ScanForm.css";

function ScanForm() {
  const [target, setTarget] = useState("");
  const [scanType, setScanType] = useState("Nmap");

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(`Starting ${scanType} scan for ${target}`);

    setTarget("");
  };

  return (
    <form className="scan-form" onSubmit={handleSubmit}>

      <h2>New Security Scan</h2>

      <input
        type="text"
        placeholder="Enter URL or IP Address"
        value={target}
        onChange={(e) => setTarget(e.target.value)}
        required
      />

      <select
        value={scanType}
        onChange={(e) => setScanType(e.target.value)}
      >
        <option>Nmap</option>
        <option>OWASP Dependency Check</option>
      </select>

      <button type="submit">
        Start Scan
      </button>

    </form>
  );
}

export default ScanForm;