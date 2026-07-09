import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

export default function Contact() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const handleEmail = () => {
    window.location.href = 'mailto:santhosh.designns@gmail.com';
  };

  return (
    <section className="section-wrapper" id="contact" style={{ borderBottom: 'none' }}>
      <div className="content-container">
        <div className="contact-grid">
          {/* Left Column: Heading & Info Grid */}
          <div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className="section-tag">Get In Touch</span>
            <h2 className="contact-headline">Let's Build<br />Something Amazing.</h2>

            <div className="contact-channels">
              <div className="contact-channel-card" variants={itemVariants}>
                <span className="contact-channel-label">
                  <Mail size={12} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                  Email
                </span>
                <span className="contact-channel-value">
                  <a href="mailto:santhosh.designns@gmail.com">santhosh.designns@gmail.com</a>
                </span>
              </div>

              <div className="contact-channel-card" variants={itemVariants}>
                <span className="contact-channel-label">
                  <Phone size={12} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                  Phone
                </span>
                <span className="contact-channel-value">
                  <a href="tel:+918508455669">+91 85084 55669</a>
                </span>
              </div>

              <div className="contact-channel-card" variants={itemVariants}>
                <span className="contact-channel-label">
                  <MapPin size={12} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                  Location
                </span>
                <span className="contact-channel-value">Pollachi, Tamil Nadu</span>
              </div>

              <div className="contact-channel-card" variants={itemVariants}>
                <span className="contact-channel-label">
                  <Linkedin size={12} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                  LinkedIn
                </span>
                <span className="contact-channel-value">
                  <a 
                    href="https://www.linkedin.com/in/santhoshkumar-kanagaraj-920763265" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Santhoshkumar K.
                  </a>
                </span>
              </div>


            </div>
          </div>

          {/* Right Column: CTA Buttons */}
          <div 
            className="contact-actions"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <button 
              className="btn-pill btn-primary"
              onClick={handleEmail}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Email Me"
            >
              Email Me
            </button>
            <a 
              href="/Santhoshkumar-Kanagaraj-Resume.pdf"
              download="Santhoshkumar-Kanagaraj-Resume.pdf"
              className="btn-pill btn-secondary inline-flex items-center justify-center"
              style={{ textDecoration: 'none' }}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Download Resume"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
