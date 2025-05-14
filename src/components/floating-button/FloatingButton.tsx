"use client";
import { openIdeasModal } from "@/lib/features/modals/modalSlice";
import { AppDispatch, RootState } from "@/lib/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const FloatingButton = () => {

  const dispatch = useDispatch<AppDispatch>();
  return (
    <div
      onClick={() => {
        dispatch(openIdeasModal());
      }}
      className="fixed z-[999999] bottom-10 right-10 cursor-pointer"
    >
      <span className="w-10 h-10 md:w-14 md:h-14 text-2xl font-bold bg-teal-300 text-teal-500 rounded-full flex items-center justify-center shadow-lg hover:bg-teal-400 transition-all">
        💡
      </span>
    </div>
  );
};

export default FloatingButton;
