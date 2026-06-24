import { motion } from 'framer-motion';
import { blogPosts } from '../lib/mockData';
import { Calendar, User } from 'lucide-react';
import { staggerContainer, slideUpVariant } from '../lib/animations';

export const Blog = () => {
  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-16">
        <h1 className="text-4xl font-bold mb-4">Security Blog</h1>
        <p className="text-lg text-muted-foreground">
          Insights, research, and news from our security research team.
        </p>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        {blogPosts.map((post) => (
          <motion.div 
            key={post.id} 
            variants={slideUpVariant}
            className="flex flex-col bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="h-48 bg-muted border-b border-border"></div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="text-xs font-semibold text-primary mb-2 uppercase tracking-wider">
                {post.category}
              </div>
              <h3 className="text-xl font-bold mb-3">{post.title}</h3>
              <p className="text-muted-foreground mb-4 flex-1">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center"><User className="w-4 h-4 mr-1"/> {post.author}</span>
                  <span className="flex items-center"><Calendar className="w-4 h-4 mr-1"/> {post.date}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
