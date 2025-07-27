import React from 'react';

interface MonthlyReservationCountProps {
  user_id: string;
  count: number;
}

const MonthlyReservationCount: React.FC<MonthlyReservationCountProps> = ({ user_id, count }) => {
  return (
    <div className="flex w-full max-w-[393px] px-4 py-20 z-50 justify-center">
      <div className="bg-white z-10 px-6 py-4 rounded-[8px] drop-shadow-lg text-center text-sm text-gray-800">
        {count > 0 ? (
          <p>
            <strong className="text-txgreen">{user_id}</strong>님의 이번 달 예약은{' '}
            <span className="text-red-600 font-semibold">{count}건</span>입니다.
          </p>
        ) : (
          <p>
            <strong className="text-txgreen">{user_id}</strong>님은 이번 달 예약이 없습니다 😊
          </p>
        )}
      </div>
    </div>
  );
};

export default MonthlyReservationCount;
