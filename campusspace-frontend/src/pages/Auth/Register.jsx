import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import JQB from "../../../public/JQBimg.jpg";

import { useNavigate } from "react-router-dom";

import useAuthStore from "../../store/authstore";

const Register = () => {
  const navigate = useNavigate();

  const { signUp, loading } = useAuthStore();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "student",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await signUp(formData);

    if (result.success) {
      alert("Account created successfully!");

      navigate("/login");
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
        <div className="absolute inset-0 bg-blue-950/60" />

        {/* Content */}
        <div className="absolute z-10 flex h-full flex-col justify-center gap-8 px-16 text-white">
          <h1 className="text-5xl font-bold leading-tight">
            Your Gateway to
            <br />
            <span className="text-violet-300">Campus Efficiency</span>
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-blue-100">
            Join thousands of students and faculty members in optimizing campus
            logistics. Book rooms, find resources, and stay organized with
            CampusSpace.
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
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-xl flex-col gap-6 rounded-3xl bg-white p-8 shadow-xl"
        >
          {/* Heading */}
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-bold text-blue-950 sm:text-4xl">
              Create an Account
            </h1>

            <p className="text-base text-gray-600 sm:text-lg">
              Get started with your university credentials.
            </p>
          </div>

          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="fullname" className="font-semibold text-blue-950">
              Full Name
            </label>

            <input
              type="text"
              id="fullname"
              value={formData.full_name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  full_name: e.target.value,
                })
              }
              placeholder="eg. Abena Takyi"
              className="h-14 rounded-xl bg-[#f3f4f6] px-4 outline-none transition-all duration-300 focus:ring-2 focus:ring-blue-950"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-semibold text-blue-950">
              University Email
            </label>

            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              placeholder="eg. abena.takyi@st.uni.edu.gh"
              className="h-14 rounded-xl bg-[#f3f4f6] px-4 outline-none transition-all duration-300 focus:ring-2 focus:ring-blue-950"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-semibold text-blue-950">
              Password
            </label>

            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  password: e.target.value,
                });
              }}
              placeholder="Create a strong password"
              className="h-14 rounded-xl bg-[#f3f4f6] px-4 outline-none transition-all duration-300 focus:ring-2 focus:ring-blue-950"
            />
          </div>

          {/* Checkbox */}
          <div className="flex items-start gap-3">
            <input type="checkbox" className="mt-1 h-5 w-5" />

            <p className="text-sm leading-relaxed text-gray-600">
              I agree to the Terms of Service and Privacy Policy.
            </p>
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.98,
            }}
            type="submit"
            className="h-14 rounded-xl bg-blue-950 text-lg font-semibold text-white transition-all duration-300 hover:opacity-80"
          >
            Create Account
          </motion.button>

          {/* Login Redirect */}
          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <Link to={"/login"}>
              <span className="cursor-pointer font-semibold text-blue-950 hover:underline">
                Sign In
              </span>
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
