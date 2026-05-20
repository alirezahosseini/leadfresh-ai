import { create } from 'zustand';

type View = 'landing' | 'dashboard';
type DashboardTab = 'overview' | 'leads' | 'analytics' | 'crm' | 'settings';

interface AppState {
  view: View;
  dashboardTab: DashboardTab;
  sidebarCollapsed: boolean;
  setView: (view: View) => void;
  setDashboardTab: (tab: DashboardTab) => void;
  toggleSidebar: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  view: 'landing',
  dashboardTab: 'overview',
  sidebarCollapsed: false,
  setView: (view) => set({ view }),
  setDashboardTab: (tab) => set({ dashboardTab: tab }),
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
}));
