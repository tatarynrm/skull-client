import Link from "next/link";
import Image from "next/image";
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


export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
    const {id} = await params;
  const blog = blogPosts.find((item) => item.id === Number(id));

  if (!blog) return <p className="text-center mt-10 text-red-500">Стаття не знайдена</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="blog__photo mb-6 w-[300px] flex m-auto ">
        <Image
          src={blog.photo}
          alt="Зображення статті"
          width={100}
          height={100}
          className="rounded-xl object-cover w-full h-auto"
        />
      </div>

      <div className="blog__main">
        <h1 className="text-4xl font-bold text-teal-600 mb-4">{blog.title}</h1>
        <p className="text-lg text-gray-600 mb-6">{blog.description}</p>

        <div className="prose prose-teal dark:prose-invert">
          <p>
            Тут буде основний вміст статті... Це приклад того, як виглядатиме
            основна частина. Ви можете додати більше деталей про ваш проєкт,
            функціонал, новини чи апдейти.
          </p>
          <p>
            Наприклад, як працює новий алгоритм в SKULL DATE, або чому додано
            нову функцію пошуку за інтересами.
          </p>
        </div>

        <div className="mt-8">
          <Link href="/blog" className="text-teal-500 hover:text-teal-700">
            ← Повернутись до блогу
          </Link>
        </div>
      </div>
    </div>
  );
}
