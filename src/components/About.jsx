import React from 'react';
import { motion } from 'motion/react';

export default function About() {
  const slideLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const slideRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="section-wrapper" id="about">
      <div className="content-container">
        <div className="about-grid">
          {/* Left Column - Image Card */}
          <div 
            className="about-image-card"
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <img 
              className="about-img-placeholder"
              style={{ filter: 'grayscale(1)' }}
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600&h=800" 
              alt="Santhosh portrait"
              loading="lazy"
            />
          </div>

          {/* Right Column - Info Content */}
          <div 
            className="about-info"
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className="section-tag">About Me</span>
            <h2 className="section-title-large" style={{ marginBottom: '24px' }}>My Creative Story</h2>
            
            <p className="about-headline">
              Creative Graphic Designer & UX/UI Designer with 1.5 years of experience creating premium digital experiences, branding systems, responsive websites, AI-powered videos, and marketing campaigns.
            </p>

            <div className="about-text-list">
              <div className="about-text-item" variants={itemVariants}>
                <span>Current Workplace:</span>
                <strong>HUMEXPRO</strong>
              </div>
              
              <div className="about-text-item" variants={itemVariants}>
                <span>Core Passions:</span>
                <strong>Branding, UI Design, Website Design, Photography, AI, Visual Storytelling</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
