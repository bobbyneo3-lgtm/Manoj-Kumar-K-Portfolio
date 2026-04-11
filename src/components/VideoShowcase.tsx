import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, X } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { VIDEO_THUMBNAILS } from '../constants';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const VideoShowcase: React.FC = () => {
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [playingInlineUrl, setPlayingInlineUrl] = useState<string | null>(null);
  const [showFullGallery, setShowFullGallery] = useState(false);
  const [failedInlineVideos, setFailedInlineVideos] = useState<Record<string, boolean>>({});
  const [failedModalVideo, setFailedModalVideo] = useState(false);
  const [preloadedUrl, setPreloadedUrl] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const swiperRef = React.useRef<any>(null);

  const featuredVideos = VIDEO_THUMBNAILS.slice(0, 5);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    if (activeVideoUrl || showFullGallery) {
      document.body.style.overflow = 'hidden';
      setFailedModalVideo(false);
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      document.body.style.overflow = 'unset';
    };
  }, [activeVideoUrl, showFullGallery]);

  const getFileId = (url: string) => {
    if (!url) return null;
    // Handle various Drive URL formats: /d/ID, id=ID, open?id=ID, uc?id=ID, file/d/ID
    const idMatch = url.match(/\/d\/([^/?&]+)/) || 
                    url.match(/[?&]id=([^&]+)/) ||
                    url.match(/\/file\/d\/([^/?&]+)/);
    return idMatch ? idMatch[1] : null;
  };

  const openVideo = (url: string) => {
    if (isMobile) {
      setPlayingInlineUrl(url);
      if (swiperRef.current?.autoplay) {
        swiperRef.current.autoplay.stop();
      }
    } else {
      setActiveVideoUrl(url);
    }
  };

  return (
    <section className="pt-16 lg:pt-12 pb-8 lg:pb-10 bg-[#0d0d0d] overflow-hidden relative no-custom-cursor">
      {/* Hidden Pre-loader for instant playback */}
      {preloadedUrl && (
        <video src={preloadedUrl} preload="auto" className="hidden" />
      )}
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 lg:bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 md:mb-10">
          <div className="flex items-center gap-4 flex-1">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-6xl font-display font-bold leading-tight"
            >
              Performance Driven <br />
              <span className="text-accent">Ad Creatives</span>
            </motion.h2>
            <div className="hidden md:block h-px flex-1 bg-white/10 mt-8" />
          </div>

          <motion.button 
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFullGallery(true)}
            className="hidden md:flex group items-center justify-center gap-3 px-6 py-3 md:px-8 md:py-4 bg-white/5 hover:bg-accent rounded-full transition-all duration-300 w-full md:w-auto self-end md:self-center"
          >
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-soft group-hover:text-deep transition-colors">
              Show All
            </span>
            <Play className="w-4 h-4 md:w-5 md:h-5 text-accent group-hover:text-deep transition-colors" />
          </motion.button>
        </div>
        <p className="text-soft/60 text-lg md:text-xl max-w-4xl mb-8 leading-relaxed">
          Crafting high-impact visual stories through professional video editing and motion graphics. Each ad is meticulously edited to drive engagement and maximize performance across all digital platforms.
        </p>

        {/* Tools Badges */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3"
        >
          <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3 group hover:border-accent/30 transition-all">
            <div className="w-8 h-8 rounded-lg bg-[#00005b] flex items-center justify-center text-[#00e5ff] font-black text-xs shadow-lg">Pr</div>
            <span className="text-xs font-bold tracking-widest uppercase text-soft/80 group-hover:text-accent transition-colors">Premiere Pro</span>
          </div>
          <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3 group hover:border-accent/30 transition-all">
            <div className="w-8 h-8 rounded-lg bg-[#000024] flex items-center justify-center text-[#cf96fd] font-black text-xs shadow-lg">Ae</div>
            <span className="text-xs font-bold tracking-widest uppercase text-soft/80 group-hover:text-accent transition-colors">After Effects</span>
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <Swiper
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: true,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={true}
          onSlideChange={() => {
            setPlayingInlineUrl(null);
            if (swiperRef.current?.autoplay && !playingInlineUrl) {
              swiperRef.current.autoplay.start();
            }
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="video-swiper !pb-16"
        >
          {featuredVideos.map((thumb, idx) => {
            const fileId = getFileId(thumb.url);
            const isGoogleDrive = !!fileId;
            const posterUrl = isGoogleDrive ? `https://lh3.googleusercontent.com/d/${fileId}` : thumb.url;
            const isPlayingInline = playingInlineUrl === thumb.url;
            
            return (
              <SwiperSlide 
                key={idx}
                onMouseEnter={() => setPreloadedUrl(thumb.url)}
              >
                <div className="group relative aspect-[9/16] rounded-2xl overflow-hidden bg-black/40 glass">
                  {isPlayingInline ? (
                    <div className="w-full h-full bg-black relative cursor-none no-custom-cursor">
                      {failedInlineVideos[thumb.url] ? (
                        <iframe
                          src={`https://drive.google.com/file/d/${getFileId(thumb.url)}/preview`}
                          className="w-full h-full border-0"
                          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                          allowFullScreen={true}
                          style={{ width: "100%", height: "100%" }}
                        />
                      ) : (
                        <video
                          src={thumb.url}
                          autoPlay
                          muted
                          controls
                          playsInline
                          className="w-full h-full object-cover"
                          onError={() => setFailedInlineVideos(prev => ({ ...prev, [thumb.url]: true }))}
                        />
                      )}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setPlayingInlineUrl(null);
                          if (swiperRef.current?.autoplay) swiperRef.current.autoplay.start();
                        }}
                        className="absolute top-4 right-4 z-30 w-10 h-10 bg-deep/70 backdrop-blur-md rounded-full flex items-center justify-center text-soft border border-white/10"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <div 
                      className="w-full h-full relative cursor-pointer"
                      onClick={() => openVideo(thumb.url)}
                    >
                      <img
                        src={posterUrl}
                        alt={`Video Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Play Icon Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-deep/10 group-hover:bg-deep/30 transition-all">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-accent text-deep rounded-full flex items-center justify-center shadow-2xl transform transition-transform group-hover:scale-110">
                          <Play className="w-8 h-8 md:w-10 md:h-10 fill-current ml-1" />
                        </div>
                      </div>

                      {/* Orange Progress Indicator Bar */}
                      <div className="absolute bottom-0 left-0 h-1 bg-accent w-0 group-hover:w-full transition-all duration-500 ease-out z-20" />
                    </div>
                  )}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Mobile Show All Button */}
        <div className="mt-6 flex md:hidden justify-center">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFullGallery(true)}
            className="group flex items-center justify-center gap-2.5 px-6 py-3 bg-white/5 hover:bg-accent rounded-full transition-all duration-300 w-full max-w-[200px]"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-soft group-hover:text-deep transition-colors">
              Show All
            </span>
            <Play className="w-4 h-4 text-accent group-hover:text-deep transition-colors" />
          </motion.button>
        </div>

        {/* Separation Line for Mobile */}
        <div className="mt-16 md:hidden px-12">
          <div className="h-px w-full bg-accent/20" />
        </div>
      </div>

      {/* Video Player Modal (Full Screen) */}
      <AnimatePresence>
        {activeVideoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] bg-deep/98 backdrop-blur-2xl flex items-center justify-center no-custom-cursor"
            onClick={() => setActiveVideoUrl(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full h-full md:h-auto md:max-w-[500px] md:aspect-[9/16] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button - Orange & Outside */}
              <button
                onClick={() => setActiveVideoUrl(null)}
                className="absolute top-6 right-6 md:-top-4 md:-right-16 w-10 h-10 bg-accent text-deep rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,140,66,0.4)] hover:scale-110 transition-transform z-[310]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full h-full bg-black md:rounded-2xl overflow-hidden shadow-2xl border border-white/5 relative">
                {failedModalVideo && activeVideoUrl ? (
                  <iframe
                    src={`https://drive.google.com/file/d/${getFileId(activeVideoUrl)}/preview`}
                    className="w-full h-full border-0"
                    allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                    allowFullScreen={true}
                    style={{ transform: "scale(1.05)", width: "100%", height: "100%" }}
                  />
                ) : (
                  <video
                    src={activeVideoUrl || ''}
                    autoPlay
                    muted
                    playsInline
                    controls
                    preload="metadata"
                    className="w-full h-full object-cover"
                    onError={() => setFailedModalVideo(true)}
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Gallery Modal */}
      <AnimatePresence>
        {showFullGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[400] bg-deep/98 backdrop-blur-3xl overflow-y-auto no-custom-cursor"
          >
            <div className="min-h-screen py-20 px-4 md:px-8">
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-12">
                  <h2 className="text-3xl md:text-5xl font-display font-bold">
                    All <span className="text-accent">Social Media Creatives</span>
                  </h2>
                  <button 
                    onClick={() => setShowFullGallery(false)}
                    className="w-12 h-12 bg-white/5 hover:bg-accent text-soft hover:text-deep rounded-full flex items-center justify-center transition-all"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {VIDEO_THUMBNAILS.map((thumb, idx) => {
                    const fileId = getFileId(thumb.url);
                    const posterUrl = fileId ? `https://lh3.googleusercontent.com/d/${fileId}` : thumb.url;
                    
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="group relative aspect-[9/16] rounded-xl overflow-hidden bg-black/40 glass cursor-pointer"
                        onClick={() => {
                          setActiveVideoUrl(thumb.url);
                        }}
                      >
                        <img
                          src={posterUrl}
                          alt={thumb.caption}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-deep/20 group-hover:bg-deep/40 transition-all">
                          <div className="w-16 h-16 bg-accent text-deep rounded-full flex items-center justify-center shadow-2xl transform transition-transform group-hover:scale-110">
                            <Play className="w-8 h-8 fill-current ml-1" />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VideoShowcase;
