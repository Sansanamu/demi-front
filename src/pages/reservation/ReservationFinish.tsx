import { FaTruck } from "react-icons/fa";
import { useState } from "react";
import { API_BASE_URL } from "@/config";

interface Props {
  type: 'plastic' | 'glass' | 'can'
  date: string
  time: string
  onConfirm: () => void
  onReset: () => void
}

// 쿠키에서 csrftoken 값 가져오는 함수
function getCookie(name: string): string | undefined {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()!.split(";").shift();
  return undefined;
}

export default function ReservationFinish({type, date, time, onConfirm, onReset}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const typeLabel = {
    plastic: '플라스틱',
    glass: '유리',
    can: '캔',
  }[type];

  // 예약 확정시 Django로 POST 요청
  const handleConfirm = async () => {
    setLoading(true);
    setError(null);

    try {
      const collection_date = `${date}T${time}`;
      const csrftoken = getCookie('csrftoken');  // 쿠키에서 CSRF 토큰 읽기

      if (!csrftoken) {
        throw new Error('CSRF 토큰을 찾을 수 없습니다. 새로고침 후 다시 시도해주세요.');
      }

      const response = await fetch(`${API_BASE_URL}/reservations/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken,   // CSRF 토큰 추가!
        },
        credentials: 'include',
        body: JSON.stringify({
          collection_date,
          type_of_garbage: type,
        }),
      });

      if (!response.ok) {
        let msg = '예약 저장에 실패했습니다.';
        try {
          const errData = await response.json();
          msg += ' ' + JSON.stringify(errData);
        } catch {}
        throw new Error(msg);
      }

      onConfirm();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center pt-20 mt-10 px-4 text-primary gap-6">
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
        <FaTruck className="text-txgreen" size={108} />
      </div>

      {/* 오류 메시지 */}
      {error && (
        <div className="text-red-500 font-bold text-center">{error}</div>
      )}

      {/* 버튼 */}
      <div className="flex flex-col w-full gap-2">
        <button
          onClick={handleConfirm}
          className="bg-primary text-white py-2 rounded-lg shadow"
          disabled={loading}
        >
          {loading ? "예약 중..." : "네"}
        </button>
        <button
          onClick={onReset}
          className="text-gray-500 text-sm underline"
          disabled={loading}
        >
          아니요, 다른 날 알려주세요
        </button>
      </div>
    </main>
  );
}
