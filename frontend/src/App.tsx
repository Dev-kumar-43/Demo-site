import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layouts
import { DashboardLayout } from './components/layout/DashboardLayout';
import { PublicLayout } from './components/layout/PublicLayout';

// Dashboard Pages
import { Dashboard } from './pages/Dashboard';
import { Incidents } from './pages/Incidents';
import { ThreatMonitor } from './pages/ThreatMonitor';
import { AuditLogs } from './pages/AuditLogs';

// Public Pages
import { Landing } from './pages/Landing';
import { AboutUs } from './pages/AboutUs';
import { Services } from './pages/Services';
import { Features } from './pages/Features';
import { Blog } from './pages/Blog';
import { FAQ } from './pages/FAQ';
import { Pricing } from './pages/Pricing';
import { Testimonials } from './pages/Testimonials';
import { Resources } from './pages/Resources';
import { Contact } from './pages/Contact';

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><Landing /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><AboutUs /></PublicLayout>} />
        <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
        <Route path="/features" element={<PublicLayout><Features /></PublicLayout>} />
        <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
        <Route path="/faq" element={<PublicLayout><FAQ /></PublicLayout>} />
        <Route path="/pricing" element={<PublicLayout><Pricing /></PublicLayout>} />
        <Route path="/testimonials" element={<PublicLayout><Testimonials /></PublicLayout>} />
        <Route path="/resources" element={<PublicLayout><Resources /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
        <Route path="/incidents" element={<DashboardLayout><Incidents /></DashboardLayout>} />
        <Route path="/monitor" element={<DashboardLayout><ThreatMonitor /></DashboardLayout>} />
        <Route path="/logs" element={<DashboardLayout><AuditLogs /></DashboardLayout>} />
        
        <Route path="*" element={
          <PublicLayout>
            <div className="flex items-center justify-center h-screen pt-16">
              <div className="text-center">
                <h2 className="text-4xl font-bold mb-4">404 - Page Not Found</h2>
                <p className="text-muted-foreground mt-2">The page you are looking for does not exist.</p>
              </div>
            </div>
          </PublicLayout>
        } />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
