'use client'
import { useEffect } from "react"
import Link from "next/link"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@/lib/store"
import { openTikTokModal, closeTikTokModal } from "@/lib/features/modals/modalSlice"
import { Crown } from "lucide-react"
import { MAIN_NAMES } from "@/constants/main"

const PromoModal = () => {
  const dispatch = useDispatch()
  const tikTokModal = useSelector((state: RootState) => state.modals.tikTokModal)

  useEffect(() => {
    const visited = localStorage.getItem("visited")
    if (!visited) {
      localStorage.setItem("visited", "true")
      const timer = setTimeout(() => {
        dispatch(openTikTokModal())
      }, 10000)
      return () => clearTimeout(timer)
    }
  }, [dispatch])

  const handleClose = () => {
    dispatch(closeTikTokModal())
  }

  return (
    <>
      {tikTokModal && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-background rounded-lg shadow-lg w-full max-w-lg p-6">
            <h2 className="text-2xl font-bold text-teal-500 flex">Отримай преміум на 1 місяць безкоштовно! </h2>
         <div className="flex justify-center"> <Crown className="text-teal-900 animate-bounce"/></div>
            <p className="mt-4 text-gray-700 dark:text-white">
              Якщо ти поділишся нашим ботом <strong>{MAIN_NAMES.APP_NAME}</strong> у TikTok, отримаєш преміум-аккаунт на 1 місяць абсолютно безкоштовно!
            </p>
            <div className="mt-4 text-gray-700">
              <h3 className="font-semibold dark:text-white">Правила участі:</h3>
              <ul className="list-disc pl-5 mt-2 dark:text-white">
                <li>Відео повинно тривати більше 20 секунд.</li>
                <li>Відео повинно мати більше 300 переглядів.</li>
                <li>Додайте хештег <strong>#{MAIN_NAMES.TG_APP_NAME.slice(1)}</strong> у опис відео.</li>
                <li>Надішліть посилання <Link onClick={handleClose} className="text-teal-300" href={'/help'}>#ТУТЯ...</Link></li>
              </ul>
            </div>
            <div className="mt-6 flex justify-between">
              <button
                onClick={handleClose}
                className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Закрити 🙅
              </button>
              <a
                href="https://www.tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600"
              >
                Поділитися в TikTok
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PromoModal
