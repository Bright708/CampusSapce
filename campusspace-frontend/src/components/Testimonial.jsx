import { motion } from "framer-motion";

const Testimonial = () => {
  return (
    <section
      className="relative flex w-full flex-col items-center justify-center gap-14 overflow-hidden px-4 py-24 md:px-8 lg:px-16"
      id="testimonials"
    >
      {/* Background Glow */}
      <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-violet-300/20 blur-3xl" />

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="z-10 text-center"
      >
        <h1 className="text-3xl font-bold text-blue-950 sm:text-4xl lg:text-6xl">
          Trusted by Scholars
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-700 sm:text-lg">
          Students and faculty across campus rely on CampusSpace to simplify
          bookings and coordination.
        </p>
      </motion.div>

      {/* Testimonials Grid */}
      <div className="z-10 grid w-full max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
          }}
          viewport={{ once: true }}
          whileHover={{
            y: -10,
            scale: 1.02,
          }}
          className="group flex flex-col justify-between gap-6 rounded-3xl border border-white/20 bg-white/70 p-8 shadow-md backdrop-blur-md transition-all duration-300 hover:shadow-2xl"
        >
          NO TESTIMONIALS YET
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonial;
