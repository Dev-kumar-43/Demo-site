import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShieldAlert, 
  LayoutDashboard, 
  Activity, 
  FileText, 
  Settings, 
  LogOut,
  Bell,
  Menu,
  User,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  active?: boolean;
}

const SidebarItem = ({ icon, label, path, active }: SidebarItemProps) => (
  <Link to={path}>
    <div className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
      active 
        ? 'bg-primary/10 text-primary border-l-2 border-primary' 
        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
    }`}>
      {icon}
      <span className="font-medium">{label}</span>
    </div>
  </Link>
);

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card hidden md:flex flex-col">
        <div className="p-6 flex items-center space-x-3">
          <div className="p-2 bg-primary/20 rounded-lg">
            <ShieldAlert className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">SOC Platform</h1>
        </div>
        
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full bg-muted/50 border-none rounded-md pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          <SidebarItem 
            icon={<LayoutDashboard size={20} />} 
            label="Dashboard" 
            path="/dashboard" 
            active={location.pathname === '/dashboard' || location.pathname === '/'} 
          />
          <SidebarItem 
            icon={<ShieldAlert size={20} />} 
            label="Incidents" 
            path="/incidents" 
            active={location.pathname === '/incidents'} 
          />
          <SidebarItem 
            icon={<Activity size={20} />} 
            label="Threat Monitor" 
            path="/monitor" 
            active={location.pathname === '/monitor'} 
          />
          <SidebarItem 
            icon={<FileText size={20} />} 
            label="Audit Logs" 
            path="/logs" 
            active={location.pathname === '/logs'} 
          />
        </nav>

        <div className="p-4 border-t border-border mt-auto">
          <SidebarItem 
            icon={<Settings size={20} />} 
            label="Settings" 
            path="/settings" 
            active={location.pathname === '/settings'} 
          />
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-muted-foreground hover:bg-destructive/10 hover:text-destructive mt-2">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-border bg-card/50 backdrop-blur flex items-center justify-between px-6 z-10">
          <div className="flex items-center md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
            <span className="ml-4 font-bold">SOC Platform</span>
          </div>
          
          <div className="hidden md:flex items-center">
            <h2 className="text-lg font-semibold tracking-tight capitalize">
              {location.pathname === '/' ? 'Dashboard' : location.pathname.substring(1)}
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="hidden lg:flex border-green-500/30 text-green-400 bg-green-500/10 hover:bg-green-500/20">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
              System Healthy
            </Button>
            
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full"></span>
            </Button>
            
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50 cursor-pointer">
              <User className="h-4 w-4 text-primary" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};
