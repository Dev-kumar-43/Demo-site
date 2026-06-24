import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Lock, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fadeInVariant, staggerContainer, slideUpVariant } from '../lib/animations';

export const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32">
        <div className="absolute inset-0 bg-primary/5 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={slideUpVariant} className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium">
            New: AI-Powered Threat Detection
          </motion.div>
          <motion.h1 variants={slideUpVariant} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
            Secure Your Enterprise <br className="hidden md:block"/> at the Speed of Light
          </motion.h1>
          <motion.p variants={fadeInVariant} className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Next-generation Security Operations Center platform with automated remediation, deep analytics, and continuous compliance.
          </motion.p>
          <motion.div variants={fadeInVariant} className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/pricing">
              <Button size="lg" className="h-12 px-8 w-full sm:w-auto">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="h-12 px-8 w-full sm:w-auto">
                Book a Demo
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Feature Highlights */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              { icon: Shield, title: "Zero Trust Architecture", desc: "Never trust, always verify. Implement strict access controls out of the box." },
              { icon: Zap, title: "Automated Response", desc: "Contain breaches in milliseconds, not hours. Write custom playbooks for remediation." },
              { icon: Lock, title: "End-to-End Encryption", desc: "Military-grade encryption for data at rest and in transit." }
            ].map((f, i) => (
              <motion.div key={i} variants={slideUpVariant} className="bg-card p-8 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};
