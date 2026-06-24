import { motion } from 'framer-motion';
import { features } from '../lib/mockData';
import { Activity, Shield, BarChart3, FileCheck } from 'lucide-react';
import { staggerContainer, slideUpVariant } from '../lib/animations';

const iconMap: Record<string, React.ElementType> = {
  Activity,
  Shield,
  BarChart3,
  FileCheck
};

export const Features = () => {
  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Platform Features</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Everything you need to secure your organization in one unified platform.
        </p>
      </div>

      <motion.div 
        className="space-y-24"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        {features.map((feature, i) => {
          const IconComponent = iconMap[feature.icon];
          const isEven = i % 2 === 0;

          return (
            <motion.div 
              key={feature.id} 
              variants={slideUpVariant}
              className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
            >
              <div className="flex-1 space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  {IconComponent && <IconComponent className="h-6 w-6 text-primary" />}
                </div>
                <h2 className="text-3xl font-bold">{feature.title}</h2>
                <p className="text-lg text-muted-foreground">{feature.description}</p>
                <ul className="space-y-2 mt-4">
                  {[1, 2, 3].map(item => (
                    <li key={item} className="flex items-center text-muted-foreground">
                      <Shield className="h-4 w-4 text-primary mr-2" />
                      Detailed capability metric {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 w-full">
                <div className="aspect-video bg-muted border border-border rounded-xl shadow-lg flex items-center justify-center">
                  <span className="text-muted-foreground font-medium">Dashboard Interface Mockup</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};
