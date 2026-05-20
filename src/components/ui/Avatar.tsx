import React from 'react';
import { cn } from '../../lib/utils';

interface AvatarProps {
  initials: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

const colors = [
  'bg-violet-100 text-violet-700',
  'bg-blue-100 text-blue-700',
  'bg-green-100 text-green-700',
  'bg-amber-100 text-amber-700',
  'bg-rose-100 text-rose-700',
  'bg-cyan-100 text-cyan-700',
  'bg-indigo-100 text-indigo-700',
  'bg-orange-100 text-orange-700',
];

function getColorFromInitials(initials: string): string {
  const index = initials.charCodeAt(0) % colors.length;
  return colors[index];
}

export const Avatar: React.FC<AvatarProps> = ({ initials, size = 'md', className }) => {
  const sizes = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-7 h-7 text-xs',
    md: 'w-8 h-8 text-xs',
    lg: 'w-10 h-10 text-sm',
  };

  const colorClass = getColorFromInitials(initials);

  return (
    <div className={cn(
      'rounded-full flex items-center justify-center font-semibold shrink-0',
      sizes[size],
      colorClass,
      className
    )}>
      {initials}
    </div>
  );
};
