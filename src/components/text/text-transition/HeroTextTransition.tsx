'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TEXTS = [
  { text: 'Vibe with real people', color: 'text-teal-300' },
  { text: 'Interact genuinely', color: 'text-blue-500' },
  { text: 'Build true connections', color: 'text-emerald-500' },
  { text: 'Explore emotions freely', color: 'text-purple-500' },
]

export const HeroTextTransition = () => {
  const [index, setIndex] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % TEXTS.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-20 overflow-hidden relative flex justify-center text-center">
      <AnimatePresence mode="wait">
        <motion.h2
          key={TEXTS[index].text}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className={`text-4xl font-bold absolute  ${TEXTS[index].color}`}
        >
          {TEXTS[index].text}
        </motion.h2>
      </AnimatePresence>
    </div>
  )
}
