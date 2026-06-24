import { motion } from 'framer-motion';
import { testimonials } from '../lib/mockData';
import { Quote } from 'lucide-react';
import { staggerContainer, slideUpVariant } from '../lib/animations';

export const Testimonials = () => {
  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Trusted by Security Teams</h1>
        <p className="text-lg text-muted-foreground">
          See what our customers have to say about the platform.
        </p>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        {testimonials.map((t) => (
          <motion.div 
            key={t.id} 
            variants={slideUpVariant}
            className="bg-card p-8 rounded-2xl border border-border relative"
          >
            <Quote className="h-8 w-8 text-primary/20 mb-4" />
            <p className="text-lg mb-6 leading-relaxed relative z-10">"{t.content}"</p>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-primary/10 mr-4 flex items-center justify-center font-bold text-primary">
                {t.author.charAt(0)}
              </div>
              <div>
                <p className="font-bold">{t.author}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-32 text-center"
      >
        <h3 className="text-2xl font-bold mb-8">Powering security at top companies</h3>
        <div className="flex flex-wrap justify-center gap-8 opacity-50 grayscale">
          {/* Mock company logos */}
          <div className="h-8 w-32 bg-muted rounded"></div>
          <div className="h-8 w-24 bg-muted rounded"></div>
          <div className="h-8 w-40 bg-muted rounded"></div>
          <div className="h-8 w-28 bg-muted rounded"></div>
        </div>
      </motion.div>
    </div>
  );
};
