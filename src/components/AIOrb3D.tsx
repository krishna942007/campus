import React, { useEffect, useRef } from 'react';

interface AIOrbProps {
  state?: 'IDLE' | 'THINKING' | 'SPEAKING' | 'ACTIVE';
  className?: string;
}

export const AIOrb3D: React.FC<AIOrbProps> = ({ state = 'ACTIVE', className = 'w-64 h-64' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth * 2);
    let height = (canvas.height = canvas.offsetHeight * 2);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * 2;
      height = canvas.height = canvas.offsetHeight * 2;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      mouseRef.current.targetY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Exact Palette Swatches from user provided image:
    // Butter, Seafoam, Mint, Aqua, Turquoise, Teal, Lagoon, Peacock, Petrol
    const colors = [
      '#F8E7AD', // Butter Warm Gold
      '#E8EFE9', // Seafoam Off-White
      '#C7DACD', // Soft Mint
      '#A3D2CA', // Soft Aqua
      '#36B1AB', // Vibrant Turquoise
      '#1F8A90', // Rich Teal
      '#227075', // Deep Lagoon
      '#0F5566', // Peacock Blue
      '#0C3B53', // Deep Petrol
      '#FFFFFF', // Pure White
    ];
    const particleCount = 85;

    interface Particle {
      x: number;
      y: number;
      z: number;
      baseX: number;
      baseY: number;
      baseZ: number;
      color: string;
      size: number;
      speed: number;
      angle: number;
    }

    const particles: Particle[] = [];
    const radius = Math.min(width, height) * 0.23;

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = radius * (0.65 + Math.random() * 0.55);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      particles.push({
        x,
        y,
        z,
        baseX: x,
        baseY: y,
        baseZ: z,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 3.8 + 2.2,
        speed: Math.random() * 0.015 + 0.005,
        angle: Math.random() * Math.PI * 2,
      });
    }

    let rotX = 0;
    let rotY = 0;
    let pulseTime = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth spring mouse response
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const speedFactor = state === 'THINKING' ? 2.5 : state === 'SPEAKING' ? 1.8 : 1.0;
      rotX += 0.006 * speedFactor + mouseRef.current.y * 0.01;
      rotY += 0.008 * speedFactor + mouseRef.current.x * 0.01;
      pulseTime += 0.04 * speedFactor;

      const centerX = width / 2;
      const centerY = height / 2;

      // 1. Outer ambient radial glow - infused Butter, Turquoise & Teal aura
      const glowGrad = ctx.createRadialGradient(
        centerX, centerY, radius * 0.15,
        centerX, centerY, radius * 1.85
      );
      glowGrad.addColorStop(0, 'rgba(248, 231, 173, 0.45)'); // Butter warm core aura
      glowGrad.addColorStop(0.35, 'rgba(54, 177, 171, 0.38)'); // Turquoise ring
      glowGrad.addColorStop(0.70, 'rgba(31, 138, 144, 0.16)'); // Teal/Lagoon halo
      glowGrad.addColorStop(1, 'rgba(6, 21, 34, 0)');

      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.85, 0, Math.PI * 2);
      ctx.fill();

      // 2. Pulsing multi-ring energy sun core (Butter center with Turquoise and Teal rings)
      const corePulse = Math.sin(pulseTime) * 6;
      const coreRadius = radius * 0.42 + corePulse;

      const coreGrad = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, coreRadius
      );
      coreGrad.addColorStop(0, '#FFFFFF'); // Pure White center dot
      coreGrad.addColorStop(0.22, '#F8E7AD'); // Butter Warm Gold
      coreGrad.addColorStop(0.50, '#36B1AB'); // Vibrant Turquoise ring
      coreGrad.addColorStop(0.78, '#1F8A90'); // Teal / Lagoon outer halo
      coreGrad.addColorStop(1, 'rgba(31, 138, 144, 0)');

      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreRadius, 0, Math.PI * 2);
      ctx.fill();

      // Transform & project 3D particles
      const projected: { x: number; y: number; z: number; size: number; color: string }[] = [];

      particles.forEach((p) => {
        p.angle += p.speed * speedFactor;

        let x1 = p.baseX;
        let y1 = p.baseY * Math.cos(rotX) - p.baseZ * Math.sin(rotX);
        let z1 = p.baseY * Math.sin(rotX) + p.baseZ * Math.cos(rotX);

        let x2 = x1 * Math.cos(rotY) + z1 * Math.sin(rotY);
        let y2 = y1;
        let z2 = -x1 * Math.sin(rotY) + z1 * Math.cos(rotY);

        const scale = 300 / (300 + z2);
        const px = centerX + x2 * scale;
        const py = centerY + y2 * scale;

        projected.push({
          x: px,
          y: py,
          z: z2,
          size: p.size * scale,
          color: p.color,
        });
      });

      // 3. Draw connecting energy lines with multi-color gradient strokes
      ctx.lineWidth = 1.2;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          if (dist < 85) {
            const alpha = (1 - dist / 85) * 0.42;
            const lineGrad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            lineGrad.addColorStop(0, p1.color);
            lineGrad.addColorStop(1, p2.color);

            ctx.globalAlpha = alpha;
            ctx.strokeStyle = lineGrad;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.globalAlpha = 1.0;
          }
        }
      }

      // 4. Draw particle nodes with depth sorting and color glow shadows
      projected.sort((a, b) => b.z - a.z);
      projected.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1, p.size), 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [state]);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

