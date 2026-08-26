// import "./DashboardCard.css";

// function DashboardCard({ title, value, color }) {
//   return (
//     <div className="dashboard-card" style={{ borderTop: `5px solid ${color}` }}>
//       <h3>{title}</h3>
//       <h2>{value}</h2>
//     </div>
//   );
// }

// export default DashboardCard;
// import "./DashboardCards.css";
// import {
//   FaShieldAlt,
//   FaBug,
//   FaExclamationTriangle,
//   FaCheckCircle,
// } from "react-icons/fa";

// function DashboardCards() {
//   return (
//     <div className="cards-container">

//       <div className="card total">
//         <div className="icon">
//           <FaShieldAlt />
//         </div>

//         <div>
//           <h4>Total Scans</h4>
//           <h2>125</h2>
//         </div>
//       </div>

//       <div className="card critical">
//         <div className="icon">
//           <FaBug />
//         </div>

//         <div>
//           <h4>Critical</h4>
//           <h2>14</h2>
//         </div>
//       </div>

//       <div className="card medium">
//         <div className="icon">
//           <FaExclamationTriangle />
//         </div>

//         <div>
//           <h4>Medium</h4>
//           <h2>35</h2>
//         </div>
//       </div>

//       <div className="card low">
//         <div className="icon">
//           <FaCheckCircle />
//         </div>

//         <div>
//           <h4>Low</h4>
//           <h2>76</h2>
//         </div>
//       </div>

//     </div>
//   );
// }

// export default DashboardCards;
import "./DashboardCards.css";
import {
  FaShieldAlt,
  FaBug,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";

function DashboardCards() {
  const cards = [
    {
      title: "Total Scans",
      value: 125,
      icon: <FaShieldAlt />,
      color: "#2563eb",
    },
    {
      title: "Critical",
      value: 14,
      icon: <FaBug />,
      color: "#dc2626",
    },
    {
      title: "Medium",
      value: 35,
      icon: <FaExclamationTriangle />,
      color: "#f59e0b",
    },
    {
      title: "Low",
      value: 76,
      icon: <FaCheckCircle />,
      color: "#16a34a",
    },
  ];

  return (
    <div className="cards-grid">
      {cards.map((card, index) => (
        <div className="dashboard-card" key={index}>
          <div
            className="card-icon"
            style={{ backgroundColor: card.color }}
          >
            {card.icon}
          </div>

          <div className="card-info">
            <h4>{card.title}</h4>
            <h2>{card.value}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;