import type { Dispatch, SetStateAction } from 'react'

interface Props {
  selectedType: 'glass' | 'plastic' | 'can' | null
  setSelectedType: Dispatch<SetStateAction<'glass' | 'plastic' | 'can' | null>>
  onNext: () => void
}

const types = [
  { key: 'glass', label: '유리' },
  { key: 'plastic', label: '플라스틱' },
  { key: 'can', label: '캔'},
] as const

export default function ReservationType({ selectedType, setSelectedType, onNext }: Props) {
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">어떤 종류를 수거할까요?</h2>
      <div className="flex gap-4">
        {types.map((type) => (
          <button
            key={type.key}
            onClick={() => {
              setSelectedType(type.key)
              onNext()
            }}
            className={`px-4 py-2 rounded ${
              selectedType === type.key ? 'bg-green-500 text-white' : 'bg-gray-200'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>
    </div>
  )
}
