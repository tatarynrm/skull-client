"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import logo from "../../../public/my_logo.png";
import ThemeToggleButton from "../buttons/dark-mode/ThemeToggleButton";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa"; // Для бургер-меню
import burger_photo from "../../../public/burger_photo.jpg";
import {
  BadgeHelp,
  ChartNoAxesCombined,
  Fan,
  MessageCircle,
  ShieldUser,
  Siren,
  Wallpaper,
} from "lucide-react";
import api from "@/lib/axios";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchUser } from "@/lib/features/user/userSlice";

export interface TgUserState {
  tg_id: string;
  first_name: string;
  username: string;
  language_code: string;
  photo_url: string;
}

// Початкове значення стейту
const initialTgUserState: TgUserState = {
  tg_id: "",
  first_name: "",
  username: "",
  language_code: "",
  photo_url: "",
};
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isLoaded } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch<AppDispatch>();
  // Встановлюємо/прибираємо клас body для заборони скролу
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"; // Забороняємо скрол
    } else {
      document.body.style.overflow = "auto"; // Відновлюємо скрол
    }

    return () => {
      document.body.style.overflow = "auto"; // Відновлюємо скрол при розмонтуванні компонента
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

 

  return (
    <header className="header container m-auto border-b-2 border-teal-300">
      <div className="header__wrapper flex items-center justify-between py-4 px-3 h-[80px]">
        {/* Логотип */}
        <div className="header__logo">
          <Link href="/">
            <Image width={80} height={80} src={logo} alt="logo" />
          </Link>
        </div>

        {/* Основне меню та кнопка темної теми */}
        <div className="header__menu flex items-center space-x-6">
          {/* Меню для планшетної та мобільної версії */}
          <div className="hidden lg:flex space-x-6">
            <Link
              href="/"
              className="dark:text-white text-black flex gap-1 font-bold"
            >
              Головна <Fan className="text-teal-300" />{" "}
            </Link>
            <Link
              href="/chat"
              className="dark:text-white text-black flex gap-1 font-bold"
            >
              Чат <MessageCircle className="text-teal-300" />{" "}
            </Link>
            <Link
              href="/blog"
              className="dark:text-white text-black flex gap-1 font-bold"
            >
              Блог <Wallpaper className="text-teal-300" />{" "}
            </Link>
            <Link
              href="/statistic"
              className="dark:text-white text-black flex gap-1 font-bold"
            >
              Статистика <ChartNoAxesCombined className="text-teal-300" />{" "}
            </Link>
            <Link
              href="/help"
              className="dark:text-white text-black flex gap-1 font-bold"
            >
              Допомога <BadgeHelp className="text-teal-300" />
            </Link>
            <Link
              href="/terms"
              className="dark:text-white text-black flex gap-1 font-bold"
            >
              Наша політика <Siren className="text-teal-300" />
            </Link>
            {!isLoaded ? null : user?.username ? (
              <Link
                href="/profile"
                className="dark:text-white text-black flex gap-1 font-bold"
              >
                Профіль <ShieldUser  className="text-teal-300"/>
                <Avatar>
                  <AvatarImage src={user.photo_url} alt="user_url" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
            ) : (
              <Link
                href="/login"
                className="dark:text-white text-black flex gap-1 font-bold"
              >
                Увійти <ShieldUser className="text-teal-300" />
              </Link>
            )}
          </div>
          {/* Кнопка для перемикання теми */}
          <ThemeToggleButton />

          {/* Бургер-меню для мобільної та планшетної версії */}
          <div className="lg:hidden flex items-center">
            <button onClick={toggleMenu} className=" text-teal-300">
              {isMenuOpen ? (
                <FaTimes
                  size={30}
                  className="transition-transform transform rotate-90"
                />
              ) : (
                <FaBars
                  size={30}
                  className="transition-transform transform rotate-0"
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Мобільне меню */}
      <div
        className={`lg:hidden ${
          isMenuOpen ? "block" : "hidden"
        } bg-black bg-opacity-80 fixed top-0 left-0 w-full h-screen z-99999999999 p-6 overflow-y-auto`}
        onClick={toggleMenu}
      >
        <div className="flex justify-end">
          <button onClick={toggleMenu} className="text-white">
            <FaTimes size={30} />
          </button>
        </div>
        <nav className="flex justify-center items-center">
          <ul className="text-white text-lg text-center gap-10 flex flex-col ">
            <li className="">
              <Link href="/" className="block py-2 px-4 text-teal-300 text-2xl">
                Головна
              </Link>
            </li>
            <li className="">
              <Link
                href="/chat"
                className="block py-2 px-4 text-teal-300 text-2xl"
              >
                Чат
              </Link>
            </li>
            <li className="">
              <Link
                href="/blog"
                className="block py-2 px-4 text-teal-300 text-2xl"
              >
                Блог
              </Link>
            </li>
            <li className="">
              <Link
                href="/statistic"
                className="block py-2 px-4 text-teal-300 text-2xl"
              >
                Статистика
              </Link>
            </li>

            <li className="">
              <Link
                href="/help"
                className="block py-2 px-4 text-teal-300 text-2xl"
              >
                Допомога
              </Link>
            </li>
            <li className="">
              <Link
                href="/terms"
                className="block py-2 px-4 text-teal-300 text-2xl"
              >
                Наша політика
              </Link>
            </li>
            {user?.tg_id ? null : (
              <li className="">
                <Link
                  href="/login"
                  className="block py-2 px-4 text-teal-300 text-2xl"
                >
                  Увійти
                </Link>
              </li>
            )}
          </ul>
        </nav>

        <div className="mt-10 w-42 h-42 rounded-full overflow-hidden border-4 border-white shadow-2xl  hover:grayscale-0 transition duration-500 m-auto">
          <Link href={user?.photo_url ? "/profile" : "/"}>
            <Image
              src={user?.photo_url ? user?.photo_url : burger_photo}
              // src={'https://api.telegram.org/file/bot8164744294:AAG7qYJbM4y_r4QHCVZjAaSJhvvnW7D1MXM/photos/file_0.jpg'}
              alt="SKULL DATE PROMO"
              width={300}
              height={300}
              className="object-cover w-full h-full"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
