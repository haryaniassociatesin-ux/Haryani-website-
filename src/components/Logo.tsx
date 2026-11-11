import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'dark',
  size = 'md',
  showTagline = false,
}) => {
  const isLight = variant === 'light';

  const boxSize = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-12 h-12' : 'w-10 h-10';
  const nameSize = size === 'sm' ? 'text-base' : size === 'lg' ? 'text-xl md:text-2xl' : 'text-lg md:text-xl';
  const subSize = size === 'sm' ? 'text-[10px]' : 'text-xs';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Refined H Monogram inside geometric border */}
      <div
        className={`${boxSize} relative flex items-center justify-center border transition-all ${
          isLight
            ? 'border-[#D4B477] bg-[#142B46] text-[#D4B477]'
            : 'border-[#142B46] bg-[#142B46] text-[#D4B477]'
        } shadow-xs rounded-xs`}
        style={{ borderWidth: '1.5px' }}
      >
        <div className="absolute inset-0.5 border border-[#D4B477]/40 pointer-events-none" />
        <span className="font-serif font-bold text-base md:text-lg tracking-wider text-[#D4B477]">
          H
        </span>
      </div>

      {/* Wordmark */}
      <div className="flex flex-col">
        <span
          className={`font-serif font-bold tracking-tight whitespace-nowrap ${nameSize} ${
            isLight ? 'text-white' : 'text-[#142B46]'
          }`}
        >
          Haryani &amp; Associates
        </span>
        {showTagline && (
          <span
            className={`font-sans tracking-wide uppercase font-medium whitespace-nowrap ${subSize} ${
              isLight ? 'text-[#D4B477]' : 'text-[#D4B477]'
            }`}
          >
            Your Trusted Financial Partner
          </span>
        )}
      </div>
    </div>
  );
};
