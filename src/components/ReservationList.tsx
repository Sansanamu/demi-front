import ReservationCard, { type Reservation } from './ReservationCard';

export default function ReservationList({ data }: { data: Reservation[] }) {
  return (
    <div className='flex flex-col gap-4'>
      {data.map((item) => (
        <ReservationCard key={item.id} data={item} />
      ))}
    </div>
  );
}
