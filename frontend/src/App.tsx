
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Dashboard } from './pages/Dashboard';
import { Incidents } from './pages/Incidents';
import { ThreatMonitor } from './pages/ThreatMonitor';
import { AuditLogs } from './pages/AuditLogs';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
        <Route path="/incidents" element={<DashboardLayout><Incidents /></DashboardLayout>} />
        <Route path="/monitor" element={<DashboardLayout><ThreatMonitor /></DashboardLayout>} />
        <Route path="/logs" element={<DashboardLayout><AuditLogs /></DashboardLayout>} />
        <Route path="*" element={
          <DashboardLayout>
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h2 className="text-2xl font-bold">Page Not Found</h2>
                <p className="text-muted-foreground mt-2">The page you are looking for does not exist.</p>
              </div>
            </div>
          </DashboardLayout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
