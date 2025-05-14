"use client";

import { Bone } from "lucide-react";
import { useState } from "react";
import { PiSkullLight } from "react-icons/pi";

const faqItems = [
  {
    question: "Чому бот називається SKULL DATE?",
    answer:
      "Бо справжнє кохання — це не лише метелики в животі, а ще й трохи 'кістяного' шарму. SKULL DATE 💀 — для тих, хто не боїться глибини (і темряви).",
  },
  {
    question: "Як змінити інформацію про себе?",
    answer:
      "Просто напиши команду /profile → Обери [🛠 Налаштування] → Далі все інтуїтивно — ми ж не Windows 98.",
  },
  {
    question: "Мене не лайкають. Що робити?",
    answer:
      "Зміни фото, додай щось смішне в опис і не пиши 'питайте — розкажу'. Це не LinkedIn.",
  },
  {
    question: "Чи можна сховатися від інших?",
    answer:
      "Так, в /profile → [🛠 Налаштування] → [👻 Привид режим]. Ти стаєш невидимим... майже як ніндзя.",
  },
  {
    question: "Хтось був токсичний. Як його заблокувати?",
    answer:
      "У розділі '🗄 Хто мене лайкнув' натисни на ⚠️ або напиши /report. Ми розберемось швидко і без слідів.",
  },
  {
    question: "Мені сподобалась анкета, але я дізлайкнув випадково!",
    answer:
      "Для преміумів є кнопка повернення ↩️. Якщо ні — чекати ~48 годин, поки Доля (і наш алгоритм) не дасть тобі другий шанс.",
  },
  {
    question: "Чи можна знайти когось в іншій країні?",
    answer:
      "Так. Просто вкажи інше місто (наприклад, Берлін). Якщо хтось теж вказав його — зустрінетесь на цифровій арені кохання.",
  },
  {
    question: "Навіщо мені преміум ✦?",
    answer:
      "Безлімітні лайки, перегляд гостей, привид режим і повернення анкет. Плюс почуття переваги, звісно ж.",
  },
  {
    question: "Чому не нарахувались бонусні лайки?",
    answer:
      "Після підписки на канал натисни кнопку «Отримати 💖». Магія не відбувається сама — потрібна дія.",
  },
  {
    question: "Що, якщо всі з мого міста вже переглянуті?",
    answer:
      "Наш алгоритм не дає сумувати: після твого міста — регіон, потім країна, а далі... хто знає? Можливо, навіть Марс 🌌.",
  },
];

const HelpFaqSection: React.FC = () => {
  return (
    <section className="bg-neutral-950 dark:bg-white text-white py-12 rounded-xl">
      <div className="container mx-auto px-6 space-y-10">
        <div className="text-center space-y-4 flex flex-col justify-center items-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white dark:text-black flex gap-10 items-center text-center">
            FAQ: Часті питання від душі <Bone size={40} className="text-teal-300" />
          </h1>
          <p className="text-gray-400 dark:text-gray-600 text-lg">
            Зібрали відповіді на найчастіші факапи, неловкості й прості "що робити?".
          </p>
        </div>

        <div className="grid gap-6">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="border border-teal-300 bg-white dark:bg-white dark:text-black p-6 rounded-2xl shadow-md transition hover:scale-[1.01]"
            >
              <div className="flex items-start gap-3 mb-2">
                <PiSkullLight className="text-teal-400 mt-1" size={22} />
                <h2 className="text-lg md:text-xl font-semibold text-black">{item.question}</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-800 text-base whitespace-pre-line">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HelpFaqSection;
