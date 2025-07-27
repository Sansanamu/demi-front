import { MdArrowBack, MdPerson } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import BackgroundLayout from '@/components/layout/BackgroundLayout';
import useSessionUser from '@/hooks/useSessionUser';

export default function MyPage() {
  const navigate = useNavigate();
  const { username } = useSessionUser(); // 세션에서 username 가져오기

  return (
    <BackgroundLayout>
      <main className="flex flex-col items-center pt-20 pb-10 px-4">
        {/* 상단 헤더 */}
        <div className="w-full relative flex items-center z-50 justify-center text-white mb-6">
          <button onClick={() => navigate(-1)} className="absolute left-3">
            <MdArrowBack size={24} />
          </button>
          <h1 className="text-lg font-semibold">마이 페이지</h1>
        </div>

        {/* 프로필 아이콘 + 이름 */}
        <div className="flex flex-col pt-10 mt-10 items-center mb-10">
          {/* 큰 아이콘 */}
          <div className="w-28 h-28 rounded-full border border-primary flex items-center justify-center mb-3 bg-gray-100">
            <MdPerson size={72} className="text-primary" />
          </div>
          <p className="text-lg text-primary font-bold">{username}</p>
        </div>

        {/* 메뉴 */}
        <div className="w-full space-y-4 mb-10">
          <button
            onClick={() => navigate('/reservation-history')}
            className="flex justify-between items-center w-full px-4 py-3 border-b"
            >
            <span className="text-sm font-medium">예약 내역</span>
            <span className="text-xl">{'>'}</span>
          </button>
          <button
            onClick={() => navigate('/device')}
            className="flex justify-between items-center w-full px-4 py-3 border-b"
          >
            <span className="text-sm text-primary font-bold">기기 관리</span>
            <span className="text-xl">{'>'}</span>
          </button>
        </div>

        {/* 회원 탈퇴&로그아웃 */}
        <button className="text-xs text-primary">로그아웃</button>
        <button className="text-xs text-gray-400 pt-5">회원 탈퇴</button>
      </main>
    </BackgroundLayout>
  );
}
