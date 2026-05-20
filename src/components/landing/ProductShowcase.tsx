import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { leads, weeklyLeads, monthlyRevenue } from '../../data/mockData';
import { IntentScore } from '../ui/IntentScore';
import { Badge } from '../ui/Badge';
import { TrendingUp, Zap, Users, BarChart3 } from 'lucide-react';

const tabs = [
  { id: 'leads', label: 'Lead Feed', icon: Users },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'signals', label: 'Signal Activity', icon: TrendingUp },
  { id: 'ai', label: 'AI Insights', icon: Zap },
];

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-neutral-100 rounded-xl px-3 py-2 shadow-lg text-xs">
        <p className="font-semibold text-[#0a0a0a] mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color || '#22c55e' }}>{p.name}: <strong>{p.value}</strong></p>
        ))}
      </div>
    );
  }
  return null;
};

export const ProductShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState('leads');

  return (
    <section id="product" className="py-32 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-16">
          <motion.div variants={item} className="mb-4">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-neutral-400">
              <span className="w-4 h-px bg-neutral-200" />
              Product
            </span>
          </motion.div>
          <motion.h2
            variants={item}
            className="font-black text-[#0a0a0a] tracking-tight leading-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.03em' }}
          >
            The command center
            <br />
            <span className="text-neutral-300">for pipeline intelligence.</span>
          </motion.h2>
          <motion.p variants={item} className="text-neutral-500 text-lg max-w-xl leading-relaxed">
            A dashboard designed for signal-driven sales — not spreadsheet chaos.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-3xl border border-neutral-200 overflow-hidden"
          style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.04), 0 24px 64px rgba(0,0,0,0.06)' }}
        >
          {/* Tab bar */}
          <div className="border-b border-neutral-100 px-6 py-4 flex items-center gap-1 overflow-x-auto">
            <div className="flex items-center gap-1.5 mr-6">
              <div className="w-3 h-3 rounded-full bg-neutral-100" />
              <div className="w-3 h-3 rounded-full bg-neutral-100" />
              <div className="w-3 h-3 rounded-full bg-neutral-100" />
            </div>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 whitespace-nowrap ${
                    activeTab === tab.id ? 'bg-neutral-100 text-[#0a0a0a]' : 'text-neutral-400 hover:text-neutral-600'
                  }`}
                >
                  <Icon size={13} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div className="p-6 min-h-[480px]">
            <AnimatePresence mode="wait">
              {activeTab === 'leads' && (
                <motion.div key="leads" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h3 className="font-bold text-[#0a0a0a] text-base mb-0.5">Today's Hot Leads</h3>
                      <p className="text-xs text-neutral-400">Sorted by intent score — updated 2 minutes ago</p>
                    </div>
                    <Badge variant="green"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />Live</Badge>
                  </div>
                  <div className="space-y-2">
                    {leads.slice(0, 6).map((lead) => (
                      <motion.div
                        key={lead.id}
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.15 }}
                        className="flex items-center gap-4 p-4 rounded-2xl border border-neutral-100 hover:border-neutral-200 hover:bg-neutral-50 transition-all duration-150 cursor-pointer"
                      >
                        <div className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center text-xs font-bold text-neutral-500">{lead.avatar}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="font-semibold text-sm text-[#0a0a0a]">{lead.company}</span>
                            <Badge variant={lead.status === 'hot' ? 'red' : lead.status === 'warm' ? 'amber' : 'gray'}>{lead.status}</Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            {lead.signals.slice(0, 2).map((s) => (
                              <span key={s} className="text-[10px] text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded-full">{s}</span>
                            ))}
                          </div>
                        </div>
                        <div className="hidden sm:flex flex-col items-end gap-1 mr-3">
                          <span className="text-xs text-neutral-400">{lead.industry}</span>
                          <span className="text-xs text-neutral-300">{lead.lastActivity}</span>
                        </div>
                        <IntentScore score={lead.intentScore} size="md" showLabel />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'analytics' && (
                <motion.div key="analytics" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                  <div className="mb-5">
                    <h3 className="font-bold text-[#0a0a0a] text-base mb-0.5">Pipeline Growth</h3>
                    <p className="text-xs text-neutral-400">12-month revenue opportunity from qualified leads</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {[
                      { label: 'Total Pipeline', val: '$1.24M', change: '+31.7%' },
                      { label: 'Qualified This Month', val: '284', change: '+23.4%' },
                      { label: 'Avg Deal Size', val: '$4,366', change: '+8.2%' },
                    ].map((m) => (
                      <div key={m.label} className="bg-neutral-50 rounded-2xl p-4 border border-neutral-100">
                        <p className="text-xs text-neutral-400 mb-2">{m.label}</p>
                        <p className="text-xl font-black text-[#0a0a0a] tracking-tight">{m.val}</p>
                        <span className="text-xs font-semibold text-green-600">{m.change}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ height: 240 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={monthlyRevenue}>
                        <defs>
                          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#22c55e" stopOpacity={0.15} />
                            <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                        <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#a3a3a3' }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 11, fill: '#a3a3a3' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v/1000}k`} />
                        <Tooltip content={<CustomTooltip />} />
                        <Area type="monotone" dataKey="value" name="Pipeline" stroke="#22c55e" strokeWidth={2} fill="url(#areaGrad)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              )}

              {activeTab === 'signals' && (
                <motion.div key="signals" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                  <div className="mb-5">
                    <h3 className="font-bold text-[#0a0a0a] text-base mb-0.5">Weekly Signal Volume</h3>
                    <p className="text-xs text-neutral-400">Hiring signals, website changes, and social intent detected</p>
                  </div>
                  <div style={{ height: 280 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weeklyLeads} barGap={2}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" vertical={false} />
                        <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#a3a3a3' }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 11, fill: '#a3a3a3' }} axisLine={false} tickLine={false} />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="leads" name="Detected" fill="#e5e5e5" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="qualified" name="Qualified" fill="#0a0a0a" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="converted" name="Converted" fill="#22c55e" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex items-center gap-6 mt-4">
                    {[
                      { label: 'Detected', color: '#e5e5e5' },
                      { label: 'Qualified', color: '#0a0a0a' },
                      { label: 'Converted', color: '#22c55e' },
                    ].map((l) => (
                      <div key={l.label} className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: l.color }} />
                        <span className="text-xs text-neutral-400">{l.label}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'ai' && (
                <motion.div key="ai" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                  <div className="mb-5">
                    <h3 className="font-bold text-[#0a0a0a] text-base mb-0.5">AI Outreach Suggestions</h3>
                    <p className="text-xs text-neutral-400">Personalized by signal — ready to send</p>
                  </div>
                  <div className="space-y-4">
                    {leads.slice(0, 3).map((lead) => (
                      <div key={lead.id} className="rounded-2xl border border-neutral-100 p-5 hover:border-neutral-200 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-sm text-[#0a0a0a]">{lead.company}</span>
                              <Badge variant="green">{lead.intentScore} score</Badge>
                            </div>
                            <p className="text-xs text-neutral-400">Triggered by: {lead.signals[0]}</p>
                          </div>
                          <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg">
                            <Zap size={10} className="text-green-600" />
                            <span className="text-[10px] font-bold text-green-700">AI Generated</span>
                          </div>
                        </div>
                        <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-100">
                          <p className="text-xs text-neutral-600 leading-relaxed">
                            Hey {lead.contact.split(' ')[0]}, noticed {lead.company} recently {lead.signals[0].toLowerCase()} — that usually means growth is accelerating. We help teams like yours surface high-intent pipeline 3× faster. Would a 15-minute call be worth your time this week?
                          </p>
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                          <button className="inline-flex items-center gap-2 bg-[#0a0a0a] text-white text-xs py-1.5 px-3 rounded-lg font-semibold hover:bg-[#1a1a1a] transition-colors">Send email</button>
                          <button className="inline-flex items-center gap-2 bg-white text-[#0a0a0a] text-xs py-1.5 px-3 rounded-lg font-semibold border border-neutral-200 hover:bg-neutral-50 transition-colors">Edit draft</button>
                          <span className="text-[10px] text-neutral-400 ml-auto">94% relevance score</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
