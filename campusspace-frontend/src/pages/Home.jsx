import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import LOGO from "../assets/LOGO.jpeg";

import CTABanner from "../components/CTABanner";
import Feature from "../components/Feature";
import Footer from "../components/Footer";
import SnNav from "../components/SnNav";
import Testimonial from "../components/Testimonial";

import useAuthStore from "../store/authstore";
import useThemeStore from "../store/themeStore";

const Home = () => {
  const [menuClick, setMenuClick] = useState(false);

  const navigate = useNavigate();

  const darkMode = useThemeStore((state) => state.darkMode);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const user = useAuthStore((state) => state.user);

  const handleMenuClick = () => {
    setMenuClick(!menuClick);
  };

  const handleBookRoom = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col gap-13 bg-[#f8f9ff] p-4 transition-colors duration-300 dark:bg-slate-900 sm:p-6 lg:p-12">
      {/* NAVBAR */}
      <nav className="flex items-center justify-between py-4">
        {/* Logo */}
        <h1 className="flex gap-x-4 text-2xl font-bold text-blue-950  sm:text-3xl lg:text-4xl dark:text-slate-100">
          <img
            src={LOGO}
            alt="CampusSpace Logo"
            className="h-13 w-15 rounded-2xl"
          />
          <span className="hidden lg:block">CampusSpace</span>
        </h1>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-7 font-semibold md:flex">
          <li className="cursor-pointer text-slate-600 transition-all duration-300 hover:text-blue-950 dark:text-slate-300 dark:hover:text-white">
            <a href="#home">Home</a>
          </li>

          <li className="cursor-pointer text-slate-600 transition-all duration-300 hover:text-blue-950 dark:text-slate-300 dark:hover:text-white">
            <a href="#features">Features</a>
          </li>

          <li className="cursor-pointer text-slate-600 transition-all duration-300 hover:text-blue-950 dark:text-slate-300 dark:hover:text-white">
            <a href="#testimonials">Reviews</a>
          </li>

          <Link to="/register">
            <button className="h-10 rounded-xl bg-blue-950 px-4 text-white transition-all duration-300 hover:opacity-80 dark:bg-blue-600">
              Get Started
            </button>
          </Link>
        </ul>

        {/* Mobile Navigation */}
        <SnNav menuClick={menuClick} setMenuClick={setMenuClick} />

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          <Link to="/dashboard">
            <PersonIcon className="hidden cursor-pointer text-slate-700 dark:text-slate-200 md:block" />
          </Link>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white transition-all duration-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
          >
            {darkMode ? (
              <Sun size={18} className="text-amber-400" />
            ) : (
              <Moon size={18} className="text-slate-700" />
            )}
          </button>

          <MenuIcon
            onClick={handleMenuClick}
            className="cursor-pointer text-slate-700 dark:text-slate-200 md:hidden"
          />
        </div>
      </nav>

      {/* HERO */}
      <section
        id="home"
        className="flex flex-col items-center justify-center gap-6 py-16 text-center sm:py-24"
      >
        <h1 className="max-w-5xl text-4xl font-bold leading-tight text-blue-950 dark:text-white sm:text-5xl lg:text-7xl">
          Smart Space,{" "}
          <span className="text-blue-500 dark:text-blue-400">
            Seamless Learning
          </span>
        </h1>

        <h2 className="max-w-3xl text-base font-medium text-slate-700 dark:text-slate-300 sm:text-lg lg:text-xl">
          The modern university operating system for booking study rooms,
          laboratories and lecture halls. Minimize logistics, maximize focus.
        </h2>

        <section className="flex flex-col gap-4 sm:flex-row">
          <button
            onClick={handleBookRoom}
            className="h-14 rounded-xl bg-blue-950 px-8 font-semibold text-white transition-all duration-300 hover:opacity-80 dark:bg-blue-600"
          >
            Book a Room / Hall
          </button>
        </section>
      </section>

      {/* Sections */}
      <Feature />

      <Testimonial />

      <CTABanner />

      <Footer />
    </div>
  );
};

export default Home;
