import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, TrendingUp, Building2, Globe } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { IntentScore } from '../ui/IntentScore';
import { Badge } from '../ui/Badge';


const FloatingCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    className={`absolute bg-white rounded-2xl border border-neutral-100 p-4 ${className}`}
    style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 8px 32px rgba(0,0,0,0.06)' }}
  >
    {children}
  </motion.div>
);

export const Hero: React.FC = () => {
  const setView = useAppStore((s) => s.setView);

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };

  const item = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-16">
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(34,197,94,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32">
        <motion.div variants={container} initial="hidden" animate="visible" className="text-center">

          {/* Eyebrow */}
          <motion.div variants={item} className="mb-8 flex justify-center">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-200 bg-green-50 text-xs font-semibold text-green-700 tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              AI-Powered Lead Intelligence · Now in Beta
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="font-black text-[#0a0a0a] tracking-tight leading-none mb-6"
            style={{
              fontSize: 'clamp(2.8rem, 6vw, 5.2rem)',
              letterSpacing: '-0.03em',
              fontFeatureSettings: '"ss01", "ss02"',
            }}
          >
            Get high-intent clients{' '}
            <br />
            daily.{' '}
            <span style={{ color: '#a3a3a3' }}>Not random leads.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={item}
            className="text-neutral-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light mb-10"
          >
            LeadFresh AI identifies companies already showing buying signals
            and delivers outreach-ready leads — before your competitors notice.
          </motion.p>

          {/* CTA group */}
          <motion.div variants={item} className="flex items-center justify-center gap-3 mb-20">
            <button
              onClick={() => setView('dashboard')}
              className="inline-flex items-center gap-2 bg-[#0a0a0a] text-white px-6 py-3 rounded-xl text-sm font-semibold tracking-tight transition-all duration-200 hover:bg-[#1a1a1a] active:scale-95"
              style={{ letterSpacing: '-0.02em' }}
            >
              Start for free
              <ArrowRight size={15} />
            </button>
            <button
              onClick={() => setView('dashboard')}
              className="inline-flex items-center gap-2 bg-white text-[#0a0a0a] px-6 py-3 rounded-xl text-sm font-semibold tracking-tight border border-neutral-200 transition-all duration-200 hover:border-neutral-300 hover:bg-neutral-50 active:scale-95"
              style={{ letterSpacing: '-0.02em' }}
            >
              View demo dashboard
            </button>
          </motion.div>

          {/* Dashboard preview */}
          <motion.div
            variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } } }}
            className="relative"
          >
            {/* Floating cards */}
            <FloatingCard className="hidden lg:block left-0 xl:-left-8 top-12 w-56 z-20" delay={0.8}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center">
                  <Zap size={11} className="text-red-500" />
                </div>
                <span className="text-xs font-semibold text-[#0a0a0a]">Hot Lead Detected</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-[#0a0a0a]">Vertex Systems</p>
                  <p className="text-xs text-neutral-400">Hiring 4 SDRs</p>
                </div>
                <IntentScore score={94} size="sm" />
              </div>
            </FloatingCard>

            <FloatingCard className="hidden lg:block right-0 xl:-right-8 top-8 w-52 z-20" delay={1.0}>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={13} className="text-green-500" />
                <span className="text-xs font-semibold text-[#0a0a0a]">Signal Activity</span>
              </div>
              <div className="flex items-end gap-1 h-10 mt-1">
                {[3, 5, 4, 7, 6, 9, 8, 11, 10, 14].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h * 6}px` }}
                    transition={{ delay: 1.2 + i * 0.05, duration: 0.4 }}
                    className="flex-1 rounded-sm"
                    style={{ backgroundColor: i >= 7 ? '#22c55e' : '#e5e5e5' }}
                  />
                ))}
              </div>
              <p className="text-xs text-neutral-400 mt-2">+34% signals today</p>
            </FloatingCard>

            <FloatingCard className="hidden lg:block left-4 xl:-left-4 bottom-16 w-48 z-20" delay={1.2}>
              <div className="flex items-center gap-2 mb-3">
                <Building2 size={13} className="text-neutral-400" />
                <span className="text-xs font-semibold text-[#0a0a0a]">AI Insights</span>
              </div>
              <div className="space-y-2">
                {[
                  { label: 'Hiring signals', val: 88 },
                  { label: 'Web changes', val: 72 },
                  { label: 'Social intent', val: 65 },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-[10px] text-neutral-400 mb-0.5">
                      <span>{item.label}</span>
                      <span className="font-semibold">{item.val}</span>
                    </div>
                    <div className="h-1 bg-neutral-100 rounded-full">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.val}%` }}
                        transition={{ delay: 1.4, duration: 0.6 }}
                        className="h-full rounded-full bg-green-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </FloatingCard>

            <FloatingCard className="hidden lg:block right-4 xl:-right-4 bottom-12 w-52 z-20" delay={1.4}>
              <div className="flex items-center gap-2 mb-3">
                <Globe size={13} className="text-neutral-400" />
                <span className="text-xs font-semibold text-[#0a0a0a]">Pipeline Updated</span>
              </div>
              <div className="space-y-1.5">
                {[
                  { company: 'Cascade AI', stage: 'Meeting', color: '#22c55e' },
                  { company: 'Flux Platform', stage: 'Contacted', color: '#f59e0b' },
                  { company: 'Dragonfly', stage: 'Identified', color: '#737373' },
                ].map((item) => (
                  <div key={item.company} className="flex items-center justify-between">
                    <span className="text-xs text-[#0a0a0a] font-medium">{item.company}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ color: item.color, backgroundColor: `${item.color}18` }}>
                      {item.stage}
                    </span>
                  </div>
                ))}
              </div>
            </FloatingCard>

            {/* Main dashboard mockup */}
            <div className="relative mx-auto max-w-4xl">
              <div className="bg-neutral-50 rounded-2xl border border-neutral-200 overflow-hidden" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 24px 64px rgba(0,0,0,0.08)' }}>
                {/* Browser chrome */}
                <div className="bg-white border-b border-neutral-100 px-4 py-3 flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-neutral-100" />
                    <div className="w-3 h-3 rounded-full bg-neutral-100" />
                    <div className="w-3 h-3 rounded-full bg-neutral-100" />
                  </div>
                  <div className="flex-1 bg-neutral-50 rounded-lg px-3 py-1.5 text-xs text-neutral-400 text-center font-mono">
                    app.leadfresh.ai/dashboard
                  </div>
                </div>

                {/* Dashboard content */}
                <div className="flex h-[380px] md:h-[480px]">
                  {/* Sidebar */}
                  <div className="hidden md:flex w-52 bg-white border-r border-neutral-100 flex-col p-3 gap-1">
                    <div className="flex items-center gap-2 px-3 py-2 mb-3">
                      <div className="w-5 h-5 bg-[#0a0a0a] rounded flex items-center justify-center">
                        <Zap size={10} className="text-green-400" fill="#4ade80" />
                      </div>
                      <span className="text-xs font-bold tracking-tight">LeadFresh AI</span>
                    </div>
                    {['Overview', 'Lead Feed', 'Analytics', 'CRM Pipeline', 'AI Outreach', 'Settings'].map((item, i) => (
                      <div key={item} className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${i === 0 ? 'bg-neutral-100 text-[#0a0a0a]' : 'text-neutral-400'}`}>
                        {item}
                      </div>
                    ))}
                    <div className="mt-auto px-3 py-2">
                      <div className="rounded-lg bg-green-50 border border-green-100 p-2">
                        <p className="text-[10px] font-semibold text-green-700">AI Processing</p>
                        <div className="mt-1 h-1 bg-white rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-green-500 rounded-full"
                            initial={{ width: '60%' }}
                            animate={{ width: ['60%', '85%', '72%', '90%'] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          />
                        </div>
                        <p className="text-[9px] text-neutral-400 mt-1">Scanning 2,847 companies</p>
                      </div>
                    </div>
                  </div>

                  {/* Main */}
                  <div className="flex-1 p-5 overflow-hidden">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                      {[
                        { label: 'Total Leads', value: '2,847', change: '+23%', color: '#22c55e' },
                        { label: 'Hot Leads', value: '142', change: '+18%', color: '#ef4444' },
                        { label: 'Avg Score', value: '76.4', change: '+5.1', color: '#22c55e' },
                        { label: 'Pipeline', value: '$1.24M', change: '+31%', color: '#22c55e' },
                      ].map((m) => (
                        <div key={m.label} className="bg-white rounded-xl p-3 border border-neutral-100">
                          <p className="text-[9px] text-neutral-400 uppercase tracking-wider font-semibold mb-1">{m.label}</p>
                          <p className="text-base font-black text-[#0a0a0a] tracking-tight">{m.value}</p>
                          <span className="text-[9px] font-bold" style={{ color: m.color }}>{m.change}</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-[#0a0a0a]">Hot Leads Today</span>
                        <Badge variant="green">Live</Badge>
                      </div>
                      {[
                        { company: 'Vertex Systems', signal: 'Hiring 4 SDRs', score: 94 },
                        { company: 'Stellar Dev', signal: 'Series A Raised', score: 91 },
                        { company: 'Meridian Labs', signal: 'New CTO hired', score: 88 },
                        { company: 'Cascade AI', signal: 'Website Revamp', score: 82 },
                      ].map((lead, i) => (
                        <motion.div
                          key={lead.company}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + i * 0.1 }}
                          className="flex items-center gap-3 bg-white rounded-xl px-3 py-2.5 border border-neutral-100"
                        >
                          <div className="w-7 h-7 rounded-lg bg-neutral-100 flex items-center justify-center text-[9px] font-bold text-neutral-500">
                            {lead.company.substring(0, 2).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-[#0a0a0a] truncate">{lead.company}</p>
                            <p className="text-[10px] text-neutral-400 truncate">{lead.signal}</p>
                          </div>
                          <IntentScore score={lead.score} size="sm" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Gradient fade */}
              <div className="absolute -bottom-2 left-0 right-0 h-24 pointer-events-none" style={{ background: 'linear-gradient(to top, white, transparent)' }} />
            </div>
          </motion.div>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-xs text-neutral-300 uppercase tracking-widest font-semibold mb-6">
            Trusted by growth teams at
          </p>
          <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap">
            {['Veritas', 'NorthIO', 'Stackr', 'Pulsify', 'Axiom', 'Crestline'].map((co) => (
              <span key={co} className="text-sm font-bold text-neutral-300 tracking-tight">
                {co}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
