import React from 'react';
import { Instagram, Linkedin, Twitter, Github } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-deep px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        {/* Logo & Info */}
        <div className="text-center md:text-left">
          <a href="#" className="text-2xl font-display font-bold tracking-tighter text-soft mb-4 block">
            MANOJ <span className="text-accent">KUMAR K</span>
          </a>
          <p className="text-light text-sm max-w-xs leading-relaxed">
            Crafting performance-driven product ad videos and visual creatives that elevate brand presence.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-light">
          <a href="#works" className="hover:text-accent transition-colors">Works</a>
          <a href="#about" className="hover:text-accent transition-colors">About</a>
          <a href="#contact" className="hover:text-accent transition-colors">Contact</a>
        </div>

        {/* Social Icons Removed as requested */}
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-light/50 uppercase tracking-widest">
        <p>&copy; {currentYear} Manoj Kumar K. All rights reserved.</p>
        <p>Designed with passion for performance.</p>
      </div>
    </footer>
  );
};

export default Footer;
