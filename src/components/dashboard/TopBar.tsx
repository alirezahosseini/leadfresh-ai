import React, { useState } from 'react';
import { Search, Bell, Plus, ChevronDown, Zap, Menu } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';

export const TopBar: React.FC = () => {
  const { dashboardTab, setView } = useAppStore();
  const [searchFocused, setSearchFocused] = useState(false);

  const tabLabels: Record<string, string> = {
    overview: 'Overview',
    leads: 'Lead Feed',
    analytics: 'Analytics',
    crm: 'CRM Pipeline',
    settings: 'Settings',
  };

  return (
    <header className="h-16 bg-white border-b border-[#f0f0f0] flex items-center justify-between px-5 shrink-0">
      {/* Left - Mobile logo + breadcrumb */}
      <div className="flex items-center gap-3">
        <button className="md:hidden p-2 rounded-lg hover:bg-[#f5f5f5]">
          <Menu size={16} className="text-[#737373]" />
        </button>
        <div className="hidden md:flex items-center gap-2 text-sm">
          <span className="text-[#a3a3a3] font-medium">LeadFresh AI</span>
          <ChevronDown size={12} className="text-[#d4d4d4]" />
          <span className="text-[#0a0a0a] font-semibold">{tabLabels[dashboardTab]}</span>
        </div>
        <div className="md:hidden flex items-center gap-2">
          <div className="w-6 h-6 bg-[#0a0a0a] rounded-md flex items-center justify-center">
            <Zap size={12} className="text-[#22c55e]" fill="#22c55e" />
          </div>
          <span className="font-bold text-sm tracking-tight">LeadFresh AI</span>
        </div>
      </div>

      {/* Center - Search */}
      <div className={`hidden md:flex items-center gap-2 bg-[#f5f5f5] rounded-xl px-3 py-2 transition-all duration-200 ${searchFocused ? 'bg-white border border-[#e5e5e5] shadow-sm w-72' : 'w-56'}`}>
        <Search size={13} className="text-[#a3a3a3] shrink-0" />
        <input
          type="text"
          placeholder="Search companies..."
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          className="bg-transparent text-sm text-[#0a0a0a] placeholder-[#a3a3a3] outline-none w-full"
        />
        <kbd className="text-[10px] text-[#d4d4d4] font-mono bg-white rounded px-1 py-0.5 border border-[#ebebeb]">
          ⌘K
        </kbd>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <Badge variant="green">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Live
        </Badge>

        <button className="relative p-2 rounded-xl hover:bg-[#f5f5f5] transition-colors">
          <Bell size={16} className="text-[#737373]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#22c55e] rounded-full border border-white" />
        </button>

        <button
          onClick={() => {}}
          className="hidden sm:flex items-center gap-1.5 bg-[#0a0a0a] text-white px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 hover:bg-[#1a1a1a]"
        >
          <Plus size={13} />
          Add leads
        </button>

        <button
          onClick={() => setView('landing')}
          className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-[#f5f5f5] transition-colors"
        >
          <Avatar initials="JA" size="sm" />
          <span className="hidden sm:block text-xs font-semibold text-[#0a0a0a]">Jessica</span>
          <ChevronDown size={12} className="text-[#a3a3a3]" />
        </button>
      </div>
    </header>
  );
};
