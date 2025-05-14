'use client'
import { CircleDollarSign } from "lucide-react"
import React from "react"
import tik_tok_logo from "../../../public/tik_tok_logo.png"
import Image from "next/image"
import { Button } from "../ui/button"
import { openTikTokModal } from "@/lib/features/modals/modalSlice"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/lib/store"

const TikTokPremiumBanner = () => {
   const dispatch = useDispatch<AppDispatch>()
  return (
    <div className="banner_tik_tok flex flex-col md:flex-row items-center justify-between gap-4 mt-2 mb-5 bg-slate-200 rounded-2xl p-4 text-center">
      <div className="flex flex-col md:flex-row items-center gap-2">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-teal-500 to-teal-700 shadow-lg">
          Отримайте безкоштовний Premium на 1 міс
        </h3>
        <CircleDollarSign className="w-6 h-6 md:w-8 md:h-8 text-teal-700" />
      </div>
      <Button className="bg-pink-600 hover:bg-pink-900 cursor-pointer text-white"
      onClick={()=>{
        dispatch(openTikTokModal())
      }}
      >
          Цікаво 😲
        </Button>
      <div className="flex flex-col md:flex-row items-center gap-4">
    
        <Image
          src={tik_tok_logo}
          width={100}
          height={100}
          alt="tik_tok_logo"
          
        />
      </div>
    </div>
  )
}

export default TikTokPremiumBanner
