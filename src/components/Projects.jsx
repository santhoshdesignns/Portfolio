import React from 'react';
import { motion } from 'motion/react';

const projects = [
  {
    id: 1,
    title: 'JewelMark Branding & AI Video Creation',
    description: 'Designed premium branding assets, luxury social media creatives, promotional campaigns, and AI-generated marketing videos while maintaining a consistent luxury brand identity.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1200&h=600',
    tags: ['Brand Identity', 'Social Media', 'AI Video Creation', 'Luxury Branding'],
    isFeatured: true
  },
  {
    id: 2,
    title: 'Company Website UI Design',
    description: 'Designed modern, responsive website interfaces with a strong focus on Website UI Design, Responsive Web Design, Landing Page Design, Visual Design, and User Experience (UX).',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=600&h=450',
    tags: ['Website Design', 'UI Design', 'Responsive Design', 'Figma', 'UX'],
    isFeatured: false
  },
  {
    id: 3,
    title: 'Marketing Campaign Design',
    description: 'Created engaging digital marketing creatives, promotional visuals, print designs, and campaign creatives matching brand strategies.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600&h=450',
    tags: ['Marketing Design', 'Branding', 'Content Creation', 'Visual Storytelling'],
    isFeatured: false
  }
];

export default function Projects() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="section-wrapper" id="projects">
      <div className="content-container">
        <span className="section-tag">Portfolio</span>
        <h2 className="section-title-large">Featured Projects</h2>

        <div 
          className="bento-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className={`premium-card project-card ${project.isFeatured ? 'bento-card-large' : ''}`}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
            >
              <div className="project-header-info">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description-text">{project.description}</p>
              </div>

              <div className="project-image-container">
                <img 
                  className="project-image-placeholder"
                  src={project.image} 
                  alt={project.title} 
                  loading="lazy"
                />
              </div>

              <div className="project-tags-row">
                {project.tags.map((tag, tagIndex) => (
                  <span className="project-tag-badge" key={tagIndex}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
