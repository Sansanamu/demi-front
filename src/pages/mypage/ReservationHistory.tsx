import { MdArrowBack } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import BackgroundLayout from '@/components/layout/BackgroundLayout';

type ReservationItem = {
  id: number;
  date: string; // 'YYYY-MM-DD'
  time: string; // '오후 8시' 등
  type: '플라스틱' | '캔' | '유리';
  weight?: number;
  price?: number;
  status: '예정' | '완료';
};

const dummyReservations: ReservationItem[] = [
  { id: 1, date: '2025-04-29', time: '오후 8시', type: '플라스틱', status: '예정' },
  { id: 2, date: '2025-04-01', time: '오후 8시', type: '캔', weight: 420, price: 4200, status: '완료' },
  { id: 3, date: '2025-03-29', time: '오후 7시', type: '유리', weight: 380, price: 3800, status: '완료' },
  { id: 4, date: '2025-03-15', time: '오후 8시', type: '플라스틱', weight: 500, price: 5000, status: '완료' },
  { id: 5, date: '2025-03-01', time: '오후 7시', type: '캔', weight: 200, price: 2000, status: '완료' },
];

const formatMonth = (dateStr: string) => {
  const [year, month] = dateStr.split('-');
  return `${year}년 ${Number(month)}월`;
};

export default function ReservationHistory() {
  const navigate = useNavigate();

  // 월별로 그룹화
  const grouped = dummyReservations.reduce((acc, cur) => {
    const monthKey = formatMonth(cur.date);
    if (!acc[monthKey]) acc[monthKey] = [];
    acc[monthKey].push(cur);
    return acc;
  }, {} as Record<string, ReservationItem[]>);

  return (
    <BackgroundLayout>
      <main className="flex flex-col items-center pt-6 pb-10 px-4 text-primary w-full">
        {/* 헤더 */}
        <div className="w-full pt-10 relative flex items-center justify-center text-white mb-6">
          <button onClick={() => navigate(-1)} className="absolute left-0">
            <MdArrowBack size={24} />
          </button>
          <h1 className="text-lg font-semibold">예약 내역</h1>
        </div>

        {/* 예약 리스트 */}
        <div className="w-full space-y-6 pt-10 mt-10">
          {Object.entries(grouped).map(([month, items]) => (
            <div key={month}>
              <h2 className="text-sm font-semibold mb-2 border-b border-primary">{month}</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex w-full items-center justify-between rounded-xl border px-4 py-3 shadow-sm bg-white"
                  >
                    {/* 종류 */}
                    <div className="min-w-[70px] h-[50px] flex items-center justify-center rounded-lg bg-primary text-white font-semibold mr-4 px-2 text-sm">
                      {item.type}
                    </div>
                    {/* 텍스트 */}
                    <div className="flex-1 text-sm text-gray-700">
                      <p className="font-medium">{item.date} {item.time}</p>
                      <p className="text-xs">
                        {item.status === '예정'
                          ? '기사님이 방문 예정이에요'
                          : '기사님이 방문했어요!'}
                      </p>
                    </div>
                    {/* 결과 */}
                    <div className="text-right text-xs whitespace-nowrap">
                      {item.status === '완료' && (
                        <>
                          <p className="text-purple-700 font-semibold">{item.weight}g</p>
                          <p className="text-black text-sm font-bold">{item.price?.toLocaleString()}원</p>
                        </>
                      )}
                      {item.status === '예정' && (
                        <button className="text-red-500 font-semibold text-sm">취소하기</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </BackgroundLayout>
  );
}
