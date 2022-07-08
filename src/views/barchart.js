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
      suggestedMin: 0,
      suggestedMax: 10,
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

const labels = ["30/6/22", "7/4/22", "7/5/22", "7/6/22", "7/7/22"];

const userRatings = {
  "30/6/22": {
    user: 7.5,
    classAvg: 7.25,
  },
  "7/4/22": {
    user: 7,
    classAvg: 8.7,
  },
  "7/5/22": {
    user: 9,
    classAvg: 8.75,
  },
  "7/6/22": {
    user: 8,
    classAvg: 7.75,
  },
  "7/7/22": {
    user: 8,
    classAvg: 8.2,
  },
};

const enviroRating = {
  "30/6/22": {
    temp: 7.9,
    humidex: 6.1,
    lighting: 8.5,
  },
  "7/4/22": {
    temp: 9.9,
    humidex: 8.3,
    lighting: 7.9,
  },
  "7/5/22": {
    temp: 9.3,
    humidex: 9.5,
    lighting: 8.0,
  },
  "7/6/22": {
    temp: 9.5,
    humidex: 7.7,
    lighting: 7.7,
  },
  "7/7/22": {
    temp: 9.3,
    humidex: 9.5,
    lighting: 7.7,
  },
};

export const data = {
  labels,
  datasets: [
    {
      label: "Temp Rating",
      borderRadius: 8,
      data: labels.map((label) => enviroRating[label]["temp"] / 3.33),
      backgroundColor: "#D2A376",
      stack: "Enviro Rating",
    },
    {
      label: "Humidex Rating",
      borderRadius: 8,
      data: labels.map((label) => enviroRating[label]["humidex"] / 3.33),
      backgroundColor: "#CA8282",
      stack: "Enviro Rating",
    },
    {
      label: "Lighting Rating",
      borderRadius: 8,
      data: labels.map((label) => enviroRating[label]["lighting"] / 3.33),
      backgroundColor: "#D1BF8E",
      stack: "Enviro Rating",
    },
    {
      label: "My Rating",
      borderRadius: 8,
      data: labels.map((label) => userRatings[label]["user"]),
      backgroundColor: "#9D82CA",
      stack: "Personal",
    },
    {
      label: "Class Average",
      borderRadius: 8,
      data: labels.map((label) => userRatings[label]["classAvg"]),
      backgroundColor: "#82B9CA",
      stack: "Class Average",
    },
  ],
};

const Chart = () => {
  return <Bar options={options} data={data} />;
};

export { Chart };
