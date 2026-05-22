import { motion } from "framer-motion";

const CTABanner = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-[30px] bg-blue-950 px-6 py-16 text-center text-white shadow-2xl md:px-12 lg:px-20"
    >
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-violet-400/20 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Heading */}
        <h2 className="max-w-4xl text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
          Ready to Simplify Your Campus Experience?
        </h2>

        {/* Description */}
        <p className="max-w-2xl text-base leading-relaxed text-blue-100 sm:text-lg">
          Join thousands of students and faculty who trust CampusSpace for
          seamless coordination and smarter scheduling.
        </p>

        {/* Buttons */}
        <div className="flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
          {/* Primary Button */}
          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="w-full rounded-xl bg-violet-400 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-violet-500 sm:w-auto"
          >
            Get Started Now
          </motion.button>

          {/* Secondary Button */}
          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="w-full rounded-xl bg-white px-8 py-4 font-semibold text-blue-950 transition-all duration-300 hover:bg-gray-200 sm:w-auto"
          >
            Contact Sales
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
};

export default CTABanner;
