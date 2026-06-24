export const blogPosts = [
  {
    id: 1,
    title: "Understanding Zero Trust Security",
    excerpt: "Why the modern enterprise needs to adopt a never-trust, always-verify approach.",
    date: "2026-06-15",
    author: "Jane Doe",
    category: "Architecture"
  },
  {
    id: 2,
    title: "10 Common Threat Vectors in Cloud Deployments",
    excerpt: "Learn about the most frequent vulnerabilities we see in cloud environments and how to patch them.",
    date: "2026-06-10",
    author: "John Smith",
    category: "Cloud Security"
  },
  {
    id: 3,
    title: "The Role of AI in Automated Threat Response",
    excerpt: "How machine learning is changing the way security operation centers detect and mitigate attacks.",
    date: "2026-06-05",
    author: "Alice Johnson",
    category: "AI & ML"
  }
];

export const faqs = [
  {
    question: "What is your typical response time to an incident?",
    answer: "Our automated systems respond instantly to neutralize threats. For issues requiring human intervention, our SOC team has a 15-minute SLA."
  },
  {
    question: "Do you integrate with AWS and Azure?",
    answer: "Yes, our platform natively integrates with major cloud providers including AWS, Azure, and Google Cloud Platform via API."
  },
  {
    question: "How do you handle compliance reporting?",
    answer: "We offer built-in compliance templates for SOC2, HIPAA, GDPR, and PCI-DSS, which can be generated with a single click."
  },
  {
    question: "Is there a free trial available?",
    answer: "We offer a 14-day fully-featured trial for enterprise customers. Contact our sales team to get started."
  }
];

export const features = [
  {
    id: "f1",
    title: "Real-time Monitoring",
    description: "24/7 continuous monitoring of your infrastructure for suspicious activities.",
    icon: "Activity"
  },
  {
    id: "f2",
    title: "Automated Remediation",
    description: "Instantly block malicious IPs and quarantine compromised endpoints.",
    icon: "Shield"
  },
  {
    id: "f3",
    title: "Deep Analytics",
    description: "Advanced forensics and behavioral analytics to catch zero-day threats.",
    icon: "BarChart3"
  },
  {
    id: "f4",
    title: "Compliance Management",
    description: "Continuous compliance checking and automated audit reporting.",
    icon: "FileCheck"
  }
];

export const teamMembers = [
  {
    name: "Sarah Chen",
    role: "Chief Executive Officer",
    bio: "Former CISO with 20+ years in enterprise security."
  },
  {
    name: "Marcus Rodriguez",
    role: "Head of Threat Intelligence",
    bio: "Ex-military cyber operations specialist."
  },
  {
    name: "Emily Watson",
    role: "VP of Engineering",
    bio: "Distributed systems expert and open-source contributor."
  }
];

export const pricingPlans = [
  {
    name: "Starter",
    price: "$499",
    period: "/mo",
    description: "Perfect for small businesses starting their security journey.",
    features: ["24/7 Monitoring", "Basic Threat Intelligence", "Email Support", "Up to 50 Endpoints"],
    recommended: false
  },
  {
    name: "Professional",
    price: "$999",
    period: "/mo",
    description: "Comprehensive security for growing enterprises.",
    features: ["Everything in Starter", "Automated Remediation", "Advanced API Access", "Up to 500 Endpoints"],
    recommended: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Tailored solutions for large-scale organizations.",
    features: ["Everything in Pro", "Dedicated Account Manager", "Custom Integrations", "Unlimited Endpoints"],
    recommended: false
  }
];

export const testimonials = [
  {
    id: 1,
    content: "Since deploying this platform, our incident response time has dropped by 80%. It's completely transformed our SOC.",
    author: "David L.",
    role: "CISO, TechCorp"
  },
  {
    id: 2,
    content: "The compliance reporting feature alone saves us hundreds of hours during audit season. Highly recommended.",
    author: "Priya S.",
    role: "Compliance Officer, FinServe"
  },
  {
    id: 3,
    content: "The most intuitive security dashboard I've used in my 15-year career. It makes complex data easily digestible.",
    author: "Michael T.",
    role: "Security Director, HealthPlus"
  }
];
