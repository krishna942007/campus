import React, { useState } from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  enableSpotlight?: boolean;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  enableSpotlight = true,
  onClick
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableSpotlight) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-3xl bg-[#FFFCF8]/90 backdrop-blur-md border border-[#0C2238]/10 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#C99632]/35 hover:shadow-xl ${className}`}
    >
      {/* Subtle Mouse-Following Radial Spotlight */}
      {enableSpotlight && isHovered && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(201, 150, 50, 0.08), transparent 60%)`
          }}
        />
      )}
      {children}
    </div>
  );
};
