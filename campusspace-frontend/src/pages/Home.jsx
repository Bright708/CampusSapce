import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CTABanner from "../components/CTABanner";
import Feature from "../components/Feature";
import Footer from "../components/Footer";
import SnNav from "../components/SnNav";
import Testimonial from "../components/Testimonial";
import useAuthStore from "../store/authstore";
const Home = () => {
  const [menuClick, setMenuClick] = useState(false);
  const navigate = useNavigate();

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
    <div className="min-h-screen w-full bg-[#f8f9ff] p-4 flex flex-col gap-13 sm:p-6 lg:p-12">
      {/* NAVBAR */}
      <nav className="flex items-center justify-between py-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-950 sm:text-3xl lg:text-4xl">
          CampusSpace
        </h1>

        {/* Nav Links */}
        <ul className="hidden items-center gap-7 font-semibold md:flex">
          <li className="cursor-pointer opacity-60 transition-all duration-300 hover:text-blue-950 hover:opacity-100">
            <a href="#home">Home</a>
          </li>

          <li className="cursor-pointer opacity-60 transition-all duration-300 hover:text-blue-950 hover:opacity-100">
            <a href="#features">Features</a>
          </li>

          <li className="cursor-pointer opacity-60   transition-all duration-300 hover:text-blue-950 hover:opacity-100">
            <a href="#testimonials">Reviews</a>
          </li>

          <Link to={"/register"}>
            <button className="h-10 rounded-[10px] bg-blue-950 px-4 text-white transition-all duration-300 hover:opacity-70">
              Get Started
            </button>
          </Link>
        </ul>
        <SnNav menuClick={menuClick} setMenuClick={setMenuClick} />

        {/* Icons */}
        <div className="flex items-center gap-4">
          <Link to={"/dashboard"}>
            <PersonIcon className="hidden cursor-pointer md:blockr" />
          </Link>
          <MenuIcon
            className="cursor-pointer md:hidden"
            onClick={handleMenuClick}
          />
        </div>
      </nav>

      {/* HERO SECTION */}
      <section
        className="flex flex-col items-center justify-center gap-6 py-16 text-center sm:py-24"
        id="home"
      >
        <h1 className="max-w-5xl text-4xl font-bold leading-tight text-blue-950 sm:text-5xl lg:text-7xl">
          Smart Space,{" "}
          <span className="text-violet-400">Seamless Learning</span>
        </h1>

        <h2 className="max-w-3xl text-base font-medium text-gray-700 sm:text-lg lg:text-xl">
          The modern university operating system for booking study rooms, labs,
          and lecture halls. Minimize logistics, maximize focus.
        </h2>

        {/* CTA Buttons */}
        <section className="flex flex-col gap-4 sm:flex-row">
          <button
            onClick={handleBookRoom}
            className="h-14 rounded-[10px] bg-blue-950 px-8 text-white transition-all duration-300 hover:opacity-70"
          >
            Book a Room/Hall
          </button>
        </section>
      </section>
      <Feature />
      <Testimonial />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default Home;
