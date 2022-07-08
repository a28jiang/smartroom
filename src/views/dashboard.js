import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { Chart } from "./barchart";
import { LineChart } from "./linechart";
import { Stats } from "./stats";
import Papa from "papaparse";
import file from "../data/7-7.csv";

const Dashboard = () => {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [chartData, setChartData] = useState({});
  const navigate = useNavigate();

  const intializeChart = () => {
    Papa.parse(file, {
      download: true,
      complete: function (results) {
        const newChartData = {
          titles: [],
          temp: [],
          light: [],
          humidity: [],
        };

        // Iterating data to get column name and their values
        results.data.map((resData) => {
          const [d, l, t, _, h] = Object.values(resData);
          newChartData["titles"].push(d);
          newChartData["light"].push(parseInt(l));
          newChartData["temp"].push(parseInt(t));
          newChartData["humidity"].push(parseInt(h));
        });
        setChartData(newChartData);
      },
    });
  };

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();

      setName(data.name);
    } catch (err) {
      console.log(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");

    fetchUserName();
    intializeChart();
  }, [user, loading]);

  return (
    <div class="hero min-h-screen bg-base-200">
      <div class="flex items-stretch justify-center w-full text-center">
        <div class="max-w-xxl py-12">
          <div class="grid grid-cols-3 gap-4">
            <div>
              <h1 class="text-6xl font-bold font-['playfair'] py-6">
                <span class="text-accent">smart</span>
                <span>room.</span>
              </h1>
            </div>
            <div class="col-span-2">
              <Stats />
            </div>
            <div class="h-80">
              <LineChart
                title="Temperature"
                color="rgba(210,163,118,0.5)"
                values={chartData["temp"]}
                labels={chartData["titles"]}
              />
            </div>
            <div class="h-80">
              <LineChart
                title="Humidex"
                color="rgba(202,130,130,0.5)"
                values={chartData["humidity"]}
                labels={chartData["titles"]}
              />
            </div>
            <div class="h-80">
              <LineChart
                title="Lighting"
                color="rgba(209,191,142,0.5)"
                values={chartData["light"]}
                labels={chartData["titles"]}
              />
            </div>
          </div>
          <Chart />
          <div class="flex justify-end gap-4 py-8">
            <button class="btn btn-outline" onClick={logout}>
              Sign Out
            </button>
            <button
              class="btn btn-outline btn-secondary"
              onClick={() =>
                window.open(
                  "https://docs.google.com/spreadsheets/d/1dM6hKaFLdIw1UQQdTN0WyQxMID1535u9DQULfw9l5ns",
                  "_blank"
                )
              }
            >
              Advocacy Resources
            </button>
            <button
              class="btn btn-outline btn-accent"
              onClick={() => navigate("/rating")}
            >
              Submit Rating
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
