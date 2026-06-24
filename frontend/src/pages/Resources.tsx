import { motion } from 'framer-motion';
import { FileText, Download, PlayCircle, BookOpen } from 'lucide-react';
import { staggerContainer, slideUpVariant } from '../lib/animations';
import { Button } from '@/components/ui/button';

export const Resources = () => {
  const categories = [
    { name: "Whitepapers", icon: FileText, count: 12 },
    { name: "Webinars", icon: PlayCircle, count: 8 },
    { name: "Guides", icon: BookOpen, count: 24 }
  ];

  const recentResources = [
    { title: "2026 State of Cloud Security", type: "Whitepaper", icon: FileText },
    { title: "Defeating Ransomware with Zero Trust", type: "Webinar", icon: PlayCircle },
    { title: "SOC2 Compliance Checklist", type: "Guide", icon: BookOpen },
    { title: "API Security Best Practices", type: "Whitepaper", icon: FileText },
  ];

  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Security Resources</h1>
        <p className="text-lg text-muted-foreground">
          Explore our collection of guides, whitepapers, and webinars.
        </p>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        {categories.map((c, i) => (
          <motion.div 
            key={i} 
            variants={slideUpVariant}
            className="bg-card border border-border p-6 rounded-xl hover:border-primary/50 cursor-pointer transition-colors flex items-center justify-between"
          >
            <div className="flex items-center">
              <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                <c.icon className="h-5 w-5 text-primary" />
              </div>
              <span className="font-semibold">{c.name}</span>
            </div>
            <span className="bg-muted px-2 py-1 rounded text-xs font-medium">{c.count}</span>
          </motion.div>
        ))}
      </motion.div>

      <h2 className="text-2xl font-bold mb-8">Latest Publications</h2>
      
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {recentResources.map((r, i) => (
          <motion.div 
            key={i} 
            variants={slideUpVariant}
            className="flex items-center justify-between p-6 bg-card border border-border rounded-xl group hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-muted rounded-lg flex items-center justify-center">
                <r.icon className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold group-hover:text-primary transition-colors">{r.title}</h3>
                <p className="text-sm text-muted-foreground">{r.type}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
