import { useEffect, useState } from "react";
import api from "../../services/api";
import "./Reports.css";

function Reports() {

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const response = await api.get("/reports");
      setReports(response.data);
    } catch (error) {
      console.error("Error loading reports:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteReport = async (id) => {
    if (!window.confirm("Delete this report?")) return;

    try {
      await api.delete(`/reports/${id}`);
      loadReports();
    } catch (error) {
      console.error(error);
      alert("Unable to delete report");
    }
  };

  if (loading) {
    return (
      <div className="page">
        <h2>Loading Reports...</h2>
      </div>
    );
  }

  return (
    <div className="page">

      <h1>Security Reports</h1>

      {reports.length === 0 ? (
        <p>No reports generated yet.</p>
      ) : (

        <table className="report-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Target</th>
              <th>Scan Type</th>
              <th>Critical</th>
              <th>High</th>
              <th>Medium</th>
              <th>Low</th>
              <th>Generated</th>
              <th>Summary</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {reports.map((report) => (

              <tr key={report.id}>

                <td>{report.id}</td>

                <td>{report.target}</td>

                <td>{report.scanType}</td>

                <td className="critical">
                  {report.critical}
                </td>

                <td className="high">
                  {report.high}
                </td>

                <td className="medium">
                  {report.medium}
                </td>

                <td className="low">
                  {report.low}
                </td>

                <td>
                  {report.generatedAt
                    ? new Date(report.generatedAt).toLocaleString()
                    : "-"}
                </td>

                <td>{report.summary}</td>

                <td>

                  <button
                    className="delete-btn"
                    onClick={() => deleteReport(report.id)}
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

export default Reports;