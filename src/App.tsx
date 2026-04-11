import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PortfolioGrid from './components/PortfolioGrid';
import CaseStudyModal from './components/CaseStudyModal';
import VideoShowcase from './components/VideoShowcase';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ParticlesBackground from './components/ParticlesBackground';
import { Project } from './types';
import { ArrowLeft } from 'lucide-react';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 1000);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Simulate initial loading for premium feel
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-matte overflow-x-hidden selection:bg-accent selection:text-deep">
      <CustomCursor />
      <ParticlesBackground />
      
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
            }}
            className="fixed inset-0 z-[200] bg-deep flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Animated Background Glow */}
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none"
            />

            <div className="relative z-10 flex flex-col items-center w-full px-6">
              <div className="overflow-hidden mb-4 w-full flex justify-center">
                <motion.div
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                  className="text-2xl sm:text-5xl md:text-8xl font-display font-bold tracking-tighter text-soft flex flex-wrap justify-center gap-x-[0.2em]"
                >
                  {"MANOJ".split("").map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
                    >
                      {char}
                    </motion.span>
                  ))}
                  <span className="w-4" />
                  {"KUMAR".split("").map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.05, duration: 0.5 }}
                      className="text-accent"
                    >
                      {char}
                    </motion.span>
                  ))}
                  <span className="w-4" />
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="text-accent"
                  >
                    K
                  </motion.span>
                </motion.div>
              </div>

              {/* Sophisticated Progress Bar */}
              <div className="relative w-64 md:w-96 h-[2px] bg-white/5 rounded-full overflow-hidden mb-8">
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '0%' }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-accent to-accent shadow-[0_0_15px_rgba(255,140,66,0.5)]"
                />
              </div>

              <div className="overflow-hidden w-full flex justify-center">
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  className="text-light/40 text-[10px] md:text-xs uppercase tracking-[0.5em] font-medium text-center"
                >
                  Visual Storytelling in Progress
                </motion.p>
              </div>
            </div>

            {/* Decorative Lines */}
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
              className="absolute top-1/2 left-0 w-full h-px bg-white/5 -translate-y-1/2 pointer-events-none"
            />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Navbar />
            
            <main>
              <Hero />
              <PortfolioGrid onProjectClick={setSelectedProject} />
              <VideoShowcase />
              <About />
              <Contact />
            </main>


            <Footer />

            <CaseStudyModal 
              project={selectedProject} 
              onClose={() => setSelectedProject(null)} 
            />

            {/* Floating Back to Top Button */}
            <AnimatePresence>
              {showBackToTop && !selectedProject && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5, y: 20 }}
                  onClick={scrollToTop}
                  className="fixed bottom-8 right-8 z-[150] w-14 h-14 bg-accent text-deep rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,140,66,0.4)] hover:scale-110 transition-transform group"
                >
                  <ArrowLeft className="w-6 h-6 rotate-90 transition-transform group-hover:-translate-y-1" />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
