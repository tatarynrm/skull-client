
import {
  ShieldCheck,
  Ban,
  UserX,
  Users,
  Lock,
  AlertCircle,
  Gavel,
  Star,
  Info,
  RefreshCcw
} from 'lucide-react';
import { MAIN_NAMES } from '@/constants/main';

const rules = [
  {
    icon: ShieldCheck,
    title: '1. Повноліття',
    description: 'Ви маєте бути старше 18 років, щоб користуватись ботом.',
  },
  {
    icon: Ban,
    title: '2. Заборонений контент',
    description: 'Заборонено публікувати чи обмінюватися порнографічними, жорстокими, образливими, дискримінаційними чи іншими матеріалами, що порушують закон.',
  },
  {
    icon: UserX,
    title: '3. Поведінка',
    description: 'Заборонено надсилати спам, рекламні повідомлення або навмисно ображати інших користувачів. Поводьтеся з повагою.',
  },
  {
    icon: Users,
    title: '4. Акаунти',
    description: 'Користувач не повинен створювати кілька акаунтів для обходу блокувань або зловживання функціоналом бота.',
  },
  {
    icon: Lock,
    title: '5. Безпека',
    description: 'Не передавайте особисту інформацію (номер телефону, адресу, банківські дані) незнайомцям. Адміністрація не несе відповідальності за шкоду, завдану внаслідок таких дій.',
  },
  {
    icon: AlertCircle,
    title: '6. Повідомлення про порушення',
    description: 'Якщо ви помітили порушення правил — повідомте нас через кнопку “Поскаржитись” у профілі користувача.',
  },
  {
    icon: Gavel,
    title: '7. Модерація',
    description: 'Адміністрація має право обмежити або заблокувати доступ до бота без попередження у разі порушення правил.',
  },
  {
    icon: Star,
    title: '8. Premium',
    description: 'Покупка Premium є добровільною. Кошти не повертаються. Premium надає розширені функції, але не гарантує знайомства.',
  },
  {
    icon: Info,
    title: '9. Відповідальність',
    description: 'Користувач самостійно несе відповідальність за свою поведінку та спілкування. Адміністрація не несе відповідальності за дії інших користувачів.',
  },
  {
    icon: RefreshCcw,
    title: '10. Зміни правил',
    description: 'Правила можуть бути змінені без попередження. Актуальна версія завжди доступна на цій сторінці.',
  },
];
export const metadata = {
  title: `Правила користування | ${MAIN_NAMES.APP_NAME}`,
  description: `Welcome to ${MAIN_NAMES.APP_NAME} – знайомства у новому форматі!`,
};
export default function TermsPage() {
  return (
 


      <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800 dark:text-gray-100">
        <h1 className="text-4xl font-bold mb-10 text-center text-teal-300">Правила користування VIBE</h1>

        <p className="text-center mb-12 text-base sm:text-lg  font-bold text-red-400">
          Користуючись VIBE, ви погоджуєтеся з цими правилами та несете відповідальність <br /> за свою поведінку в межах бота.
        </p>

        <div className="space-y-8">
          {rules.map(({ icon: Icon, title, description }, index) => (
            <div
              key={index}
              className="border border-teal-300/30 bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-md dark:shadow-none transition-all hover:shadow-lg cursor-context-menu"
            >
              <div className="flex items-start gap-4">
                <Icon className="w-6 h-6 text-teal-300 shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-semibold mb-1">{title}</h2>
                  <p className="text-gray-700 dark:text-gray-300">{description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-12 text-sm italic text-center text-gray-500 dark:text-gray-400">
          Дата останнього оновлення: 11 травня 2025 року
        </p>
      </div>

  );
}
