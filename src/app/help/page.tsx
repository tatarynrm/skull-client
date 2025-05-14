"use client";
import { useState } from "react";
import HelpSection from "./HelpSection";
import HelpTakeBonus from "./HelpTakeBonus";

import HelpFaqSection from "./HelpFaqSection";

const tabs = [
  { value: "help", label: "Основна 🏠" },
  { value: "bonus", label: "Отримати бонус 🎁" },
  { value: "faq", label: "Часті питання 🤔" },
] as const;

type TabValue = typeof tabs[number]["value"];

const Help: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabValue>("help");

  return (
    <div className="space-y-10">
      {/* Custom Tabs */}
      <div className="flex gap-2 flex-wrap flex-col  md:flex-row">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`cursor-pointer px-6 py-2 rounded-full transition  font-semibold ${
              activeTab === tab.value
                ? "bg-teal-500 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="w-full">
        {activeTab === "help" && <HelpSection />}
        {activeTab === "bonus" && <HelpTakeBonus />}
        {activeTab === "faq" && <HelpFaqSection />}
      </div>
   
    </div>
  );
};

export default Help;
