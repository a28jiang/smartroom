import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    title: {
      display: true,
      text: "Enviro Rating Comparisons",
    },
  },
  scales: {
    y: {
      stacked: true,
      grid: {
        color: "rgba(255,255,255,0.1)",
      },
    },
    x: {
      stacked: true,
      grid: {
        display: false,
      },
    },
  },
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
};

const labels = ["4/6/22", "5/6/22", "6/6/22", "7/6/22", "8/6/22"];

export const data = {
  labels,
  datasets: [
    {
      label: "Temp Rating",
      borderRadius: 8,
      data: labels.map(() => faker.datatype.number({ min: 1, max: 3 })),
      backgroundColor: "#D2A376",
      stack: "Enviro Rating",
    },
    {
      label: "Humidex Rating",
      borderRadius: 8,
      data: labels.map(() => faker.datatype.number({ min: 1, max: 3 })),
      backgroundColor: "#CA8282",
      stack: "Enviro Rating",
    },
    {
      label: "Lighting Rating",
      borderRadius: 8,
      data: labels.map(() => faker.datatype.number({ min: 1, max: 3 })),
      backgroundColor: "#D1BF8E",
      stack: "Enviro Rating",
    },
    {
      label: "My Rating",
      borderRadius: 8,
      data: labels.map(() => faker.datatype.number({ min: 1, max: 10 })),
      backgroundColor: "#9D82CA",
      stack: "Personal",
    },
    {
      label: "Class Average",
      borderRadius: 8,
      data: labels.map(() => faker.datatype.number({ min: 1, max: 10 })),
      backgroundColor: "#82B9CA",
      stack: "Class Average",
    },
  ],
};

const Chart = () => {
  return <Bar options={options} data={data} />;
};

export { Chart };
