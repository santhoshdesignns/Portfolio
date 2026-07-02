import React from 'react';
import { motion } from 'motion/react';

export default function Education() {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="section-wrapper" id="education">
      <div className="content-container">
        <span className="section-tag">Education</span>
        <h2 className="section-title-large">Academic Foundation</h2>

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
              <h4>Bachelor of Commerce (B.Com)</h4>
              <p>Sree Saraswathi Thyagaraja College, Pollachi</p>
              <span>Graduated 2023</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
