import type { Reservation } from '@/data/reservationData'

export default function ReservationCard({ data }: { data: Reservation }) {
  return (
    <div className="border border-txgreen rounded-xl p-4 shadow-md flex items-start gap-4">
      <div className="bg-primary text-white px-4 py-2 rounded-lg shadow-inner font-bold">
        {data.type_of_garbage === 'plastic' ? '플라스틱' : data.type_of_garbage === 'glass' ? '유리' : '캔'}
      </div>
      <div className="flex flex-col text-sm text-black flex-1">
        <span className="font-bold text-txgreen">{data.collection_date}</span>
        <span>기사님이 방문 예정이에요</span>
      </div>
      <button className="text-xs text-red-600 font-medium">취소하기</button>
    </div>
  )
}
