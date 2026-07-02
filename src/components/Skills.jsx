import React from 'react';
import { motion } from 'motion/react';

const skillsRow1 = [
  'UX/UI Design',
  'Website Design',
  'Responsive Design',
  'Graphic Design',
  'Branding Identity',
  'UX/UI Design',
  'Website Design',
  'Responsive Design',
  'Graphic Design',
  'Branding Identity'
];

const skillsRow2 = [
  'Print Design',
  'Visual Storytelling',
  'Content Writing',
  'AI Video Creation',
  'Prompt Engineering',
  'Print Design',
  'Visual Storytelling',
  'Content Writing',
  'AI Video Creation',
  'Prompt Engineering'
];

export default function Skills() {
  return (
    <section className="section-wrapper" id="skills" style={{ overflow: 'hidden' }}>
      <div className="content-container">
        <span className="section-tag">Core Skills</span>
        <h2 className="section-title-large">Strategic Capabilities</h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
        {/* Ticker Row 1 - Leftward scroll */}
        <div 
          className="ticker-container"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="ticker-track">
            {skillsRow1.map((skill, index) => (
              <span className="ticker-chip" key={index}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Ticker Row 2 - Rightward scroll (reused style, reverse track) */}
        <div 
          className="ticker-container"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="ticker-track" style={{ animationDirection: 'reverse' }}>
            {skillsRow2.map((skill, index) => (
              <span className="ticker-chip" key={index}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
