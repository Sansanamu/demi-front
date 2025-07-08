<<<<<<< HEAD
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
=======
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
>>>>>>> f4d7350 (예약 기능 및 관련 컴포넌트 추가)
import MobileLayout from '@/components/layout/MobileLayout'
import BottomNav from '@/components/BottomNav'

import Dashboard from '@/pages/main/Dashboard'
<<<<<<< HEAD

export default function App() {
  const location = useLocation()
=======
import ReservationFlow from '@/pages/reservation/ReservationFlow'

export default function App() {
  const location = useLocation()
  const navigate = useNavigate()

>>>>>>> f4d7350 (예약 기능 및 관련 컴포넌트 추가)
  const showBottomNav = location.pathname === '/dashboard'

  return (
    <>
      <MobileLayout>
        <Routes>
<<<<<<< HEAD
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </MobileLayout>

=======
          {/* 기본 대시보드로 리다이렉트 */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* 예약 플로우 페이지 */}
          <Route path="/reservation" element= { <ReservationFlow onComplete={() => navigate('/dashboard')} /> }/>
        </Routes>
      </MobileLayout>
      
>>>>>>> f4d7350 (예약 기능 및 관련 컴포넌트 추가)
      {showBottomNav && <BottomNav />}
    </>
  )
}
