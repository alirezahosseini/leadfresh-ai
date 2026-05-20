import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Menu, X } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const setView = useAppStore((s) => s.setView);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Product', href: '#product' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-neutral-100' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-[#0a0a0a] rounded-lg flex items-center justify-center">
              <Zap size={14} className="text-green-400" fill="#4ade80" />
            </div>
            <span className="font-bold text-[15px] tracking-tight text-[#0a0a0a]">
              LeadFresh<span className="text-green-500"> AI</span>
            </span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm text-neutral-500 hover:text-[#0a0a0a] transition-colors duration-150 rounded-lg hover:bg-neutral-50 font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setView('dashboard')}
              className="text-sm text-neutral-500 hover:text-[#0a0a0a] font-medium transition-colors"
            >
              Sign in
            </button>
            <button
              onClick={() => setView('dashboard')}
              className="inline-flex items-center gap-2 bg-[#0a0a0a] text-white px-4 py-2 rounded-lg text-xs font-semibold tracking-tight transition-all duration-200 hover:bg-[#1a1a1a] active:scale-95"
            >
              Get started free
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-neutral-50 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-b border-neutral-100 px-6 py-4"
        >
          <nav className="flex flex-col gap-1 mb-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 text-sm text-neutral-500 hover:text-[#0a0a0a] font-medium rounded-lg hover:bg-neutral-50 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-2 pt-4 border-t border-neutral-100">
            <button
              onClick={() => { setView('dashboard'); setMobileOpen(false); }}
              className="text-sm text-[#0a0a0a] border border-neutral-200 py-2 rounded-lg font-medium hover:bg-neutral-50 transition-colors"
            >
              Sign in
            </button>
            <button
              onClick={() => { setView('dashboard'); setMobileOpen(false); }}
              className="bg-[#0a0a0a] text-white py-2 rounded-lg text-sm font-semibold hover:bg-[#1a1a1a] transition-colors"
            >
              Get started free
            </button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};
