import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import MobileLayout from '@/components/layout/MobileLayout'
import BottomNav from '@/components/BottomNav'

import Dashboard from '@/pages/main/Dashboard'
import ReservationFlow from '@/pages/reservation/ReservationFlow'

export default function App() {
  const location = useLocation()
  const navigate = useNavigate()

  const showBottomNav = location.pathname === '/dashboard'

  return (
    <>
      <MobileLayout>
        <Routes>
          {/* 기본 대시보드로 리다이렉트 */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* 예약 플로우 페이지 */}
          <Route path="/reservation" element= { <ReservationFlow onComplete={() => navigate('/dashboard')} /> }/>
        </Routes>
      </MobileLayout>
      
      {showBottomNav && <BottomNav />}
    </>
  )
}
