import React from 'react';
import { motion } from 'framer-motion';
import { testimonials } from '../../data/mockData';
import { Avatar } from '../ui/Avatar';

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const Testimonials: React.FC = () => {
  return (
    <section className="py-32 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-16 text-center">
          <motion.div variants={item} className="mb-4 flex justify-center">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-neutral-400">
              <span className="w-4 h-px bg-neutral-200" />
              Social proof
              <span className="w-4 h-px bg-neutral-200" />
            </span>
          </motion.div>
          <motion.h2
            variants={item}
            className="font-black text-[#0a0a0a] tracking-tight leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}
          >
            Teams that closed more
            <br />
            <span className="text-neutral-300">by targeting smarter.</span>
          </motion.h2>
        </motion.div>

        <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
          {testimonials.map((t) => (
            <motion.div
              key={t.author}
              variants={item}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl p-7 border border-neutral-100 transition-all duration-300"
              style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 8px 32px rgba(0,0,0,0.04)' }}
            >
              <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full border border-green-100 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                {t.metric}
              </div>
              <p className="text-[#0a0a0a] text-sm leading-relaxed mb-6 font-medium">"{t.quote}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-neutral-50">
                <Avatar initials={t.avatar} size="md" />
                <div>
                  <p className="text-sm font-semibold text-[#0a0a0a]">{t.author}</p>
                  <p className="text-xs text-neutral-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-neutral-100 rounded-2xl overflow-hidden border border-neutral-100"
        >
          {[
            { value: '2,847+', label: 'Companies monitored' },
            { value: '94%', label: 'Signal accuracy rate' },
            { value: '$48M+', label: 'Pipeline generated' },
            { value: '3.4×', label: 'Average ROI' },
          ].map((stat) => (
            <motion.div key={stat.label} variants={item} className="bg-white px-8 py-8 text-center">
              <p className="font-black tracking-tight text-[#0a0a0a] mb-1" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', letterSpacing: '-0.03em' }}>
                {stat.value}
              </p>
              <p className="text-xs text-neutral-400 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
