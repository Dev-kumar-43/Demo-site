import { motion } from 'framer-motion';
import { pricingPlans } from '../lib/mockData';
import { Check, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { staggerContainer, slideUpVariant } from '../lib/animations';

export const Pricing = () => {
  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-lg text-muted-foreground">
          Choose the right security plan for your business size.
        </p>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        {pricingPlans.map((plan) => (
          <motion.div 
            key={plan.name} 
            variants={slideUpVariant}
            className={`relative flex flex-col p-8 rounded-2xl border ${
              plan.recommended ? 'border-primary shadow-xl scale-105 bg-card z-10' : 'border-border bg-card'
            }`}
          >
            {plan.recommended && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span className="bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                  Most Popular
                </span>
              </div>
            )}
            
            <div className="mb-8">
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <div className="mt-4 flex items-baseline text-5xl font-extrabold">
                {plan.price}
                <span className="ml-1 text-xl font-medium text-muted-foreground">{plan.period}</span>
              </div>
              <p className="mt-4 text-muted-foreground">{plan.description}</p>
            </div>

            <ul className="flex-1 space-y-4 mb-8">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <p className="ml-3 text-base">{feature}</p>
                </li>
              ))}
            </ul>

            <Button className="w-full" variant={plan.recommended ? "default" : "outline"}>
              {plan.price === 'Custom' ? 'Contact Sales' : 'Start Free Trial'}
            </Button>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-24 p-8 bg-muted rounded-2xl border border-border flex flex-col md:flex-row items-center justify-between"
      >
        <div className="flex items-center mb-6 md:mb-0">
          <Shield className="h-12 w-12 text-primary mr-6" />
          <div>
            <h3 className="text-xl font-bold">14-Day Money Back Guarantee</h3>
            <p className="text-muted-foreground">Not satisfied? We'll refund your money, no questions asked.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
