import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../../lib/utils';
import { useAppStore } from '../../store/useAppStore';

export const CTA: React.FC = () => {
  const setView = useAppStore((s) => s.setView);

  return (
    <section className="py-32 bg-[#fafafa]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* Top label */}
          <motion.div variants={fadeInUp} className="mb-6 flex justify-center">
            <div className="flex items-center gap-2 bg-white border border-[#ebebeb] rounded-full px-4 py-2 card-shadow">
              <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
              <span className="text-xs font-semibold text-[#525252]">2,847 companies being tracked right now</span>
            </div>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="font-display font-black text-[#0a0a0a] tracking-tight text-balance leading-tight mb-6"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
          >
            Stop guessing who to call.
            <br />
            <span className="text-[#22c55e]">Start knowing.</span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-[#737373] text-lg max-w-xl mx-auto leading-relaxed mb-10"
          >
            Join 400+ sales teams using LeadFresh AI to find companies
            actively looking to buy — before they find your competitors.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <button
              onClick={() => setView('dashboard')}
              className="inline-flex items-center gap-2 bg-[#0a0a0a] text-white px-8 py-4 rounded-xl text-sm font-semibold tracking-tight transition-all duration-200 hover:bg-[#1a1a1a] hover:shadow-xl hover:-translate-y-0.5 w-full sm:w-auto justify-center"
            >
              Start your free trial
              <ArrowRight size={15} />
            </button>
            <button
              onClick={() => setView('dashboard')}
              className="inline-flex items-center gap-2 bg-white text-[#0a0a0a] px-8 py-4 rounded-xl text-sm font-semibold tracking-tight border border-[#e5e5e5] transition-all duration-200 hover:border-[#d4d4d4] w-full sm:w-auto justify-center"
            >
              View live dashboard
            </button>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="mt-6 text-xs text-[#a3a3a3]"
          >
            No credit card · 14-day free trial · Cancel anytime
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};
