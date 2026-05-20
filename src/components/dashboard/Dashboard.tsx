import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { OverviewTab } from './OverviewTab';
import { LeadsTab } from './LeadsTab';
import { AnalyticsTab } from './AnalyticsTab';
import { CRMTab } from './CRMTab';
import { SettingsTab } from './SettingsTab';
import { useAppStore } from '../../store/useAppStore';

export const Dashboard: React.FC = () => {
  const dashboardTab = useAppStore((s) => s.dashboardTab);

  return (
    <div className="flex h-screen bg-[#f8f8f8] overflow-hidden">
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0">
        <TopBar />

        <main className="flex-1 overflow-y-auto p-5 md:p-6">
          <AnimatePresence mode="wait">
            {dashboardTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <OverviewTab />
              </motion.div>
            )}
            {dashboardTab === 'leads' && (
              <motion.div
                key="leads"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <LeadsTab />
              </motion.div>
            )}
            {dashboardTab === 'analytics' && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <AnalyticsTab />
              </motion.div>
            )}
            {dashboardTab === 'crm' && (
              <motion.div
                key="crm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <CRMTab />
              </motion.div>
            )}
            {dashboardTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <SettingsTab />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};
