import React, { useEffect, useRef, useState } from 'react';
import { Compass, Eye, MapPin, Sparkles } from 'lucide-react';

export const CampusJourney: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const TOTAL_FRAMES = 50;

  // Phase metadata for floating info cards during sequence scroll
  const phases = [
    {
      range: [0, 10],
      title: 'Phase 01: Scenic Campus Approach',
      subtitle: 'THE GATEWAY',
      desc: 'The tree-lined campus road welcoming students into Wadala\'s premier engineering destination.',
      location: 'VIT Main Entrance Avenue',
    },
    {
      range: [11, 22],
      title: 'Phase 02: Blue Glass Architecture',
      subtitle: 'MODERN INFRASTRUCTURE',
      desc: 'Iconic multi-story academic wings featuring modern reflective blue glass facades and eco-friendly landscaping.',
      location: 'Academic Block A & B',
    },
    {
      range: [23, 33],
      title: 'Phase 03: Grand Atrium & Quadrangle',
      subtitle: 'STUDENT HUB',
      desc: 'Sunlit interior atrium and sprawling steps where engineering minds converge, collaborate, and innovate.',
      location: 'Central Atrium Lounge',
    },
    {
      range: [34, 50],
      title: 'Phase 04: Advanced Tech Labs & Walkways',
      subtitle: 'INNOVATION ZONE',
      desc: 'High-speed computing centers, AI research labs, and open elevated walkways connecting academic blocks.',
      location: 'Computer Engineering Department',
    },
  ];

  // Preload 50 WebP frames
  useEffect(() => {
    let loaded = 0;
    const imgs: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(2, '0');
      img.src = `/campus/sequence/frame-${frameNum}.webp`;
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;
  }, []);

  // Draw frame on canvas
  const drawFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.width;
    const ih = img.height;

    // Cover scale calculation
    const scale = Math.max(cw / iw, ch / ih);
    const nw = iw * scale;
    const nh = ih * scale;
    const cx = (cw - nw) / 2;
    const cy = (ch - nh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, cx, cy, nw, nh);
  };

  // Scroll scrubbing logic
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollDistance = rect.height - windowHeight;

      if (totalScrollDistance <= 0) return;

      const scrollProgress = Math.max(0, Math.min(1, -rect.top / totalScrollDistance));
      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.floor(scrollProgress * TOTAL_FRAMES)
      );

      setCurrentStep(frameIndex);
      requestAnimationFrame(() => drawFrame(frameIndex));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoaded]);

  // Handle canvas resize
  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      drawFrame(currentStep);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    return () => window.removeEventListener('resize', resizeCanvas);
  }, [currentStep]);

  // Determine current active phase info
  const activePhase =
    phases.find((p) => currentStep >= p.range[0] && currentStep <= p.range[1]) ||
    phases[0];

  return (
    <section id="campus-journey" ref={containerRef} className="relative h-[300vh] w-full bg-[#07111F]">
      {/* Sticky Canvas Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* HTML5 Render Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover filter brightness-[0.9] contrast-[1.08] transition-all duration-300"
        />

        {/* Ambient Dark Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07111F] via-transparent to-[#07111F]/70 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07111F]/80 via-transparent to-[#07111F]/80 pointer-events-none" />

        {/* Top Floating Badge */}
        <div className="absolute top-28 left-6 md:left-12 z-20 flex items-center space-x-3 px-4 py-2 rounded-full bg-[#07111F]/85 border border-[#D6A84F]/40 backdrop-blur-xl shadow-2xl">
          <Compass className="w-4 h-4 text-[#E8C477] animate-spin-slow" />
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#E8C477]">
            VIRTUAL CAMPUS WALKTHROUGH
          </span>
          <span className="text-[10px] text-[#1688D8] font-mono border-l border-[#D6A84F]/30 pl-2">
            FRAME {currentStep + 1} / {TOTAL_FRAMES}
          </span>
        </div>

        {/* Right Floating Progress Scrubber Bar */}
        <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-20 hidden sm:flex flex-col items-center space-y-2">
          <span className="text-[10px] font-mono text-[#E8C477]">START</span>
          <div className="w-1 h-48 bg-[#0B1A2F] rounded-full overflow-hidden border border-[#D6A84F]/30 relative">
            <div
              className="w-full bg-gradient-to-b from-[#D6A84F] to-[#1688D8] transition-all duration-150 rounded-full"
              style={{ height: `${((currentStep + 1) / TOTAL_FRAMES) * 100}%` }}
            />
          </div>
          <span className="text-[10px] font-mono text-[#1688D8]">END</span>
        </div>

        {/* Dynamic Glass Info Card overlayed on scroll */}
        <div className="absolute bottom-10 left-6 md:left-12 right-6 md:right-auto md:max-w-md z-20">
          <div className="glass-card-gold p-6 sm:p-8 rounded-3xl border border-[#D6A84F]/35 backdrop-blur-2xl bg-[#07111F]/90 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded bg-[#D6A84F]/20 text-[#E8C477] border border-[#D6A84F]/40">
                {activePhase.subtitle}
              </span>
              <div className="flex items-center space-x-1.5 text-xs text-[#1688D8] font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#D6A84F]" />
                <span>{activePhase.location}</span>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-[#F5F2EA] font-display">
              {activePhase.title}
            </h3>

            <p className="text-xs sm:text-sm text-[#F5F2EA]/85 font-light leading-relaxed">
              {activePhase.desc}
            </p>

            <div className="pt-3 border-t border-[#D6A84F]/20 flex items-center justify-between text-[11px] text-[#F5F2EA]/70">
              <span className="flex items-center space-x-1.5">
                <Eye className="w-3.5 h-3.5 text-[#E8C477]" />
                <span>Real Video Extraction Frame</span>
              </span>
              <span className="font-mono text-[#E8C477] font-bold">
                SCROLL DOWN ↓
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
