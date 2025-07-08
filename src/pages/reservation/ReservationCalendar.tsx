import type { Dispatch, SetStateAction } from 'react'

interface Props {
  selectedDate: string | null
  setSelectedDate: Dispatch<SetStateAction<string | null>>
  selectedTime: string | null
  setSelectedTime: Dispatch<SetStateAction<string | null>>
  onNext: () => void
}

const dummyDateList = ['2025-04-28', '2025-04-29', '2025-04-30'] // 더미
const timeSlots = ['07:00', '07:30', '08:00', '08:30']

export default function ReservationCalendar({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  onNext,
}: Props) {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="bg-primary text-white text-sm font-bold px-6 py-3 rounded-lg shadow-md w-full text-center">
        분리수거를 예약하시겠어요?
      </div>

      {/* 날짜 선택 */}
      <div className="w-full flex justify-center gap-2">
        {dummyDateList.map((date) => (
          <button
            key={date}
            onClick={() => setSelectedDate(date)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold ${
              selectedDate === date
                ? 'bg-primary text-white shadow-md'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {new Date(date).getDate()}일
          </button>
        ))}
      </div>

      {/* 시간 선택 */}
      <div className="w-full flex justify-center flex-wrap gap-2">
        {timeSlots.map((time) => (
          <button
            key={time}
            onClick={() => setSelectedTime(time)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedTime === time
                ? 'bg-primary text-white shadow-sm'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {time}
          </button>
        ))}
      </div>

      <button
        className="mt-6 bg-primary text-white py-2 px-6 rounded-lg shadow-md disabled:opacity-40"
        onClick={onNext}
        disabled={!selectedDate || !selectedTime}
      >
        네, 예약할게요
      </button>
    </div>
  )
}
