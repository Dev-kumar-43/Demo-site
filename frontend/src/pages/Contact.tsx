import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { slideUpVariant, fadeInVariant } from '../lib/animations';

export const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial="hidden"
        animate="show"
        variants={slideUpVariant}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Our team is here to answer your questions and help you secure your infrastructure.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <motion.div 
          initial="hidden"
          animate="show"
          variants={fadeInVariant}
          className="space-y-8"
        >
          <div>
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="h-6 w-6 text-primary mr-4 mt-1" />
                <div>
                  <p className="font-semibold">Email Sales</p>
                  <p className="text-muted-foreground">sales@socplatform.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-6 w-6 text-primary mr-4 mt-1" />
                <div>
                  <p className="font-semibold">Call Us</p>
                  <p className="text-muted-foreground">+1 (800) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-primary mr-4 mt-1" />
                <div>
                  <p className="font-semibold">Headquarters</p>
                  <p className="text-muted-foreground">123 Security Blvd, Suite 400<br/>San Francisco, CA 94105</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-muted/50 rounded-xl border border-border">
            <h4 className="font-bold mb-2">Need Technical Support?</h4>
            <p className="text-sm text-muted-foreground mb-4">Current customers can access 24/7 support through the portal.</p>
            <Button variant="outline" className="w-full">Open Support Portal</Button>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          initial="hidden"
          animate="show"
          variants={slideUpVariant}
          className="bg-card border border-border p-8 rounded-2xl shadow-sm"
        >
          {isSubmitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
              >
                <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
              <p className="text-muted-foreground mb-6">We'll be in touch shortly.</p>
              <Button onClick={() => setIsSubmitted(false)} variant="outline">Send Another</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <input required type="text" className="w-full bg-muted border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <input required type="text" className="w-full bg-muted border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Work Email</label>
                <input required type="email" className="w-full bg-muted border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <textarea required rows={4} className="w-full bg-muted border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none"></textarea>
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};
