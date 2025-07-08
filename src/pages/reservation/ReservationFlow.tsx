import { useState } from 'react'
import ReservationType from './ReservationType'
import ReservationCalendar from './ReservationCalendar'
import ReservationFinish from './ReservationFinish'

interface Props {
  onComplete: () => void
}

export default function ReservationFlow({ onComplete }: Props) {
  const [step, setStep] = useState(1)
  const [type, setType] = useState<'plastic' | 'glass' | 'can' | null>(null)
  const [date, setDate] = useState<string | null>(null)
  const [time, setTime] = useState<string | null>(null)


  const reset = () => {
    setStep(1)
    setType(null)
    setDate('')
    setTime('')
  }

  // 1단계: 종류 선택
  if (step === 1) {
    return (
      <ReservationType
        selectedType={type}
        setSelectedType={setType}
        onNext={() => setStep(2)}
      />
    )
  }

  // 2단계: 날짜+시간 선택
  // 2단계: 날짜+시간 선택
    if (step === 2 && type) {
    return (
        <ReservationCalendar
        selectedDate={date}
        setSelectedDate={setDate}
        selectedTime={time}
        setSelectedTime={setTime}
        onNext={() => setStep(3)}
        />
    )
    }


  // 3단계: 최종 확인
  if (step === 3 && type && date && time) {
    return (
      <ReservationFinish
        type={type}
        date={date}
        time={time}
        onConfirm={onComplete}
        onReset={reset}
      />
    )
  }

  return null
}
