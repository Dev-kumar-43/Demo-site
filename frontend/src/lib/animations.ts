import type { Variants } from 'framer-motion';

export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  out: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const slideUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  },
};

export const fadeInVariant: Variants = {
  hidden: { opacity: 0 },
  show: { 
    opacity: 1,
    transition: { duration: 0.5 }
  },
};

export const scaleUpVariant: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  },
};

export const cardHoverVariant = {
  hover: { 
    y: -5,
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
    transition: { type: "spring" as const, stiffness: 400, damping: 10 }
  }
};
