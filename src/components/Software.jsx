import React from 'react';
import { motion } from 'motion/react';

const tools = [
  { name: 'Figma', category: 'UI/UX Design', initials: 'Fg', color: '#F24E1E' },
  { name: 'Antigravity', category: 'Website UI', initials: 'Ag', color: '#2563EB' },
  { name: 'Photoshop', category: 'Creative Suite', initials: 'Ps', color: '#31A8FF' },
  { name: 'Illustrator', category: 'Vector Art', initials: 'Ai', color: '#FF9A00' },
  { name: 'InDesign', category: 'Print & Layout', initials: 'Id', color: '#FF3366' },
  { name: 'After Effects', category: 'Motion VFX', initials: 'Ae', color: '#9999FF' },
  { name: 'Premiere Pro', category: 'Video Edit', initials: 'Pr', color: '#EA77FF' },
  { name: 'Canva', category: 'Quick Design', initials: 'Cv', color: '#00C4CC' },
  { name: 'CapCut', category: 'AI Video/Shorts', initials: 'Cc', color: '#111111' }
];

export default function Software() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="section-wrapper" id="tools">
      <div className="content-container">
        <span className="section-tag">Software Suite</span>
        <h2 className="section-title-large">Creative Toolkit</h2>

        <div 
          className="software-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {tools.map((tool, index) => (
            <div
              className="software-card"
              key={index}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05, 
                rotate: 2,
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.05)",
                transition: { duration: 0.3 }
              }}
            >
              <div 
                className="software-icon-wrapper" 
                style={{ 
                  color: tool.color, 
                  borderColor: `${tool.color}20`,
                  backgroundColor: `${tool.color}06`
                }}
              >
                <span style={{ fontSize: '18px', fontWeight: '700' }}>{tool.initials}</span>
              </div>
              <div className="software-name">{tool.name}</div>
              <span style={{ fontSize: '10px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {tool.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
