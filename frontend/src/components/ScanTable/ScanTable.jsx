import "./ScanTable.css";

function ScanTable() {
    const scans = [
        {
            id: 1,
            target: "example.com",
            status: "Completed",
            severity: "High",
        },
        {
            id: 2,
            target: "192.168.1.10",
            status: "Running",
            severity: "Medium",
        },
    ];

    return (
        <table className="scan-table">

            <thead>

                <tr>
                    <th>ID</th>
                    <th>Target</th>
                    <th>Status</th>
                    <th>Severity</th>
                </tr>

            </thead>

            <tbody>

                {scans.map((scan) => (
                    <tr key={scan.id}>
                        <td>{scan.id}</td>
                        <td>{scan.target}</td>
                        <td>{scan.status}</td>
                        <td>{scan.severity}</td>
                    </tr>
                ))}

            </tbody>

        </table>
    );
}

export default ScanTable;