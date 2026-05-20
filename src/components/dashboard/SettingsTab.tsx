import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Shield, Plug, User, CreditCard, Check } from 'lucide-react';
import { staggerContainer, fadeInUp } from '../../lib/utils';
import { Avatar } from '../ui/Avatar';

const settingsSections = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'integrations', label: 'Integrations', icon: Plug },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'security', label: 'Security', icon: Shield },
];

const integrations = [
  { name: 'HubSpot', description: 'Sync leads to your CRM pipeline', connected: true, logo: '🟠' },
  { name: 'Salesforce', description: 'Enterprise CRM integration', connected: false, logo: '☁️' },
  { name: 'Pipedrive', description: 'Sales pipeline management', connected: true, logo: '🟢' },
  { name: 'Slack', description: 'Get hot lead alerts in real-time', connected: true, logo: '💬' },
  { name: 'Zapier', description: 'Connect to 5000+ apps', connected: false, logo: '⚡' },
  { name: 'LinkedIn', description: 'Contact enrichment & outreach', connected: false, logo: '🔵' },
];

export const SettingsTab: React.FC = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [notifications, setNotifications] = useState({
    hotLeads: true,
    signalAlerts: true,
    weeklyDigest: true,
    crmUpdates: false,
  });

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="flex gap-6"
    >
      {/* Settings sidebar */}
      <motion.div
        variants={fadeInUp}
        className="w-52 shrink-0 bg-white rounded-2xl border border-[#f0f0f0] p-3 h-fit"
      >
        <nav className="space-y-0.5">
          {settingsSections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  activeSection === section.id
                    ? 'bg-[#f0f0f0] text-[#0a0a0a]'
                    : 'text-[#737373] hover:bg-[#f5f5f5] hover:text-[#0a0a0a]'
                }`}
              >
                <Icon size={15} />
                {section.label}
              </button>
            );
          })}
        </nav>
      </motion.div>

      {/* Settings content */}
      <motion.div variants={fadeInUp} className="flex-1 space-y-4">
        {activeSection === 'profile' && (
          <div className="bg-white rounded-2xl border border-[#f0f0f0] p-7">
            <h3 className="font-bold text-base text-[#0a0a0a] mb-6">Profile Settings</h3>
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-[#f5f5f5]">
              <Avatar initials="JA" size="lg" />
              <div>
                <p className="font-semibold text-sm text-[#0a0a0a]">Jessica Alvarez</p>
                <p className="text-xs text-[#a3a3a3]">jessica@northgatedigital.com</p>
                <button className="text-xs text-[#22c55e] font-semibold mt-1 hover:text-green-700 transition-colors">
                  Change photo
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'First name', value: 'Jessica' },
                { label: 'Last name', value: 'Alvarez' },
                { label: 'Email', value: 'jessica@northgatedigital.com' },
                { label: 'Company', value: 'Northgate Digital' },
              ].map((field) => (
                <div key={field.label}>
                  <label className="text-xs font-semibold text-[#525252] block mb-1.5">{field.label}</label>
                  <input
                    defaultValue={field.value}
                    className="w-full px-3 py-2.5 bg-[#fafafa] border border-[#f0f0f0] rounded-xl text-sm text-[#0a0a0a] outline-none focus:border-[#e5e5e5] focus:bg-white transition-all"
                  />
                </div>
              ))}
            </div>
            <button className="mt-6 btn-primary">Save changes</button>
          </div>
        )}

        {activeSection === 'notifications' && (
          <div className="bg-white rounded-2xl border border-[#f0f0f0] p-7">
            <h3 className="font-bold text-base text-[#0a0a0a] mb-6">Notification Preferences</h3>
            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => {
                const labels: Record<string, { title: string; desc: string }> = {
                  hotLeads: { title: 'Hot lead alerts', desc: 'Notify when a company hits 85+ intent score' },
                  signalAlerts: { title: 'Signal detected', desc: 'Alerts for hiring, website, and tech changes' },
                  weeklyDigest: { title: 'Weekly digest', desc: 'Summary of new leads and pipeline changes' },
                  crmUpdates: { title: 'CRM stage updates', desc: 'When leads move through your pipeline' },
                };
                const info = labels[key];
                return (
                  <div key={key} className="flex items-center justify-between py-4 border-b border-[#f5f5f5] last:border-0">
                    <div>
                      <p className="text-sm font-semibold text-[#0a0a0a]">{info.title}</p>
                      <p className="text-xs text-[#a3a3a3] mt-0.5">{info.desc}</p>
                    </div>
                    <button
                      onClick={() => setNotifications(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))}
                      className={`w-10 h-5.5 rounded-full transition-all duration-200 relative flex items-center ${
                        value ? 'bg-[#22c55e]' : 'bg-[#e5e5e5]'
                      }`}
                      style={{ height: 22 }}
                    >
                      <span
                        className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 absolute ${
                          value ? 'translate-x-5' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeSection === 'integrations' && (
          <div className="bg-white rounded-2xl border border-[#f0f0f0] p-7">
            <h3 className="font-bold text-base text-[#0a0a0a] mb-2">Integrations</h3>
            <p className="text-xs text-[#a3a3a3] mb-6">Connect your existing tools to LeadFresh AI</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {integrations.map((integration) => (
                <div
                  key={integration.name}
                  className="flex items-center gap-4 p-4 rounded-2xl border border-[#f0f0f0] hover:border-[#e5e5e5] transition-colors"
                >
                  <span className="text-2xl">{integration.logo}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#0a0a0a]">{integration.name}</p>
                    <p className="text-xs text-[#a3a3a3] truncate">{integration.description}</p>
                  </div>
                  {integration.connected ? (
                    <div className="flex items-center gap-1.5 bg-green-50 border border-green-100 px-2.5 py-1 rounded-full">
                      <Check size={10} className="text-green-600" />
                      <span className="text-[10px] font-bold text-green-700">Connected</span>
                    </div>
                  ) : (
                    <button className="text-xs font-semibold text-[#0a0a0a] border border-[#e5e5e5] px-3 py-1.5 rounded-lg hover:bg-[#fafafa] transition-colors">
                      Connect
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'billing' && (
          <div className="bg-white rounded-2xl border border-[#f0f0f0] p-7">
            <h3 className="font-bold text-base text-[#0a0a0a] mb-6">Billing & Plan</h3>
            <div className="bg-[#0a0a0a] rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-[#525252] font-semibold uppercase tracking-widest mb-1">Current Plan</p>
                  <p className="text-xl font-black text-white">Growth</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-white">$249</p>
                  <p className="text-xs text-[#525252]">/month</p>
                </div>
              </div>
              <div className="h-px bg-[#1a1a1a] mb-4" />
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Leads Used', val: '3,214 / 5,000' },
                  { label: 'Next Billing', val: 'Feb 1, 2025' },
                  { label: 'Status', val: 'Active' },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-[10px] text-[#525252] mb-0.5">{item.label}</p>
                    <p className="text-xs font-semibold text-white">{item.val}</p>
                  </div>
                ))}
              </div>
            </div>
            <button className="btn-secondary text-sm">Upgrade to Enterprise</button>
          </div>
        )}

        {activeSection === 'security' && (
          <div className="bg-white rounded-2xl border border-[#f0f0f0] p-7">
            <h3 className="font-bold text-base text-[#0a0a0a] mb-6">Security</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl border border-[#f0f0f0]">
                <p className="text-sm font-semibold text-[#0a0a0a] mb-1">Change password</p>
                <p className="text-xs text-[#a3a3a3] mb-4">Last changed 30 days ago</p>
                <button className="btn-secondary text-xs">Update password</button>
              </div>
              <div className="p-4 rounded-2xl border border-[#f0f0f0]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#0a0a0a] mb-1">Two-factor authentication</p>
                    <p className="text-xs text-[#a3a3a3]">Add an extra layer of security</p>
                  </div>
                  <button className="btn-primary text-xs">Enable 2FA</button>
                </div>
              </div>
              <div className="p-4 rounded-2xl border border-[#f0f0f0]">
                <p className="text-sm font-semibold text-[#0a0a0a] mb-1">Active sessions</p>
                <div className="mt-3 space-y-2">
                  {[
                    { device: 'MacBook Pro', location: 'San Francisco, CA', current: true },
                    { device: 'iPhone 15', location: 'San Francisco, CA', current: false },
                  ].map((session) => (
                    <div key={session.device} className="flex items-center justify-between bg-[#fafafa] rounded-xl px-3 py-2.5">
                      <div>
                        <p className="text-xs font-semibold text-[#0a0a0a]">{session.device}</p>
                        <p className="text-[10px] text-[#a3a3a3]">{session.location}</p>
                      </div>
                      {session.current ? (
                        <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">Current</span>
                      ) : (
                        <button className="text-[10px] text-red-500 font-semibold hover:text-red-700 transition-colors">Revoke</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
