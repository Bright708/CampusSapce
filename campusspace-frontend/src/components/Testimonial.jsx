import { motion } from "framer-motion";

const Testimonial = () => {
  const testimonials = [
    {
      review:
        "CampusSpace changed how our study group operates. No more frantic searching for a whiteboard at 9 PM.",
      name: "Sarah Jenkins",
      role: "Physics Major",
    },

    {
      review:
        "As a faculty member, managing lab hours used to be a nightmare. Now it's completely hands-off and reliable.",
      name: "Dr. David Chen",
      role: "Dept. Head, CS",
    },

    {
      review:
        "The interface is so clean. It feels like a premium productivity tool, not another clunky school portal.",
      name: "Marcus Thorne",
      role: "Business Major",
    },
  ];

  return (
    <section className="relative flex w-full flex-col items-center justify-center gap-14 overflow-hidden px-4 py-24 md:px-8 lg:px-16">
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
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.2,
            }}
            viewport={{ once: true }}
            whileHover={{
              y: -10,
              scale: 1.02,
            }}
            className="group flex flex-col justify-between gap-6 rounded-3xl border border-white/20 bg-white/70 p-8 shadow-md backdrop-blur-md transition-all duration-300 hover:shadow-2xl"
          >
            {/* Stars */}
            <div className="flex gap-1 text-yellow-500">★ ★ ★ ★ ★</div>

            {/* Review */}
            <p className="text-base leading-relaxed text-gray-700">
              "{testimonial.review}"
            </p>

            {/* User */}
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-200 to-violet-200 text-lg font-bold text-blue-950 transition-all duration-300 group-hover:scale-110">
                {testimonial.name.charAt(0)}
              </div>

              {/* Info */}
              <div>
                <h3 className="text-lg font-semibold text-blue-950">
                  {testimonial.name}
                </h3>

                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
