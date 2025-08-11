'use client';

import { useEffect, useRef, useState } from 'react';

import SaturationCard from '@/components/SaturationCard';
import EmptyReservationCard from '@/components/EmptyReservationCard';
import EcoBanner from '@/components/EcoBanner';
import ReservationList from '@/components/ReservationList';
import BackgroundLayout from '@/components/layout/BackgroundLayout';
import MonthlyReservationCount from '@/components/MonthlyReservationCount';
import { API_BASE_URL } from '@/config';
// import useSessionUser from '@/hooks/useSessionUser'; // 현재 안 씀

// 예약 타입
export interface Reservation {
  id: number;
  collection_date: string;
  type_of_garbage: 'glass' | 'plastic' | 'can';
  status: string;
}

// 포화도 타입
type BinType = 'glass' | 'plastic' | 'can';
type SaturationItem = { type: BinType; value: number };

const clamp01 = (v: any) => {
  const n = Number(v);
  return Number.isFinite(n) ? Math.max(0, Math.min(100, n)) : 0;
};

// /saturation 응답을 배열 형태로 정규화
function normalizeSaturation(resp: unknown): SaturationItem[] {
  // 1) 객체 형태: { glass: 35, plastic: 70, can: 50 }
  if (
    resp &&
    typeof resp === 'object' &&
    !Array.isArray(resp) &&
    ['glass', 'plastic', 'can'].every(k => k in (resp as any))
  ) {
    const o = resp as Record<string, number>;
    return (['glass', 'plastic', 'can'] as BinType[]).map(t => ({
      type: t,
      value: clamp01(o[t]),
    }));
  }

  // 2) 배열 형태: [ { glass, plastic, can, created_at }, ... ]  (최신순)
  if (Array.isArray(resp)) {
    const latest = resp[0];
    if (
      latest &&
      typeof latest === 'object' &&
      ['glass', 'plastic', 'can'].every(k => k in (latest as any))
    ) {
      const o = latest as Record<string, number>;
      return (['glass', 'plastic', 'can'] as BinType[]).map(t => ({
        type: t,
        value: clamp01(o[t]),
      }));
    }

    // 2-b) 배열이 [{ type, value }] 형태라면 (혹시 다른 엔드포인트용)
    const map = new Map<BinType, number>();
    for (const it of resp as any[]) {
      if (it && (it.type === 'glass' || it.type === 'plastic' || it.type === 'can')) {
        map.set(it.type, clamp01(it.value));
      }
    }
    if (map.size) {
      return (['glass', 'plastic', 'can'] as BinType[]).map(t => ({
        type: t,
        value: map.get(t) ?? 0,
      }));
    }
  }

  // 모르는 형태 → 0
  return (['glass', 'plastic', 'can'] as BinType[]).map(t => ({ type: t, value: 0 }));
}

export default function Dashboard() {
  // const { user_id } = useSessionUser(); // 현재 미사용
  const nickname = typeof window !== 'undefined' ? localStorage.getItem('nickname') || '회원' : '회원';

  const [userReservations, setUserReservations] = useState<Reservation[]>([]);
  const [sensorValue, setSensorValue] = useState<SaturationItem[] | null>(null);
  const [error, setError] = useState(false);

  const abortRef = useRef<AbortController | null>(null);

  const loadReservations = async () => {
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    try {
      const res = await fetch(`${API_BASE_URL}/reservations/`, {
        credentials: 'include',
        signal: ac.signal,
      });
      if (!res.ok) throw new Error('예약 데이터 불러오기 실패');
      const data = await res.json();
      setUserReservations(Array.isArray(data) ? data : []);
      setError(false);
    } catch {
      setError(true);
      setUserReservations([]);
    }
  };

  const loadSaturation = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/ultrasound/saturation/`, {
      credentials: 'include',
      cache: 'no-store', // 혹시 모를 캐싱 방지
    })
      if (!res.ok) throw new Error('포화도 불러오기 실패');
      const data = await res.json();
      setSensorValue(normalizeSaturation(data));
    } catch {
      // 실패 시 0으로 표기
      setSensorValue(normalizeSaturation(null));
    }
  };

  // 최초 로드
  useEffect(() => {
    loadReservations();
    loadSaturation();
    return () => abortRef.current?.abort();
  }, []);

  // 대시보드로 다시 돌아올 때마다 갱신
  useEffect(() => {
    const revalidate = () => {
      if (document.visibilityState === 'visible') {
        loadReservations();
        loadSaturation();
      }
    };
    const onFocus = () => revalidate();
    const onVisible = () => revalidate();
    const onOnline = () => revalidate();
    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('online', onOnline);
    return () => {
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('online', onOnline);
    };
  }, []);

  const reservationCount = userReservations.length;

  const getValue = (t: BinType) =>
    sensorValue?.find(item => item.type === t)?.value ?? 0;

  return (
    <BackgroundLayout>
      {/* MonthlyReservationCount는 count만 받음 */}
      <MonthlyReservationCount count={reservationCount} />

      <main className="flex-grow px-4 pb-20">
        {/* 포화도 카드 */}
        <div className="w-full flex justify-between gap-2 mb-6">
          <SaturationCard type="glass" value={getValue('glass')} />
          <SaturationCard type="plastic" value={getValue('plastic')} />
          <SaturationCard type="can" value={getValue('can')} />
        </div>

        <div className="flex items-center justify-center gap-4 mb-2 h-[50px] pb-10">
          <div className="flex-grow h-px bg-primary" />
          <p className="text-sm font-semibold text-primary">포화도</p>
          <div className="flex-grow h-px bg-primary" />
        </div>

        {/* 예약 정보 카드 */}
        <div className="w-full mb-6">
          {error ? (
            <EmptyReservationCard />
          ) : userReservations.length === 0 ? (
            <EmptyReservationCard />
          ) : (
            <ReservationList data={userReservations} />
          )}
        </div>

        <div className="w-full">
          <EcoBanner />
        </div>
      </main>
    </BackgroundLayout>
  );
}
