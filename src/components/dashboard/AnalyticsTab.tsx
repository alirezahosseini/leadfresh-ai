import React from 'react';
import { motion } from 'framer-motion';
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
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import { staggerContainer, fadeInUp } from '../../lib/utils';
import { monthlyRevenue, weeklyLeads, intentByIndustry, signalActivity } from '../../data/mockData';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-[#f0f0f0] rounded-xl px-3 py-2 shadow-lg text-xs">
        <p className="font-semibold text-[#0a0a0a] mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color || '#22c55e' }}>
            {p.name}: <strong>{p.value}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const AnalyticsTab: React.FC = () => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {/* Top metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Signals Detected', value: '18,420', change: '+34%', color: '#22c55e' },
          { label: 'Conversion Rate', value: '28.4%', change: '+5.1%', color: '#22c55e' },
          { label: 'Avg Response Time', value: '4.2h', change: '-22%', color: '#22c55e' },
          { label: 'Meetings Booked', value: '89', change: '+41%', color: '#22c55e' },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            variants={fadeInUp}
            className="bg-white rounded-2xl p-5 border border-[#f0f0f0]"
          >
            <p className="text-[10px] text-[#a3a3a3] uppercase tracking-widest font-semibold mb-1">{stat.label}</p>
            <p className="font-display font-black text-[#0a0a0a] tracking-tight text-2xl">{stat.value}</p>
            <span className="text-xs font-semibold" style={{ color: stat.color }}>{stat.change} vs last month</span>
          </motion.div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-[#f0f0f0] p-5">
          <h3 className="font-bold text-sm text-[#0a0a0a] mb-1">Pipeline Value (12 months)</h3>
          <p className="text-xs text-[#a3a3a3] mb-5">Revenue opportunity generated monthly</p>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRevenue}>
                <defs>
                  <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#a3a3a3' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#a3a3a3' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v/1000}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="value" name="Pipeline" stroke="#22c55e" strokeWidth={2} fill="url(#grad1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-[#f0f0f0] p-5">
          <h3 className="font-bold text-sm text-[#0a0a0a] mb-1">Lead Quality Funnel</h3>
          <p className="text-xs text-[#a3a3a3] mb-5">Detected → Qualified → Converted</p>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyLeads} barGap={3}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#a3a3a3' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#a3a3a3' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="leads" name="Detected" fill="#f0f0f0" radius={[3, 3, 0, 0]} barSize={12} />
                <Bar dataKey="qualified" name="Qualified" fill="#0a0a0a" radius={[3, 3, 0, 0]} barSize={12} />
                <Bar dataKey="converted" name="Converted" fill="#22c55e" radius={[3, 3, 0, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div variants={fadeInUp} className="lg:col-span-2 bg-white rounded-2xl border border-[#f0f0f0] p-5">
          <h3 className="font-bold text-sm text-[#0a0a0a] mb-1">Signal Activity (Today)</h3>
          <p className="text-xs text-[#a3a3a3] mb-5">Real-time detection by hour</p>
          <div style={{ height: 180 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={signalActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#a3a3a3' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#a3a3a3' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="value"
                  name="Signals"
                  stroke="#0a0a0a"
                  strokeWidth={2}
                  dot={{ fill: '#22c55e', r: 3, strokeWidth: 0 }}
                  activeDot={{ r: 5, fill: '#22c55e' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-[#f0f0f0] p-5">
          <h3 className="font-bold text-sm text-[#0a0a0a] mb-1">By Industry</h3>
          <p className="text-xs text-[#a3a3a3] mb-5">Lead distribution</p>
          <div className="flex items-center justify-center" style={{ height: 140 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={intentByIndustry}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={65}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {intentByIndustry.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) =>
                    active && payload?.length ? (
                      <div className="bg-white border border-[#f0f0f0] rounded-lg px-2 py-1 text-xs">
                        <strong>{payload[0].name}</strong>: {payload[0].value}%
                      </div>
                    ) : null
                  }
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {intentByIndustry.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-[#737373] flex-1">{item.name}</span>
                <span className="text-xs font-semibold text-[#0a0a0a]">{item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
