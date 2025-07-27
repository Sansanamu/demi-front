import type { ReactNode } from 'react';

export default function MobileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full min-h-screen bg-gray-100 flex justify-center">
      {/* 모바일 콘텐츠 박스 */}
      <div className="w-full max-w-[393px] rounded-lg bg-white flex flex-col min-h-screen relative">
        <div className='z-0'>
          {children}
        </div>
      </div>
    </div>
  );
}
