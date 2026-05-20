import React from 'react';
import { Zap } from 'lucide-react';

const footerLinks = {
  Product: ['Features', 'Pricing', 'Changelog', 'Roadmap'],
  Company: ['About', 'Blog', 'Careers', 'Press'],
  Resources: ['Documentation', 'API Reference', 'Status', 'Security'],
  Legal: ['Privacy', 'Terms', 'Cookies', 'GDPR'],
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-[#f0f0f0] pt-16 pb-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-16">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 bg-[#0a0a0a] rounded-lg flex items-center justify-center">
                <Zap size={14} className="text-[#22c55e]" fill="#22c55e" />
              </div>
              <span className="font-bold text-[15px] tracking-tight text-[#0a0a0a]">
                LeadFresh<span className="text-[#22c55e]"> AI</span>
              </span>
            </div>
            <p className="text-sm text-[#737373] leading-relaxed max-w-xs">
              AI-powered lead intelligence for sales teams that want to close more, prospect less.
            </p>
            <div className="flex items-center gap-1.5 mt-5">
              <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
              <span className="text-xs text-[#737373]">All systems operational</span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold text-[#0a0a0a] uppercase tracking-widest mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[#737373] hover:text-[#0a0a0a] transition-colors duration-150"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[#f0f0f0] gap-4">
          <p className="text-xs text-[#a3a3a3]">
            © {new Date().getFullYear()} LeadFresh AI, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-[#a3a3a3] hover:text-[#737373] transition-colors">
              SOC 2 Type II
            </a>
            <span className="w-px h-3 bg-[#e5e5e5]" />
            <a href="#" className="text-xs text-[#a3a3a3] hover:text-[#737373] transition-colors">
              GDPR Compliant
            </a>
            <span className="w-px h-3 bg-[#e5e5e5]" />
            <a href="#" className="text-xs text-[#a3a3a3] hover:text-[#737373] transition-colors">
              CCPA Ready
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
