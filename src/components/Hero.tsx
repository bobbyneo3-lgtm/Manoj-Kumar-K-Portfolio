import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';

const Hero: React.FC = () => {
  const collageItems = [
    { src: 'https://lh3.googleusercontent.com/d/10s3d3sXM9dWfJkiB4m0bJvNH8fa6dBv8' },
    { src: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400' },
    { src: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=400' },
    { src: 'https://images.unsplash.com/photo-1586810165616-94c631fc2f79?auto=format&fit=crop&q=80&w=400' },
    { src: 'https://images.unsplash.com/photo-1516533075015-a3838414c3cb?auto=format&fit=crop&q=80&w=400' },
    { src: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=400' },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-black">
      {/* Premium Background Banner */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 to-black/90 z-10" />
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            repeatType: "reverse", 
            ease: "easeInOut" 
          }}
          src="https://lh3.googleusercontent.com/d/1FvTKn8Zd_AOMqVvZk_LO6tx-oLjDxvD6" 
          alt="Manoj Kumar K - Professional Workstation" 
          className="w-full h-full object-cover opacity-70"
          onError={(e) => {
            // Fallback if Drive link fails
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80&w=2000';
          }}
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full z-20 text-center">
        {/* Centered Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="flex flex-col items-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="mb-6 px-4 py-1.5 border border-accent/30 rounded-full bg-accent/5 backdrop-blur-sm"
          >
            <span className="text-accent text-xs md:text-sm font-bold tracking-[0.2em] uppercase">
              Professional Video Editor & Visual Artist
            </span>
          </motion.div>

          <motion.h1
            className="text-2xl sm:text-6xl md:text-8xl lg:text-9xl font-serif font-bold leading-[1.1] mb-8 tracking-tight max-w-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Performance-Driven Product Videos <br />
            <span className="text-accent italic">& Visual Storytelling</span>
          </motion.h1>

          <motion.p
            className="text-base md:text-xl lg:text-2xl text-light/90 mb-12 max-w-3xl leading-relaxed mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Crafting high-end product ad videos and high-impact visual campaigns that elevate brand presence and drive measurable results. I shoot, edit, and deliver high-end visual stories tailored for modern brands.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 w-full sm:w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <a
              href="#works"
              className="group flex items-center justify-center gap-2 px-8 py-4 md:px-10 md:py-5 bg-accent text-deep font-bold rounded-full hover:scale-105 transition-all text-base md:text-lg shadow-[0_0_20px_rgba(255,140,66,0.3)]"
            >
              View My Works
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="px-8 py-4 md:px-10 md:py-5 border border-white/20 text-soft font-bold rounded-full hover:bg-white/5 transition-all text-base md:text-lg backdrop-blur-sm"
            >
              Hire Me
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10" />
    </section>
  );
};

export default Hero;
