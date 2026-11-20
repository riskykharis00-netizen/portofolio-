import { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface MediaFrameProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}

export function MediaFrame({
  src,
  alt,
  title,
  className = '',
  imgClassName = '',
  priority = false,
}: MediaFrameProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-100 via-zinc-200/70 to-zinc-100 p-6 text-center ${className}`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(24,24,27,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(24,24,27,0.06) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="relative z-10 flex flex-col items-center gap-2.5 text-zinc-600">
          <ImageOff className="h-5 w-5 stroke-[1.5]" aria-hidden="true" />
          <span className="max-w-xs font-display text-sm font-medium text-zinc-800">
            {title || alt}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-zinc-100 ${className}`}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading={priority ? 'eager' : 'lazy'}
        onError={() => setHasError(true)}
        className={`h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  );
}
