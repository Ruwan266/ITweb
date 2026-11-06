import { useEffect, useRef, useState, type CSSProperties } from 'react';

/** Single source of truth for the brand logo asset (served from /public). */
export const LOGO_SRC = '/logo.png';
export const LOGO_ALT = 'SmartInfinity Solutions';

/** Same artwork at header size; the 988px original is 444 KB for a ~76px-tall slot. */
const LOGO_SRCSET = '/logo-320.png 320w, /logo.png 988w';
const LOGO_WIDTH = 988;
const LOGO_HEIGHT = 525;

interface LogoImageProps {
  /** Defaults to the brand logo; override only for a different mark. */
  src?: string;
  alt?: string;
  className?: string;
  style?: CSSProperties;
}

export default function LogoImage({ src = LOGO_SRC, alt = LOGO_ALT, className = '', style }: LogoImageProps) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // A prerendered <img> can finish loading before hydration attaches onLoad.
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  return (
    <div className="logo-entrance">
      <div className="relative flex-shrink-0 overflow-hidden rounded-lg" style={style}>
        {/* Shimmer placeholder — visible until image loads */}
        <div
          className={`absolute inset-0 bg-neutral-200 rounded-lg logo-shimmer ${loaded ? 'opacity-0' : 'opacity-100'}`}
          aria-hidden="true"
        />

        {/* Actual logo image with hover glow */}
        <img
          ref={imgRef}
          src={src}
          srcSet={src === LOGO_SRC ? LOGO_SRCSET : undefined}
          sizes={src === LOGO_SRC ? '160px' : undefined}
          width={src === LOGO_SRC ? LOGO_WIDTH : undefined}
          height={src === LOGO_SRC ? LOGO_HEIGHT : undefined}
          alt={alt}
          className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'} logo-glow`}
          style={{
            transition: 'opacity 500ms ease-out',
          }}
          onLoad={() => setLoaded(true)}
          loading="eager"
        />
      </div>
    </div>
  );
}
