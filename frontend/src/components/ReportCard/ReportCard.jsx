import "./ReportCard.css";

function ReportCard({ title, date, severity }) {
    return (
        <div className="report-card">
            <h3>{title}</h3>

            <p>
                <strong>Date:</strong> {date}
            </p>

            <p>
                <strong>Severity:</strong> {severity}
            </p>

            <button>View Report</button>
        </div>
    );
}

export default ReportCard;