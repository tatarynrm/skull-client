import { MAIN_NAMES } from '@/constants/main'
import React from 'react'

const benefits = [
  {
    title: 'AI-підбір людей за емоційним вайбом 🤖',
    description: 'Ми не просто зводимо профілі — ми шукаємо схожі хвилі.',
  },
  {
    title: 'Моменти: історії дня для знайомств 🎥',
    description: 'Поділись моментом і отримай фідбек від людей, яким ти цікавий.',
  },
  {
    title: 'Vibe-режим — тільки ваш вайб вирішує 🎧',
    description: 'Пошук без фото, тільки за інтересами та відчуттями.',
  },
  {
    title: 'Події поруч — зустрічі у твоєму місті 📍',
    description: 'Афіша подій з можливістю піти туди з кимось новим.',
  },
  {
    title: 'Голосові знайомства — скажи «Привіт» 🎙️',
    description: 'Обмін голосовими в режимі speed dating.',
  },
  {
    title: 'Режим «Slow Match» — один матч на день 🕰️',
    description: 'Менше свайпів, більше змісту. Один, але ретельно підібраний контакт.',
  },
  {
    title: 'Анонімні лайки — дізнайся, хто проявив інтерес 🫣',
    description: 'Побачив симпатію? Відкрий — коли будеш готовий.',
  },
]

const HomeBenefitsSection = () => {
  return (
    <section className="py-16 bg-white dark:bg-background">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold text-center mb-10 text-black dark:text-white">
          Чому обирають саме <span className="text-primary">{MAIN_NAMES.APP_NAME}</span> ?
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto bg-background">
          {benefits.map((benefit, index) => (
            <li key={index} className="p-6  border-teal-400 border-3 rounded-2xl shadow-sm hover:shadow-md transition bg-background dark:bg-white">
              <h4 className="text-xl font-semibold text-black dark:text-black mb-2">{benefit.title}</h4>
              <p className="text-gray-600 dark:text-gray-400">{benefit.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default HomeBenefitsSection
