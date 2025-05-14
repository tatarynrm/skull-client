'use client'
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@/lib/store"
import { closeIdeasModal } from "@/lib/features/modals/modalSlice"


const IdeasModal = () => {
  const dispatch = useDispatch()
  const ideasModal = useSelector((state: RootState) => state.modals.ideasModal)

  const [telegramHandle, setTelegramHandle] = useState("")
  const [ideaText, setIdeaText] = useState("")
  const [error, setError] = useState("")
  const [isAgreed, setIsAgreed] = useState(false) // Додаємо стейт для чекбоксу

  const handleClose = () => {
    dispatch(closeIdeasModal())
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!telegramHandle.startsWith('@')) {
      setError("Нік в Telegram повинен починатися з @")
      return
    }

    if (!ideaText.trim()) {
      setError("Будь ласка, введіть вашу ідею")
      return
    }

    if (!isAgreed) {
      setError("Будь ласка, погодьтесь на публікацію вашої ідеї.")
      return
    }

    // Тут може бути логіка надсилання, наприклад до бекенду або бота
    console.log("Нік:", telegramHandle)
    console.log("Ідея:", ideaText)

    setError("")
    alert("Дякуємо за вашу ідею! ❤️")
    setTelegramHandle('')
    setIdeaText('')
    setIsAgreed(false)
    handleClose()
  }

  return (
    <>
      {ideasModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-background rounded-lg shadow-lg w-full max-w-lg p-6">
            <h2 className="text-2xl font-bold text-teal-500 mb-4">Поділись своєю ідеєю для SkullDateBot 💡</h2>

            <form onSubmit={handleSubmit}>
              <label className="block text-gray-700 dark:text-white mb-2">
                Твій Telegram нік (починай з @):
              </label>
              <input
                type="text"
                value={telegramHandle}
                onChange={(e) => setTelegramHandle(e.target.value)}
                className="w-full border rounded-md px-3 py-2 mb-4 dark:bg-gray-800 dark:text-white"
                placeholder="@yournickname"
              />

              <label className="block text-gray-700 dark:text-white mb-2">
                Твоя ідея:
              </label>
              <textarea
                value={ideaText}
                onChange={(e) => setIdeaText(e.target.value)}
            
                className="w-full h-32 border rounded-md px-3 py-2 dark:bg-gray-800 dark:text-white resize-none"
                placeholder="Опиши, яку нову функцію ти хотів(-ла) б бачити в SkullDateBot..."
              />

              {/* Чекбокс для згоди */}
              <div className="mt-4 flex items-center">
                <input
                  type="checkbox"
                  checked={isAgreed}
                  onChange={() => setIsAgreed(!isAgreed)}
                  className="mr-2"
                />
                <label onClick={() => setIsAgreed(!isAgreed)} className="text-sm text-gray-700 dark:text-white">
                  Я погоджуюсь, щоб моя ідея та нік <br /> були опубліковані на сайті,-якщо це ТОП
                </label>
              </div>


              {error && <p className="text-red-500 mt-2">{error}</p>}

              <div className="mt-6 flex md:justify-between flex-col gap-2 md:flex-row ">
                <button
                  type="button"
                  onClick={handleClose}
                 className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                  Закрити 🙅
                </button>
                <button
                  type="submit"
                  className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600"
                >
                  Надіслати мою круту ідею 🔥
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default IdeasModal
