import React from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, Globe, BarChart3, Plug, MessageSquare } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI Lead Scoring',
    description: 'Proprietary ML model scores every company 0–100 based on behavioral signals, firmographics, and real-time intent data.',
    tag: 'Core Engine',
    color: '#22c55e',
    bg: '#f0fdf4',
  },
  {
    icon: TrendingUp,
    title: 'Hiring Signal Tracking',
    description: 'Detect companies actively hiring sales, marketing, or growth roles — a proven proxy for budget and intent.',
    tag: 'Intent Signal',
    color: '#f59e0b',
    bg: '#fffbeb',
  },
  {
    icon: Globe,
    title: 'Website Change Detection',
    description: 'Monitor pricing pages, product pages, and CTAs for changes that indicate a company is readying to buy.',
    tag: 'Behavior',
    color: '#3b82f6',
    bg: '#eff6ff',
  },
  {
    icon: BarChart3,
    title: 'Intent Analytics',
    description: 'Deep dashboards showing signal trends, industry breakdowns, and temporal intent patterns across your target market.',
    tag: 'Analytics',
    color: '#8b5cf6',
    bg: '#f5f3ff',
  },
  {
    icon: Plug,
    title: 'CRM Integration',
    description: 'One-click sync to HubSpot, Salesforce, and Pipedrive. Leads flow directly into your pipeline, scored and enriched.',
    tag: 'Integrations',
    color: '#ec4899',
    bg: '#fdf2f8',
  },
  {
    icon: MessageSquare,
    title: 'AI Outreach Suggestions',
    description: 'For every hot lead, LeadFresh drafts a personalized outreach message anchored to the exact signal that triggered the score.',
    tag: 'AI Writing',
    color: '#22c55e',
    bg: '#f0fdf4',
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-20">
          <motion.div variants={item} className="mb-4">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-neutral-400">
              <span className="w-4 h-px bg-neutral-200" />
              Features
            </span>
          </motion.div>
          <motion.h2
            variants={item}
            className="font-black text-[#0a0a0a] tracking-tight leading-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.03em' }}
          >
            Everything you need to find
            <br />
            <span className="text-neutral-300">buyers before they raise their hand.</span>
          </motion.h2>
          <motion.p variants={item} className="text-neutral-500 text-lg max-w-xl leading-relaxed">
            Six intelligence layers working together to surface high-probability leads your competitors haven't touched yet.
          </motion.p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={item}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group bg-white rounded-2xl p-7 border border-neutral-100 transition-all duration-300 hover:border-neutral-200 cursor-default"
                style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: feature.bg }}>
                  <Icon size={18} style={{ color: feature.color }} />
                </div>
                <div className="mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md" style={{ color: feature.color, backgroundColor: feature.bg }}>
                    {feature.tag}
                  </span>
                </div>
                <h3 className="font-bold text-[#0a0a0a] text-[15px] mb-2 tracking-tight">{feature.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{feature.description}</p>
                <div className="mt-5 h-px w-0 group-hover:w-full transition-all duration-500 rounded-full" style={{ backgroundColor: feature.color + '40' }} />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
