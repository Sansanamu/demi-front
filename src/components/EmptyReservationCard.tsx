export default function EmptyReservationCard() {
  return (
    <div className="w-full border border-txgreen rounded-xl p-6 flex flex-col items-center mt-6 shadow-sm">
      <div className="text-4xl mb-2">📦</div>
      <p className="text-gray-700">예약된 분리수거 날이 없습니다.</p>
    </div>
  )
}
