import { useState, type CSSProperties } from 'react';

interface LogoImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
}

export default function LogoImage({ src, alt, className = '', style }: LogoImageProps) {
  const [loaded, setLoaded] = useState(false);

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
          src={src}
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