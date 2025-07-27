import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import MobileLayout from '@/components/layout/MobileLayout'
import BottomNav from '@/components/BottomNav'

import Dashboard from '@/pages/main/Dashboard'
import ReservationFlow from '@/pages/reservation/ReservationFlow'
import Login from '@/pages/auth/Login'
import MyPage from './pages/mypage/Mypage'
import ReservationHistory from '@/pages/mypage/ReservationHistory';
import DeviceManagement from './pages/mypage/DeviceManagement'

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
          
          {/* 대시보드 페이지*/}
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* 로그인 페이지 */}
          <Route path="/login" element={<Login />} />
          
          {/* 예약 플로우 페이지 */}
          <Route path="/reservation" element= { <ReservationFlow onComplete={() => navigate('/dashboard')} /> }/>

          {/* 마이페이지 */}
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/reservation-history" element={<ReservationHistory />} />
          <Route path="/device" element={<DeviceManagement />} />

        </Routes>
      </MobileLayout>
      
      {showBottomNav && <BottomNav />}
    </>
  )
}
