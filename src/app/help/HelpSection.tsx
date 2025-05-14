"use client";

import ConfettiSuccess from "@/components/confetti/ConfettiSuccess";
import { ChangeEvent, FormEvent, useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";

type HelpIssue =
  | "Технічні проблеми"
  | "Проблеми з реєстрацією"
  | "Проблеми з оплатою"
  | "Інші питання";
const HelpSection = () => {
  const [selectedIssue, setSelectedIssue] =
    useState<HelpIssue>("Технічні проблеми");
  const [customIssue, setCustomIssue] = useState<string>("");
  const [telegramUsername, setTelegramUsername] = useState<string>("");
  const [successSending, setSuccessSending] = useState<boolean>(false);
  const issues: HelpIssue[] = [
    "Технічні проблеми",
    "Проблеми з реєстрацією",
    "Проблеми з оплатою",
    "Інші питання",
  ];

  const handleIssueChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setSelectedIssue(e.target.value as HelpIssue);
    if (e.target.value !== "Інші питання") {
      setCustomIssue("");
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!telegramUsername.trim()) {
      alert("Будь ласка, введіть ваш Telegram нікнейм.");
      return;
    }

    alert(
      `Вибрана проблема: ${selectedIssue}\nTelegram: @${telegramUsername}\nДеталі: ${
        customIssue || "Немає додаткової інформації"
      }`
    );
    setSuccessSending(true);
    setTimeout(() => {
      setSuccessSending(false);
    }, 10000);
  };
  return (
    <section className="bg-black dark:bg-white text-white py-10 rounded-xl w-full">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Form */}
        <div className="space-y-6">
          <h1 className="text-5xl font-extrabold tracking-tight leading-tight">
            <span className="block text-white dark:text-black">
              Сторінка допомоги
            </span>
            <span className="text-teal-300 text-2xl">
              Знайди рішення на свою проблему
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-md">
            Якщо у тебе виникла проблема або питання, вибери категорію або опиши
            свою проблему, і ми допоможемо вирішити її.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Issue Dropdown */}
            <div>
              <label htmlFor="issue" className="text-white text-lg">
                Оберіть проблему
              </label>
              <select
                id="issue"
                value={selectedIssue}
                onChange={handleIssueChange}
                className="w-full mt-2 bg-gray-800 text-white py-3 px-4 rounded-lg border border-gray-600"
              >
                {issues.map((issue, index) => (
                  <option key={index} value={issue}>
                    {issue}
                  </option>
                ))}
              </select>
            </div>

            {/* Telegram Username */}
            <div>
              <label htmlFor="telegramUsername" className="text-white text-lg">
                Ваш Telegram нікнейм
              </label>
              <input
                type="text"
                id="telegramUsername"
                value={telegramUsername}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setTelegramUsername(e.target.value)
                }
                className="w-full mt-2 bg-gray-800 text-white py-3 px-4 rounded-lg border border-gray-600"
                placeholder="@username"
              />
            </div>

            {/* Custom Issue */}
            {selectedIssue === "Інші питання" && (
              <div>
                <label htmlFor="customIssue" className="text-white text-lg">
                  Опишіть вашу проблему
                </label>
                <textarea
                  id="customIssue"
                  value={customIssue}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setCustomIssue(e.target.value)
                  }
                  rows={4}
                  className="w-full mt-2 bg-gray-800 text-white py-3 px-4 rounded-lg border border-gray-600 resize-none"
                  placeholder="Опишіть вашу проблему..."
                />
              </div>
            )}

            <div>
              <button
                type="submit"
                className="bg-white text-black px-6 py-3 font-semibold rounded-full shadow-lg hover:bg-gray-200 transition"
              >
                Відправити
              </button>
            </div>
          </form>
        </div>

        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-72 h-72 rounded-full border-4 border-white shadow-2xl">
            <FaExclamationCircle
              size={150}
              className="text-teal-300 mx-auto mt-12"
            />
          </div>
        </div>
      </div>
      {successSending && <ConfettiSuccess />}
    </section>
  );
};

export default HelpSection;
