import Image from "next/image";
import skull_image from '../../../../public/skull_hero.jpg'
import { MAIN_NAMES } from "@/constants/main";

import {  Send, Skull } from "lucide-react";
import Link from "next/link";

const HomeHeroSection = () => {
  return (
    <section className="bg-black dark:bg-white text-white py-10 rounded-xl">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center ">
        {/* Left Side */}
        <div className="space-y-6">
          <h1 className="text-5xl font-extrabold tracking-tight leading-tight">
            <span className="block text-white dark:text-black">{MAIN_NAMES.APP_NAME}</span>
            <span className="text-teal-300 text-2xl">Знайомства в новому форматі</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-md">
            Відкрий нові можливості спілкування з людьми, які на твоїй хвилі. Без шуму. Без кольорів. Лише справжні емоції.
          </p>
          <div className="flex gap-4 justify-between md:justify-start">
            <Link href={MAIN_NAMES.TG_APP_LINK} className="bg-teal-300 hover:bg-black hover:text-white cursor-pointer text-black flex gap-2 w-1/3 p-2 rounded-xl text-center items-center justify-center">
              Розпочати знайомство
              <Skull size={40}  />
            </Link>
            <Link href={MAIN_NAMES.TG_CHANNEL_LINK} className="border-teal-300 border-1 hover:bg-black hover:text-white cursor-pointer text-white hover:dark:text-white dark:text-black flex gap-2 w-1/3 p-2 rounded-xl text-center items-center justify-center">
              Наша група в Telegram
            <Send  size={40} className="text-teal-300"/>
            </Link>
          
          </div>
        </div>

        {/* Right Side */}
        <div className="flex justify-center">
          <div className="w-72 h-72 rounded-full overflow-hidden border-4 border-white shadow-2xl grayscale hover:grayscale-0 transition duration-500">
            <Image
              src={skull_image}
              alt="VIBE illustration"
              width={300}
              height={300}
              className="object-cover w-full h-full"
            />
          </div>
          
        </div>
   
      </div>

    </section>
  );
};

export default HomeHeroSection;
