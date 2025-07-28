import type { Dispatch, SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdArrowBack } from 'react-icons/md'

interface Props {
  selectedDate: string | null
  setSelectedDate: Dispatch<SetStateAction<string | null>>
  selectedTime: string | null
  setSelectedTime: Dispatch<SetStateAction<string | null>>
  onNext: () => void
}

const dummyDateList = ['2025-09-28', '2025-09-29', '2025-09-30'] // 더미
const timeSlots = ['07:00', '07:30', '08:00', '08:30']

export default function ReservationCalendar({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  onNext,
}: Props) {
  const navigate = useNavigate()

  return (
    <main className="flex flex-col items-center pt-10 mt-10 px-4 text-primary gap-6">
      {/* 뒤로가기 버튼 */}
      <button onClick={() => navigate(-1)} className="absolute left-6">
        <MdArrowBack size={24} />
      </button>

      {/* 안내 헤더 */}
      <div className="bg-primary text-white text-sm font-bold px-6 py-3 rounded-lg shadow-md w-3/4 text-center mt-10">
        분리수거를 예약하시겠어요?
      </div>

      {/* 날짜 선택 */}
      <div className="w-full flex justify-center gap-2 mt-2">
        {dummyDateList.map((date) => (
          <button
            key={date}
            onClick={() => setSelectedDate(date)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
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
      <div className="w-full flex justify-center flex-wrap gap-3 mt-2">
        {timeSlots.map((time) => (
          <button
            key={time}
            onClick={() => setSelectedTime(time)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 ${
              selectedTime === time
                ? 'bg-primary text-white shadow-sm'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {time}
          </button>
        ))}
      </div>

      {/* 예약 버튼 */}
      <button
        onClick={onNext}
        disabled={!selectedDate || !selectedTime}
        className="mt-8 bg-primary text-white py-2 px-6 rounded-lg shadow-md disabled:opacity-40"
      >
        네, 예약할게요
      </button>
    </main>
  )
}
