import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react' 

interface Props {
  to?: string
}

export default function BackButton({ to }: Props) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (to) {
      navigate(to)
    } else {
      navigate(-1)
    }
  }

  return (
    <button onClick={handleClick} className="absolute top-4 left-4 p-2">
      {/* lucide-react */}
      <ArrowLeft className="w-6 h-6 text-gray-800" />
    </button>
  )
}
