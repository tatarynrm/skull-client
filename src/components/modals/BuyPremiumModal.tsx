'use client'

import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/lib/store'
import { ShieldCheck, Copy, Check } from 'lucide-react'
import { closePaymentModal } from '@/lib/features/modals/modalSlice'

const BuyPremiumModal = () => {
  const dispatch = useDispatch()
  const paymentModal = useSelector((state: RootState) => state.modals.paymentModal)
  const tarif = useSelector((state: RootState) => state.modals.plan)

  const [copied, setCopied] = useState(false)

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      console.error('Failed to copy', err)
    }
  }

  const handleClose = () => {
    dispatch(closePaymentModal())
  }

  return (
    <>
      {paymentModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-background rounded-2xl shadow-xl w-full max-w-xl p-6">
            <h2 className="text-2xl font-bold text-teal-500 flex items-center gap-2">
              <ShieldCheck className="text-teal-600" />
              Отримай преміум доступ!
            </h2>

            <p className="mt-4 text-gray-700 dark:text-white">
              Щоб активувати <strong>преміум-підписку</strong>, просто зроби оплату за реквізитами нижче та надішли підтвердження в наш Telegram.
            </p>

            <div className="mt-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-md text-sm space-y-2">
              <p>
                <strong>Сума:</strong> {tarif?.newPrice} грн
              </p>
              <div className="flex items-center justify-between">
                <p>
                  <strong>Mono Bank:</strong> 4441 1110 2149 7627
                </p>
                <button
                  onClick={() => handleCopy('4441111021497627')}
                  className="flex items-center gap-1 text-teal-500 hover:text-teal-700 text-sm"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" /> 
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" /> 
                    </>
                  )}
                </button>
              </div>
              <p>
                <strong>Отримувач:</strong> Роман Т.
              </p>
            </div>

            <p className="mt-4 text-gray-700 dark:text-white">
              Після оплати, надішли скрін або підтвердження транзакції у Telegram:
            </p>

            <div className="mt-4 flex gap-2">
              <a
                href="https://t.me/noris_developer"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600"
              >
                Надіслати підтвердження
              </a>
              <button
                onClick={handleClose}
                className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Закрити
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default BuyPremiumModal
