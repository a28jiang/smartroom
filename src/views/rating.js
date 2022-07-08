import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { Chart } from "./barchart";
import { LineChart } from "./linechart";
import { Stats } from "./stats";
import { Scale } from "./scale";

const Rating = () => {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

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
  }, [user, loading]);

  const questions = [
    {
      q: "How well you able to focus in class today?",
      l: "Not very well",
      h: " Great focus",
    },
    {
      q: "How comfortable was the classroom environment?",
      l: "Extremely uncomfortable",
      h: " Very comfortable",
    },
    {
      q: "Rate your productivity during class time.",
      l: "Low productivity",
      h: " Very productive",
    },
    {
      q: "How often did you feel distracted in class?",
      l: "Not often",
      h: " Very often",
    },
    {
      q: "How did you find your overall cognitive ability today?",
      l: "Poor",
      h: " Excellent",
    },
    {
      q: "Rate your overall classroom experience today.",
      l: "Poor",
      h: " Excellent",
    },
  ];

  return (
    <div class="hero min-h-screen bg-base-200">
      <div class="flex items-stretch justify-center w-full text-center">
        <div class="max-w-xxl">
          <div class="text-left grid grid-cols-3 gap-4">
            <div>
              <h1 class="text-6xl font-bold font-['playfair'] py-6">
                <span class="text-accent">smart</span>
                <span>room.</span>
              </h1>
            </div>
            <div class="col-span-2" />
          </div>
          <div class="text-left mt-12 h-1/2 overflow-y-scroll">
            {questions.map((question) => (
              <div class="col-span-3">
                <Scale
                  question={question.q}
                  lowText={question.l}
                  highText={question.h}
                />
              </div>
            ))}
          </div>

          <div class="flex justify-end gap-4 py-8">
            <button class="btn btn-outline" onClick={logout}>
              Reset
            </button>
            <button
              class="btn btn-outline btn-accent"
              onClick={() => navigate("/dashboard")}
            >
              Finish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rating;
