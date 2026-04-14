import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Image, 
  PenTool, 
  Video, 
  Zap, 
  Film, 
  Palette, 
  Target 
} from 'lucide-react';

const About: React.FC = () => {
  const [isColorful, setIsColorful] = useState(false);
  const skills = [
    { name: 'Photoshop', icon: Image },
    { name: 'Illustrator', icon: PenTool },
    { name: 'Premiere Pro', icon: Video },
    { name: 'After Effects', icon: Zap },
    { name: 'Visual Storytelling', icon: Film },
    { name: 'Brand Identity', icon: Palette },
    { name: 'Ad Creative Strategy', icon: Target }
  ];

  const handleImageClick = () => {
    setIsColorful(true);
    // Revert to grayscale after 3 seconds
    setTimeout(() => setIsColorful(false), 3000);
  };

  return (
    <section id="about" className="py-16 md:py-24 bg-[#111111] px-6 md:px-12 lg:px-16 relative overflow-hidden scroll-mt-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 lg:opacity-10 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-accent/20 lg:from-accent/15" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
        {/* Left Side - Portrait Placeholder */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative group cursor-pointer"
          onClick={handleImageClick}
        >
          <div className="relative z-10 rounded-[20px] md:rounded-[32px] overflow-hidden aspect-[4/5] glass bg-white/5">
            <img
              src="https://lh3.googleusercontent.com/d/10s3d3sXM9dWfJkiB4m0bJvNH8fa6dBv8"
              alt="Manoj Kumar K"
              className={`w-full h-full object-cover transition-all duration-1000 scale-105 group-hover:scale-100 ${
                isColorful ? 'grayscale-0' : 'grayscale md:grayscale group-hover:grayscale-0'
              }`}
              onError={(e) => {
                // Fallback if the Google Drive link fails (usually due to sharing settings)
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800';
              }}
              referrerPolicy="no-referrer"
            />
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/20 rounded-full blur-[80px] z-0" />
          <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-accent/10 rounded-full blur-[100px] z-0" />
        </motion.div>

        {/* Right Side - Story Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <h2 className="text-2xl md:text-6xl font-display font-bold mb-8">
            About <span className="text-accent">Manoj</span>
          </h2>
          <p className="text-lg md:text-xl text-light leading-relaxed mb-8">
            I am a <span className="text-soft font-bold">Product Visual & Ad Creative Designer</span> with a focus on high-performance visual storytelling.
          </p>
          <p className="text-base md:text-lg text-light/70 leading-relaxed mb-12">
            I specialize in crafting high-end product ad videos and visual campaigns that don't just look premium—they perform. With a <span className="text-soft font-bold">Udemy Certificate</span> in Premiere Pro and video editing, I blend consumer psychology with high-end aesthetics to ensure every creative asset drives measurable brand growth and audience engagement. My goal is to help brands stand out in a crowded digital landscape through thoughtful, high-impact design that converts viewers into customers.
          </p>

          <div className="grid grid-cols-2 gap-8 mb-12 max-w-sm mx-auto lg:mx-0">
            <div className="space-y-2">
              <span className="text-accent font-bold text-3xl">100%</span>
              <p className="text-xs uppercase tracking-widest text-light/40 font-bold">Client Satisfaction</p>
            </div>
            <div className="space-y-2">
              <span className="text-accent font-bold text-3xl">High</span>
              <p className="text-xs uppercase tracking-widest text-light/40 font-bold">Conversion Focus</p>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-soft font-bold uppercase tracking-widest text-sm">Expertise & Tools</h4>
            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              {skills.map((skill, idx) => (
                <motion.span
                  key={idx}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 140, 66, 0.2)' }}
                  className="px-5 py-2 bg-white/5 border border-white/10 text-soft text-sm font-medium rounded-full transition-all flex items-center gap-2"
                >
                  <skill.icon className="w-4 h-4 text-accent" />
                  {skill.name}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Separation Line */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 mt-10 md:mt-16">
        <div className="h-px w-full bg-white/10" />
      </div>
    </section>
  );
};

export default About;
