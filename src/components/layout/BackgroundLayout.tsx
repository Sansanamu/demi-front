import React from 'react';

interface BackgroundLayoutProps {
  children: React.ReactNode;
  showTopGreen?: boolean;
}

const BackgroundLayout: React.FC<BackgroundLayoutProps> = ({ children, showTopGreen = true }) => {
  return (
    <div className="relative w-full min-h-screen bg-white">
      {showTopGreen && (
        <div className="absolute top-0 left-0 w-full bg-primary rounded-t-lg h-[160px] pt-[70px] flex justify-center drop-shadow-smute z-0" />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};


export default BackgroundLayout;
