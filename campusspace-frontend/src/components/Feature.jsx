import AdsClickIcon from "@mui/icons-material/AdsClick";
import SyncIcon from "@mui/icons-material/Sync";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { motion } from "framer-motion";

const Feature = () => {
  const features = [
    {
      title: "One-Click Booking",
      description:
        "Find and reserve a study room in under 5 seconds. Intelligent suggestions based on your schedule.",
      icon: <AdsClickIcon fontSize="large" className="text-blue-950" />,
    },

    {
      title: "Smart Calendar Sync",
      description:
        "Automatically organize schedules and reduce booking conflicts across campus.",
      icon: <SyncIcon fontSize="large" className="text-blue-950" />,
    },

    {
      title: "Real-Time Availability",
      description:
        "Live occupancy data ensures you never walk to a booked room that is actually empty.",
      icon: <VisibilityIcon fontSize="large" className="text-blue-950" />,
    },
  ];

  return (
    <section className="relative flex w-full flex-col gap-12 overflow-hidden px-4 py-20 md:px-8 lg:px-16">
      {/* Background Blur */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-violet-300/20 blur-3xl" />

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="z-10 flex flex-col gap-4"
      >
        <h1 className="text-3xl font-bold text-blue-950 sm:text-4xl lg:text-5xl">
          Designed for Efficiency
        </h1>

        <h2 className="max-w-3xl text-base font-medium leading-relaxed text-gray-700 sm:text-lg lg:text-xl">
          We've automated the friction out of campus coordination so you can
          focus on what matters most.
        </h2>
      </motion.div>

      {/* Cards */}
      <div className="z-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.2,
            }}
            viewport={{ once: true }}
            whileHover={{
              y: -10,
              scale: 1.02,
            }}
            className="group flex flex-col gap-5 rounded-3xl border border-white/20 bg-white/70 p-8 shadow-md backdrop-blur-md transition-all duration-300"
          >
            {/* Icon */}
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 transition-all duration-300 group-hover:scale-110 group-hover:bg-violet-100">
              {feature.icon}
            </div>

            {/* Title */}
            <h3 className="text-2xl font-semibold text-blue-950">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="text-base leading-relaxed text-gray-700">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Feature;
