import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import useAuthStore from "../../store/authstore";

import JQB from "../../../public/JQBimg.jpg";

const Login = () => {
  const navigate = useNavigate();

  const { signIn, loading } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // HANDLE LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await signIn(formData);

    console.log("RESULT:", JSON.stringify(result));

    if (result.success) {
      if (result.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="grid min-h-screen w-full grid-cols-1 bg-[#f8f9ff] lg:grid-cols-2">
      {/* LEFT SIDE */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="relative hidden overflow-hidden lg:flex"
      >
        {/* Background Image */}
        <img
          src={JQB}
          alt="University Hall"
          className="h-full w-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-blue-950/70" />

        {/* Content */}
        <div className="absolute z-10 flex h-full flex-col justify-center gap-8 px-16 text-white">
          <h1 className="text-4xl font-bold">CampusSpace</h1>

          <h2 className="text-5xl font-bold leading-tight">
            Simplify your
            <br />
            Campus Journey
          </h2>

          <p className="max-w-xl text-lg leading-relaxed text-blue-100">
            The centralized platform for students to find study spaces, book
            resources, and navigate university life with ease.
          </p>
        </div>
      </motion.div>

      {/* RIGHT SIDE */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex items-center justify-center px-4 py-10 sm:px-8 lg:px-16"
      >
        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-md flex-col gap-6 rounded-3xl bg-white p-8 shadow-xl"
        >
          {/* MOBILE BRANDING */}
          <div className="flex flex-col gap-2 lg:hidden">
            <h1 className="text-3xl font-bold text-blue-950">CampusSpace</h1>

            <p className="text-gray-600">Simplify your campus journey.</p>
          </div>

          {/* HEADING */}
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-bold text-blue-950 sm:text-4xl">
              Sign In
            </h1>

            <p className="text-base text-gray-600 sm:text-lg">
              Welcome back! Please enter your details.
            </p>
          </div>

          {/* EMAIL */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-semibold text-blue-950">
              University Email
            </label>

            <input
              type="email"
              id="email"
              placeholder="eg. abena.takyi@st.uni.edu.gh"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              className="h-14 rounded-xl bg-[#f3f4f6] px-4 outline-none transition-all duration-300 focus:scale-[1.01] focus:ring-2 focus:ring-blue-950"
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-semibold text-blue-950">
              Password
            </label>

            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
              className="h-14 rounded-xl bg-[#f3f4f6] px-4 outline-none transition-all duration-300 focus:scale-[1.01] focus:ring-2 focus:ring-blue-950"
              required
            />
          </div>

          {/* REMEMBER + FORGOT */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <input type="checkbox" className="h-4 w-4" />

              <p className="text-sm text-gray-600">Remember Me</p>
            </div>

            <Link to="/forgot-password">
              <p className="cursor-pointer text-sm font-semibold text-blue-950 hover:underline">
                Forgot Password?
              </p>
            </Link>
          </div>

          {/* SUBMIT BUTTON */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            type="submit"
            className="h-14 rounded-xl bg-blue-950 text-lg font-semibold text-white transition-all duration-300 hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Sign In"}
          </motion.button>

          {/* REDIRECT */}
          <p className="text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/register">
              <span className="cursor-pointer font-semibold text-blue-950 hover:underline">
                Sign Up
              </span>
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
