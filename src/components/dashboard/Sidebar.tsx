import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  LayoutDashboard,
  Users,
  BarChart3,
  GitBranch,
  MessageSquare,
  Settings,
  ChevronLeft,
  LogOut,
  Bell,
  Search,
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { Avatar } from '../ui/Avatar';
import { cn } from '../../lib/utils';

const navItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'leads', label: 'Lead Feed', icon: Users },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'crm', label: 'CRM Pipeline', icon: GitBranch },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  const { dashboardTab, setDashboardTab, sidebarCollapsed, toggleSidebar, setView } = useAppStore();

  return (
    <motion.aside
      animate={{ width: sidebarCollapsed ? 68 : 228 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="relative hidden md:flex flex-col bg-white border-r border-[#f0f0f0] h-screen shrink-0 overflow-hidden"
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 h-16 border-b border-[#f0f0f0] shrink-0">
        <div className="w-7 h-7 bg-[#0a0a0a] rounded-lg flex items-center justify-center shrink-0">
          <Zap size={14} className="text-[#22c55e]" fill="#22c55e" />
        </div>
        <AnimatePresence>
          {!sidebarCollapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="font-bold text-[14px] tracking-tight text-[#0a0a0a] whitespace-nowrap"
            >
              LeadFresh <span className="text-[#22c55e]">AI</span>
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Search */}
      {!sidebarCollapsed && (
        <div className="px-3 py-3 border-b border-[#f0f0f0]">
          <div className="flex items-center gap-2 bg-[#f5f5f5] rounded-lg px-3 py-2">
            <Search size={12} className="text-[#a3a3a3] shrink-0" />
            <span className="text-xs text-[#a3a3a3]">Search leads...</span>
            <span className="ml-auto text-[10px] text-[#d4d4d4] font-mono">⌘K</span>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        <AnimatePresence>
          {!sidebarCollapsed && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-[10px] font-semibold text-[#d4d4d4] uppercase tracking-widest px-3 py-2"
            >
              Main
            </motion.p>
          )}
        </AnimatePresence>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = dashboardTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setDashboardTab(item.id as any)}
              title={sidebarCollapsed ? item.label : undefined}
              className={cn(
                'flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
                sidebarCollapsed ? 'justify-center' : '',
                isActive
                  ? 'bg-[#f0f0f0] text-[#0a0a0a]'
                  : 'text-[#737373] hover:bg-[#f5f5f5] hover:text-[#0a0a0a]'
              )}
            >
              <Icon size={16} className="shrink-0" />
              <AnimatePresence>
                {!sidebarCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.15 }}
                    className="whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {!sidebarCollapsed && item.id === 'leads' && (
                <span className="ml-auto bg-[#22c55e] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                  8
                </span>
              )}
            </button>
          );
        })}

        <AnimatePresence>
          {!sidebarCollapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <p className="text-[10px] font-semibold text-[#d4d4d4] uppercase tracking-widest px-3 py-2 mt-4">
                AI Tools
              </p>
              <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-[#737373] hover:bg-[#f5f5f5] hover:text-[#0a0a0a] transition-all duration-150">
                <MessageSquare size={16} className="shrink-0" />
                <span className="whitespace-nowrap">AI Outreach</span>
                <span className="ml-auto text-[9px] font-bold text-[#22c55e] bg-[#f0fdf4] px-1.5 py-0.5 rounded-full">
                  New
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI processing status */}
        {!sidebarCollapsed && (
          <div className="mt-4 mx-0">
            <div className="rounded-xl bg-[#fafafa] border border-[#f0f0f0] p-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                <span className="text-[10px] font-semibold text-[#525252]">AI Processing</span>
              </div>
              <div className="h-1 bg-[#f0f0f0] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#22c55e] rounded-full"
                  initial={{ width: '65%' }}
                  animate={{ width: ['65%', '82%', '71%', '88%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
              <p className="text-[9px] text-[#a3a3a3] mt-1.5">Scanning 2,847 companies</p>
            </div>
          </div>
        )}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-[#f0f0f0] space-y-1 shrink-0">
        <button
          title={sidebarCollapsed ? 'Notifications' : undefined}
          className={cn(
            'flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-[#737373] hover:bg-[#f5f5f5] hover:text-[#0a0a0a] transition-all duration-150',
            sidebarCollapsed && 'justify-center'
          )}
        >
          <Bell size={16} className="shrink-0" />
          {!sidebarCollapsed && <span>Notifications</span>}
          {!sidebarCollapsed && <span className="ml-auto w-2 h-2 rounded-full bg-[#22c55e]" />}
        </button>

        {/* User card */}
        {!sidebarCollapsed ? (
          <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-[#f5f5f5] transition-colors cursor-pointer">
            <Avatar initials="JA" size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[#0a0a0a] truncate">Jessica Alvarez</p>
              <p className="text-[10px] text-[#a3a3a3] truncate">Growth Plan</p>
            </div>
            <button
              onClick={() => setView('landing')}
              className="p-1 rounded-lg hover:bg-[#ebebeb] transition-colors"
            >
              <LogOut size={13} className="text-[#a3a3a3]" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setView('landing')}
            className="flex items-center justify-center w-full px-3 py-2.5 rounded-xl text-[#737373] hover:bg-[#f5f5f5] transition-colors"
          >
            <LogOut size={16} />
          </button>
        )}

        {/* Collapse toggle */}
        <button
          onClick={toggleSidebar}
          className={cn(
            'flex items-center gap-3 w-full px-3 py-2 rounded-xl text-xs text-[#a3a3a3] hover:bg-[#f5f5f5] hover:text-[#737373] transition-all duration-150',
            sidebarCollapsed && 'justify-center'
          )}
        >
          <motion.div animate={{ rotate: sidebarCollapsed ? 180 : 0 }} transition={{ duration: 0.25 }}>
            <ChevronLeft size={14} />
          </motion.div>
          {!sidebarCollapsed && <span>Collapse</span>}
        </button>
      </div>
    </motion.aside>
  );
};
