import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';

function AnimatedNumber({ value, suffix = "" }) {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = parseFloat(value);
    if (isNaN(end)) {
      setCurrent(value);
      return;
    }

    const duration = 1500; // 1.5 seconds
    const startTime = performance.now();

    const updateNumber = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Cubic ease-out
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const val = start + easeProgress * (end - start);

      if (value.toString().includes('.')) {
        setCurrent(val.toFixed(1));
      } else {
        setCurrent(Math.floor(val));
      }

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      }
    };

    requestAnimationFrame(updateNumber);
  }, [isInView, value]);

  return <span ref={ref}>{current}{suffix}</span>;
}

export default function DesignImpact() {
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

  const stats = [
    { value: '300', suffix: '+', label: 'Marketing Creatives' },
    { value: '50', suffix: '+', label: 'AI Videos Created' },
    { value: '10', suffix: '+', label: 'Brand Campaigns' },
    { value: '1.5', suffix: ' Years', label: 'Professional Exp.' }
  ];

  return (
    <section className="section-wrapper" id="impact">
      <div className="content-container">
        <span className="section-tag">Metrics</span>
        <h2 className="section-title-large">Design Impact</h2>

        <div 
          className="impact-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {stats.map((stat, index) => (
            <div 
              className="premium-card impact-stat-card"
              key={index}
              variants={cardVariants}
            >
              <div className="impact-stat-num">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="impact-stat-lbl">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
