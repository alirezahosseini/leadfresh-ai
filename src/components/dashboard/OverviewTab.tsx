import React from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Flame,
  Target,
  DollarSign,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from 'recharts';
import { MetricCard } from './MetricCard';
import { ActivityFeed } from './ActivityFeed';
import { IntentScore } from '../ui/IntentScore';
import { Badge } from '../ui/Badge';
import { metrics, monthlyRevenue, weeklyLeads, leads } from '../../data/mockData';
import { staggerContainer, fadeInUp } from '../../lib/utils';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-[#f0f0f0] rounded-xl px-3 py-2 shadow-lg text-xs">
        <p className="font-semibold text-[#0a0a0a] mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color || '#22c55e' }}>
            {p.name}: <strong>{typeof p.value === 'number' && p.value > 1000 ? `$${(p.value/1000).toFixed(0)}k` : p.value}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const OverviewTab: React.FC = () => {
  const metricCards = [
    { label: 'Total Leads', value: '2,847', change: metrics.leadsGrowth, icon: Users, iconColor: '#3b82f6', iconBg: '#eff6ff' },
    { label: 'Hot Leads', value: '142', change: metrics.hotLeadsGrowth, icon: Flame, iconColor: '#ef4444', iconBg: '#fef2f2' },
    { label: 'Avg Score', value: '76.4', change: metrics.scoreGrowth, icon: Target, iconColor: '#22c55e', iconBg: '#f0fdf4' },
    { label: 'Pipeline', value: '$1.24M', change: metrics.pipelineGrowth, icon: DollarSign, iconColor: '#8b5cf6', iconBg: '#f5f3ff' },
  ];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Metric cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {metricCards.map((card, i) => (
          <MetricCard key={card.label} {...card} delay={i * 0.07} />
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Pipeline chart */}
        <motion.div
          variants={fadeInUp}
          className="xl:col-span-2 bg-white rounded-2xl border border-[#f0f0f0] p-5"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-sm text-[#0a0a0a]">Pipeline Opportunity</h3>
              <p className="text-xs text-[#a3a3a3] mt-0.5">Monthly pipeline value generated</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">+31.7%</span>
            </div>
          </div>
          <div style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRevenue}>
                <defs>
                  <linearGradient id="pipelineGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity={0.12} />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#a3a3a3' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#a3a3a3' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v/1000}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  name="Pipeline"
                  stroke="#22c55e"
                  strokeWidth={1.5}
                  fill="url(#pipelineGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Weekly bar chart */}
        <motion.div
          variants={fadeInUp}
          className="bg-white rounded-2xl border border-[#f0f0f0] p-5"
        >
          <div className="mb-5">
            <h3 className="font-bold text-sm text-[#0a0a0a]">Weekly Leads</h3>
            <p className="text-xs text-[#a3a3a3] mt-0.5">Detected this week</p>
          </div>
          <div style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyLeads} barSize={10}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#a3a3a3' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#a3a3a3' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="leads" name="Detected" radius={[3, 3, 0, 0]}>
                  {weeklyLeads.map((_, i) => (
                    <Cell key={i} fill={i === weeklyLeads.length - 3 ? '#22c55e' : '#f0f0f0'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Hot leads + activity */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        {/* Hot leads table */}
        <motion.div
          variants={fadeInUp}
          className="xl:col-span-3 bg-white rounded-2xl border border-[#f0f0f0] overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-[#f0f0f0] flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-[#0a0a0a]">Top Intent Leads</h3>
              <p className="text-xs text-[#a3a3a3] mt-0.5">Highest scoring companies today</p>
            </div>
            <Badge variant="green">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Live
            </Badge>
          </div>

          <div className="divide-y divide-[#fafafa]">
            {leads.slice(0, 6).map((lead, index) => (
              <motion.div
                key={lead.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.06 }}
                whileHover={{ backgroundColor: '#fafafa' }}
                className="flex items-center gap-4 px-5 py-3.5 cursor-pointer transition-colors"
              >
                <div className="w-8 h-8 rounded-xl bg-[#f5f5f5] flex items-center justify-center text-xs font-bold text-[#525252] shrink-0">
                  {lead.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[#0a0a0a] truncate">{lead.company}</span>
                    <Badge variant={lead.status === 'hot' ? 'red' : lead.status === 'warm' ? 'amber' : 'gray'}>
                      {lead.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    {lead.signals.slice(0, 1).map((s) => (
                      <span key={s} className="text-[10px] text-[#a3a3a3]">{s}</span>
                    ))}
                  </div>
                </div>
                <div className="hidden sm:flex flex-col items-end gap-0.5 mr-2">
                  <span className="text-[10px] text-[#a3a3a3]">{lead.industry}</span>
                  <span className="text-[10px] text-[#d4d4d4]">{lead.lastActivity}</span>
                </div>
                <IntentScore score={lead.intentScore} size="md" showLabel />
              </motion.div>
            ))}
          </div>

          <div className="px-5 py-3.5 border-t border-[#f0f0f0]">
            <button className="text-xs text-[#737373] hover:text-[#0a0a0a] font-medium transition-colors">
              View all 142 hot leads →
            </button>
          </div>
        </motion.div>

        {/* Activity feed */}
        <motion.div variants={fadeInUp} className="xl:col-span-2">
          <ActivityFeed />
        </motion.div>
      </div>
    </motion.div>
  );
};
