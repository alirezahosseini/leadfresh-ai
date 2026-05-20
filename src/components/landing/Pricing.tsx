import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { pricingPlans } from '../../data/mockData';
import { useAppStore } from '../../store/useAppStore';

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const Pricing: React.FC = () => {
  const setView = useAppStore((s) => s.setView);

  return (
    <section id="pricing" className="py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-16 text-center">
          <motion.div variants={item} className="mb-4 flex justify-center">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-neutral-400">
              <span className="w-4 h-px bg-neutral-200" />
              Pricing
              <span className="w-4 h-px bg-neutral-200" />
            </span>
          </motion.div>
          <motion.h2
            variants={item}
            className="font-black text-[#0a0a0a] tracking-tight leading-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}
          >
            Simple pricing.
            <br />
            <span className="text-neutral-300">Serious results.</span>
          </motion.h2>
          <motion.p variants={item} className="text-neutral-500 text-base">
            14-day free trial on all plans. No credit card required.
          </motion.p>
        </motion.div>

        <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pricingPlans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={item}
              whileHover={{ y: plan.highlight ? 0 : -4, transition: { duration: 0.2 } }}
              className={`relative rounded-2xl p-8 border transition-all duration-300 ${
                plan.highlight ? 'bg-[#0a0a0a] border-[#0a0a0a]' : 'bg-white border-neutral-100 hover:border-neutral-200'
              }`}
              style={plan.highlight ? { boxShadow: '0 4px 6px rgba(0,0,0,0.1), 0 24px 48px rgba(0,0,0,0.15)' } : {}}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-green-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                    Most popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className={`font-bold text-lg mb-1 tracking-tight ${plan.highlight ? 'text-white' : 'text-[#0a0a0a]'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm ${plan.highlight ? 'text-neutral-500' : 'text-neutral-400'}`}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-8">
                {plan.price ? (
                  <div className="flex items-end gap-1">
                    <span className={`font-black text-4xl tracking-tight ${plan.highlight ? 'text-white' : 'text-[#0a0a0a]'}`} style={{ letterSpacing: '-0.03em' }}>
                      ${plan.price}
                    </span>
                    <span className={`text-sm mb-1 ${plan.highlight ? 'text-neutral-600' : 'text-neutral-400'}`}>{plan.period}</span>
                  </div>
                ) : (
                  <span className={`font-black text-3xl tracking-tight ${plan.highlight ? 'text-white' : 'text-[#0a0a0a]'}`} style={{ letterSpacing: '-0.03em' }}>
                    Custom
                  </span>
                )}
              </div>

              <button
                onClick={() => setView('dashboard')}
                className={`w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 mb-8 ${
                  plan.highlight ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-neutral-100 text-[#0a0a0a] hover:bg-neutral-200'
                }`}
              >
                {plan.cta}
              </button>

              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${plan.highlight ? 'bg-green-500/20' : 'bg-green-50'}`}>
                      <Check size={10} className={plan.highlight ? 'text-green-400' : 'text-green-600'} />
                    </div>
                    <span className={`text-sm ${plan.highlight ? 'text-neutral-300' : 'text-neutral-600'}`}>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
