import React from 'react';
import useSessionUser from '@/hooks/useSessionUser';

interface MonthlyReservationCountProps {
  count: number;
}

const MonthlyReservationCount: React.FC<MonthlyReservationCountProps> = ({ count }) => {
  const { nickname } = useSessionUser();

  return (
    <div className="flex justify-center items-center w-full max-w-[393px] px-4 py-8 z-50">
      <div className="bg-white z-10 px-6 py-4 rounded-[8px] drop-shadow-lg text-center text-sm text-gray-800 w-full">
        {count > 0 ? (
          <p className="text-center">
            <strong className="text-txgreen">{nickname}</strong>님의 이번 달 예약은{' '}
            <span className="text-red-600 font-semibold">{count}건</span>입니다.
          </p>
        ) : (
          <p className="text-center">
            <strong className="text-txgreen">{nickname}</strong>님은 이번 달 예약이 없습니다 😊
          </p>
        )}
      </div>
    </div>
  );
};

export default MonthlyReservationCount;
