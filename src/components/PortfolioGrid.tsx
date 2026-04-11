import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import { ArrowUpRight, ChevronLeft, ChevronRight, Play, X } from 'lucide-react';

interface PortfolioGridProps {
  onProjectClick: (project: Project) => void;
}

const PortfolioGrid: React.FC<PortfolioGridProps> = ({ onProjectClick }) => {
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [failedModalVideo, setFailedModalVideo] = useState(false);
  const productDesignProjects = PROJECTS.filter(p => ['7', '8', '2'].includes(p.id));
  const adVideoProject = PROJECTS.find(p => p.id === '6');

  const getFileId = (url: string) => {
    if (!url) return null;
    const idMatch = url.match(/\/d\/([^/?&]+)/) || 
                    url.match(/[?&]id=([^&]+)/) ||
                    url.match(/\/file\/d\/([^/?&]+)/);
    return idMatch ? idMatch[1] : null;
  };

  const openVideo = (url: string) => {
    setActiveVideoUrl(url);
    setFailedModalVideo(false);
  };

  return (
    <section id="works" className="py-16 md:py-24 bg-[#0a0a0a] px-6 md:px-12 lg:px-16 relative overflow-hidden scroll-mt-24">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] -left-[10%] w-[50%] h-[50%] bg-accent/15 lg:bg-accent/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] -right-[10%] w-[50%] h-[50%] bg-accent/10 lg:bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="relative mb-8 md:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="absolute left-0 right-0 -top-16 md:-top-24 text-[18vw] md:text-[18vw] font-display font-black text-white/[0.05] leading-none select-none pointer-events-none uppercase tracking-tighter text-center"
          >
            Portfolio
          </motion.div>
          
          <div className="relative z-10 w-full">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 text-accent font-bold text-[10px] md:text-xs uppercase tracking-[0.4em] mb-6"
            >
              <span className="w-8 h-px bg-accent" />
              Selected Projects
            </motion.span>
            
            <div className="space-y-6 md:space-y-8">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-[8rem] lg:text-[10rem] font-display font-bold tracking-tighter leading-none"
              >
                FEATURED <span className="text-accent italic font-serif font-light lowercase tracking-normal">works</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-soft/60 text-lg md:text-xl max-w-4xl leading-relaxed"
              >
                A curated collection of high-impact visual designs and performance-driven ad creatives, meticulously crafted to <span className="text-soft font-bold">Elevate Brands</span> and <span className="text-soft font-bold">Maximize Digital Engagement</span>.
              </motion.p>
            </div>
          </div>
        </div>

        {/* Product Designs Section */}
        <div className="mb-16 md:mb-20">
          <div className="flex items-center gap-4 mb-8 md:mb-10">
            <h3 className="text-xl md:text-2xl font-display font-bold text-soft uppercase tracking-widest">
              Product Designs
            </h3>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {productDesignProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative cursor-pointer"
                onClick={() => onProjectClick(project)}
              >
                <div className="relative overflow-hidden rounded-2xl aspect-square glass mb-4 md:mb-6 transition-transform duration-500 group-hover:scale-[1.02] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 border-2 border-accent/0 group-hover:border-accent/40 rounded-2xl transition-all duration-300 pointer-events-none" />
                </div>

                <div className="space-y-1 md:space-y-3">
                  <h3 className="text-xl md:text-2xl font-display font-bold text-soft group-hover:text-accent transition-colors leading-tight">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 text-accent font-bold text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                    View Case Study <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Ad Videos & Images Section */}
        <div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 md:mb-10">
            <div className="flex items-center gap-4 flex-1">
              <h3 className="text-lg md:text-2xl font-display font-bold text-soft uppercase tracking-widest whitespace-nowrap">
                Product Ads
              </h3>
              <div className="h-px flex-1 bg-white/10" />
            </div>
            
            {adVideoProject && (
              <motion.button 
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onProjectClick(adVideoProject)}
                className="hidden md:flex group items-center justify-center gap-3 px-6 py-3 md:px-8 md:py-4 bg-white/5 hover:bg-accent rounded-full transition-all duration-300 w-full md:w-auto"
              >
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-soft group-hover:text-deep transition-colors">
                  Show All
                </span>
                <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-accent group-hover:text-deep transition-colors" />
              </motion.button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {adVideoProject?.videoGallery?.slice(0, 6).map((video, idx) => {
              const fileId = getFileId(video.url);
              const thumbnail = fileId ? `https://lh3.googleusercontent.com/d/${fileId}` : '';

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div 
                    className="relative overflow-hidden rounded-2xl aspect-square glass transition-transform duration-500 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] mb-4 cursor-pointer"
                    onClick={() => openVideo(video.url)}
                  >
                    <img
                      src={thumbnail}
                      alt={video.caption}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-accent/90 flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-300">
                        <Play className="w-8 h-8 text-deep fill-current ml-1" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-px bg-accent/40" />
                    <p className="text-soft/60 font-display font-bold text-[10px] uppercase tracking-[0.2em]">
                      {video.caption}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile Show All Button */}
          {adVideoProject && (
            <div className="mt-6 flex md:hidden justify-center">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onProjectClick(adVideoProject)}
                className="group flex items-center justify-center gap-2.5 px-6 py-3 bg-white/5 hover:bg-accent rounded-full transition-all duration-300 w-full max-w-[200px]"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-soft group-hover:text-deep transition-colors">
                  Show All
                </span>
                <ArrowUpRight className="w-4 h-4 text-accent group-hover:text-deep transition-colors" />
              </motion.button>
            </div>
          )}

          {/* Separation Line for Mobile */}
          <div className="mt-16 md:hidden px-12">
            <div className="h-px w-full bg-accent/20" />
          </div>
        </div>
      </div>

      {/* Video Player Modal */}
      <AnimatePresence>
        {activeVideoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-deep/98 backdrop-blur-2xl flex items-center justify-center md:p-4 no-custom-cursor"
            onClick={() => setActiveVideoUrl(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-[800px] aspect-square flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button - Positioned outside the player on mobile and desktop */}
              <button
                onClick={() => setActiveVideoUrl(null)}
                className="absolute -top-12 right-0 md:-top-4 md:-right-16 w-10 h-10 bg-accent text-deep rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,140,66,0.4)] hover:scale-110 transition-transform z-[310]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full h-full bg-black rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border border-white/5 relative">
                <iframe
                  src={`https://drive.google.com/file/d/${getFileId(activeVideoUrl)}/preview`}
                  className="w-full h-full border-0"
                  allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                  allowFullScreen={true}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PortfolioGrid;
