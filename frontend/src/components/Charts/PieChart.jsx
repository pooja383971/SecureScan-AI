import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart() {
  const data = {
    labels: ["Critical", "High", "Medium", "Low"],
    datasets: [
      {
        data: [8, 15, 20, 30],
        backgroundColor: [
          "#ef4444",
          "#f97316",
          "#eab308",
          "#22c55e",
        ],
      },
    ],
  };

  return <Pie data={data} />;
}

export default PieChart;