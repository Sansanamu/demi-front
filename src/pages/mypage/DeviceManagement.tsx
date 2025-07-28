import { useNavigate } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import BackgroundLayout from '@/components/layout/BackgroundLayout';

export default function DeviceManagement() {
  const navigate = useNavigate();

  // 차후 API 데이터로 대체
  const dummyDevice = {
    name: '집',
    address: '(00000) 서울특별시 OOO',
    deviceId: 'ABC1234',
  };

  return (
    <BackgroundLayout>
      <main className="flex flex-col items-center pt-20 px-4 text-primary">
        {/* 상단 헤더 */}
        <div className="w-full relative flex items-center justify-center mb-6">
          <button onClick={() => navigate(-1)} className="absolute left-3 text-white">
            <MdArrowBack size={24} />
          </button>
          <h1 className="text-lg font-semibold text-white">기기 관리</h1>
        </div>

        {/* 기기 카드 */}
        <div className="bg-primary text-white w-full mt-10 rounded-xl p-4 shadow-md">
          <div className="flex justify-between items-start mb-2">
            <span className="font-bold text-base">{dummyDevice.name}</span>
            <span className="text-sm">{dummyDevice.deviceId}</span>
          </div>
          <p className="text-sm whitespace-pre-line mb-4">{dummyDevice.address}</p>
          <div className="flex gap-3">
            <button
              className="px-3 py-1 bg-white text-green-700 rounded"
              onClick={() => navigate('/address-search')}
            >
              주소 변경
            </button>
            <button className="bg-white text-red-500 text-sm px-3 py-1 rounded">기기 삭제</button>
          </div>
        </div>
      </main>
    </BackgroundLayout>
  );
}
