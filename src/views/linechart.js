import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const labels = [
  "8:00",
  "9:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
];

const LineChart = ({ color, title, values, range }) => {
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: title,
        data: values
          ? values
          : labels.map(() =>
              faker.datatype.number({ min: range[0], max: range[1] })
            ),
        borderColor: "gray",
        backgroundColor: color,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        suggestedMin: range[0] - 5,
        suggestedMax: range[1] + 5,
        grid: {
          color: "rgba(255,255,255,0.1)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  return <Line options={options} data={data} />;
};

export { LineChart };
