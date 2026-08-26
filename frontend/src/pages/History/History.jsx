import { useEffect, useState } from "react";
import api from "../../services/api";
import "./History.css";

function History() {

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const response = await api.get("/scans");
      setHistory(response.data);
    } catch (error) {
      console.error("Error loading history:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteScan = async (id) => {

    if (!window.confirm("Delete this scan?")) return;

    try {
      await api.delete(`/scans/${id}`);
      loadHistory();
    } catch (error) {
      console.error(error);
      alert("Unable to delete scan.");
    }
  };

  if (loading) {
    return (
      <div className="page">
        <h2>Loading Scan History...</h2>
      </div>
    );
  }

  return (
    <div className="page">

      <h1>Scan History</h1>

      {history.length === 0 ? (

        <p>No scan history available.</p>

      ) : (

        <table className="history-table">

          <thead>

            <tr>
              <th>ID</th>
              <th>Project</th>
              <th>File</th>
              <th>Scan Type</th>
              <th>Status</th>
              <th>Critical</th>
              <th>High</th>
              <th>Medium</th>
              <th>Low</th>
              <th>Total</th>
              <th>Date</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {history.map((scan) => (

              <tr key={scan.id}>

                <td>{scan.id}</td>

                <td>{scan.projectName}</td>

                <td>{scan.fileName}</td>

                <td>{scan.scanType}</td>

                <td>{scan.status}</td>

                <td className="critical">{scan.critical}</td>

                <td className="high">{scan.high}</td>

                <td className="medium">{scan.medium}</td>

                <td className="low">{scan.low}</td>

                <td>{scan.totalVulnerabilities}</td>

                <td>
                  {scan.scanDate
                    ? new Date(scan.scanDate).toLocaleString()
                    : "-"}
                </td>

                <td>

                  <button
                    className="delete-btn"
                    onClick={() => deleteScan(scan.id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>
  );
}

export default History;