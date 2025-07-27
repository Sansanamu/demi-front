import { FaWineBottle } from 'react-icons/fa';
import { GiCannedFish } from "react-icons/gi";
import { FaBottleWater } from 'react-icons/fa6';

interface SaturationCardProps {
  type: 'glass' | 'plastic' | 'can';
  value: number;
}

export default function SaturationCard({ type, value }: SaturationCardProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const level = Math.floor(clamped / 20);
  const heightPercent = `${level * 20}%`;

  const getLabel = (type: string) => {
    switch (type) {
      case 'glass':
        return '유리';
      case 'plastic':
        return '플라스틱';
      case 'can':
        return '캔';
      default:
        return '';
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'glass':
        return <FaWineBottle size={96} className="w-6 h-6" />;
      case 'plastic':
        return <FaBottleWater size={96}  className="w-6 h-6" />;
      case 'can':
        return <GiCannedFish size={96}   className="w-6 h-6" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-24 h-36 flex flex-col items-center justify-end relative overflow-hidden border rounded-xl shadow-sm bg-white">
      {/* 게이지 */}
      <div
        className="absolute bottom-0 left-0 w-full bg-primary rounded-t-sm transition-all duration-500"
        style={{ height: heightPercent }}
      />

      {/* 아이콘 */}
      <div className="absolute top-10 flex justify-center w-full z-10 text-txgreen">
        {getIcon(type)}
      </div>

      {/* 라벨 */}
      <div className="absolute bottom-2 text-sm font-medium text-center w-full z-20 text-txgreen">
        {getLabel(type)} {clamped}%
      </div>
    </div>
  );
}
