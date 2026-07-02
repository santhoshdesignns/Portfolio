import React from 'react';
import { motion } from 'motion/react';
import { Award, Compass, Video } from 'lucide-react';

const achievements = [
  {
    icon: <Video size={24} />,
    title: 'Generative AI Video Integration',
    description: 'Pioneered AI-powered video workflows at HUMEXPRO, integrating modern generative systems to reduce video creative production cycles by 40%.'
  },
  {
    icon: <Compass size={24} />,
    title: 'Multi-Channel Campaign Delivery',
    description: 'Successfully deployed 10+ comprehensive digital branding, responsive website, and print marketing campaigns for client product launches.'
  },
  {
    icon: <Award size={24} />,
    title: 'Academic & Professional Honors',
    description: 'Graduated in Commerce with high honors and completed advanced UX/UI Design qualifications from Profenna Infotech with excellent project remarks.'
  }
];

export default function Achievements() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="section-wrapper" id="achievements">
      <div className="content-container">
        <span className="section-tag">Milestones</span>
        <h2 className="section-title-large">Key Achievements</h2>

        <div 
          className="achievements-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {achievements.map((item, index) => (
            <div 
              className="premium-card achievement-card" 
              key={index}
              variants={cardVariants}
            >
              <div className="achievement-icon-box">
                {item.icon}
              </div>
              <div className="achievement-content">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
