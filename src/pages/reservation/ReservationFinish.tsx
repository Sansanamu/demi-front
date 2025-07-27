interface Props {
  type: 'plastic' | 'glass' | 'can'
  date: string
  time: string
  onConfirm: () => void
  onReset: () => void
}

export default function ReservationFinish({type, date, time, onConfirm, onReset,}: Props) {
  const typeLabel = {
    plastic: '플라스틱',
    glass: '유리',
    can: '캔',
  }[type]

  return (
    <div className="flex flex-col items-center gap-6">
      {/* 안내 헤더 */}
      <div className="bg-primary text-white text-sm font-bold px-6 py-3 rounded-lg shadow-md w-full text-center">
        기사님이 예약을 확인하고 있어요!
      </div>

      {/* 요약 내용 */}
      <p className="text-center text-black text-base font-medium leading-relaxed">
        <span className="text-txgreen font-bold">{date} {time}</span>에<br />
        <span className="text-primary font-bold">{typeLabel}</span> 을/를 수거할게요!
      </p>

      {/* 이미지, 임시 */}
      <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center">
        🚛
      </div>

      {/* 버튼 */}
      <div className="flex flex-col w-full gap-2">
        <button
          onClick={onConfirm}
          className="bg-primary text-white py-2 rounded-lg shadow"
        >
          네
        </button>
        <button
          onClick={onReset}
          className="text-gray-500 text-sm underline"
        >
          아니요, 다른 날 알려주세요
        </button>
      </div>
    </div>
  )
}
