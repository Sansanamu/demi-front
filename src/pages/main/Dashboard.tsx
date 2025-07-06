import SaturationCard from '@/components/SaturationCard'
import EmptyReservationCard from '@/components/EmptyReservationCard'
import ReservationCard from '@/components/ReservationCard'
import EcoBanner from '@/components/EcoBanner'
import { reservationData } from '@/data/reservationData'

export default function Dashboard() {
  const hasReservation = reservationData.length > 0

  return (
    <>
      {/* 유저 정보 알림 */}
      <div className="w-full bg-primary rounded-t-lg h-[160px] pt-[70px] flex justify-center drop-shadow-sm">
        <div className="w-full max-w-[393px] px-4 pt-4 pb-4">
          <div className="bg-white px-4 py-4 rounded-[8px] drop-shadow-lg text-center text-sm text-gray-800">
            <p>
              <strong className="text-txgreen">주디</strong> 님, 이번 달 분리수거 횟수는{' '}
              <span className="text-red-600 font-semibold">0회</span>입니다.
            </p>
          </div>
        </div>
      </div>

      <main className="flex-grow px-4 pt-6 pb-20">
        {/* 포화도 카드 */}
        <div className="w-full flex justify-between gap-2 mb-6">
          <SaturationCard type="glass" />
          <SaturationCard type="plastic" />
          <SaturationCard type="can" />
        </div>

        {/* 포화도 섹션 제목 */}
        <div className="flex items-center justify-center gap-4 mb-2 h-[50px] pb-10">
          <div className="flex-grow h-px bg-primary" />
          <p className="text-sm font-semibold text-primary">포화도</p>
          <div className="flex-grow h-px bg-primary" />
        </div>

        {/* 예약 정보 카드 */}
        <div className="w-full mb-6">
          {hasReservation ? (
            <ReservationCard data={reservationData[0]} />
          ) : (
            <EmptyReservationCard />
          )}
        </div>

        {/* 에코 배너 */}
        <div className="w-full">
          <EcoBanner />
        </div>
      </main>
    </>
  )
}
