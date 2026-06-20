import { Link } from "react-router-dom";
const SnNav = ({ menuClick, setMenuClick }) => {
  return (
    <nav
      className={
        menuClick
          ? " flex flex-col md:hidden  fixed top-0 left-0 z-50  h-screen w-[75%]   bg-white p-6 shadow-lg transition-all duration-300 sm:w-[50%]"
          : "hidden"
      }
    >
      {/* Close Button */}
      <button
        className="self-end text-2xl font-bold"
        onClick={() => setMenuClick(false)}
      >
        ×
      </button>

      {/* Mobile Links */}
      <div className="mt-10 flex flex-col gap-6">
        <button className="rounded-md px-4 py-3 text-left text-blue-950 transition-all duration-300 hover:bg-blue-950 hover:text-white">
          <a href="#Home">Home</a>
        </button>

        <button className="rounded-md px-4 py-3 text-left text-blue-950 transition-all duration-300 hover:bg-blue-950 hover:text-white">
          <a href="#features">Features</a>
        </button>

        <button className="rounded-md px-4 py-3 text-left text-blue-950 transition-all duration-300 hover:bg-blue-950 hover:text-white">
          <a href="#testimonials">Testimonials</a>
        </button>
        <Link to={"/register"}>
          <button className="mt-4 rounded-md bg-blue-950 px-4 py-3 text-white transition-all duration-300 hover:opacity-70">
            Get Started
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default SnNav;
