import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const handleScrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-wrapper" id="hero">
      {/* Loop video background */}
      <video
        className="hero-video-bg"
        src="https://assets.mixkit.co/videos/preview/mixkit-dark-flowing-liquid-background-43093-large.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="hero-overlay" />

      <div className="content-container">
        <div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="hero-title-group" variants={itemVariants}>
            <h1 className="hero-title-huge">
              SAN<br />THOSH
            </h1>
            <div className="hero-role-badge">
              <span>Graphic Designer</span>
              <span className="dot">•</span>
              <span>UX/UI Designer</span>
              <span className="dot">•</span>
              <span>AI Video Creator</span>
              <span className="dot">•</span>
              <span>Visual Storyteller</span>
            </div>
          </div>

          <p className="hero-intro" variants={itemVariants}>
            Creating meaningful digital experiences through thoughtful design, branding, AI-powered creativity, and user-focused interfaces.
          </p>

          <div className="hero-ctas" variants={itemVariants}>
            <button 
              className="btn-pill btn-primary"
              onClick={handleScrollToProjects}
              aria-label="View Projects"
            >
              View Projects
            </button>
            <button 
              className="btn-pill btn-secondary"
              style={{ color: '#FFFFFF', borderColor: 'rgba(255, 255, 255, 0.3)' }}
              onClick={() => window.print()}
              aria-label="Download Resume"
            >
              Download Resume
            </button>
          </div>
        </div>
      </div>

      <div 
        className="hero-scroll-indicator"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          repeat: Infinity, 
          repeatType: "reverse", 
          duration: 1, 
          ease: "easeInOut" 
        }}
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span>Scroll Down</span>
        <ChevronDown size={14} />
      </div>
    </section>
  );
}
