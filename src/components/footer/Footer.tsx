import Image from "next/image";
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub, FaTelegram } from "react-icons/fa";
import logo from "../../../public/my_logo.png";
import { MAIN_NAMES } from "@/constants/main";
import Link from "next/link";
const HomeFooter = () => {
  return (
    <footer className="bg-black dark:bg-white text-white py-10 mt-20 ">
      <div className="container  mx-auto m-auto px-6 grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2  gap-10 items-center">
        {/* Left Side */}
        <div className="space-y-4 w-full    ">
          <Link href={"/"}>
            <div className="logo__group cursor-pointer">
              <Image src={logo} alt="footer__logo" width={60} height={60} />
              <h2 className="text-3xl font-extrabold tracking-tight leading-tight text-teal-300">
                {MAIN_NAMES.APP_NAME}
              </h2>
            </div>
          </Link>
          <p className="text-gray-400 text-lg max-w-xs">
            Створи нові емоції, знаходь однодумців та розвивай своє соціальне
            коло без зайвих турбот.
          </p>
        </div>

        {/* Middle Section (Links) */}
        <div className="space-y-4 m-auto">
          <h3 className="text-xl font-semibold text-white ">
            Корисні посилання
          </h3>
          <ul className="space-y-2 text-white font-bold dark:text-black">
            <li>
              <Link href="/" className="hover:text-teal-300">
                Головна
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-teal-300">
                Блог
              </Link>
            </li>
            <li>
              <Link href="/statistic" className="hover:text-teal-300">
                Статистика
              </Link>
            </li>
            <li>
              <Link href="/help" className="hover:text-teal-300">
                Допомога
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-teal-300">
                Наша політика
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Side (Social Media) */}
        <div className="space-y-4 m-auto">
          <h3 className="text-xl font-semibold text-white dark:text-black">Слідуй за нами</h3>
          <div className="flex space-x-6 text-gray-400">
            <a target="__blank" href={MAIN_NAMES.TG_CHANNEL_LINK} className="hover:text-teal-300">
              <FaTelegram size={24} />
            </a>
 
            <a href="#" className="hover:text-teal-300">
              <FaInstagram size={24} />
            </a>
     
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-10 border-t border-gray-700 pt-6">
        <div className="container mx-auto text-center text-gray-400">
          <p>&copy; 2025 {MAIN_NAMES.APP_NAME}. Всі права захищені.</p>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
