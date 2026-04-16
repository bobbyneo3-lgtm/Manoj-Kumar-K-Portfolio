import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowUpRight, Cpu, X, ArrowLeft } from 'lucide-react';

const FLYERS = [
  {
    id: 1,
    title: "AI Flyer 1",
    tool: "Midjourney v6",
    image: "https://lh3.googleusercontent.com/d/1pw10yUCWLZGwtZI_KHl95laxE-nOoEj4",
  },
  {
    id: 2,
    title: "AI Flyer 2",
    tool: "Midjourney v6",
    image: "https://lh3.googleusercontent.com/d/1IoT2MTNBMfSpkHfLmtnl4GXyvFIJN3vW",
  },
  {
    id: 3,
    title: "AI Flyer 3",
    tool: "Midjourney v6",
    image: "https://lh3.googleusercontent.com/d/1D2YpX0DfV87gyD52eobJ6MHKCzeK4s9s",
  },
  {
    id: 4,
    title: "AI Flyer 4",
    tool: "Midjourney v6",
    image: "https://lh3.googleusercontent.com/d/1zakcnRop1ihHg7PEkAQiht5tLVKkU2FO",
  },
  {
    id: 5,
    title: "AI Flyer 5",
    tool: "Midjourney v6",
    image: "https://lh3.googleusercontent.com/d/1BeSPK0l9IS3rTG_PZ6QrkoX-d6_h7eYy",
  },
  {
    id: 6,
    title: "AI Flyer 6",
    tool: "Midjourney v6",
    image: "https://lh3.googleusercontent.com/d/1Lq0MQ0Kehk3UslDhEi5JY8e0Fx5AC2qd",
  },
  {
    id: 7,
    title: "AI Flyer 7",
    tool: "Midjourney v6",
    image: "https://lh3.googleusercontent.com/d/1LBjHVoJw8rTbEmrgEKZ6dM8CVFV3kJk6",
  },
  {
    id: 8,
    title: "AI Flyer 8",
    tool: "Midjourney v6",
    image: "https://lh3.googleusercontent.com/d/1L5h-ym7Jb56cqAJ_3SWQC4DeIL4G99oy",
  },
  {
    id: 9,
    title: "AI Flyer 9",
    tool: "Midjourney v6",
    image: "https://lh3.googleusercontent.com/d/1_yyfa80VtYRyIBu4N1UTmYrGpMeGC4RN",
  }
];

const AIFlyers: React.FC = () => {
  const [isSubLayoutOpen, setIsSubLayoutOpen] = useState(false);

  // Prevent body scroll when sub-layout is open
  useEffect(() => {
    if (isSubLayoutOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSubLayoutOpen]);

  return (
    <section id="ai-flyers" className="py-24 bg-matte px-6 md:px-12 lg:px-16 relative overflow-hidden scroll-mt-24">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 text-accent font-bold text-xs uppercase tracking-[0.4em] mb-6"
            >
              <Cpu className="w-4 h-4" />
              AI Visual Explorations
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-7xl font-display font-bold tracking-tighter leading-none mb-8"
            >
              AI <span className="text-accent italic font-serif font-light lowercase tracking-normal">Flyers</span> & Concepts
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-light/60 text-lg md:text-xl leading-relaxed"
            >
              Pushing the boundaries of visual storytelling using cutting-edge AI tools. These flyers represent a fusion of human creativity and machine intelligence.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="hidden lg:flex items-center gap-4 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md"
          >
            <Sparkles className="text-accent w-5 h-5" />
            <span className="text-soft text-sm font-medium">Generative Art Series 2025 - 26</span>
          </motion.div>
        </div>

        {/* Main Grid (Always 6 items) */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {FLYERS.slice(0, 6).map((flyer, idx) => (
            <motion.div
              key={flyer.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.8, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-[24px] md:rounded-[32px] glass bg-white/5 cursor-pointer hover:shadow-[0_0_30px_rgba(255,140,66,0.15)] transition-shadow duration-500 aspect-square"
            >
              <motion.img
                initial={{ scale: 1.2, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 0.8 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut", delay: idx * 0.1 }}
                src={flyer.image}
                alt={flyer.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4 md:p-8">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-2 text-accent text-[7px] md:text-[9px] uppercase tracking-[0.2em] font-bold mb-1 md:mb-2">
                    <Cpu className="w-2 h-2 md:w-2.5 md:h-2.5" />
                    {flyer.tool}
                  </div>
                  <h3 className="text-[10px] md:text-lg font-display font-bold text-soft mb-1 md:mb-2">
                    {flyer.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA & Show All Button */}
        <div className="mt-16 relative flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-light/40 text-[10px] uppercase tracking-[0.4em] font-bold mb-1">
              Custom AI Visuals?
            </p>
            <a 
              href="#contact"
              className="inline-flex items-center gap-2 text-soft hover:text-accent transition-colors font-bold group text-sm"
            >
              Let's talk AI <ArrowUpRight className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mt-8 sm:mt-0 sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2"
          >
            <motion.button
              onClick={() => setIsSubLayoutOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex group items-center justify-center gap-2 px-6 py-3 bg-white/5 border border-white/10 hover:bg-accent text-soft hover:text-deep rounded-full transition-all duration-300"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap">
                Show all
              </span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Full-Screen Sub-Layout */}
      <AnimatePresence>
        {isSubLayoutOpen && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-matte overflow-y-auto"
          >
            <div className="min-h-screen px-6 md:px-12 lg:px-16 py-8 md:py-12 relative">
              {/* Header */}
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={() => setIsSubLayoutOpen(false)}
                  className="flex items-center gap-3 text-soft/60 hover:text-accent transition-colors group w-fit"
                >
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent/30 transition-colors">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Back to Portfolio</span>
                </motion.button>

                <div className="md:text-right">
                  <h2 className="text-2xl md:text-4xl font-display font-bold text-soft tracking-tighter">
                    All AI <span className="text-accent italic font-serif font-light lowercase tracking-normal">Explorations</span>
                  </h2>
                  <p className="text-accent/60 text-[10px] uppercase tracking-[0.4em] font-bold mt-1">Archive 2025 - 26</p>
                </div>
              </div>

              {/* Full Grid */}
              <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
                {FLYERS.map((flyer, idx) => (
                  <motion.div
                    key={`all-${flyer.id}`}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      delay: idx * 0.05,
                      duration: 0.6,
                      ease: [0.215, 0.61, 0.355, 1]
                    }}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    className="group relative overflow-hidden rounded-[24px] glass bg-white/5 aspect-square cursor-pointer"
                  >
                    <motion.img
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: idx * 0.05 }}
                      src={flyer.image}
                      alt={flyer.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-3 md:p-6">
                      <div className="text-[7px] md:text-[9px] text-accent font-bold uppercase tracking-[0.2em] mb-0.5 md:mb-1">{flyer.tool}</div>
                      <div className="text-soft font-bold text-[10px] md:text-xs">{flyer.title}</div>
                    </div>
                  </motion.div>
                ))}

                {/* Coming Soon Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    delay: FLYERS.length * 0.05,
                    duration: 0.6,
                    ease: [0.215, 0.61, 0.355, 1]
                  }}
                  className="group relative overflow-hidden rounded-[24px] border border-dashed border-white/10 flex flex-col items-center justify-center p-6 text-center aspect-square bg-white/[0.02]"
                >
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-accent/10 transition-colors">
                    <Sparkles className="w-6 h-6 text-accent/40 group-hover:text-accent transition-colors" />
                  </div>
                  <p className="text-soft/40 text-[10px] uppercase tracking-[0.2em] font-bold mb-1">Stay Tuned</p>
                  <h3 className="text-soft/60 font-display font-bold text-xs md:text-sm leading-tight">
                    More designs<br/>uploaded soon
                  </h3>
                </motion.div>
              </div>

              {/* Close Button Floating */}
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={() => setIsSubLayoutOpen(false)}
                className="fixed bottom-8 right-8 w-14 h-14 bg-accent text-deep rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-[110] md:hidden"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AIFlyers;
