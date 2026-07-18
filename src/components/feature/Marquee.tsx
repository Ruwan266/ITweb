interface MarqueeProps {
  items: string[];
  direction?: 'left' | 'right';
  className?: string;
}

export default function Marquee({ items, direction = 'left', className = '' }: MarqueeProps) {
  const doubled = [...items, ...items];

  return (
    <div className={`overflow-hidden max-w-full whitespace-nowrap ${className}`}>
      <div
        className={`inline-flex w-max ${direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'}`}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center mx-6 sm:mx-8 text-xs sm:text-sm md:text-base font-medium tracking-widest uppercase text-foreground-400/60 whitespace-nowrap"
          >
            {item}
            <span className="mx-4 sm:mx-6 w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-accent-400/40 inline-block flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}