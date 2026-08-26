import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

function LineChart() {
    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],

        datasets: [
            {
                label: "Detected Vulnerabilities",
                data: [5, 9, 4, 12, 8],
                borderColor: "#10b981",
                fill: false,
            },
        ],
    };

    return <Line data={data} />;
}

export default LineChart;