import React from 'react';
import { motion } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up'
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: 35, x: 0 };
      case 'down': return { y: -35, x: 0 };
      case 'left': return { x: 35, y: 0 };
      case 'right': return { x: -35, y: 0 };
      default: return { y: 35, x: 0 };
    }
  };

  const initial = getInitialPosition();

  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(6px)', ...initial }}
      whileInView={{ opacity: 1, filter: 'blur(0px)', x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.75,
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
