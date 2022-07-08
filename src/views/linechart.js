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

const LineChart = ({ color, title, values, labels }) => {
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: title,
        data: values,
        borderColor: "gray",
        backgroundColor: color,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        suggestedMin: Math.min.apply(Math, values) - 5,
        suggestedMax: Math.max.apply(Math, values) + 5,
        grid: {
          color: "rgba(255,255,255,0.1)",
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 5,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 4,
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
