import { Metadata } from 'next';
import Link from 'next/link'

 const blogPosts = [
  {
    id: 1,
    title: "Що нового в SKULL DATE?",
    description: "Огляд останніх змін і функцій у боті знайомств.",
    photo: "/blog1.jpg",
  },
  {
    id: 2,
    title: "Як працює система лайків?",
    description: "Пояснюємо внутрішню кухню лайків, дизлайків і збігів.",
    photo: "/my_logo.png",
  },
];
export const metadata:Metadata = {
  title: 'SkullDate | Блог',
  description: 'SkullDate - Знайомства по новому.Блог',
  openGraph: {
    title: 'SkullDate | Блог',
    description: 'SkullDate - Знайомства по новому.Блог',
    url: 'https://noris-dev.site',
    siteName: 'SkullDate',
    images: [
      {
        url: 'https://nextjs.org/og.png', // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: 'https://nextjs.org/my_logo.png', // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: 'My custom alt',
      },
    ],

    locale: 'en_US',
    type: 'website',
  },
}
const Blog = () => {
  // Моки даних для блогу (тепер це буде інформація про функції бота)


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[800px]">
      <h1 className="text-3xl font-bold text-teal-600 mb-6">Блог SkullDateBot</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-teal-500">{post.title}</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">{post.description}</p>
            <Link href={`/blog/${post.id}`}>
              <span className="mt-4 text-teal-500 hover:underline">Читати... &rarr;</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Blog
