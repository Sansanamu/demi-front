import ReservationCard from './ReservationCard'
import type { Reservation } from '@/data/reservationData'

export default function ReservationList({ data }: { data: Reservation[] }) {
  return (
    <div className="flex flex-col gap-4">
      {data.map((item, idx) => (
        <ReservationCard key={idx} data={item} />
      ))}
    </div>
  )
}
