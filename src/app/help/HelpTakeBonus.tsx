import { MAIN_NAMES } from '@/constants/main'
import React from 'react'
import { FaGift } from 'react-icons/fa'

const HelpTakeBonus = () => {
  return (
   <section className="bg-black dark:bg-white text-black dark:text-white py-12 px-6 rounded-xl shadow-lg">
        <div className="container mx-auto text-center space-y-6 max-w-3xl">
          <div className="flex justify-center">
            <FaGift size={80} className="text-teal-300" />
          </div>
          <h2 className="text-4xl font-bold text-white dark:text-black">🎁 Отримай бонус!</h2>
          <p className="text-lg text-white dark:text-gray-600">
            Запроси друга або поділись нашим ботом у соцмережах — та отримай <strong>бонусний преміум</strong> або подарунок!
          </p>
          <a
            href={MAIN_NAMES.TG_SUPPORT_LINK}
            target="_blank"
            className="inline-block bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-full font-semibold transition"
          >
            Отримати 😋
          </a>
        </div>
      </section>
  )
}

export default HelpTakeBonus