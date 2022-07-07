import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
} from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import hero from "../assets/Saly-10.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [registerFlow, setRegisterFlow] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);

  const handleClick = () => {
    if (!registerFlow) {
      logInWithEmailAndPassword(email, password);
    } else {
      if (!/@uwaterloo.ca\s*$/.test(email)) {
        alert("Must use a uWaterloo email");
      } else if (password != password2) {
        alert("Passwords must be equal");
      } else {
        registerWithEmailAndPassword(name, email, password);
      }
    }
  };

  return (
    <div class="hero min-h-screen bg-base-200">
      <div class="hero-content flex-col lg:flex-row-reverse w-3/4">
        <div class="mt-12 pl-6 text-center lg:text-left">
          <h1 class="text-5xl font-['playfair'] lg:text-7xl font-bold">
            <span class="text-accent">smart</span>
            <span>room.</span>
          </h1>
          <p class="py-4 text-lg">
            Optimize your classroom experience through <br />
            crowd-sourced data visualizations.
          </p>
          <img src={hero} class="h-64 -mt-16 ml-10" />
        </div>
        <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div class="card-body">
            {registerFlow && (
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Name</span>
                </label>
                <input
                  type="text"
                  value={name}
                  placeholder="Enter your Full Name"
                  onChange={(e) => setName(e.target.value)}
                  class="input input-bordered"
                />
              </div>
            )}

            <div class="form-control">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input
                type="text"
                value={email}
                placeholder="Enter your UWaterloo Email"
                onChange={(e) => setEmail(e.target.value)}
                class="input input-bordered"
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text"> Password </span>
              </label>
              <input
                type="password"
                placeholder="Password"
                class="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {registerFlow && (
              <div class="form-control">
                <label class="label">
                  <span class="label-text"> Confirm Password </span>
                </label>
                <input
                  type="password"
                  placeholder="Re-enter Password"
                  class="input input-bordered"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                />
              </div>
            )}

            <label class="flex justify-start space-x-4 px-2 py-4">
              <button
                onClick={() => setRegisterFlow(!registerFlow)}
                class="text-left font-bold text-secondary-content"
              >
                {registerFlow ? "Existing account" : "New account"}
              </button>
              <Link to="/reset" label-text-alt link link-hover>
                Forgot Password
              </Link>
            </label>
            <div class="form-control mt-6">
              <button onClick={() => handleClick()} class="btn btn-primary">
                {registerFlow ? "Sign up" : "Login"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
