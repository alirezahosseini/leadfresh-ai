import React from 'react';
import { cn } from '../../lib/utils';

interface IntentScoreProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export const IntentScore: React.FC<IntentScoreProps> = ({
  score,
  size = 'md',
  showLabel = false,
  className,
}) => {
  const getColor = (s: number) => {
    if (s >= 85) return { text: '#16a34a', bg: '#dcfce7', ring: '#22c55e' };
    if (s >= 70) return { text: '#d97706', bg: '#fef9c3', ring: '#f59e0b' };
    return { text: '#737373', bg: '#f5f5f5', ring: '#d4d4d4' };
  };

  const getLabel = (s: number) => {
    if (s >= 85) return 'Hot';
    if (s >= 70) return 'Warm';
    return 'Cold';
  };

  const colors = getColor(score);
  const sizes = {
    sm: { container: 'w-8 h-8 text-xs', stroke: 16, r: 14, cx: 16, cy: 16, vb: '0 0 32 32' },
    md: { container: 'w-10 h-10 text-xs', stroke: 14, r: 18, cx: 20, cy: 20, vb: '0 0 40 40' },
    lg: { container: 'w-14 h-14 text-sm', stroke: 12, r: 24, cx: 28, cy: 28, vb: '0 0 56 56' },
  };

  const s = sizes[size];
  const circumference = 2 * Math.PI * s.r;
  const progress = circumference - (score / 100) * circumference;

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className={cn('relative flex items-center justify-center', s.container)}>
        <svg viewBox={s.vb} fill="none" className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx={s.cx} cy={s.cy} r={s.r}
            stroke="#f0f0f0" strokeWidth={s.stroke}
            fill="none"
          />
          <circle
            cx={s.cx} cy={s.cy} r={s.r}
            stroke={colors.ring} strokeWidth={s.stroke}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={progress}
            style={{ transition: 'stroke-dashoffset 0.6s ease' }}
          />
        </svg>
        <span className="relative font-bold text-[10px]" style={{ color: colors.text }}>
          {score}
        </span>
      </div>
      {showLabel && (
        <span className="text-xs font-semibold" style={{ color: colors.text }}>
          {getLabel(score)}
        </span>
      )}
    </div>
  );
};
