import React from 'react';
import { motion } from 'framer-motion';
import { Plus, MoreHorizontal } from 'lucide-react';
import { leads } from '../../data/mockData';
import { IntentScore } from '../ui/IntentScore';
import { Avatar } from '../ui/Avatar';
import { staggerContainer, fadeInUp } from '../../lib/utils';

const stages = [
  { id: 'Identified', label: 'Identified', color: '#d4d4d4', textColor: '#737373' },
  { id: 'Researching', label: 'Researching', color: '#fcd34d', textColor: '#d97706' },
  { id: 'Contacted', label: 'Contacted', color: '#93c5fd', textColor: '#3b82f6' },
  { id: 'Outreach Sent', label: 'Outreach Sent', color: '#a5b4fc', textColor: '#6366f1' },
  { id: 'Meeting Scheduled', label: 'Meeting Booked', color: '#6ee7b7', textColor: '#059669' },
];

export const CRMTab: React.FC = () => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="h-full"
    >
      <motion.div variants={fadeInUp} className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="font-bold text-base text-[#0a0a0a]">CRM Pipeline</h2>
          <p className="text-xs text-[#a3a3a3] mt-0.5">Drag leads between stages to update status</p>
        </div>
        <button className="flex items-center gap-2 bg-[#0a0a0a] text-white px-3 py-2 rounded-xl text-xs font-semibold hover:bg-[#1a1a1a] transition-colors">
          <Plus size={13} />
          Add lead
        </button>
      </motion.div>

      {/* Kanban board */}
      <motion.div
        variants={fadeInUp}
        className="flex gap-4 overflow-x-auto pb-4"
        style={{ minHeight: 'calc(100vh - 260px)' }}
      >
        {stages.map((stage) => {
          const stageLeads = leads.filter((l) => l.crmStage === stage.id);

          return (
            <div
              key={stage.id}
              className="shrink-0 w-64 bg-[#f8f8f8] rounded-2xl border border-[#f0f0f0] overflow-hidden flex flex-col"
            >
              {/* Stage header */}
              <div className="px-4 py-3.5 border-b border-[#f0f0f0] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: stage.color }}
                  />
                  <span className="text-xs font-bold text-[#0a0a0a]">{stage.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold text-[#a3a3a3] bg-white px-2 py-0.5 rounded-full border border-[#f0f0f0]">
                    {stageLeads.length}
                  </span>
                  <button className="text-[#d4d4d4] hover:text-[#737373] transition-colors">
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Cards */}
              <div className="flex-1 p-3 space-y-2.5 overflow-y-auto">
                {stageLeads.map((lead, index) => (
                  <motion.div
                    key={lead.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.06 }}
                    whileHover={{ y: -2, transition: { duration: 0.15 } }}
                    className="bg-white rounded-xl border border-[#f0f0f0] p-3.5 cursor-grab active:cursor-grabbing hover:border-[#e5e5e5] hover:shadow-sm transition-all duration-150"
                  >
                    {/* Company */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Avatar initials={lead.avatar} size="xs" />
                        <span className="text-xs font-bold text-[#0a0a0a] truncate">{lead.company}</span>
                      </div>
                      <button className="text-[#d4d4d4] hover:text-[#737373] transition-colors">
                        <MoreHorizontal size={13} />
                      </button>
                    </div>

                    {/* Signal */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {lead.signals.slice(0, 1).map((s) => (
                        <span
                          key={s}
                          className="text-[9px] bg-[#f5f5f5] text-[#737373] px-2 py-0.5 rounded-full font-medium"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* Bottom */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="text-[9px] text-[#a3a3a3]">{lead.industry}</span>
                      </div>
                      <IntentScore score={lead.intentScore} size="sm" />
                    </div>

                    {/* Contact */}
                    <div className="mt-2.5 pt-2.5 border-t border-[#f5f5f5] flex items-center gap-1.5">
                      <Avatar initials={lead.contact.split(' ').map(n=>n[0]).join('')} size="xs" />
                      <span className="text-[10px] text-[#a3a3a3]">{lead.contact}</span>
                      <span className="text-[9px] text-[#d4d4d4] ml-auto">{lead.lastActivity}</span>
                    </div>
                  </motion.div>
                ))}

                {stageLeads.length === 0 && (
                  <div className="flex items-center justify-center h-20 border-2 border-dashed border-[#ebebeb] rounded-xl">
                    <span className="text-xs text-[#d4d4d4]">No leads here</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};
