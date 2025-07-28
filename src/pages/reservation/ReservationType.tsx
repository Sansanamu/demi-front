import type { Dispatch, SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdArrowBack } from 'react-icons/md'
import { FaWineBottle } from 'react-icons/fa'
import { GiCannedFish } from 'react-icons/gi'
import { FaBottleWater } from 'react-icons/fa6'

interface Props {
  selectedType: 'plastic' | 'glass' | 'can' | null
  setSelectedType: Dispatch<SetStateAction<'plastic' | 'glass' | 'can' | null>>
  onNext: () => void
}

const types = [
  { id: 'glass', label: '유리', icon: <FaWineBottle size={48} /> },
  { id: 'plastic', label: '플라스틱', icon: <FaBottleWater size={48} /> },
  { id: 'can', label: '캔', icon: <GiCannedFish size={48} /> },
] as const

export default function ReservationType({ selectedType, setSelectedType, onNext }: Props) {
  const navigate = useNavigate()

  return (
    <main className="flex flex-col items-center pt-10 mt-10 px-4 text-primary gap-4">
      {/* 뒤로가기 버튼 */}
      <div>
        <button onClick={() => navigate(-1)} className="absolute left-6">
          <MdArrowBack size={24} />
        </button>
      </div>

      {/* 안내 헤더 */}
      <div className="bg-primary text-white flex flex-col w-3/4 text-sm font-bold px-6 py-3 mt-5 rounded-lg shadow-md text-center">
        어떤 쓰레기를 수거해갈까요?
      </div>

      {/* 종류 선택 카드 */}
      <div className="flex justify-center items-center mt-10 gap-6">
        {types.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => setSelectedType(id)}
            className={`w-24 h-36 rounded-xl p-3 flex flex-col items-center justify-center shadow-md transition-all duration-150 transform ${
              selectedType === id
                ? 'bg-primary text-white scale-105'
                : 'bg-gray-100 text-gray-800 scale-100'
            }`}
          >
            <div className="mb-2 text-4xl">{icon}</div>
            <span className="text-sm font-semibold">{label}</span>
          </button>
        ))}
      </div>

      {/* 선택 버튼 */}
      <div className="mt-10 w-full flex justify-center">
        <button
          onClick={() => {
            // 선택된 데이터를 다음 페이지로 넘기는 로직
            // 예: saveSelectedType(selectedType)
            onNext()
          }}
          disabled={!selectedType}
          className={`w-3/4 py-3 rounded-lg text-white font-bold shadow-md transition-all duration-200 ${
            selectedType ? 'bg-primary hover:opacity-90' : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          선택
        </button>
      </div>
    </main>
  )
}
