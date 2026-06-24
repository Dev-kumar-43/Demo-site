import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldAlert, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Features', path: '/features' },
    { name: 'Services', path: '/services' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About Us', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Resources', path: '/resources' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="p-2 bg-primary/20 rounded-lg">
              <ShieldAlert className="h-6 w-6 text-primary" />
            </div>
            <span className="font-bold text-xl tracking-tight">SOC Platform</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link to="/pricing">
              <Button>Get Started</Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-border bg-background overflow-hidden"
            >
              <div className="px-4 py-4 space-y-2 flex flex-col">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-2 px-4 hover:bg-muted rounded-md text-sm font-medium"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="border-t border-border my-2 pt-4 flex flex-col space-y-2">
                  <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">Log in</Button>
                  </Link>
                  <Link to="/pricing" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/20 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-1">
              <Link to="/" className="flex items-center space-x-2 mb-4">
                <ShieldAlert className="h-6 w-6 text-primary" />
                <span className="font-bold text-xl">SOC Platform</span>
              </Link>
              <p className="text-muted-foreground text-sm">
                Next-generation threat detection and automated remediation for the modern enterprise.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/features" className="hover:text-primary">Features</Link></li>
                <li><Link to="/services" className="hover:text-primary">Services</Link></li>
                <li><Link to="/pricing" className="hover:text-primary">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
                <li><Link to="/blog" className="hover:text-primary">Blog</Link></li>
                <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/resources" className="hover:text-primary">Documentation</Link></li>
                <li><Link to="/faq" className="hover:text-primary">FAQ</Link></li>
                <li><Link to="/testimonials" className="hover:text-primary">Testimonials</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} SOC Platform. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
