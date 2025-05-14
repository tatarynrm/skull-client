"use client";

import { useEffect } from "react";
import axios from "axios";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function TelegramButton() {
  const router = useRouter();
  useEffect(() => {
    (window as any).onTelegramAuth = (user: any) => {
      console.log("Telegram user:::::", user);

      api
        .post("/auth/telegram", { user })
        .then((response) => {
          console.log("Login with telegram", response);
          if (response.status === 200 && response.data?.user.id) {
          //   router.replace("/");
            localStorage.setItem('uts',response.data.token)
           setTimeout(()=>{
             window.location.replace("/");
           },1000)
          }
        })
        .catch((error) => {
          console.error("Login failed:", error);
        });
    };

    const container = document.getElementById("telegram-login-container");

    // 🛑 Вже існує — не вставляй знову
    if (container && !container.hasChildNodes()) {
      const script = document.createElement("script");
      script.src = "https://telegram.org/js/telegram-widget.js?22";
      script.setAttribute("data-telegram-login", "SkullDateBot");
      script.setAttribute("data-size", "large");
      script.setAttribute("data-radius", "10");
      script.setAttribute("data-request-access", "write");
      script.setAttribute("data-onauth", "onTelegramAuth(user)");
      script.setAttribute("data-lang", "uk"); // Set the language here
      script.async = true;
      container.appendChild(script);
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center text-center">
      <div id="telegram-login-container" className="mt-12" />
      <p className="text-sm text-gray-500 mt-4">
        Якщо ви вже авторизовувались але хочете увійти з іншого Telegram
        акаунта, спочатку відкрийте Telegram.
      </p>
      <div>
        <span className="flex mt-3">
          <span className="bg-teal-300 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-2">
            1
          </span>
          Знайдіть офіційний чат з Telegram.
        </span>

        <Image
          src="/telegra_success.jpg"
          alt="telegram_success"
          height={500}
          width={500}
          className="mt-3"
        />
        <span className="flex mt-3">
          <span className="bg-teal-300 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-2">
            2
          </span>
          Натисніть кнопку завершити сеанс.
        </span>
        <Image
          src="/telegram_exit.jpg"
          alt="telegram_success"
          height={500}
          width={500}
          className="mt-3 rounded-xl"
        />
      </div>
    </div>
  );
}
