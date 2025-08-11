export interface Reservation {
  id: number;
  collection_date: string; // '2025-09-28T07:30:00.000000'
  type_of_garbage: 'plastic' | 'glass' | 'can';
  status: string;
  // 필요시 추가 필드
}

export default function ReservationCard({ data }: { data: Reservation }) {
  const [date, time] = data.collection_date.split('T');
  return (
    <div className="border border-txgreen rounded-xl p-4 shadow-md flex items-start gap-4">
      <div className="bg-primary text-white px-4 py-2 rounded-lg shadow-inner font-bold">
        {data.type_of_garbage === 'plastic'
          ? '플라스틱'
          : data.type_of_garbage === 'glass'
          ? '유리'
          : '캔'}
      </div>
      <div className="flex flex-col text-sm text-black flex-1">
        <span className="font-bold text-txgreen">
          {date} {time ? time.slice(0, 5) : ''}
        </span>
        <span>
          {data.status === 'reserved'
            ? '기사님이 방문 예정이에요'
            : data.status === 'completed'
            ? '수거 완료'
            : data.status}
        </span>
      </div>
      <button className="self-center text-xs text-red-600 font-medium">취소하기</button>
    </div>
  );
}
