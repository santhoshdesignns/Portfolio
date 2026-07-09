import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Mail, Linkedin, Download, X, ZoomIn } from 'lucide-react';

export default function CreativeWorks({ navigateTo }) {
  const [activeImage, setActiveImage] = useState(null);

  // Keyboard shortcut listener to close lightbox on ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveImage(null);
      }
    };
    if (activeImage) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImage]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const galleryItems = {
    posters: [
      {
        id: "poster-1",
        title: "Modern Art Exhibition",
        category: "Exhibition Poster",
        img: "/creative-poster-1.jpg",
        desc: "Designed using a clean modular grid, bold serif typography, and balanced abstract geometries to guide reader attention."
      }
    ],
    banners: [
      {
        id: "banner-1",
        title: "Design is Strategy Campaign",
        category: "Studio Promo Banner",
        img: "/creative-banner-1.jpg",
        desc: "A horizontal banner designed for print wall hanging and digital campaigns, utilizing a clean neutral grey aesthetic."
      }
    ],
    flyers: [
      {
        id: "flyer-1",
        title: "Studio Elan Art Direction",
        category: "A5 Marketing Flyer",
        img: "/creative-flyer-1.jpg",
        desc: "An elegant marketing layout organizing services and contact details around a central visual focal point."
      }
    ]
  };

  return (
    <div className="relative min-h-screen bg-[#F5F5F5] text-[#111111] overflow-x-hidden selection:bg-[#66C7F4]/30 selection:text-[#111111] pt-[92px] md:pt-[120px]">
      
      {/* 1. HERO SECTION */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="w-full max-w-[1400px] mx-auto px-5 md:px-10 lg:px-16 pt-8 pb-16"
      >
        {/* Back to Projects Button with proper spacing */}
        <div className="mb-10 md:mb-14 pointer-events-auto">
          <button 
            onClick={() => navigateTo('/', 'projects')}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 hover:text-[#66C7F4] transition-colors duration-300 font-sans cursor-pointer"
          >
            <ArrowLeft size={16} /> Back to Projects
          </button>
        </div>

        {/* Hero Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center w-full">
          {/* Left Side: Text content (55% width approx) */}
          <div className="md:col-span-7 flex flex-col items-start text-left">
            <span className="text-[12px] font-semibold tracking-[0.18em] uppercase text-[#66C7F4] mb-3 block font-sans">
              CREATIVE DESIGN
            </span>
            <h1 className="text-[40px] md:text-[56px] lg:text-[76px] font-bold tracking-tight text-neutral-900 leading-[1.1] font-serif mb-6">
              Design That<br />
              Communicates.<br />
              Connects.<br />
              Gets Noticed.
            </h1>
            <p className="text-[17px] md:text-[19px] text-[#5F5F5F] leading-[1.65] font-sans font-normal max-w-xl">
              A collection of visual work created to turn ideas, messages, and marketing goals into clear and engaging design across digital and print.
            </p>
          </div>

          {/* Right Side: Visual composition (45% width approx) */}
          <div className="md:col-span-5 flex items-center justify-center p-0 md:p-2 bg-transparent w-full">
            <div className="overflow-hidden rounded-[24px] border border-neutral-200 shadow-sm w-full bg-neutral-100">
              <img 
                src="/project-creative.jpg" 
                alt="Creative Works Composition Mockup" 
                className="w-full h-auto object-cover aspect-[16/9] md:aspect-[4/3] lg:aspect-[16/10]"
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 01: POSTER DESIGN */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="w-full max-w-[1400px] mx-auto px-5 md:px-10 lg:px-16 py-12 border-t border-neutral-300/20"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 mb-12">
          <div className="md:col-span-4">
            <span className="text-[12px] font-semibold tracking-[0.18em] uppercase text-[#66C7F4] mb-3 block font-sans">SECTION 01</span>
            <h2 className="text-[28px] md:text-[36px] font-bold text-neutral-900 font-serif leading-[1.2]">
              Posters Built to Capture Attention.
            </h2>
          </div>
          <div className="md:col-span-8 flex flex-col justify-start">
            <p className="text-[16px] md:text-[17px] text-[#5F5F5F] leading-[1.65] font-sans font-light">
              Visual compositions designed to communicate key messages quickly while creating strong hierarchy, clarity, and audience impact.
            </p>
          </div>
        </div>

        {/* Poster Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.posters.map((item) => (
            <div key={item.id} className="flex flex-col gap-4">
              <div 
                onClick={() => setActiveImage(item.img)}
                className="group relative overflow-hidden rounded-[20px] border border-neutral-300/20 bg-white shadow-sm hover:shadow-md cursor-zoom-in transition-all duration-300"
              >
                <div className="aspect-[3/4] w-full flex items-center justify-center overflow-hidden p-6">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="max-h-full max-w-full object-contain group-hover:scale-[1.02] transition-transform duration-300 ease-out"
                  />
                </div>
                {/* Subtle Hover Zoom Overlay */}
                <div className="absolute inset-0 bg-neutral-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg scale-90 group-hover:scale-100 transition-all duration-300 text-neutral-800">
                    <ZoomIn size={18} />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start px-2">
                <span className="text-[11px] font-bold tracking-widest text-[#66C7F4] uppercase font-sans">{item.category}</span>
                <h3 className="text-[18px] font-bold text-neutral-900 font-serif mt-1">{item.title}</h3>
                <p className="text-[14px] text-[#5F5F5F] font-sans leading-relaxed mt-2">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* SECTION 02: BANNER DESIGN */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="w-full max-w-[1400px] mx-auto px-5 md:px-10 lg:px-16 py-12 border-t border-neutral-300/20"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 mb-12">
          <div className="md:col-span-4">
            <span className="text-[12px] font-semibold tracking-[0.18em] uppercase text-[#66C7F4] mb-3 block font-sans">SECTION 02</span>
            <h2 className="text-[28px] md:text-[36px] font-bold text-neutral-900 font-serif leading-[1.2]">
              Campaign Visuals Made to Stand Out.
            </h2>
          </div>
          <div className="md:col-span-8 flex flex-col justify-start">
            <p className="text-[16px] md:text-[17px] text-[#5F5F5F] leading-[1.65] font-sans font-light">
              Digital and promotional banners designed to deliver focused messages across campaigns, social platforms, and marketing touchpoints.
            </p>
          </div>
        </div>

        {/* Banner Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          {galleryItems.banners.map((item) => (
            <div key={item.id} className="flex flex-col gap-4">
              <div 
                onClick={() => setActiveImage(item.img)}
                className="group relative overflow-hidden rounded-[20px] border border-neutral-300/20 bg-white shadow-sm hover:shadow-md cursor-zoom-in transition-all duration-300 w-full"
              >
                <div className="aspect-[16/9] w-full flex items-center justify-center overflow-hidden p-6 sm:p-12">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="max-h-full max-w-full object-contain group-hover:scale-[1.02] transition-transform duration-300 ease-out"
                  />
                </div>
                {/* Subtle Hover Zoom Overlay */}
                <div className="absolute inset-0 bg-neutral-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg scale-90 group-hover:scale-100 transition-all duration-300 text-neutral-800">
                    <ZoomIn size={18} />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start px-2">
                <span className="text-[11px] font-bold tracking-widest text-[#66C7F4] uppercase font-sans">{item.category}</span>
                <h3 className="text-[18px] font-bold text-neutral-900 font-serif mt-1">{item.title}</h3>
                <p className="text-[14px] text-[#5F5F5F] font-sans leading-relaxed mt-2">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* SECTION 03: FLYER DESIGN */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="w-full max-w-[1400px] mx-auto px-5 md:px-10 lg:px-16 py-12 border-t border-neutral-300/20"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 mb-12">
          <div className="md:col-span-4">
            <span className="text-[12px] font-semibold tracking-[0.18em] uppercase text-[#66C7F4] mb-3 block font-sans">SECTION 03</span>
            <h2 className="text-[28px] md:text-[36px] font-bold text-neutral-900 font-serif leading-[1.2]">
              Information Made Clear and Visual.
            </h2>
          </div>
          <div className="md:col-span-8 flex flex-col justify-start">
            <p className="text-[16px] md:text-[17px] text-[#5F5F5F] leading-[1.65] font-sans font-light">
              Print and digital flyers designed to organize information, guide attention, and communicate offers or services effectively.
            </p>
          </div>
        </div>

        {/* Flyer Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.flyers.map((item) => (
            <div key={item.id} className="flex flex-col gap-4">
              <div 
                onClick={() => setActiveImage(item.img)}
                className="group relative overflow-hidden rounded-[20px] border border-neutral-300/20 bg-white shadow-sm hover:shadow-md cursor-zoom-in transition-all duration-300"
              >
                <div className="aspect-[3/4] w-full flex items-center justify-center overflow-hidden p-6">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="max-h-full max-w-full object-contain group-hover:scale-[1.02] transition-transform duration-300 ease-out"
                  />
                </div>
                {/* Subtle Hover Zoom Overlay */}
                <div className="absolute inset-0 bg-neutral-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg scale-90 group-hover:scale-100 transition-all duration-300 text-neutral-800">
                    <ZoomIn size={18} />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start px-2">
                <span className="text-[11px] font-bold tracking-widest text-[#66C7F4] uppercase font-sans">{item.category}</span>
                <h3 className="text-[18px] font-bold text-neutral-900 font-serif mt-1">{item.title}</h3>
                <p className="text-[14px] text-[#5F5F5F] font-sans leading-relaxed mt-2">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* NEXT PROJECT & TRANSITION BLOCK */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        className="w-full border-t border-neutral-300/20 mt-16 bg-neutral-900 text-white"
      >
        <button 
          onClick={() => navigateTo('/', 'projects')}
          className="w-full flex flex-col items-center justify-center text-center py-20 md:py-28 hover:bg-[#66C7F4]/10 transition-colors duration-500 cursor-pointer group"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-[#66C7F4] font-sans font-bold mb-3">NEXT PROJECT</span>
          <h2 className="text-[32px] md:text-[48px] lg:text-[64px] font-serif font-light text-white tracking-wide group-hover:translate-x-2 transition-transform duration-300 inline-flex items-center gap-4">
            JewelMark Branding <ArrowRight className="text-[#66C7F4]" size={36} />
          </h2>
        </button>
      </motion.section>

      {/* FOOTER */}
      <footer className="relative w-full px-5 md:px-10 lg:px-16 py-10 max-w-[1400px] mx-auto z-30 border-t border-neutral-200/30 flex flex-col md:flex-row justify-between items-center gap-5 md:gap-6 text-[15px] md:text-xs font-medium text-neutral-400 select-none text-center">
        <span>Designed & Developed by Santhoshkumar Kanagaraj</span>
        
        <div className="flex items-center justify-center gap-6 pointer-events-auto">
          <motion.a 
            href="https://www.linkedin.com/in/santhoshkumar-kanagaraj-920763265" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Open LinkedIn profile"
            whileHover={{ y: -3, color: '#57B9FF' }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-1.5 transition-colors cursor-pointer text-[15px] md:text-xs font-medium text-neutral-400"
          >
            <Linkedin size={16} />
            <span>LinkedIn</span>
          </motion.a>
          
          <motion.a 
            href="mailto:santhosh.designns@gmail.com" 
            whileHover={{ y: -3, color: '#57B9FF' }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-1.5 transition-colors cursor-pointer text-[15px] md:text-xs font-medium text-neutral-400"
          >
            <Mail size={16} />
            <span>Email</span>
          </motion.a>
          
          <motion.a 
            href="/Santhoshkumar-Kanagaraj-Resume.pdf"
            download="Santhoshkumar-Kanagaraj-Resume.pdf"
            whileHover={{ y: -3, color: '#57B9FF' }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-1.5 transition-colors cursor-pointer text-[15px] md:text-xs font-medium text-neutral-400"
            style={{ textDecoration: 'none' }}
          >
            <Download size={16} />
            <span>Resume</span>
          </motion.a>
        </div>

        <span>&copy; 2026</span>
      </footer>

      {/* LIGHTBOX OVERLAY */}
      <AnimatePresence>
        {activeImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 md:p-8 cursor-zoom-out select-none"
          >
            {/* Close Button */}
            <button 
              onClick={() => setActiveImage(null)}
              className="absolute top-6 right-6 text-white/75 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full backdrop-blur-md transition-all z-50 cursor-pointer"
            >
              <X size={24} />
            </button>

            {/* Lightbox Image Container */}
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="max-w-full max-h-[85vh] flex items-center justify-center relative overflow-hidden"
              onClick={(e) => e.stopPropagation()} // Stop click bubbling to close backdrop
            >
              <img 
                src={activeImage} 
                alt="Enlarged design artwork sample" 
                className="max-w-full max-h-[85vh] object-contain rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
