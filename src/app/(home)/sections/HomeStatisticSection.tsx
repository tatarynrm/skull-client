"use client";

import React from "react";
import { motion } from "framer-motion";
import { FcStatistics } from "react-icons/fc";

const stats = [
  {
    value: "12,500+",
    label: "Нових хлопців за місяць",
  },
  {
    value: "10,000+",
    label: "Нових дівчат за місяць",
  },
  {
    value: "22,500+",
    label: "Нових користувачів загалом за місяць",
  },
];

const HomeStatisticSection = () => {
  return (
    <section className="py-20 bg-white dark:bg-background container">
      <div>
        <div className="statistic__title flex gap-10 items-center text-center mb-12 m-auto justify-center">
          <h3 className="text-3xl font-bold text-black dark:text-white relative">
            Наша статистика за місяць
            <span className="absolute bottom-[-4] left-0 w-full h-[3px] bg-teal-300"></span>
          </h3>
          <span>
            <FcStatistics size={40} />
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-10 items-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow hover:shadow-lg transition cursor-pointer border-teal-400 border-3"
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: index * 0.3,
                type: "spring",
                stiffness: 100,
                damping: 25, // Плавніший перехід
                duration: 1.5, // Довший час анімації
              }}
            >
              <div className="text-4xl font-extrabold text-black mb-2">
                {stat.value}
              </div>
              <div className="text-gray-700 text-lg">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeStatisticSection;
