
import React, { useEffect, useRef, useState } from 'react';

const MagicCursor: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  
  // Mouse Position
  const mouseRef = useRef({ x: -100, y: -100 });
  // Ring Position (lagged)
  const ringPosRef = useRef({ x: -100, y: -100 });
  
  // State for animations
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Event Listeners
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    
    // Handle hovering over interactive elements
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Detect buttons, links, inputs, and specific interactive classes
      const isInteractive = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer') ||
        target.classList.contains('group');

      setIsHovering(!!isInteractive);
    };

    const onMouseOut = () => {
      setIsHovering(false);
    };

    // Add listeners
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseout', onMouseOut);

    // Animation Loop
    let animationFrameId: number;

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const render = () => {
      const dot = cursorDotRef.current;
      const ring = cursorRingRef.current;

      if (dot && ring) {
        // 1. Move the central dot instantly
        dot.style.transform = `translate3d(${mouseRef.current.x}px, ${mouseRef.current.y}px, 0)`;

        // 2. Calculate Ring Physics (The "Magnetic" Feel)
        // We use a lower lerp factor to make it feel heavier/smoother
        const lerpFactor = 0.15; 

        ringPosRef.current.x = lerp(ringPosRef.current.x, mouseRef.current.x, lerpFactor);
        ringPosRef.current.y = lerp(ringPosRef.current.y, mouseRef.current.y, lerpFactor);

        // Apply transform to ring
        // We center the ring by subtracting half its size (assuming 32px default size, so -16px)
        // But we handle centering via CSS transform translate(-50%, -50%) usually, 
        // here we do it via raw coordinate calculation for better control during expansion.
        
        ring.style.transform = `translate3d(${ringPosRef.current.x}px, ${ringPosRef.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  // We return null on server-side or if not visible yet to prevent jumping
  if (typeof window === 'undefined') return null;

  return (
    <>
      {/* 
        GLOBAL CURSOR STYLES 
        Ensures the default cursor is hidden when this component is active.
        Only applies to non-touch devices via media query logic in CSS below.
      */}
      <style>{`
        @media (pointer: fine) {
          body, a, button, input {
            cursor: none !important;
          }
        }
      `}</style>

      {/* 
        CURSOR CONTAINER 
        Hidden on touch devices
      */}
      <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block mix-blend-screen">
        
        {/* INNER DOT (The Precision Pointer) */}
        <div
          ref={cursorDotRef}
          className={`
            absolute top-0 left-0 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]
            transform -translate-x-1/2 -translate-y-1/2 will-change-transform
            transition-opacity duration-300
            ${isVisible ? 'opacity-100' : 'opacity-0'}
          `}
        />

        {/* OUTER RING (The Magnetic Field) */}
        <div
          ref={cursorRingRef}
          className={`
            absolute top-0 left-0 rounded-full border will-change-transform flex items-center justify-center
            transition-all duration-300 ease-out
            -translate-x-1/2 -translate-y-1/2
            ${isVisible ? 'opacity-100' : 'opacity-0'}
            
            /* STATES */
            ${isHovering 
              ? 'w-12 h-12 border-neon-green bg-neon-green/10 shadow-[0_0_20px_rgba(10,255,0,0.4)]' // Hover State (Field Green)
              : 'w-8 h-8 border-neon-blue bg-transparent shadow-[0_0_10px_rgba(0,243,255,0.2)]' // Idle State (Tech Blue)
            }
            
            ${isClicking ? 'scale-75 border-tesla-red' : 'scale-100'}
          `}
        >
            {/* Optional: Crosshair detail for extra "Tech" feel when hovering */}
             <div className={`w-full h-[1px] bg-neon-green absolute transition-all duration-300 ${isHovering ? 'opacity-50 scale-100' : 'opacity-0 scale-0'}`}></div>
             <div className={`h-full w-[1px] bg-neon-green absolute transition-all duration-300 ${isHovering ? 'opacity-50 scale-100' : 'opacity-0 scale-0'}`}></div>
        </div>
      </div>
    </>
  );
};

export default MagicCursor;
