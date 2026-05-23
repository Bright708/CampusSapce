import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

import { supabase } from "../../lib/supabase";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "http://localhost:5173/update-password",
      });

      if (error) throw error;

      setSuccess(true);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8f9ff] px-4 py-10">
      {/* Card */}
      <motion.div
        initial={{
          opacity: 0,
          y: 50,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
        }}
        className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl"
      >
        {/* Branding */}
        <div className="mb-8 flex flex-col gap-2 text-center">
          <h1 className="text-3xl font-bold text-blue-950">CampusSpace</h1>

          <p className="text-gray-600">Reset your password securely.</p>
        </div>

        {/* Success State */}
        {success ? (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            className="flex flex-col gap-5 text-center"
          >
            <div className="flex items-center justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">
                ✓
              </div>
            </div>

            <h2 className="text-2xl font-bold text-blue-950">
              Check Your Email
            </h2>

            <p className="leading-relaxed text-gray-600">
              We’ve sent a password reset link to:
              <br />
              <span className="font-semibold text-blue-950">{email}</span>
            </p>

            <Link to="/login">
              <button className="mt-2 h-12 w-full rounded-xl bg-blue-950 font-semibold text-white transition-all duration-300 hover:opacity-80">
                Back to Login
              </button>
            </Link>
          </motion.div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Heading */}
            <div className="flex flex-col gap-3 text-center">
              <h2 className="text-3xl font-bold text-blue-950">
                Forgot Password?
              </h2>

              <p className="text-gray-600">
                Enter your university email and we’ll send you a reset link.
              </p>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-semibold text-blue-950">
                University Email
              </label>

              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="eg. student@uni.edu.gh"
                className="h-14 rounded-xl bg-[#f3f4f6] px-4 outline-none transition-all duration-300 focus:scale-[1.01] focus:ring-2 focus:ring-blue-950"
              />
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
              disabled={loading}
              type="submit"
              className="h-14 rounded-xl bg-blue-950 text-lg font-semibold text-white transition-all duration-300 hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Sending Reset Link..." : "Send Reset Link"}
            </motion.button>

            {/* Back */}
            <p className="text-center text-gray-600">
              Remember your password?{" "}
              <Link to="/login">
                <span className="cursor-pointer font-semibold text-blue-950 hover:underline">
                  Sign In
                </span>
              </Link>
            </p>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
