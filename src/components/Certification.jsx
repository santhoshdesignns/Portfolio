import React from 'react';
import { motion } from 'motion/react';

export default function Certification() {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="section-wrapper" id="certification">
      <div className="content-container">
        <span className="section-tag">Credentials</span>
        <h2 className="section-title-large">Certifications</h2>

        <div className="compact-timeline">
          <div className="compact-timeline-item">
            <div className="compact-timeline-node" />
            
            <div 
              className="premium-card compact-card"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <h4>UX/UI Design Certification</h4>
              <p>Profenna Infotech, Pollachi</p>
              <span>Completed 2024</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
