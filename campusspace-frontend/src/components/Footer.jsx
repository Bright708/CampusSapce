import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="mt-24 w-full border-t border-white/20 bg-[#f8f9ff] px-4 py-12 sm:px-6 lg:px-16"
    >
      {/* Top Section */}
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
        {/* Brand */}
        <div className="flex flex-col gap-5">
          <h1 className="text-3xl font-bold text-blue-950">CampusSpace</h1>

          <p className="max-w-sm text-base leading-relaxed text-gray-700">
            Make campus infrastructure work for the people who use it every day.
          </p>
        </div>

        {/* Product Links */}
        <div className="flex flex-col gap-5">
          <h2 className="text-xl font-bold text-blue-950">Product</h2>

          <ul className="flex flex-col gap-4">
            <li className="cursor-pointer text-base font-medium text-gray-700 transition-all duration-300 hover:text-blue-950">
              Booking
            </li>

            <li className="cursor-pointer text-base font-medium text-gray-700 transition-all duration-300 hover:text-blue-950">
              Calendar
            </li>

            <li className="cursor-pointer text-base font-medium text-gray-700 transition-all duration-300 hover:text-blue-950">
              Analytics
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-5">
          <h2 className="text-xl font-bold text-blue-950">Legal</h2>

          <ul className="flex flex-col gap-4">
            <li className="cursor-pointer text-base font-medium text-gray-700 transition-all duration-300 hover:text-blue-950">
              Support
            </li>

            <li className="cursor-pointer text-base font-medium text-gray-700 transition-all duration-300 hover:text-blue-950">
              Terms
            </li>

            <li className="cursor-pointer text-base font-medium text-gray-700 transition-all duration-300 hover:text-blue-950">
              Privacy
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="my-10 h-[1px] w-full bg-white/40" />

      {/* Bottom */}
      <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row">
        <p className="text-sm font-medium text-gray-700 sm:text-base">
          © {new Date().getFullYear()} CampusSpace. All rights reserved.
        </p>

        <p className="text-sm text-gray-600">
          Designed for smarter campus coordination.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
