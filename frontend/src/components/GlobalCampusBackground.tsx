import React, { useEffect, useRef, useState } from 'react';

export const GlobalCampusBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameFloatRef = useRef(0);
  const targetFrameRef = useRef(0);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });
  const lastStateRef = useRef({ frame: -1, mx: -999, my: -999 });
  const animFrameIdRef = useRef<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const TOTAL_FRAMES = 300;

  // High-performance progressive frame preloading
  useEffect(() => {
    const imgs: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    const loadFrame = (index: number) => {
      if (imgs[index]) return;
      const img = new Image();
      const num = String(index + 1).padStart(3, '0');
      img.src = `/campus/sequence_300/frame-${num}.webp`;
      img.onerror = () => {
        img.src = `/campus/sequence_png/ezgif-frame-${num}.png`;
      };
      img.onload = () => {
        setIsLoaded(true);
      };
      imgs[index] = img;
    };

    // Phase 1: Rapid keyframe preloading (every 4th frame) across the whole page
    for (let i = 0; i < TOTAL_FRAMES; i += 4) {
      loadFrame(i);
    }
    loadFrame(TOTAL_FRAMES - 1);

    // Phase 2: Fill intermediate frames
    const timer = setTimeout(() => {
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        loadFrame(i);
      }
    }, 80);

    imagesRef.current = imgs;
    return () => clearTimeout(timer);
  }, []);

  // Continuous 60fps render loop with smart dirty-state checking (prevents useless redraws)
  useEffect(() => {
    if (!isLoaded) return;

    const renderLoop = () => {
      // Interpolate target frame index (fast 0.20 lerp for immediate responsive scrolling)
      const diff = targetFrameRef.current - currentFrameFloatRef.current;
      if (Math.abs(diff) > 0.001) {
        currentFrameFloatRef.current += diff * 0.20;
      } else {
        currentFrameFloatRef.current = targetFrameRef.current;
      }

      // Interpolate mouse parallax
      mousePosRef.current.x += (targetMouseRef.current.x - mousePosRef.current.x) * 0.1;
      mousePosRef.current.y += (targetMouseRef.current.y - mousePosRef.current.y) * 0.1;

      const frameIdx = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(currentFrameFloatRef.current)));
      const mx = Math.round(mousePosRef.current.x);
      const my = Math.round(mousePosRef.current.y);

      // CRITICAL LAG FIX: Only draw on canvas when frame or mouse parallax actually changes!
      if (
        lastStateRef.current.frame !== frameIdx ||
        lastStateRef.current.mx !== mx ||
        lastStateRef.current.my !== my
      ) {
        drawCanvas(frameIdx, mx, my);
        lastStateRef.current = { frame: frameIdx, mx, my };
      }

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [isLoaded]);

  // Draw crisp, razor-sharp background canvas
  const drawCanvas = (index: number, mx: number, my: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Remap camera-motion-blurred transition frames (112-128) to sharp stationary keyframes
    let targetIdx = index;
    if (targetIdx >= 112 && targetIdx <= 128) {
      targetIdx = targetIdx < 120 ? 110 : 130;
    }

    const img = imagesRef.current[targetIdx] || imagesRef.current[index];
    if (img && img.complete && img.naturalWidth !== 0) {
      drawImg(ctx, canvas, img, mx, my);
      return;
    }

    // Fallback to nearest loaded keyframe
    for (let offset = 1; offset < 40; offset++) {
      const prev = imagesRef.current[Math.max(0, targetIdx - offset)];
      if (prev && prev.complete && prev.naturalWidth !== 0) {
        drawImg(ctx, canvas, prev, mx, my);
        return;
      }
      const next = imagesRef.current[Math.min(TOTAL_FRAMES - 1, targetIdx + offset)];
      if (next && next.complete && next.naturalWidth !== 0) {
        drawImg(ctx, canvas, next, mx, my);
        return;
      }
    }
  };

  // Render image onto canvas with exact integer pixel snapping to eliminate sub-pixel blur
  const drawImg = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    img: HTMLImageElement,
    mx: number,
    my: number
  ) => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth || img.width;
    const ih = img.naturalHeight || img.height;

    if (!iw || !ih) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Cover scale calculation + slight 2% scale for parallax drift
    const scale = Math.max(cw / iw, ch / ih) * 1.02;
    const nw = iw * scale;
    const nh = ih * scale;

    const cx = (cw - nw) / 2 + mx * dpr;
    const cy = (ch - nh) / 2 + my * dpr;

    // Exact Integer Pixel Snapping
    const rx = Math.round(cx);
    const ry = Math.round(cy);
    const rw = Math.round(nw);
    const rh = Math.round(nh);

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, rx, ry, rw, rh);
  };

  // Scroll listener: Map page scroll position to 300 frames
  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      const progress = Math.max(0, Math.min(1, window.scrollY / maxScroll));
      targetFrameRef.current = progress * (TOTAL_FRAMES - 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoaded]);

  // Mouse move listener: Parallax camera drift (throttled)
  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const x = (e.clientX / window.innerWidth - 0.5) * -10;
          const y = (e.clientY / window.innerHeight - 0.5) * -10;
          targetMouseRef.current = { x, y };
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isLoaded]);

  // High-DPI Responsive Canvas Resize Listener
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 w-full h-full object-cover pointer-events-none"
    />
  );
};



