import { motion } from 'framer-motion';
import { teamMembers } from '../lib/mockData';
import { staggerContainer, slideUpVariant, fadeInVariant } from '../lib/animations';

export const AboutUs = () => {
  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <motion.h1 variants={slideUpVariant} className="text-4xl font-bold tracking-tight mb-4">
          About Us
        </motion.h1>
        <motion.p variants={fadeInVariant} className="text-lg text-muted-foreground">
          We are on a mission to democratize enterprise-grade security for businesses of all sizes. Founded by industry veterans, our platform rethinks how security operations should work.
        </motion.p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mb-24"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div variants={slideUpVariant}>
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              In 2020, we noticed a gap in the market. Large enterprises had massive budgets for advanced SOCs, but mid-sized companies were left vulnerable using outdated tools. 
            </p>
            <p className="text-muted-foreground">
              We built this platform to bring AI-driven threat detection and automated remediation to everyone. Today, we secure over 10,000 networks globally.
            </p>
          </motion.div>
          <motion.div variants={fadeInVariant} className="h-64 rounded-xl bg-muted border border-border flex items-center justify-center">
            {/* Placeholder for an image */}
            <span className="text-muted-foreground font-medium">Company HQ</span>
          </motion.div>
        </div>
      </motion.div>

      <div className="mb-16 text-center">
        <h2 className="text-3xl font-bold mb-12">Meet the Leadership</h2>
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {teamMembers.map((member, idx) => (
            <motion.div key={idx} variants={slideUpVariant} className="bg-card p-6 rounded-xl border border-border text-center group hover:border-primary/50 transition-colors">
              <div className="w-24 h-24 mx-auto rounded-full bg-primary/10 mb-4 group-hover:scale-105 transition-transform duration-300"></div>
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-primary text-sm font-medium mb-3">{member.role}</p>
              <p className="text-muted-foreground text-sm">{member.bio}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
