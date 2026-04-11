import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, CheckCircle2, ArrowLeft, ChevronRight, ChevronLeft, Play } from 'lucide-react';
import { Project, DesignShowcase } from '../types';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  const [selectedDesignIndex, setSelectedDesignIndex] = useState<number | null>(null);
  const [selectedVisualIdx, setSelectedVisualIdx] = useState<number | null>(null);
  const [playingVideoIdx, setPlayingVideoIdx] = useState<number | null>(null);
  const [failedVideos, setFailedVideos] = useState<Record<number, boolean>>({});
  const [currentStage, setCurrentStage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const modalRef = React.useRef<HTMLDivElement>(null);
  const showcaseRef = React.useRef<HTMLDivElement>(null);

  const handleBackToGallery = () => {
    setSelectedDesignIndex(null);
    // Use a small timeout to allow the layout to switch back before scrolling
    setTimeout(() => {
      showcaseRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  React.useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      setPlayingVideoIdx(null);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  // Scroll to top when switching between gallery and journey view
  React.useEffect(() => {
    if (modalRef.current) {
      modalRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedDesignIndex, project]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedVisualIdx !== null && project) {
        if (e.key === 'ArrowLeft') {
          setSelectedVisualIdx(prev => prev !== null ? (prev - 1 + project.visuals.length) % project.visuals.length : null);
        } else if (e.key === 'ArrowRight') {
          setSelectedVisualIdx(prev => prev !== null ? (prev + 1) % project.visuals.length : null);
        } else if (e.key === 'Escape') {
          setSelectedVisualIdx(null);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedVisualIdx, project]);

  if (!project) return null;

  const selectedDesign = selectedDesignIndex !== null && project.designShowcase 
    ? project.designShowcase[selectedDesignIndex] 
    : null;

  const stages = project.title.includes('Acrylic Clipboards')
    ? [
        { label: 'DESIGN', key: 'design' as const },
        { label: 'FINAL', key: 'finalProduct' as const },
      ]
    : [
        { label: 'The Design', key: 'design' as const },
        { label: 'Design on Product', key: 'mockup' as const },
        { label: 'Final Original Images', key: 'finalProduct' as const },
      ];

  const handleDesignClick = (idx: number) => {
    setSelectedDesignIndex(idx);
    setCurrentStage(0);
  };

  const getStageDescription = (key: string) => {
    switch (key) {
      case 'design':
        return "The initial conceptual design focusing on layout and typography.";
      case 'mockup':
        return "3D visualization of the design in a real-world environment.";
      case 'finalProduct':
        return "The final high-resolution product ready for production.";
      default:
        return "";
    }
  };

  const getFileId = (url: string) => {
    if (!url) return null;
    // Handle various Drive URL formats: /d/ID, id=ID, open?id=ID, uc?id=ID, file/d/ID
    const idMatch = url.match(/\/d\/([^/?&]+)/) || 
                    url.match(/[?&]id=([^&]+)/) ||
                    url.match(/\/file\/d\/([^/?&]+)/);
    return idMatch ? idMatch[1] : null;
  };

  return (
    <>
    <AnimatePresence>
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 z-[100] bg-deep/95 backdrop-blur-xl no-custom-cursor ${selectedDesign ? 'overflow-hidden' : 'overflow-y-auto'}`}
        >
          <div className={`min-h-full flex justify-center items-center pt-0 pb-4 md:pb-10 px-2 md:px-6 ${selectedDesign ? 'h-full' : ''}`}>
            <motion.div
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              className={`relative w-full max-w-7xl bg-matte rounded-[24px] shadow-2xl overflow-hidden ${selectedDesign ? 'h-[95vh] md:h-[90vh] flex flex-col self-center' : 'self-start mt-4 md:mt-10'}`}
            >
          {/* Sticky Header for Controls */}
          <div className="sticky top-0 z-50 flex justify-between items-center p-4 md:p-6 bg-matte/80 backdrop-blur-md border-b border-white/5">
            {/* Back Button */}
            <button
              onClick={selectedDesignIndex !== null ? handleBackToGallery : onClose}
              className="px-4 py-2 md:px-6 md:py-3 bg-deep border border-white/10 hover:bg-accent hover:text-deep transition-all rounded-full flex items-center gap-2 text-soft group shadow-xl"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:-translate-x-1" />
              <span className="font-bold text-[10px] md:text-sm uppercase tracking-widest">
                {selectedDesignIndex !== null ? 'Back to Gallery' : 'Back'}
              </span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-8 h-8 md:w-10 md:h-10 bg-accent text-deep hover:scale-110 transition-all rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,140,66,0.3)]"
            >
              <X className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>

          <div className={`flex flex-col ${selectedDesign ? 'flex-1 overflow-hidden' : ''}`}>
            {!selectedDesign ? (
              <>
                {/* Video Gallery Special Layout */}
                {project.videoGallery && project.videoGallery.length > 0 ? (
                  <div className="flex-1 overflow-y-auto p-4 md:p-12 space-y-12">
                    <div className="text-center space-y-4 mb-16">
                      <h2 className="text-2xl md:text-7xl font-display font-bold text-soft leading-tight tracking-tighter">
                        {project.title}
                      </h2>
                      <p className="text-soft/60 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                      {project.videoGallery.map((video, idx) => {
                        const fileId = getFileId(video.url);
                        const isPlaying = playingVideoIdx === idx;
                        const thumbnail = fileId ? `https://lh3.googleusercontent.com/d/${fileId}` : '';

                        return (
                          <div key={idx} className="space-y-4 group">
                            <div 
                              className={`aspect-square w-full rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/5 relative transition-transform duration-500 group-hover:scale-[1.02] ${isPlaying ? 'cursor-none no-custom-cursor' : 'cursor-pointer'}`}
                              onClick={() => !isPlaying && setPlayingVideoIdx(idx)}
                            >
                              {/* Proactive Pre-loading: Always render the video tag but keep it hidden until clicked */}
                              <div className={`absolute inset-0 transition-opacity duration-500 ${isPlaying ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
                                {failedVideos[idx] ? (
                                  <iframe
                                    src={`https://drive.google.com/file/d/${getFileId(video.url)}/preview`}
                                    className="w-full h-full border-0"
                                    allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                                    allowFullScreen={true}
                                    style={{ transform: "scale(1.05)", width: "100%", height: "100%" }}
                                  />
                                ) : (
                                  <video
                                    src={video.url}
                                    autoPlay={isPlaying}
                                    muted={isPlaying}
                                    controls={isPlaying}
                                    playsInline
                                    preload={idx === 0 ? "auto" : "metadata"}
                                    poster={thumbnail}
                                    className="w-full h-full object-cover"
                                    onError={() => setFailedVideos(prev => ({ ...prev, [idx]: true }))}
                                  />
                                )}
                              </div>

                              {!isPlaying && (
                                <div className="w-full h-full relative z-20">
                                  {thumbnail && (
                                    <img 
                                      src={thumbnail} 
                                      alt={video.caption}
                                      className="w-full h-full object-cover opacity-60"
                                      referrerPolicy="no-referrer"
                                      loading="lazy"
                                    />
                                  )}
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-16 h-16 bg-accent text-deep rounded-full flex items-center justify-center shadow-2xl transform transition-transform group-hover:scale-110">
                                      <Play className="w-8 h-8 fill-current ml-1" />
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                            <p className="text-center text-accent font-bold text-[10px] uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-opacity">
                              {video.caption}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    {/* Result / Impact for Video Gallery */}
                    <div className="max-w-7xl mx-auto w-full pt-12">
                      <section className="relative overflow-hidden p-8 md:p-16 bg-accent text-deep rounded-[40px] shadow-2xl shadow-accent/10">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                          <CheckCircle2 className="w-32 h-32 md:w-48 md:h-48" />
                        </div>
                        <div className="relative z-10 space-y-6">
                          <h3 className="text-xs md:text-sm uppercase tracking-[0.4em] font-black opacity-60">The Outcome</h3>
                          <p className="text-xl md:text-5xl font-display font-bold leading-[1.1] tracking-tighter max-w-4xl">
                            {project.result}
                          </p>
                        </div>
                      </section>
                    </div>

                    {/* Bottom Back Button */}
                    <div className="flex justify-center pt-12 pb-12">
                      <button
                        onClick={onClose}
                        className="group px-6 py-3 md:px-10 md:py-5 bg-white/5 border border-white/10 hover:bg-accent hover:text-deep transition-all rounded-full flex items-center gap-3 md:gap-4 text-soft font-bold text-xs md:text-sm uppercase tracking-widest shadow-xl"
                      >
                        <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:-translate-x-2" /> 
                        Back to Portfolio
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Hero Product Shot */}
                    <div className="relative h-[400px] md:h-[700px] overflow-hidden mt-4 md:mt-8 mx-2 md:mx-4 rounded-xl md:rounded-[24px] bg-black/40">
                      <img
                        src={isMobile ? (project.mobileHeroImage || project.thumbnail) : (project.heroImage || project.thumbnail)}
                        alt={project.title}
                        className="w-full h-full object-cover object-center"
                        referrerPolicy="no-referrer"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-matte via-transparent to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6 md:bottom-12 md:left-12 md:right-12">
                        <h2 className="text-2xl md:text-8xl font-display font-bold text-soft leading-tight tracking-tighter">
                          {project.title}
                        </h2>
                      </div>
                    </div>

                    {/* Project Info Bar */}
                    <div className="px-4 md:px-12 py-6 grid grid-cols-2 md:grid-cols-3 gap-6">
                      <div>
                        <span className="block text-[10px] uppercase tracking-widest text-accent font-bold mb-1">Client</span>
                        <span className="text-soft font-medium">Personal Project</span>
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase tracking-widest text-accent font-bold mb-1">Year</span>
                        <span className="text-soft font-medium">2024</span>
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase tracking-widest text-accent font-bold mb-1">Role</span>
                        <span className="text-soft font-medium">Lead Designer</span>
                      </div>
                    </div>

                    {/* Storytelling Content */}
                    <div className="px-4 md:px-12 py-6 md:py-12 space-y-12 md:space-y-20">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">
                        {/* Main Content Column */}
                        <div className="lg:col-span-8 space-y-12 md:space-y-20">
                          {/* Single Video Player if available (legacy) */}
                          {project.videoUrl && (
                            <section className="space-y-6">
                              <h3 className="text-2xl md:text-4xl font-display font-bold text-soft">Video Showcase</h3>
                              <div className="aspect-square w-full mx-auto rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/5 relative no-custom-cursor" style={{ maxWidth: 'min(100%, 65vh)' }}>
                                {project.videoUrl.includes('drive.google.com') ? (
                                  <iframe
                                    key={project.videoUrl}
                                    src={`https://drive.google.com/file/d/${getFileId(project.videoUrl)}/preview`}
                                    className="w-full h-full border-0"
                                    allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                                    allowFullScreen
                                  />
                                ) : (
                                  <video
                                    src={project.videoUrl}
                                    autoPlay
                                    muted
                                    controls
                                    playsInline
                                    className="w-full h-full object-cover"
                                  />
                                )}
                              </div>
                            </section>
                          )}

                          {/* Project Overview & Problem */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <section className="space-y-4">
                              <h3 className="text-2xl font-display font-bold text-soft">The Overview</h3>
                              <p className="text-light/80 leading-relaxed">
                                {project.description}
                              </p>
                            </section>
                            <section className="space-y-4">
                              <h3 className="text-2xl font-display font-bold text-soft">The Challenge</h3>
                              <p className="text-light/80 leading-relaxed">
                                {project.problem}
                              </p>
                            </section>
                          </div>

                          {/* Design Approach - Full Width Editorial */}
                          <section className="relative">
                            <div className="absolute -left-10 top-0 text-[120px] font-display font-black text-white/5 leading-none select-none pointer-events-none">
                              01
                            </div>
                            <div className="relative z-10 space-y-6">
                              <h3 className="text-2xl md:text-5xl font-display font-bold text-soft tracking-tight">The Creative Approach</h3>
                              <p className="text-lg md:text-2xl text-light/90 leading-relaxed font-light max-w-3xl">
                                {project.approach}
                              </p>
                            </div>
                          </section>
                        </div>

                        {/* Sidebar Column */}
                        <div className="lg:col-span-4">
                          <div className="sticky top-24 space-y-8">
                            {/* CTA Card - Desktop Only */}
                            <div className="hidden lg:block p-8 md:p-10 bg-white/5 border border-white/10 rounded-[24px] space-y-8">
                              <div className="space-y-4">
                                <h4 className="text-2xl font-display font-bold text-soft leading-tight">Ready to elevate your brand?</h4>
                                <p className="text-light/60 text-sm leading-relaxed">
                                  Let's collaborate to create high-impact visuals that drive real business results.
                                </p>
                              </div>
                              <a
                                href="#contact"
                                onClick={onClose}
                                className="flex items-center justify-center gap-3 w-full py-5 bg-accent text-deep font-bold rounded-full hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-accent/10"
                              >
                                Start a Project <ArrowRight className="w-5 h-5" />
                              </a>
                            </div>

                            {/* Micro Details */}
                            <div className="px-4 space-y-6">
                              <div className="flex justify-between items-center py-4">
                                <span className="text-[10px] uppercase tracking-widest text-light/40">Project ID</span>
                                <span className="text-xs font-bold text-soft">#{project.id}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Visual Explorations - Full Width Bento Grid */}
                      <section ref={showcaseRef} className="space-y-6 md:space-y-10">
                        <div className="flex justify-between items-end">
                          <h3 className="text-2xl md:text-6xl font-display font-bold text-soft tracking-tighter">
                            {project.designShowcase ? 'Design Showcase' : 'Visual Explorations'}
                          </h3>
                          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-accent font-bold mb-2">Scroll to explore</span>
                        </div>
                        
                        {project.visualsDescription && (
                          <p className="text-light/60 max-w-3xl text-lg leading-relaxed">
                            {project.visualsDescription}
                          </p>
                        )}
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-10">
                          {project.designShowcase ? (
                            project.designShowcase.map((design, idx) => (
                              <div key={idx} className="flex flex-col">
                                <div 
                                  className={`group relative w-full aspect-square rounded-[24px] overflow-hidden glass cursor-pointer bg-black/20`}
                                  onClick={() => {
                                    setSelectedDesignIndex(idx);
                                    setCurrentStage(0);
                                  }}
                                >
                                  <img
                                    src={design.thumbnail || design.design}
                                    alt={`Design ${idx + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    referrerPolicy="no-referrer"
                                    loading="lazy"
                                    decoding="async"
                                  />
                                  <div className="absolute inset-0 bg-deep/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="text-center">
                                      <span className="block text-accent font-bold text-xs uppercase tracking-[0.3em] mb-4">View Journey</span>
                                      <div className="w-12 h-12 rounded-full border border-accent flex items-center justify-center mx-auto">
                                        <ChevronRight className="w-6 h-6 text-accent" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-4 text-center">
                                  <span className="text-accent font-bold text-[10px] md:text-xs uppercase tracking-widest">
                                    DESIGN - {idx + 1}
                                  </span>
                                </div>
                              </div>
                            ))
                           ) : (
                            project.visuals.map((img, idx) => (
                              <div key={idx} className="flex flex-col">
                                <div 
                                  className="group relative aspect-square rounded-[24px] overflow-hidden glass bg-black/20 cursor-pointer"
                                  onClick={() => setSelectedVisualIdx(idx)}
                                >
                                  <img
                                    src={img}
                                    alt={`Exploration ${idx + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    referrerPolicy="no-referrer"
                                    loading="lazy"
                                    decoding="async"
                                  />
                                  <div className="absolute inset-0 bg-deep/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="w-12 h-12 rounded-full bg-accent text-deep flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform">
                                      <ChevronRight className="w-6 h-6" />
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-4 text-center">
                                  <span className="text-accent font-bold text-[10px] md:text-xs uppercase tracking-widest">
                                    DESIGN - {idx + 1}
                                  </span>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </section>
                    </div>

                    {/* Result / Impact - Moved to bottom for full width */}
                    <div className={`px-6 md:px-0 max-w-5xl mx-auto w-full pb-12`}>
                      <section className={`relative overflow-hidden p-8 md:p-10 bg-accent text-deep rounded-[24px] shadow-2xl shadow-accent/10`}>
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                          <CheckCircle2 className={`w-32 h-32 md:w-32 md:h-32`} />
                        </div>
                        <div className="relative z-10 space-y-6">
                          <h3 className="text-xs md:text-sm uppercase tracking-[0.4em] font-black opacity-60">The Outcome</h3>
                          <p className={`text-xl md:text-3xl font-display font-bold leading-[1.1] tracking-tighter max-w-4xl`}>
                            {project.result}
                          </p>
                        </div>
                      </section>
                    </div>

                    {/* Bottom Back Button */}
                    <div className="flex flex-col items-center gap-8 pb-12 px-6">
                      <button
                        onClick={onClose}
                        className="group px-6 py-3 md:px-10 md:py-5 bg-white/5 border border-white/10 hover:bg-accent hover:text-deep transition-all rounded-full flex items-center gap-3 md:gap-4 text-soft font-bold text-xs md:text-sm uppercase tracking-widest shadow-xl"
                      >
                        <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:-translate-x-2" /> 
                        Back to Portfolio
                      </button>

                      {/* CTA Card - Mobile Only */}
                      <div className="lg:hidden w-full max-w-md p-8 bg-white/5 border border-white/10 rounded-[24px] space-y-8">
                        <div className="space-y-4">
                          <h4 className="text-2xl font-display font-bold text-soft leading-tight">Ready to elevate your brand?</h4>
                          <p className="text-light/60 text-sm leading-relaxed">
                            Let's collaborate to create high-impact visuals that drive real business results.
                          </p>
                        </div>
                        <a
                          href="#contact"
                          onClick={onClose}
                          className="flex items-center justify-center gap-3 w-full py-5 bg-accent text-deep font-bold rounded-full hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-accent/10"
                        >
                          Start a Project <ArrowRight className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  </>
                )}
              </>

            ) : (
              /* Design Journey View */
              <div className="flex-1 flex flex-col items-center p-4 md:p-10 relative">
                {/* Navigation Controls for Gallery Cycling removed */}

                <div className="w-full max-w-7xl flex flex-col space-y-2 md:space-y-10 flex-1 min-h-0 justify-center">
                  {stages.length === 2 ? (
                    /* Stacked on mobile, Side-by-Side on Desktop */
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-16 items-center justify-center px-2 md:px-0">
                      {stages.map((stage, idx) => {
                        const isFinal = stage.key === 'finalProduct';
                        const isDesign = stage.key === 'design';
                        
                        return (
                          <div key={idx} className="flex flex-col items-center space-y-1 md:space-y-8">
                            <div className={`relative w-full ${isDesign ? 'max-w-[20vh] md:max-w-[45vh]' : 'max-w-[24vh] md:max-w-[55vh]'} aspect-[3/4] md:aspect-square rounded-xl md:rounded-[32px] overflow-hidden glass shadow-2xl border border-white/5 bg-black/20`}>
                              <img
                                src={selectedDesign![stage.key]}
                                alt={stage.label}
                                className={`w-full h-full ${isFinal ? 'object-cover' : 'object-contain'}`}
                                referrerPolicy="no-referrer"
                                loading="lazy"
                                decoding="async"
                              />
                            </div>
                            <div className="px-3 py-1 md:px-10 md:py-3.5 bg-accent text-deep rounded-full font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[8px] md:text-sm shadow-2xl shrink-0">
                              {stage.label}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    /* Original Swipable Journey View */
                    <div className="flex flex-col space-y-6 md:space-y-10">
                      {/* Main Image Display */}
                      <div className="relative mx-auto rounded-2xl md:rounded-[24px] overflow-hidden glass shadow-2xl border border-white/5 bg-black/20 flex items-center justify-center w-full md:w-fit" style={{ height: isMobile ? 'auto' : '55vh', maxHeight: isMobile ? '60vh' : 'none' }}>
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={currentStage}
                            initial={{ opacity: 0, scale: 1.02 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            src={selectedDesign![stages[currentStage].key]}
                            alt={stages[currentStage].label}
                            className={`${isMobile ? 'w-full h-auto' : 'h-full w-auto'} object-contain`}
                            referrerPolicy="no-referrer"
                            loading="eager"
                            decoding="async"
                          />
                        </AnimatePresence>

                        {/* Navigation Arrows */}
                        <button 
                          onClick={() => setCurrentStage(prev => Math.max(0, prev - 1))}
                          disabled={currentStage === 0}
                          className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-deep/60 backdrop-blur-md rounded-full flex items-center justify-center text-soft hover:bg-accent hover:text-deep transition-all disabled:opacity-0 z-20 border border-white/10"
                        >
                          <ChevronLeft className="w-5 h-5 md:w-8 md:h-8" />
                        </button>
                        <button 
                          onClick={() => setCurrentStage(prev => Math.min(stages.length - 1, prev + 1))}
                          disabled={currentStage === stages.length - 1}
                          className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-deep/60 backdrop-blur-md rounded-full flex items-center justify-center text-soft hover:bg-accent hover:text-deep transition-all disabled:opacity-0 z-20 border border-white/10"
                        >
                          <ChevronRight className="w-5 h-5 md:w-8 md:h-8" />
                        </button>
                      </div>

                      {/* Stage Indicator (Dots) - Moved below image */}
                      <div className="flex justify-center items-center gap-4 md:gap-8 px-4 md:px-0 shrink-0">
                        {stages.map((stage, idx) => (
                          <button 
                            key={idx}
                            onClick={() => setCurrentStage(idx)}
                            className={`flex flex-col items-center gap-2 transition-all duration-300 ${
                              currentStage === idx ? 'opacity-100 scale-110' : 'opacity-20 hover:opacity-50'
                            }`}
                          >
                            <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${currentStage === idx ? 'bg-accent shadow-[0_0_10px_rgba(255,140,66,0.5)]' : 'bg-soft'}`} />
                          </button>
                        ))}
                      </div>

                      {/* Description/Context */}
                      <div className="text-center space-y-4 md:space-y-6 pb-10">
                        <motion.div
                          key={currentStage}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-2 md:space-y-4"
                        >
                          <h3 className="text-xl md:text-4xl font-display font-bold text-soft tracking-tight">
                            {stages[currentStage].label}
                          </h3>
                          <p className="text-sm md:text-xl text-light/70 max-w-2xl mx-auto px-4 leading-relaxed font-light">
                            {getStageDescription(stages[currentStage].key)}
                          </p>
                        </motion.div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
            </motion.div>
          </div>
        </motion.div>
    </AnimatePresence>
    
    {/* Image Lightbox Modal */}
    <AnimatePresence>
      {selectedVisualIdx !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[600] bg-deep/98 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10 no-custom-cursor"
          onClick={() => setSelectedVisualIdx(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-5xl w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedVisualIdx(null)}
              className="absolute top-4 right-4 md:-top-12 md:-right-12 w-10 h-10 md:w-12 md:h-12 bg-accent text-deep rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <img
              src={project.visuals[selectedVisualIdx]}
              alt="Full Visual"
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
              referrerPolicy="no-referrer"
              decoding="async"
            />
            
            {/* Counter */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-soft/60 font-bold tracking-widest text-xs">
              {selectedVisualIdx + 1} / {project.visuals.length}
            </div>
          </motion.div>

          {/* Navigation Buttons - Moved after image to be on top */}
          <div className="absolute inset-0 flex items-center justify-between px-2 md:px-10 pointer-events-none z-50">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedVisualIdx(prev => prev !== null ? (prev - 1 + project.visuals.length) % project.visuals.length : null);
              }}
              className="w-10 h-10 md:w-14 md:h-14 bg-deep/60 backdrop-blur-md hover:bg-accent text-soft hover:text-deep rounded-full flex items-center justify-center transition-all border border-white/10 pointer-events-auto shadow-2xl"
            >
              <ChevronLeft className="w-5 h-5 md:w-8 md:h-8" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedVisualIdx(prev => prev !== null ? (prev + 1) % project.visuals.length : null);
              }}
              className="w-10 h-10 md:w-14 md:h-14 bg-deep/60 backdrop-blur-md hover:bg-accent text-soft hover:text-deep rounded-full flex items-center justify-center transition-all border border-white/10 pointer-events-auto shadow-2xl"
            >
              <ChevronRight className="w-5 h-5 md:w-8 md:h-8" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};

export default CaseStudyModal;
