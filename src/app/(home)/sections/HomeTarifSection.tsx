"use client";

import React, { useState } from "react";
import {
  BadgeCheck,
  RotateCcw,
  ThumbsUp,
  ShieldCheck,
  Users,
  Link2,
  Sparkles,
  Crown,
} from "lucide-react";
import { motion } from "framer-motion";
import { MAIN_NAMES } from "@/constants/main";
import { openPaymentModal, setPlan } from "@/lib/features/modals/modalSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";

const plans = [
  {
    duration: "1 Місяць",
    oldPrice: 150,
    newPrice: 100,
  },
  {
    duration: "6 Місяців",
    oldPrice: 900,
    newPrice: 400,
  },
  {
    duration: "1 Рік",
    oldPrice: 1800,
    newPrice: 1000,
  },
];

const features = [
  { icon: <ThumbsUp size={18} />, text: "Безлімітна кількість лайків" },
  {
    icon: <Sparkles size={18} />,
    text: "✦ Унікальний символ в анкеті (можна приховати)",
  },
  { icon: <ShieldCheck size={18} />, text: "Відсутність реклами" },
  { icon: <Users size={18} />, text: "Чорний список: з 30 до 200 місць" },
  { icon: <ThumbsUp size={18} />, text: "Архів лайків: з 25 до 50" },
  { icon: <RotateCcw size={18} />, text: "↻ Повернення до попередньої анкети" },
  {
    icon: <BadgeCheck size={18} />,
    text: "Профіль показується на 25% частіше",
  },
  {
    icon: <Link2 size={18} />,
    text: "Посилання на TikTok, Instagram, YouTube в повідомленнях",
  },
];

const HomeTarifSection = () => {
 
  const dispatch = useDispatch<AppDispatch>();

  return (
    <section className="py-20 bg-white dark:bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-black dark:text-white">
          Преміум підписка {MAIN_NAMES.APP_NAME}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className="relative bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:scale-[1.02] transition-transform cursor-context-menu"
            >
              {/* Корона */}
              {plan.newPrice === 400 && (
                <div className="absolute -top-6 -right-1 transform rotate-[30deg] text-teal-300">
                  <Crown className="w-12 h-12" />
                </div>
              )}

              <div>
                <h3 className="text-xl font-semibold text-center mb-2 text-black dark:text-white">
                  {plan.duration}
                </h3>
                <div className="text-center mb-4">
                  <span className="text-2xl font-bold text-primary">
                    {plan.newPrice}₴
                  </span>
                  <span className="text-sm line-through text-gray-500 ml-2">
                    {plan.oldPrice}₴
                  </span>
                </div>
                <ul className="space-y-3 mt-4">
                  {features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start text-gray-700 dark:text-gray-300"
                    >
                      <span className="mt-1 mr-2 text-teal-300">
                        {feature.icon}
                      </span>
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 text-center relative">
                <button
                  onClick={() => {
                    dispatch(setPlan(plan))
                    dispatch(openPaymentModal());
                  }}
                  className="bg-primary text-white dark:text-black font-semibold py-2 px-6 rounded-lg hover:bg-opacity-90 transition cursor-pointer"
                >
                  Купити
                </button>


              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeTarifSection;
