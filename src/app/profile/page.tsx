"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";

import { useRouter } from "next/navigation";
import { fetchProfile, logout } from "@/lib/features/user/userSlice";
import api from "@/lib/axios";
import ProfileMainSettings from "./ProfileMainSettings";
import ProfileMyLikes from "./ProfileMyLikes";

// Вкладки
const tabs = [
  { value: "main", label: "Основна інформація 🧍" },
  { value: "mylikes", label: "Взаємні симпатії 💖" },
  { value: "photos", label: "Фото 🖼️" },
  { value: "settings", label: "Налаштування ⚙️" },

  { value: "logout", label: "Вийти 🚪" },
] as const;

type TabValue = (typeof tabs)[number]["value"];

const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const profile = useSelector((state: RootState) => state.user.profile);
  const [activeTab, setActiveTab] = useState<TabValue>("main");
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLogout = async () => {
    const response = await api.get("/auth/logout");
    console.log(response);

    if (response.status === 200) {
      dispatch(logout());
      setShowModal(false);
      localStorage.clear()

      router.push("/");
    }
  };

  useEffect(()=>{

  dispatch(fetchProfile(user?.tg_id));

  },[user?.tg_id])

  return (
    <div className="min-h-[600px] space-y-10">
      {/* Tabs */}
      <div className="flex gap-2 flex-wrap flex-col md:flex-row">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => {
              if (tab.value === "logout") {
                setShowModal(true);
              } else {
                setActiveTab(tab.value);
              }
            }}
            className={`${
              tab.value === "logout" && "bg-red-400"
            } cursor-pointer px-6 py-2 rounded-full transition font-semibold ${
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
        {activeTab === "main" && <ProfileMainSettings  />}
        {activeTab === "mylikes" && <ProfileMyLikes />}
        {activeTab === "settings" && (
          <div>
            <h2 className="text-xl font-bold mb-2">Налаштування</h2>
            <p>Налаштування облікового запису (можна реалізувати пізніше)</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-lg w-[90%] max-w-sm">
            <h3 className="text-lg font-bold mb-4 text-center">
              Вийти з профілю?
            </h3>
            <p className="text-center mb-6 text-sm text-gray-500 dark:text-gray-400">
              Ви дійсно хочете вийти зі свого облікового запису?
            </p>
            <div className="flex justify-between gap-4">
              <button
                className="px-4 py-2 rounded-md bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 transition w-full"
                onClick={() => setShowModal(false)}
              >
                Скасувати
              </button>
              <button
                className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition w-full"
                onClick={handleLogout}
              >
                Вийти
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
