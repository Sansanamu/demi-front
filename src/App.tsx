import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import MobileLayout from '@/components/layout/MobileLayout'
import BottomNav from '@/components/BottomNav'

import Dashboard from '@/pages/main/Dashboard'

export default function App() {
  const location = useLocation()
  const showBottomNav = location.pathname === '/dashboard'

  return (
    <>
      <MobileLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </MobileLayout>

      {showBottomNav && <BottomNav />}
    </>
  )
}
