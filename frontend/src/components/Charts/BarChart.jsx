import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function BarChart() {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],

    datasets: [
      {
        label: "Scans",
        data: [10, 15, 9, 18, 12],
        backgroundColor: "#2563eb",
      },
    ],
  };

  return <Bar data={data} />;
}

export default BarChart;