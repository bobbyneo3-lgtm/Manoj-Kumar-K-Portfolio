import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, ExternalLink, Send, Linkedin } from 'lucide-react';

const Contact: React.FC = () => {
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      let result;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        result = await response.json();
      } else {
        const text = await response.text();
        console.error('Server returned non-JSON response:', text);
        throw new Error('Server error: Please check your Vercel logs.');
      }

      if (response.ok) {
        setStatus('success');
        setErrorMessage(null);
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
        setErrorMessage(result.message || 'Something went wrong.');
        console.error('Contact form error:', result.message);
      }
    } catch (error: any) {
      setStatus('error');
      setErrorMessage(error.message || 'Failed to connect to the server.');
      console.error('Contact form fetch error:', error);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-deep px-6 md:px-12 lg:px-16 scroll-mt-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Left Side - Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center lg:text-left"
        >
          <h2 className="text-2xl md:text-7xl font-display font-bold mb-8">
            Let's Create <br />
            <span className="text-accent">Visuals That Sell.</span>
          </h2>
          <p className="text-xl text-light mb-12 max-w-md leading-relaxed mx-auto lg:mx-0">
            Ready to elevate your brand with high-converting ad creatives? Let's discuss your next project.
          </p>

          <div className="space-y-4 md:space-y-8 max-w-md w-fit mx-auto lg:mx-0">
            <div className="flex items-center justify-start gap-3 md:gap-6 group">
              <div className="w-10 h-10 md:w-14 md:h-14 bg-white/5 rounded-md md:rounded-xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-deep transition-all duration-300 shrink-0">
                <Mail className="w-4 h-4 md:w-6 md:h-6" />
              </div>
              <div className="min-w-0 text-left">
                <p className="text-[9px] md:text-xs text-light uppercase tracking-widest mb-0.5">Email ID</p>
                <a href="mailto:manojkarra.kumar@gmail.com" className="text-sm md:text-xl font-bold text-soft hover:text-accent transition-colors break-all">
                  manojkarra.kumar@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center justify-start gap-3 md:gap-6 group">
              <div className="w-10 h-10 md:w-14 md:h-14 bg-white/5 rounded-md md:rounded-xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-deep transition-all duration-300 shrink-0">
                <Phone className="w-4 h-4 md:w-6 md:h-6" />
              </div>
              <div className="min-w-0 text-left">
                <p className="text-[9px] md:text-xs text-light uppercase tracking-widest mb-0.5">Phone Number</p>
                <a href="tel:+919397199199" className="text-sm md:text-xl font-bold text-soft hover:text-accent transition-colors">
                  +91 9397 199 199
                </a>
              </div>
            </div>

            <div className="flex items-center justify-start gap-3 md:gap-6 group">
              <div className="w-10 h-10 md:w-14 md:h-14 bg-white/5 rounded-md md:rounded-xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-deep transition-all duration-300 shrink-0">
                <ExternalLink className="w-4 h-4 md:w-6 md:h-6" />
              </div>
              <div className="min-w-0 text-left">
                <p className="text-[9px] md:text-xs text-light uppercase tracking-widest mb-0.5">Behance Portfolio</p>
                <a href="https://www.behance.net/manojkumarkarra" target="_blank" rel="noopener noreferrer" className="text-sm md:text-xl font-bold text-soft hover:text-accent transition-colors break-all">
                  behance.net/manojkumarkarra
                </a>
              </div>
            </div>

            <div className="flex items-center justify-start gap-3 md:gap-6 group">
              <div className="w-10 h-10 md:w-14 md:h-14 bg-white/5 rounded-md md:rounded-xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-deep transition-all duration-300 shrink-0">
                <Linkedin className="w-4 h-4 md:w-6 md:h-6" />
              </div>
              <div className="min-w-0 text-left">
                <p className="text-[9px] md:text-xs text-light uppercase tracking-widest mb-0.5">LinkedIn Profile</p>
                <a href="https://www.linkedin.com/in/manojkumarkarra" target="_blank" rel="noopener noreferrer" className="text-sm md:text-xl font-bold text-soft hover:text-accent transition-colors break-all">
                  linkedin.com/in/manojkumarkarra
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="p-6 md:p-10 glass rounded-[20px] md:rounded-[32px] shadow-2xl"
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-xs text-light uppercase tracking-widest font-bold ml-2">Name</label>
              <input
                type="text"
                name="name"
                required
                placeholder="Your Name"
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-soft focus:outline-none focus:border-accent transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-light uppercase tracking-widest font-bold ml-2">Email</label>
              <input
                type="email"
                name="email"
                required
                placeholder="your@email.com"
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-soft focus:outline-none focus:border-accent transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-light uppercase tracking-widest font-bold ml-2">Message</label>
              <textarea
                name="message"
                required
                rows={4}
                placeholder="Tell me about your project..."
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-soft focus:outline-none focus:border-accent transition-all resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-3.5 md:py-5 bg-accent text-deep font-bold rounded-lg md:rounded-xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-all shadow-lg shadow-accent/20 text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'} 
              <Send className="w-5 h-5" />
            </button>
            {status === 'error' && (
              <p className="text-red-500 text-xs text-center mt-2">
                {errorMessage || 'Something went wrong. Please try again.'}
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
