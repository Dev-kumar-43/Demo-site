import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqs } from '../lib/mockData';
import { ChevronDown } from 'lucide-react';
import { staggerContainer, slideUpVariant } from '../lib/animations';

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-muted-foreground">
          Everything you need to know about the platform and billing.
        </p>
      </div>

      <motion.div 
        className="space-y-4"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        {faqs.map((faq, index) => (
          <motion.div 
            key={index} 
            variants={slideUpVariant}
            className="border border-border rounded-lg bg-card overflow-hidden"
          >
            <button
              className="w-full flex items-center justify-between p-6 text-left"
              onClick={() => toggleFaq(index)}
            >
              <span className="font-semibold text-lg">{faq.question}</span>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="text-muted-foreground" />
              </motion.div>
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-6 pb-6 text-muted-foreground border-t border-border pt-4">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
