import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <div class="hero min-h-screen bg-base-200">
      <div class="hero-content flex-col lg:flex-row-reverse w-3/4">
        <div class="pl-6 text-center lg:text-left">
          <h1 class="text-5xl lg:text-7xl font-bold">
            <span class="text-secondary">smart</span>
            <span>room.</span>
          </h1>
          <p class="py-8">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div class="card-body">
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
              <label class="flex justify-start space-x-4 px-2 py-4">
                <Link
                  to="/register"
                  label-text-alt
                  link
                  link-hover
                  class="font-bold"
                >
                  Register
                </Link>
                <Link to="/reset" label-text-alt link link-hover>
                  Forgot Password
                </Link>
              </label>
            </div>
            <div class="form-control mt-6">
              <button
                onClick={() => logInWithEmailAndPassword(email, password)}
                class="btn btn-primary"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
