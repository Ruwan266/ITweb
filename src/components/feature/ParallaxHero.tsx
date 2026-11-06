import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useScrollPosition';
import { isHydrating } from '@/lib/hydration';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxHeroProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function ParallaxHero({ children, className = '', id }: ParallaxHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const bgElement = containerRef.current?.querySelector('.parallax-bg');
      if (!bgElement) return;

      gsap.fromTo(
        bgElement,
        { scale: 1.08 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      );

      const contentElement = containerRef.current?.querySelector('.parallax-content');
      // Prerendered hero copy is already on screen, so skip its entrance on first load.
      if (contentElement && !isHydrating()) {
        gsap.fromTo(
          contentElement,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
            delay: 0.2,
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <div ref={containerRef} id={id} className={`relative overflow-hidden ${className}`}>
      {children}
    </div>
  );
}