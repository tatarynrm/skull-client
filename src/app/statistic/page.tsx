'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

// Define the types for the data
interface DataDaily {
  name: string
  users: number
}

interface DataLikesDaily {
  name: string
  likes: number
}

interface DataMonthly {
  name: string
  value: number
}

const dataDaily: DataDaily[] = [
  { name: "Пн", users: 120 },
  { name: "Вт", users: 180 },
  { name: "Ср", users: 150 },
  { name: "Чт", users: 200 },
  { name: "Пт", users: 170 },
  { name: "Сб", users: 220 },
  { name: "Нд", users: 90 },
]

const dataLikesDaily: DataLikesDaily[] = [
  { name: "Пн", likes: 50 },
  { name: "Вт", likes: 70 },
  { name: "Ср", likes: 65 },
  { name: "Чт", likes: 85 },
  { name: "Пт", likes: 95 },
  { name: "Сб", likes: 110 },
  { name: "Нд", likes: 40 },
]

const dataMonthly: DataMonthly[] = [
  { name: "Січень", value: 400 },
  { name: "Лютий", value: 320 },
  { name: "Березень", value: 500 },
  { name: "Квітень", value: 610 },
  { name: "Травень", value: 420 },
  { name: "Червень", value: 300 },
]

const COLORS = ["#14b8a6", "#0f766e", "#2dd4bf", "#5eead4", "#99f6e4", "#ccfbf1"]

// Define the proper type for the Tooltip props
interface CustomTooltipProps {
  active?: boolean
  payload?: { value: number }[] | null
  label?: string | number
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 rounded shadow-sm text-sm">
        <p className="font-medium text-black">{label}</p>
        <p className="text-black">Користувачі: {payload[0].value}</p>
      </div>
    )
  }

  return null
}

export default function StatsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center text-teal-500">Статистика користувачів</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Бар-чарт за тиждень - Користувачі */}
        <Card>
          <CardHeader>
            <CardTitle>Користувачі за останній тиждень</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataDaily}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} />
                <YAxis stroke="#888888" fontSize={12} />
                {/* Pass the CustomTooltip component to Tooltip */}
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="users" fill="#14b8a6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Пай-чарт за місяці */}
        <Card>
          <CardHeader>
            <CardTitle>Розподіл нових користувачів по місяцях</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataMonthly}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#14b8a6"
                  label
                >
                  {dataMonthly.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Бар-чарт за тиждень - Лайки */}
        <Card>
          <CardHeader>
            <CardTitle>Взаємних лайків за останній тиждень</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataLikesDaily}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} />
                <YAxis stroke="#888888" fontSize={12} />
                {/* Pass the CustomTooltip component to Tooltip */}
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="likes" fill="#14b8a6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
