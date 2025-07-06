interface Props {
  type: 'glass' | 'plastic' | 'can'
}

export default function SaturationCard({ type }: Props) {
  const label = {
    glass: '유리',
    plastic: '플라스틱',
    can: '캔',
  }[type]

  const icon = {
    glass: '🍷',
    plastic: '🥤',
    can: '🥫',
  }[type]

  return (
    <div className="flex flex-col items-center w-1/3">
      <div className="w-full h-24 rounded-lg bg-gradient-to-t from-primary to-white flex items-end justify-center text-3xl shadow-inner-md">
        {icon}
      </div>
      <p className="text-sm font-bold mt-2">{label}</p>
    </div>
  )
}
