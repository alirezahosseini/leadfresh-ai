import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface MetricCardProps {
  label: string;
  value: string;
  change: number;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  delay?: number;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  change,
  icon: Icon,
  iconColor = '#0a0a0a',
  iconBg = '#f5f5f5',
  delay = 0,
}) => {
  const isPositive = change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="bg-white rounded-2xl p-5 border border-[#f0f0f0] card-shadow hover:border-[#e5e5e5] transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: iconBg }}
        >
          <Icon size={16} style={{ color: iconColor }} />
        </div>
        <div
          className={cn(
            'flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full',
            isPositive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
          )}
        >
          {isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
          {isPositive ? '+' : ''}{change}%
        </div>
      </div>
      <p className="text-[10px] text-[#a3a3a3] uppercase tracking-widest font-semibold mb-1">{label}</p>
      <p className="font-display font-black text-[#0a0a0a] tracking-tight" style={{ fontSize: '1.6rem' }}>
        {value}
      </p>
    </motion.div>
  );
};
