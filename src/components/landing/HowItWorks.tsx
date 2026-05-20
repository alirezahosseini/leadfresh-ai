import React from 'react';
import { motion } from 'framer-motion';
import { Search, Brain, Rocket } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Define your ICP',
    description: 'Set your ideal customer profile — industry, size, tech stack, geography. LeadFresh continuously scans your defined universe of companies.',
    detail: 'Takes less than 5 minutes to configure.',
    darkBg: false,
  },
  {
    number: '02',
    icon: Brain,
    title: 'AI detects buying signals',
    description: 'Our engine monitors 40+ behavioral signals: hiring activity, website changes, tech stack shifts, funding events, and competitive mentions.',
    detail: 'Signals refreshed every 6 hours.',
    darkBg: true,
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Outreach-ready leads delivered',
    description: 'Every morning, receive a curated list of companies showing intent — scored, enriched, and paired with an AI-drafted personalized message.',
    detail: 'Direct export to your CRM.',
    darkBg: false,
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-20">
          <motion.div variants={item} className="mb-4">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-neutral-400">
              <span className="w-4 h-px bg-neutral-200" />
              Process
            </span>
          </motion.div>
          <motion.h2
            variants={item}
            className="font-black text-[#0a0a0a] tracking-tight leading-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.03em' }}
          >
            From ICP to inbox
            <br />
            <span className="text-neutral-300">in three steps.</span>
          </motion.h2>
          <motion.p variants={item} className="text-neutral-500 text-lg max-w-xl leading-relaxed">
            No complex setup. No data science team required. LeadFresh is operational the same day you sign up.
          </motion.p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-14 left-[calc(16.666%+2rem)] right-[calc(16.666%+2rem)] h-px" style={{ background: 'linear-gradient(to right, #f0f0f0, rgba(34,197,94,0.3), #f0f0f0)' }} />

          <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <motion.div key={step.number} variants={item} className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center z-10 relative" style={{
                      backgroundColor: step.darkBg ? '#0a0a0a' : '#f0fdf4',
                      border: `1px solid ${step.darkBg ? '#1a1a1a' : 'rgba(34,197,94,0.2)'}`,
                    }}>
                      <Icon size={22} style={{ color: step.darkBg ? '#ffffff' : '#22c55e' }} />
                    </div>
                    <span className="font-black text-[42px] leading-none tracking-tighter text-neutral-100">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="font-bold text-[#0a0a0a] text-xl mb-3 tracking-tight">{step.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed mb-4">{step.description}</p>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span className="text-xs text-neutral-500 font-medium">{step.detail}</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 bg-[#0a0a0a] rounded-3xl p-10 md:p-14 text-center"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-neutral-600 mb-4">The result</p>
          <h3 className="font-black text-white tracking-tight mb-4" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', letterSpacing: '-0.03em' }}>
            Sales reps spend 70% less time
            <br />
            prospecting. Close rates double.
          </h3>
          <p className="text-neutral-500 text-base max-w-lg mx-auto leading-relaxed">
            When you only reach out to companies already showing intent, every conversation starts warmer — and ends faster.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
