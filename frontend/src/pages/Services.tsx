import { motion } from 'framer-motion';
import { Shield, Server, Globe, Lock } from 'lucide-react';
import { staggerContainer, slideUpVariant, cardHoverVariant } from '../lib/animations';

export const Services = () => {
  const services = [
    {
      icon: Shield,
      title: "Managed SOC",
      desc: "Our team of experts monitors your environment 24/7, providing instant response to threats."
    },
    {
      icon: Server,
      title: "Cloud Security",
      desc: "Protect your AWS, Azure, and GCP workloads with continuous posture management."
    },
    {
      icon: Globe,
      title: "Network Protection",
      desc: "Advanced firewall and intrusion detection systems to secure your perimeter."
    },
    {
      icon: Lock,
      title: "Identity Access",
      desc: "Zero-trust identity management and multi-factor authentication deployment."
    }
  ];

  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Our Services</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Comprehensive security solutions tailored for the modern digital landscape.
        </p>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        {services.map((svc, i) => (
          <motion.div 
            key={i} 
            variants={slideUpVariant}
            whileHover={cardHoverVariant.hover}
            className="bg-card border border-border rounded-xl p-8 flex space-x-6"
          >
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <svc.icon className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">{svc.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{svc.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
