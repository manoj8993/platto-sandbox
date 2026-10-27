// Shared building blocks. Reuse these in new screens so everything looks consistent.

import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

export function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  const styles: Record<ButtonVariant, string> = {
    primary: 'bg-saffron text-ink hover:brightness-95 disabled:bg-line disabled:text-mist',
    secondary: 'bg-white text-ink border border-ink/20 hover:border-ink/40 disabled:text-mist',
    ghost: 'bg-transparent text-ink hover:bg-ink/5 disabled:text-mist',
    danger: 'bg-tomato text-white hover:brightness-95 disabled:bg-line disabled:text-mist',
  };
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[15px] font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 disabled:cursor-not-allowed ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function ScreenHeader({ title, onBack, right }: { title: string; onBack?: () => void; right?: ReactNode }) {
  return (
    <div className="flex items-center gap-2 border-b border-line bg-white px-4 pb-3 pt-9">
      {onBack && (
        <button
          onClick={onBack}
          aria-label="Back"
          className="-ml-1 flex h-9 w-9 items-center justify-center rounded-full text-xl hover:bg-ink/5 focus-visible:ring-2 focus-visible:ring-ink"
        >
          ‹
        </button>
      )}
      <h1 className="flex-1 truncate text-[17px] font-semibold">{title}</h1>
      {right}
    </div>
  );
}

export function Badge({ tone = 'neutral', children }: { tone?: 'neutral' | 'good' | 'bad' | 'warn'; children: ReactNode }) {
  const tones = {
    neutral: 'bg-ink/5 text-ink',
    good: 'bg-basil/10 text-basil',
    bad: 'bg-tomato/10 text-tomato',
    warn: 'bg-saffron/25 text-ink',
  };
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${tones[tone]}`}>{children}</span>;
}

export function QuantityStepper({ value, onChange, label }: { value: number; onChange: (v: number) => void; label: string }) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-line bg-white" aria-label={label}>
      <button onClick={() => onChange(value - 1)} aria-label={`Remove one ${label}`} className="h-8 w-8 rounded-full text-lg hover:bg-ink/5">−</button>
      <span className="w-5 text-center text-sm font-semibold tabular-nums">{value}</span>
      <button onClick={() => onChange(value + 1)} aria-label={`Add one ${label}`} className="h-8 w-8 rounded-full text-lg hover:bg-ink/5">+</button>
    </div>
  );
}

/** Phone-sized frame for the customer and rider apps. */
export function PhoneFrame({ children, caption }: { children: ReactNode; caption?: string }) {
  return (
    <figure className="flex flex-col items-center gap-3">
      <div className="relative h-[780px] w-[380px] overflow-hidden rounded-[44px] border-[10px] border-ink bg-paper shadow-xl">
        <div className="absolute left-1/2 top-0 z-20 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-ink" />
        {/* Screens start at the very top; their headers leave room for the notch (pt-9 or more). */}
        <div className="flex h-full flex-col">{children}</div>
      </div>
      {caption && <figcaption className="text-sm font-medium text-mist">{caption}</figcaption>}
    </figure>
  );
}

/** Landscape tablet frame for the restaurant app. */
export function TabletFrame({ children, caption }: { children: ReactNode; caption?: string }) {
  return (
    <figure className="flex flex-col items-center gap-3">
      <div className="h-[640px] w-[960px] overflow-hidden rounded-[28px] border-[14px] border-ink bg-paper shadow-xl">
        <div className="flex h-full flex-col">{children}</div>
      </div>
      {caption && <figcaption className="text-sm font-medium text-mist">{caption}</figcaption>}
    </figure>
  );
}
