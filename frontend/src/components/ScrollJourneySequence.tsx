import React, { useEffect, useRef, useState } from 'react';

export const ScrollJourneySequence: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const TOTAL_FRAMES = 50;

  const journeyMilestones = [
    {
      range: [0, 12],
      step: '01',
      title: 'THE CAMPUS APPROACH',
      subtitle: 'SCENIC TREE-LINED AVENUE',
      text: 'Entering Vidyalankar Campus Marg — a calm green sanctuary amidst Wadala’s educational hub.',
    },
    {
      range: [13, 25],
      step: '02',
      title: 'REFLECTIVE GLASS FACADES',
      subtitle: 'AUTONOMOUS ACADEMIC BLOCKS',
      text: 'Iconic multi-story architectural wings housing modern computer engineering research labs.',
    },
    {
      range: [26, 38],
      step: '03',
      title: 'THE CENTRAL QUADRANGLE',
      subtitle: 'ATRIUM & AMPHITHEATER STEPS',
      text: 'Where student culture, collaborative discussions, and hackathon ideation take place daily.',
    },
    {
      range: [39, 49],
      step: '04',
      title: 'COMPUTING & AI LABS',
      subtitle: 'HIGH-PERFORMANCE INFRASTRUCTURE',
      text: 'State-of-the-art workstation clusters, GPU computing rigs, and cloud infrastructure.',
    },
  ];

  // Preload 50 WebP frames
  useEffect(() => {
    let count = 0;
    const imgs: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const num = String(i).padStart(2, '0');
      img.src = `/campus/sequence/frame-${num}.webp`;
      img.onload = () => {
        count++;
        if (count === TOTAL_FRAMES) {
          setIsReady(true);
        }
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;
  }, []);

  // Draw frame on canvas with aspect ratio covering
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.width;
    const ih = img.height;

    const scale = Math.max(cw / iw, ch / ih);
    const nw = iw * scale;
    const nh = ih * scale;
    const cx = (cw - nw) / 2;
    const cy = (ch - nh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, cx, cy, nw, nh);
  };

  // Handle scroll scrubbing
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScroll = rect.height - windowHeight;

      if (totalScroll <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / totalScroll));
      const frameIdx = Math.min(
        TOTAL_FRAMES - 1,
        Math.floor(progress * TOTAL_FRAMES)
      );

      setCurrentFrame(frameIdx);
      requestAnimationFrame(() => drawFrame(frameIdx));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isReady]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      drawFrame(currentFrame);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [currentFrame]);

  // Current active milestone caption
  const activeMilestone =
    journeyMilestones.find(
      (m) => currentFrame >= m.range[0] && currentFrame <= m.range[1]
    ) || journeyMilestones[0];

  return (
    <section id="journey" ref={containerRef} className="relative h-[350vh] w-full bg-[#07111F]">
      {/* Sticky Fullscreen Canvas Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Render Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover filter brightness-[0.88] contrast-[1.08] transition-all duration-200"
        />

        {/* Ambient Dark Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07111F] via-transparent to-[#07111F]/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07111F]/80 via-transparent to-[#07111F]/40 pointer-events-none" />

        {/* Top Minimal Step Counter */}
        <div className="absolute top-28 left-6 sm:left-12 z-20 flex items-center space-x-3">
          <span className="text-3xl font-black text-[#E8C477] font-display">
            {activeMilestone.step}
          </span>
          <div className="w-px h-8 bg-[#D6A84F]/40" />
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#F5F2EA]/80 uppercase">
            CAMPUS JOURNEY SCRUB
          </span>
        </div>

        {/* Floating Asymmetric Editorial Text (Bottom Left) */}
        <div className="absolute bottom-12 left-6 sm:left-12 max-w-md z-20 space-y-3">
          <div className="text-[9px] font-mono tracking-[0.3em] text-[#1688D8] uppercase">
            {activeMilestone.subtitle}
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#F5F2EA] font-display tracking-tight leading-tight">
            {activeMilestone.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#F5F2EA]/80 font-light leading-relaxed">
            {activeMilestone.text}
          </p>
        </div>

        {/* Right Vertical Progress Line */}
        <div className="absolute right-6 sm:right-12 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center space-y-3">
          <span className="text-[9px] font-mono text-[#E8C477]">01</span>
          <div className="w-0.5 h-36 bg-[#07111F] rounded-full overflow-hidden border border-[#D6A84F]/30 relative">
            <div
              className="w-full bg-[#E8C477] transition-all duration-150 rounded-full"
              style={{ height: `${((currentFrame + 1) / TOTAL_FRAMES) * 100}%` }}
            />
          </div>
          <span className="text-[9px] font-mono text-[#1688D8]">50</span>
        </div>
      </div>
    </section>
  );
};
