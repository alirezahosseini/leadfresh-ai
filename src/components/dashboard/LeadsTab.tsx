import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  ExternalLink,
  Mail,
  Zap,
  Building2,
  MapPin,
  Users,
} from 'lucide-react';
import { leads } from '../../data/mockData';
import { IntentScore } from '../ui/IntentScore';
import { Badge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';
import { staggerContainer, fadeInUp } from '../../lib/utils';

type Filter = 'all' | 'hot' | 'warm' | 'cold';

export const LeadsTab: React.FC = () => {
  const [filter, setFilter] = useState<Filter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLead, setSelectedLead] = useState(leads[0]);

  const filtered = leads.filter((l) => {
    const matchFilter = filter === 'all' || l.status === filter;
    const matchSearch =
      !searchQuery ||
      l.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.industry.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="h-full flex flex-col gap-4"
    >
      {/* Controls */}
      <motion.div variants={fadeInUp} className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 bg-white border border-[#f0f0f0] rounded-xl px-3 py-2.5 flex-1 min-w-[200px]">
          <Search size={14} className="text-[#a3a3a3] shrink-0" />
          <input
            type="text"
            placeholder="Search companies, industries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-sm text-[#0a0a0a] placeholder-[#a3a3a3] outline-none w-full"
          />
        </div>

        <div className="flex items-center gap-1 bg-white border border-[#f0f0f0] rounded-xl p-1">
          {(['all', 'hot', 'warm', 'cold'] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all duration-150 ${
                filter === f
                  ? 'bg-[#0a0a0a] text-white'
                  : 'text-[#737373] hover:text-[#0a0a0a]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <button className="flex items-center gap-2 bg-white border border-[#f0f0f0] rounded-xl px-3 py-2.5 text-sm text-[#737373] hover:text-[#0a0a0a] transition-colors">
          <SlidersHorizontal size={14} />
          Filters
          <ChevronDown size={12} />
        </button>

        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-[#a3a3a3]">{filtered.length} leads</span>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex gap-4 flex-1 min-h-0">
        {/* Lead list */}
        <motion.div
          variants={fadeInUp}
          className="bg-white rounded-2xl border border-[#f0f0f0] overflow-hidden flex flex-col"
          style={{ width: selectedLead ? '55%' : '100%' }}
        >
          <div className="overflow-y-auto divide-y divide-[#fafafa]">
            {filtered.map((lead, index) => (
              <motion.div
                key={lead.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                onClick={() => setSelectedLead(lead)}
                className={`flex items-center gap-4 px-5 py-4 cursor-pointer transition-all duration-150 ${
                  selectedLead?.id === lead.id
                    ? 'bg-[#fafafa] border-l-2 border-l-[#22c55e]'
                    : 'hover:bg-[#fafafa] border-l-2 border-l-transparent'
                }`}
              >
                <Avatar initials={lead.avatar} size="md" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-[#0a0a0a]">{lead.company}</span>
                    <Badge variant={lead.status === 'hot' ? 'red' : lead.status === 'warm' ? 'amber' : 'gray'}>
                      {lead.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-[#a3a3a3]">{lead.industry}</span>
                    <span className="text-[10px] text-[#d4d4d4]">·</span>
                    <span className="text-xs text-[#a3a3a3]">{lead.lastActivity}</span>
                  </div>
                  <div className="flex gap-1 mt-1.5 flex-wrap">
                    {lead.signals.slice(0, 2).map((s) => (
                      <span key={s} className="text-[10px] bg-[#f5f5f5] text-[#737373] px-2 py-0.5 rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <IntentScore score={lead.intentScore} size="md" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Lead detail panel */}
        {selectedLead && (
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 bg-white rounded-2xl border border-[#f0f0f0] overflow-y-auto"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#f0f0f0]">
              <div className="flex items-start gap-4 mb-4">
                <Avatar initials={selectedLead.avatar} size="lg" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-base text-[#0a0a0a]">{selectedLead.company}</h3>
                    <Badge variant={selectedLead.status === 'hot' ? 'red' : selectedLead.status === 'warm' ? 'amber' : 'gray'}>
                      {selectedLead.status}
                    </Badge>
                  </div>
                  <a
                    href="#"
                    className="text-xs text-[#a3a3a3] hover:text-[#22c55e] flex items-center gap-1 transition-colors"
                  >
                    {selectedLead.domain}
                    <ExternalLink size={10} />
                  </a>
                </div>
                <IntentScore score={selectedLead.intentScore} size="lg" showLabel />
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Building2, label: 'Industry', value: selectedLead.industry },
                  { icon: Users, label: 'Team size', value: selectedLead.employees },
                  { icon: MapPin, label: 'Location', value: selectedLead.location },
                ].map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="bg-[#fafafa] rounded-xl p-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Icon size={11} className="text-[#a3a3a3]" />
                        <span className="text-[10px] text-[#a3a3a3] font-medium">{stat.label}</span>
                      </div>
                      <p className="text-xs font-semibold text-[#0a0a0a]">{stat.value}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Intent signals */}
            <div className="p-6 border-b border-[#f0f0f0]">
              <h4 className="text-xs font-bold text-[#0a0a0a] uppercase tracking-widest mb-3">Intent Signals</h4>
              <div className="space-y-2">
                {selectedLead.signals.map((signal) => (
                  <div key={signal} className="flex items-center gap-2.5 bg-[#fafafa] rounded-xl px-3 py-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] shrink-0" />
                    <span className="text-xs text-[#525252] font-medium">{signal}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact + CRM */}
            <div className="p-6 border-b border-[#f0f0f0]">
              <h4 className="text-xs font-bold text-[#0a0a0a] uppercase tracking-widest mb-3">Key Contact</h4>
              <div className="flex items-center gap-3 mb-4">
                <Avatar initials={selectedLead.contact.split(' ').map(n => n[0]).join('')} size="md" />
                <div>
                  <p className="text-sm font-semibold text-[#0a0a0a]">{selectedLead.contact}</p>
                  <p className="text-xs text-[#a3a3a3]">{selectedLead.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-[#fafafa] rounded-lg px-2.5 py-1.5">
                  <span className="text-[10px] text-[#a3a3a3]">Stage:</span>
                  <span className="text-[10px] font-semibold text-[#0a0a0a]">{selectedLead.crmStage}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#fafafa] rounded-lg px-2.5 py-1.5">
                  <span className="text-[10px] text-[#a3a3a3]">ARR:</span>
                  <span className="text-[10px] font-semibold text-green-700">{selectedLead.revenue}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-green-50 rounded-lg px-2.5 py-1.5">
                  <span className="text-[10px] font-semibold text-green-700">{selectedLead.growth}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 space-y-2">
              <button className="w-full flex items-center gap-2 justify-center bg-[#0a0a0a] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1a1a1a] transition-colors">
                <Mail size={14} />
                Draft outreach email
              </button>
              <button className="w-full flex items-center gap-2 justify-center bg-[#f0fdf4] text-green-700 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-100 transition-colors border border-green-100">
                <Zap size={14} />
                AI outreach suggestion
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
