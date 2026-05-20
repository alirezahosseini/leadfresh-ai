import { AnimatePresence, motion } from 'framer-motion';
import { useAppStore } from './store/useAppStore';
import { LandingPage } from './components/landing/LandingPage';
import { Dashboard } from './components/dashboard/Dashboard';

function App() {
  const view = useAppStore((s) => s.view);

  return (
    <AnimatePresence mode="wait">
      {view === 'landing' ? (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <LandingPage />
        </motion.div>
      ) : (
        <motion.div
          key="dashboard"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ height: '100vh' }}
        >
          <Dashboard />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
