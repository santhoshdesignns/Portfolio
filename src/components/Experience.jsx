import React from 'react';
import { motion } from 'motion/react';

const responsibilities = [
  "Designed cohesive branding systems, visual identity assets, and brand guidelines.",
  "Created responsive website UI layouts and landing page designs focusing on high usability.",
  "Designed engaging social media creatives, marketing graphics, and campaign visuals.",
  "Produced AI-powered marketing videos and storytelling assets for digital campaigns.",
  "Created high-end print materials, brochures, and offline branding assets.",
  "Collaborated with marketing and development teams to translate design files into pixel-perfect web products."
];

export default function Experience() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const bulletVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="section-wrapper" id="experience">
      <div className="content-container">
        <span className="section-tag">Experience</span>
        <h2 className="section-title-large">Professional Journey</h2>

        <div 
          className="timeline-list"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="timeline-item-wrapper">
            <div className="timeline-node" />
            
            <div className="premium-card" variants={cardVariants}>
              <div className="timeline-header">
                <div className="timeline-title-group">
                  <h3>Graphic Designer & UX/UI Designer</h3>
                  <div className="timeline-company">HUMEXPRO</div>
                </div>
                <span className="timeline-badge">March 2025 — Present</span>
              </div>

              <ul className="timeline-bullets" variants={containerVariants}>
                {responsibilities.map((resp, index) => (
                  <li 
                    key={index}
                    variants={bulletVariants}
                  >
                    {resp}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
