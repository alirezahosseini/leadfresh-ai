import React from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Sparkles,
  Globe,
  Calendar,
  DollarSign,
  ArrowUp,
  User,
  Mail,
} from 'lucide-react';
import { recentActivity } from '../../data/mockData';

const iconMap: Record<string, React.ElementType> = {
  trending: TrendingUp,
  sparkles: Sparkles,
  globe: Globe,
  calendar: Calendar,
  dollar: DollarSign,
  'arrow-up': ArrowUp,
  user: User,
  mail: Mail,
};

const typeColors: Record<string, { bg: string; icon: string }> = {
  signal: { bg: '#fef9c3', icon: '#d97706' },
  ai: { bg: '#f0fdf4', icon: '#16a34a' },
  crm: { bg: '#eff6ff', icon: '#3b82f6' },
};

export const ActivityFeed: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-[#f0f0f0] overflow-hidden">
      <div className="px-5 py-4 border-b border-[#f0f0f0] flex items-center justify-between">
        <div>
          <h3 className="font-bold text-sm text-[#0a0a0a]">Signal Activity</h3>
          <p className="text-xs text-[#a3a3a3] mt-0.5">Real-time lead triggers</p>
        </div>
        <span className="flex items-center gap-1.5 text-[10px] font-semibold text-green-700 bg-green-50 px-2 py-1 rounded-full border border-green-100">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Live
        </span>
      </div>

      <div className="divide-y divide-[#fafafa]">
        {recentActivity.map((activity, index) => {
          const Icon = iconMap[activity.icon] || Globe;
          const colors = typeColors[activity.type];

          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="flex items-start gap-3 px-5 py-4 hover:bg-[#fafafa] transition-colors"
            >
              <div
                className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                style={{ backgroundColor: colors.bg }}
              >
                <Icon size={13} style={{ color: colors.icon }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-[#0a0a0a]">{activity.company}</p>
                <p className="text-xs text-[#737373] leading-snug mt-0.5">{activity.event}</p>
              </div>
              <span className="text-[10px] text-[#d4d4d4] whitespace-nowrap shrink-0">{activity.time}</span>
            </motion.div>
          );
        })}
      </div>

      <div className="px-5 py-3 border-t border-[#f0f0f0]">
        <button className="text-xs text-[#737373] hover:text-[#0a0a0a] font-medium transition-colors">
          View all activity →
        </button>
      </div>
    </div>
  );
};
