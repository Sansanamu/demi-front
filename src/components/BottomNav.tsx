import { useNavigate } from 'react-router-dom'

export default function BottomNav() {
  const navigate = useNavigate()

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 z-10 w-full max-w-[393px] bg-white border-t border-gray-200 shadow-md h-14 flex justify-around items-center px-4">
      <button onClick={() => navigate('/reservation')}>📅</button>
      <button onClick={() => navigate('/dashboard')}>🏠</button>
      <button onClick={() => alert('마이페이지')}>👤</button>
    </nav>
  )
}
