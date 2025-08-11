import { MdArrowBack } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BackgroundLayout from '@/components/layout/BackgroundLayout';
import { API_BASE_URL } from '@/config';

// ReservationItem 타입 정의 (서버 응답 구조에 맞게 수정!)
type ReservationItem = {
  id: number;
  collection_date: string; // "2025-04-29T20:00:00"
  type_of_garbage: 'plastic' | 'glass' | 'can';
  weight?: number;
  price?: number;
  status: 'reserved' | 'completed' | 'cancelled'; // 서버값 기준
};

// 한글 표시용 라벨 매핑
const typeLabel: Record<string, string> = {
  plastic: '플라스틱',
  glass: '유리',
  can: '캔',
};

const statusLabel: Record<string, string> = {
  reserved: '예정',
  completed: '완료',
  cancelled: '취소됨',
};

const formatMonth = (dateStr: string) => {
  const date = new Date(dateStr);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
};

const formatTime = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
};

export default function ReservationHistory() {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState<ReservationItem[]>([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/reservations/`)
      .then(res => res.json())
      .then(data => setReservations(data))
      .catch(() => setReservations([])); // 오류 시 빈 배열
  }, []);

  // 월별 그룹화
  const grouped = reservations.reduce((acc, cur) => {
    const monthKey = formatMonth(cur.collection_date);
    if (!acc[monthKey]) acc[monthKey] = [];
    acc[monthKey].push(cur);
    return acc;
  }, {} as Record<string, ReservationItem[]>);

  return (
    <BackgroundLayout>
      <main className="flex flex-col items-center pt-10 pb-10 px-4 text-primary w-full">
        {/* 헤더 */}
        <div className="w-full pt-10 relative flex items-center justify-center text-white mb-6">
          <button onClick={() => navigate(-1)} className="absolute left-3">
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
                      {typeLabel[item.type_of_garbage]}
                    </div>
                    {/* 텍스트 */}
                    <div className="flex-1 text-sm text-gray-700">
                      <p className="font-medium">
                        {formatDate(item.collection_date)} {formatTime(item.collection_date)}
                      </p>
                      <p className="text-xs">
                        {statusLabel[item.status] === '예정'
                          ? '기사님이 방문 예정이에요'
                          : '기사님이 방문했어요!'}
                      </p>
                    </div>
                    {/* 결과 */}
                    <div className="text-right text-xs whitespace-nowrap">
                      {item.status === 'completed' && (
                        <>
                          <p className="text-purple-700 font-semibold">{item.weight}g</p>
                          <p className="text-black text-sm font-bold">{item.price?.toLocaleString()}원</p>
                        </>
                      )}
                      {item.status === 'reserved' && (
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
