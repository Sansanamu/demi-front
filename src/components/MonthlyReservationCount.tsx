import React from 'react';
import useSessionUser from '@/hooks/useSessionUser';

interface MonthlyReservationCountProps {
  user_id: string;
  count: number;
}

const MonthlyReservationCount: React.FC<MonthlyReservationCountProps> = ({ count }) => {
  const { username } = useSessionUser(); // 세션에서 username 가져오기

  return (
    <div className="flex w-full max-w-[393px] px-4 py-20 z-50 justify-center">
      <div className="bg-white z-10 px-6 py-4 rounded-[8px] drop-shadow-lg text-center text-sm text-gray-800">
        {count > 0 ? (
          <p>
            <strong className="text-txgreen">{username}</strong>님의 이번 달 예약은{' '}
            <span className="text-red-600 font-semibold">{count}건</span>입니다.
          </p>
        ) : (
          <p>
            <strong className="text-txgreen">{username}</strong>님은 이번 달 예약이 없습니다 😊
          </p>
        )}
      </div>
    </div>
  );
};

export default MonthlyReservationCount;
