import React from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  italicTitle?: string;
  subtitle?: string;
  badgeText?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  italicTitle,
  subtitle,
  badgeText,
  align = 'center',
  className = ''
}) => {
  const alignmentClass = 
    align === 'center' ? 'text-center items-center mx-auto' : 
    align === 'right' ? 'text-right items-end ml-auto' : 
    'text-left items-start';

  return (
    <div className={`flex flex-col space-y-3 max-w-3xl ${alignmentClass} ${className}`}>
      {/* Eyebrow / Badge */}
      {badgeText && (
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#EFE7D8]/80 border border-[#C99632]/25">
          <span className="w-2 h-2 rounded-full bg-[#C99632]" />
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#7A6437]">
            {badgeText}
          </span>
        </div>
      )}

      {eyebrow && !badgeText && (
        <span className="text-xs font-extrabold uppercase tracking-widest text-[#C99632]">
          {eyebrow}
        </span>
      )}

      {/* Main Title & Optional Serif Accent */}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#10253A] tracking-tight leading-[1.15]">
        {title}{' '}
        {italicTitle && (
          <span className="font-serif-accent italic font-normal text-[#C99632] block sm:inline mt-1 sm:mt-0">
            {italicTitle}
          </span>
        )}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-sm sm:text-base font-normal text-[#627083] leading-relaxed pt-1 max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
};
