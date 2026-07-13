import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, Mail, Download, ExternalLink, Calendar, MapPin, Briefcase, GraduationCap, Award, PenTool, Globe, Play, Megaphone, Clock, Palette, Layers, Sparkles, Monitor, Phone, Linkedin, Send, File, ArrowDown } from 'lucide-react';
import JewelMarkCaseStudy from './components/JewelMarkCaseStudy.jsx';
import CreativeWorks from './components/CreativeWorks.jsx';

// Dynamic CountUp Animation Component triggered on scroll-into-view
function CountUp({ end, duration = 1.5 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const target = parseFloat(end);
    if (isNaN(target)) return;
    const isDecimal = end.toString().includes('.');
    
    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const current = progress * target;
      setCount(isDecimal ? current.toFixed(1) : Math.floor(current));
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end); // Set final exact string
      }
    };
    requestAnimationFrame(animate);
  }, [inView, end, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function App() {
  const getNormalizedPath = (path) => {
    const base = import.meta.env.BASE_URL;
    if (base !== '/' && path.startsWith(base)) {
      return path.slice(base.length - 1);
    }
    return path;
  };

  const [currentPath, setCurrentPath] = useState(getNormalizedPath(window.location.pathname));
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getNormalizedPath(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path, sectionToScroll = null) => {
    const base = import.meta.env.BASE_URL;
    const targetPath = base !== '/' ? (path === '/' ? base : `${base.slice(0, -1)}${path}`) : path;
    window.history.pushState({}, '', targetPath);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (sectionToScroll) {
      setTimeout(() => {
        scrollToSection(sectionToScroll);
      }, 100);
    }
  };

  // Body scroll lock when mobile navigation is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Refs for spotlight mask effect
  const canvasRef = useRef(null);
  const revealImgRef = useRef(null);

  // Spotlight math & canvas render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const imgLayer = revealImgRef.current;
    if (!canvas || !imgLayer) return;

    const ctx = canvas.getContext('2d');
    const SPOTLIGHT_R = 260;

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const smooth = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      
      // Calculate normalized offset for parallax (-1 to 1)
      const nx = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const ny = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      setParallaxOffset({ x: nx, y: ny });
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    let animationFrameId;

    const loop = () => {
      // Lerp smooth coordinates toward target mouse coordinates
      smooth.x += (mouse.x - smooth.x) * 0.1;
      smooth.y += (mouse.y - smooth.y) * 0.1;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Get container's offset relative to the viewport
      const rect = imgLayer.getBoundingClientRect();
      const localX = smooth.x - rect.left;
      const localY = smooth.y - rect.top;

      // Create radial gradient for the spotlight mask
      const grad = ctx.createRadialGradient(localX, localY, 0, localX, localY, SPOTLIGHT_R);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.4, 'rgba(255,255,255,1)');
      grad.addColorStop(0.6, 'rgba(255,255,255,0.75)');
      grad.addColorStop(0.75, 'rgba(255,255,255,0.4)');
      grad.addColorStop(0.88, 'rgba(255,255,255,0.12)');
      grad.addColorStop(1, 'rgba(255,255,255,0)');

      ctx.beginPath();
      ctx.arc(localX, localY, SPOTLIGHT_R, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Convert canvas drawing to data URL and apply as CSS mask
      const dataUrl = canvas.toDataURL();
      imgLayer.style.webkitMaskImage = `url(${dataUrl})`;
      imgLayer.style.maskImage = `url(${dataUrl})`;
      imgLayer.style.webkitMaskSize = '100% 100%';
      imgLayer.style.maskSize = '100% 100%';

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Smooth scroll handler
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  // Text Split for Word Reveal Animation
  const headlineText = "Designing Meaningful Digital Experiences.";
  const headlineWords = headlineText.split(" ");

  // Staggered list animation variants for sections
  const isMobileViewport = typeof window !== 'undefined' && window.innerWidth < 768;
  const sectionVariants = {
    hidden: { opacity: 0, y: isMobileViewport ? 30 : 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F5F5F5] text-[#111111] overflow-x-hidden selection:bg-[#66C7F4]/30 selection:text-[#111111]">
      
      {/* 1. CURTAIN SPLASH SCREEN */}
      <div className="splash" id="splash">
        <div className="splash-row splash-row-top">
          <div className="splash-box"></div>
          <div className="splash-box"></div>
          <div className="splash-box"></div>
          <div className="splash-box"></div>
          <div className="splash-box"></div>
        </div>
        <div className="splash-row splash-row-bottom">
          <div className="splash-box"></div>
          <div className="splash-box"></div>
          <div className="splash-box"></div>
          <div className="splash-box"></div>
          <div className="splash-box"></div>
        </div>
      </div>

      {/* 2. NAVIGATION BAR */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 inset-x-0 z-50 px-5 pt-5 pb-0 sm:px-10 sm:py-7 flex justify-between items-center bg-transparent pointer-events-none"
      >
        {/* SK elegant monogram logo (left) */}
        <div className="logo-wrapper pointer-events-auto">
          <div className="inner">
            <button 
              onClick={() => {
                if (currentPath !== '/') {
                  navigateTo('/', 'home');
                } else {
                  scrollToSection('home');
                }
              }}
              aria-label="Home" 
              className="flex items-center justify-center w-12 h-12 rounded-full border border-neutral-300/40 bg-white/80 backdrop-blur-md font-bold text-neutral-900 tracking-tighter text-lg shadow-sm hover:scale-105 hover:bg-white transition-all duration-300 cursor-pointer"
            >
              SK
            </button>
          </div>
        </div>

        {/* Desktop Links (Center) */}
        {(currentPath === '/projects/jewelmark' || currentPath === '/creative-works') ? (
          <div className="hidden md:flex flex-row items-center gap-1 text-sm tracking-wide font-medium bg-white/70 backdrop-blur-md px-6 py-3.5 rounded-full border border-neutral-300/30 shadow-sm pointer-events-auto select-none">
            <button 
              onClick={() => navigateTo('/', 'projects')} 
              className="hover:text-[#66C7F4] transition-colors px-3 py-1 cursor-pointer flex items-center gap-2 font-sans"
            >
              ← Back to Projects
            </button>
          </div>
        ) : (
          <nav className="hidden md:flex flex-row items-center gap-1 text-sm tracking-wide font-medium bg-white/70 backdrop-blur-md px-6 py-3.5 rounded-full border border-neutral-300/30 shadow-sm pointer-events-auto select-none">
            <button onClick={() => scrollToSection('about')} className="hover:text-[#66C7F4] transition-colors px-3 py-1 cursor-pointer">About</button>
            <span className="text-neutral-300">|</span>
            <button onClick={() => scrollToSection('experience')} className="hover:text-[#66C7F4] transition-colors px-3 py-1 cursor-pointer">Experience</button>
            <span className="text-neutral-300">|</span>
            <button onClick={() => scrollToSection('projects')} className="hover:text-[#66C7F4] transition-colors px-3 py-1 cursor-pointer">Projects</button>
            <span className="text-neutral-300">|</span>
            <button onClick={() => scrollToSection('skills')} className="hover:text-[#66C7F4] transition-colors px-3 py-1 cursor-pointer">Skills</button>
            <span className="text-neutral-300">|</span>
            <button onClick={() => scrollToSection('contact')} className="hover:text-[#66C7F4] transition-colors px-3 py-1 cursor-pointer">Contact</button>
          </nav>
        )}

        {/* Animated hamburger menu (right) */}
        <div className="burger-wrapper pointer-events-auto">
          <div className="inner">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`burger-btn ${isMobileMenuOpen ? 'open' : ''}`}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <span className="bar"></span>
              <span className="bar"></span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* 3. MENU PANEL OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Background Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/45 backdrop-blur-[12px]"
              style={{ zIndex: 9998 }}
            />

            {/* Menu Panel - Side Drawer */}
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 h-full w-[300px] max-w-[85vw] rounded-l-[32px] rounded-r-none shadow-[-20px_0_60px_rgba(0,0,0,0.25)] backdrop-blur-[30px] p-7 flex flex-col justify-between overflow-y-auto no-scrollbar"
              style={{
                zIndex: 9999,
                background: 'rgba(24, 24, 24, 0.78)',
                borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
                boxSizing: 'border-box'
              }}
            >
              {/* Close Button inside the panel */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(false)}
                whileHover={{ scale: 1.08, rotate: 90, backgroundColor: 'rgba(255,255,255,0.14)', boxShadow: '0 10px 30px rgba(0,0,0,0.25)' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="absolute flex items-center justify-center rounded-full text-white cursor-pointer"
                style={{
                  top: '24px',
                  right: '24px',
                  width: '48px',
                  height: '48px',
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.10)',
                  zIndex: 10000
                }}
                aria-label="Close menu"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </motion.button>

              <div className="flex flex-col flex-1 justify-between h-full">
                {/* Navigation Links */}
                <nav className="flex flex-col gap-[24px] mt-24">
                  {[
                    { name: "About Me", id: "about" },
                    { name: "Experience", id: "experience" },
                    { name: "Projects", id: "projects" },
                    { name: "Skills", id: "skills" },
                    { name: "Contact", id: "contact" }
                  ].map((item, idx) => (
                    <div key={item.id} className="w-full flex items-center justify-start h-[56px] px-4">
                      <motion.button
                        custom={idx}
                        variants={{
                          hidden: { opacity: 0, x: 30 },
                          visible: (i) => ({
                            opacity: 1,
                            x: 0,
                            transition: {
                              delay: 0.15 + i * 0.06,
                              duration: 0.6,
                              ease: [0.16, 1, 0.3, 1]
                            }
                          })
                        }}
                        initial="hidden"
                        animate="visible"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          if (currentPath !== '/') {
                            navigateTo('/', item.id);
                          } else {
                            scrollToSection(item.id);
                          }
                        }}
                        whileHover={{ x: 8, color: '#57B9FF' }}
                        className="text-left font-sans font-semibold text-white tracking-wide cursor-pointer transition-colors duration-300 w-full block text-[20px] leading-[1.4]"
                        style={{ background: 'none', border: 'none' }}
                      >
                        {item.name}
                      </motion.button>
                    </div>
                  ))}
                </nav>

                {/* Contact & CTA Area */}
                <div className="flex flex-col mt-[48px] pt-[32px] border-t border-white/8">
                  {/* Contact Area */}
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1 text-sm font-sans" style={{ color: 'rgba(255,255,255,0.75)' }}>
                      <a href="mailto:santhosh.designns@gmail.com" className="hover:text-[#57B9FF] transition-colors">santhosh.designns@gmail.com</a>
                      <a href="tel:+918508455669" className="hover:text-[#57B9FF] transition-colors">+91 8508455669</a>
                    </div>
                    <div className="flex gap-3 flex-wrap text-sm font-sans items-center">
                      <a 
                        href="https://www.linkedin.com/in/santhoshkumar-kanagaraj-920763265" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label="Open Santhoshkumar Kanagaraj's LinkedIn profile"
                        className="inline-flex items-center gap-1 text-white hover:text-[#57B9FF] transition-all duration-300 group"
                      >
                        <span>LinkedIn</span>
                        <ExternalLink size={13} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                      </a>
                      <span className="text-white/20">•</span>
                      <a href="#projects" onClick={(e) => { 
                        e.preventDefault(); 
                        setIsMobileMenuOpen(false);
                        if (currentPath === '/projects/jewelmark') {
                          navigateTo('/', 'projects');
                        } else {
                          scrollToSection('projects'); 
                        }
                      }} className="underline text-white hover:text-[#57B9FF] transition-colors">Portfolio</a>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-[32px]">
                    <motion.a 
                      href={`${import.meta.env.BASE_URL}Santhoshkumar-Kanagaraj-Resume.pdf`}
                      download="Santhoshkumar-Kanagaraj-Resume.pdf"
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.3 }}
                      className="w-full flex items-center justify-between bg-white text-neutral-900 rounded-full cursor-pointer px-6"
                      style={{ height: '52px', textDecoration: 'none' }}
                    >
                      <span className="font-semibold font-sans" style={{ fontSize: '17px' }}>Download Resume</span>
                      <span className="flex items-center justify-center rounded-full bg-[#57B9FF] text-white flex-shrink-0" style={{ width: '42px', height: '42px' }}>
                        <svg width="12" height="12" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 13L13 5M13 5H6M13 5V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {currentPath === '/projects/jewelmark' ? (
        <JewelMarkCaseStudy navigateTo={navigateTo} />
      ) : currentPath === '/creative-works' ? (
        <CreativeWorks navigateTo={navigateTo} />
      ) : (
        <>
          {/* 4. MAIN HERO SECTION */}
          <main id="home" className="relative w-full min-h-0 h-auto md:min-h-[100svh] lg:h-screen flex flex-col justify-between pt-[92px] pb-[96px] md:pb-12 sm:pt-32 sm:pb-16 z-10">
        
        {/* BACKGROUND TYPOGRAPHY (Huge "SANTHOSH") */}
        <motion.div 
          style={{
            x: parallaxOffset.x * -12,
            y: parallaxOffset.y * -12,
          }}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-x-0 bottom-0 md:bottom-12 z-10 text-center pointer-events-none hero-big-text"
        >
          <h2 className="opacity-[0.02] lg:opacity-[0.05] text-[18vw] lg:text-[clamp(140px,20vw,420px)] leading-none select-none font-bold text-neutral-900">SANTHOSH</h2>
        </motion.div>

        {/* CONTENT FOREGROUND */}
        <div className="relative w-full max-w-[1600px] mx-auto px-5 sm:px-10 lg:px-16 flex-1 flex flex-row items-stretch md:items-center justify-between z-30 pointer-events-none mt-0 pt-0 h-auto md:h-auto">
          {/* LEFT COLUMN */}
          <div className="w-full md:w-[50%] lg:w-[45%] sm:max-w-[640px] flex flex-col items-start text-left pointer-events-auto md:-ml-10 lg:-ml-14 px-0 justify-start h-auto md:justify-center md:h-full">
            
            {/* Small Role Labels */}
            <div className="profession-container mb-[18px] sm:mb-8 pointer-events-auto">
              <div className="profession-wrapper">
                <motion.span
                  initial={{ opacity: 0, y: 9 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="profession-item"
                >
                  Graphic Designer
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 9 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.85, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="hidden md:inline text-neutral-900/30 font-sans animate-none"
                >
                  •
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 9 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="profession-item"
                >
                  UX/UI Designer
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 9 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.95, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="hidden md:inline text-neutral-900/30 font-sans animate-none"
                >
                  •
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 9 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="profession-item"
                >
                  AI Video Creator
                </motion.span>
              </div>
            </div>

            {/* Introductory Line */}
            <motion.p
              initial={{ opacity: 0, y: 9 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-[#5F5F5F] sm:text-neutral-500 text-[16px] sm:text-lg tracking-wide font-medium mb-[10px] sm:mb-[8px] w-full text-left"
            >
              Hi, I'm Santhosh.
            </motion.p>

            {/* Headline Line-by-Line Reveal */}
            <h1 className="responsive-hero-heading font-bold text-neutral-900 select-none font-serif max-w-[60%] sm:max-w-[65%] md:max-w-none mt-0 text-left mx-0">
              {[
                "Helping Brands",
                "Stand Out.",
                "Grow Better."
              ].map((line, index) => (
                <div key={index} className="overflow-hidden">
                  <motion.span
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
                      visible: (i) => ({
                        opacity: 1,
                        y: 0,
                        filter: 'blur(0px)',
                        transition: {
                          delay: 1.0 + i * 0.1,
                          duration: 0.5,
                          ease: [0.16, 1, 0.3, 1]
                        }
                      })
                    }}
                    className="block"
                  >
                    {line}
                  </motion.span>
                </div>
              ))}
            </h1>

            {/* Description Text */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-[16px] sm:text-lg lg:text-[20px] text-[#5F5F5F] sm:text-neutral-900/72 leading-[1.65] lg:leading-relaxed max-w-[90%] md:max-w-[500px] font-light mt-[24px] sm:mt-8 text-left mx-0"
            >
              I help businesses build memorable brands through strategic design, modern websites, creative marketing, and AI-powered visual storytelling.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="cta-group mt-[28px] sm:mt-10 mb-[40px] md:mb-0 pointer-events-auto flex items-center justify-start gap-5 w-full"
            >
              {/* View Portfolio Button */}
              <button onClick={() => scrollToSection('projects')} className="cta-pill">
                View Portfolio
              </button>
              {/* Arrow Button */}
              <button 
                onClick={() => scrollToSection('projects')} 
                className="cta-arrow"
                aria-label="View Portfolio Arrow"
              >
                <ArrowRight size={18} strokeWidth={2.5} />
              </button>
            </motion.div>
          </div>

          {/* RIGHT COLUMN (DESKTOP) */}
          <div className="hidden md:flex md:w-[50%] lg:w-[40%] h-full items-end justify-end pointer-events-auto relative overflow-visible">
            <motion.div 
              style={{
                x: parallaxOffset.x * 12,
                y: parallaxOffset.y * 12,
              }}
              transition={{ type: "spring", damping: 30, stiffness: 80 }}
              className="w-full h-full max-h-[85vh] flex items-end justify-end relative overflow-visible"
            >
              <motion.img
                src={`${import.meta.env.BASE_URL}Fav icon.png`}
                alt="3D Character"
                className="w-full h-[550px] lg:h-[700px] xl:h-[750px] object-contain object-bottom-right select-none"
                animate={{
                  y: [0, -10, 0]
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </div>

          {/* Right Mobile Mascot (Aligned beside text content on the right) */}
          <div className="hero-3d-wrapper">
            <motion.div 
              style={{
                x: parallaxOffset.x * 8,
                y: parallaxOffset.y * 8,
                overflow: 'visible'
              }}
              transition={{ type: "spring", damping: 30, stiffness: 80 }}
              className="relative overflow-visible"
            >
              <motion.img
                src={`${import.meta.env.BASE_URL}Fav icon.png`}
                alt="Character Mascot"
                className="w-full h-auto object-contain select-none"
                animate={{
                  y: [0, -10, 0]
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* BOTTOM ANIMATED SCROLL INDICATOR */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ delay: 2.0, duration: 0.8 }}
          className="absolute bottom-6 inset-x-0 w-full flex flex-col items-center justify-center gap-1.5 z-30 pointer-events-none text-xs tracking-widest font-semibold uppercase text-neutral-400 select-none cursor-pointer md:relative md:bottom-auto md:mt-auto md:mb-0 hero-scroll-mobile-indicator"
          onClick={() => scrollToSection('about')}
        >
          <span>Scroll Down</span>
          <motion.div
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 2.0,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ChevronDown size={18} className="text-[#66C7F4]" />
          </motion.div>
        </motion.div>

      </main>

      {/* SECTION 01: ABOUT */}
      <motion.section 
        id="about"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="relative w-full main-container z-30 border-t border-neutral-200/50"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[20px] md:gap-16 lg:gap-24 items-start">
          {/* Left Column (40% width on desktop) */}
          <div className="col-span-1 md:col-span-5 flex flex-col items-start pt-1">
            <span className="text-[12px] font-semibold tracking-[0.18em] uppercase text-[#66C7F4] mb-3 block font-sans">ABOUT ME</span>
            <h2 className="text-[40px] md:text-[56px] lg:text-[70px] font-bold tracking-[-0.03em] text-neutral-900 leading-[0.9] font-serif max-w-[420px] mt-2 mb-0 md:mb-6">
              Designing Brands<br/>That People<br/>Remember.
            </h2>
          </div>

          {/* Right Column (60% width on desktop) */}
          <div className="col-span-1 md:col-span-7 flex flex-col pt-0 md:pt-[32px] text-neutral-600 font-normal">
            <p className="max-w-[90%] md:max-w-[650px] text-[16px] md:text-[18px] lg:text-[22px] leading-[1.7] md:leading-[1.75] text-[#5F5F5F] md:text-neutral-900/72 font-sans font-normal mb-0 md:mb-5">
              I'm Santhoshkumar Kanagaraj, a Graphic Designer and UX/UI Designer dedicated to creating memorable brand identities, modern websites, and impactful digital experiences. By combining strategic thinking, creativity, and AI-powered workflows, I help businesses build stronger brands, connect with their audience, and stand out in competitive markets.
            </p>
            
            {/* Core Services Section (28px spacing from paragraph) */}
            <div className="flex flex-col gap-3 mt-[28px] md:mt-7">
              <span className="text-[12px] font-semibold tracking-[0.18em] uppercase text-[#66C7F4] font-sans">WHAT I SPECIALIZE IN</span>
              <div 
                className="flex flex-wrap items-center text-left font-sans select-none mt-1"
                style={{ fontSize: '15px', fontWeight: 600, color: 'rgba(17, 17, 17, 0.75)', lineHeight: 1.8 }}
              >
                {['Brand Identity', 'Website Design', 'Marketing Creative', 'AI Video Production'].map((service, index, arr) => (
                  <div key={service} className="flex items-center whitespace-nowrap">
                    <span>{service}</span>
                    {index < arr.length - 1 && (
                      <span className="text-[#66C7F4] inline-flex items-center justify-center px-[12px]">•</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Grid (56px spacing from top content, 16px gap on mobile) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[20px] md:gap-4 mt-[28px] md:mt-14 w-full">
          {[
            { value: "1.5", label: "Years of Experience", suffix: "+" },
            { value: "300", label: "Creative Assets Delivered", suffix: "+" },
            { value: "50", label: "AI Videos Produced", suffix: "+" },
            { value: "10", label: "Businesses Supported", suffix: "+" }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white/65 backdrop-blur-sm border border-neutral-300/30 rounded-[24px] p-5 md:p-8 h-[140px] flex flex-col justify-start md:justify-between items-start text-left shadow-sm hover:shadow-md transition-shadow w-full">
              <div className="text-[48px] md:text-[64px] font-bold text-neutral-900 leading-none tracking-tighter md:tracking-tight font-sans mb-3 md:mb-0">
                <CountUp end={stat.value} />{stat.suffix}
              </div>
              <div className="text-[16px] md:text-base font-medium text-neutral-900/65 md:text-neutral-900/60 leading-[1.3] md:leading-none font-sans max-w-[200px] line-clamp-2 md:line-clamp-none">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* SECTION 02: EXPERIENCE */}
      <motion.section 
        id="experience"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="relative w-full main-container flex flex-col gap-[28px] md:gap-16 z-30 border-t border-[#EAEAEA]"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[28px] lg:gap-16 items-start">
          {/* Left Column */}
          <div className="col-span-1 md:col-span-5 flex flex-col items-start pt-1">
            <span className="text-[12px] font-semibold tracking-[0.18em] uppercase text-[#66C7F4] mb-3 block font-sans">EXPERIENCE</span>
            <h2 className="text-[40px] md:text-[56px] lg:text-[80px] font-bold tracking-tight text-neutral-900 leading-[1.0] font-serif mt-2 mb-[20px] md:mb-6">
              Professional<br/>Experience
            </h2>
            <p className="max-w-[90%] md:max-w-[620px] lg:max-w-[360px] text-[16px] md:text-[18px] lg:text-base text-[#5F5F5F] md:text-neutral-500 leading-[1.7] md:leading-[1.75] font-sans font-normal mb-[28px] md:mb-8">
              Over the past 1.5 years, I've collaborated with businesses to create branding, websites, AI-powered content, and digital experiences that deliver measurable value.
            </p>
            
            {/* Company Card with 32px padding */}
            <div className="flex flex-col gap-3.5 bg-white border border-neutral-300/30 p-6 md:p-8 rounded-[24px] md:rounded-[28px] shadow-sm max-w-sm w-full">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#66C7F4] flex items-center gap-2 font-sans">
                <Briefcase size={14} /> HUMEXPRO
              </span>
              <span className="text-lg font-bold text-neutral-900 leading-tight font-sans">Graphic Designer & UX/UI Designer</span>
              
              <div className="flex flex-col gap-2 mt-2 font-sans text-sm text-neutral-500 font-normal">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-neutral-400" />
                  <span>March 2025 — Present</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-neutral-400" />
                  <span>Pollachi, Tamil Nadu</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-neutral-400" />
                  <span>Full-time</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column (2x2 Grid, 28px gap) */}
          <div className="col-span-1 md:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-[20px] md:gap-7">
            {[
              {
                title: "Brand Identity",
                desc: "Created complete brand identities, marketing assets, brochures, and social media creatives that strengthened brand recognition across digital and print platforms.",
                icon: PenTool
              },
              {
                title: "Website Design",
                desc: "Designed responsive business websites and landing pages with modern layouts, intuitive user experiences, and conversion-focused interfaces using Figma and Antigravity.",
                icon: Globe
              },
              {
                title: "AI Video Creation",
                desc: "Produced AI-powered promotional videos, motion graphics, and visual storytelling content to improve digital marketing engagement.",
                icon: Play
              },
              {
                title: "Marketing Design",
                desc: "Designed campaign creatives, advertisements, print materials, and digital assets that supported business growth and consistent brand communication.",
                icon: Megaphone
              }
            ].map((exp, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -8, boxShadow: "0 12px 30px -10px rgba(0,0,0,0.08)" }}
                className="bg-white border border-neutral-300/30 p-6 md:p-8 rounded-[24px] md:rounded-[28px] flex flex-col gap-6 shadow-sm transition-all h-full"
              >
                <div className="w-12 h-12 rounded-full bg-[#66C7F4]/10 flex items-center justify-center text-[#66C7F4] shrink-0">
                  <exp.icon size={22} strokeWidth={2} />
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="text-[28px] md:text-[32px] font-bold text-neutral-900 leading-tight font-sans">{exp.title}</h3>
                  <p className="text-[17px] md:text-[17px] text-[#5F5F5F] md:text-neutral-500 leading-[1.7] font-normal font-sans">{exp.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SECTION 03: FEATURED PROJECTS */}
      <motion.section 
        id="projects"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="relative w-full main-container flex flex-col gap-0 md:gap-12 z-30 border-t border-neutral-200/50"
      >
        <div className="flex flex-col items-start mb-0 md:mb-6">
          <span className="text-[12px] font-semibold tracking-[0.18em] uppercase text-[#66C7F4] mb-3 block font-sans">FEATURED PROJECTS</span>
          <h2 className="text-[40px] md:text-[56px] lg:text-7xl font-bold tracking-tight text-neutral-900 font-serif leading-[1.05] mt-2 mb-0 md:mb-6">
            Featured<br/>Projects
          </h2>
          <p className="max-w-[90%] md:max-w-[620px] lg:max-w-[580px] text-[16px] md:text-[18px] lg:text-[20px] text-[#5F5F5F] md:text-neutral-900/70 leading-[1.7] md:leading-[1.75] font-sans font-light mt-[20px] mb-0 md:mt-6 md:mb-0">
            Every project represents a unique challenge, combining strategy, creativity, and user-centered design to build digital experiences that matter.
          </p>
        </div>

        {/* Project Grid (3-column on desktop, 2-column on tablet, 1-column on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 mt-[28px] md:mt-8">
          {[
            {
              category: "BRAND IDENTITY",
              title: "JewelMark Branding",
              desc: "Developed a luxury brand identity including logo applications, premium packaging, stationery, social media creatives, and AI-powered promotional content.",
              tags: ["Brand Identity", "Luxury Branding", "AI Video Creation", "Social Media"],
              img: `${import.meta.env.BASE_URL}jewelmark-logo-final.png`,
              imgClass: "object-contain bg-black p-8",
              route: "/projects/jewelmark",
              cta: "View Case Study"
            },
            {
              category: "CREATIVE DESIGN",
              title: "Creative Works",
              desc: "A collection of posters, banners, and flyers designed to communicate clearly, capture attention, and support brand and marketing goals across digital and print platforms.",
              tags: ["Poster Design", "Banner Design", "Flyer Design", "Print & Digital"],
              img: `${import.meta.env.BASE_URL}project-creative.jpg`,
              cta: "View Creative Works"
            },
            {
              category: "Marketing Design",
              title: "Creative Campaigns",
              desc: "Created marketing creatives, brochures, social media assets, promotional materials, and visual campaigns that strengthened brand communication across digital and print platforms.",
              tags: ["Marketing Design", "Branding", "Content Creation", "Visual Storytelling", "Adobe InDesign", "Creative Direction"],
              img: `${import.meta.env.BASE_URL}project-marketing.jpg`
            }
          ].map((project, idx) => (
            <motion.div 
              key={idx}
              onClick={() => {
                if (project.route) {
                  navigateTo(project.route);
                }
              }}
              whileHover={{ 
                y: -10,
                boxShadow: "0 20px 40px -15px rgba(0,0,0,0.12)"
              }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white border border-neutral-300/30 rounded-[24px] md:rounded-[28px] overflow-hidden shadow-sm flex flex-col h-full transition-all duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] group cursor-pointer p-0"
            >
              {/* Image Container with zoom (320px height, top rounded corners) */}
              <div className="overflow-hidden h-auto md:h-[320px] relative bg-neutral-100 rounded-t-[24px] md:rounded-t-[28px] w-full">
                <img 
                  src={project.img} 
                  alt={project.title} 
                  className={`w-full h-full ${project.imgClass || 'object-cover'} group-hover:scale-105 transition-transform duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)]`}
                />
                {/* Subtle Image Overlay on Hover */}
                <div className="absolute inset-0 bg-neutral-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none" />
              </div>

              {/* Project details (32px padding on bottom and sides, flexbox justify-between) */}
              <div className="flex flex-col justify-between flex-1 px-6 pb-6 pt-0 md:px-[32px] md:pb-[32px]">
                <div className="flex flex-col">
                  {/* Category Label */}
                  <span className="text-[13px] uppercase tracking-[0.12em] font-bold text-[#66C7F4] font-sans block leading-none mt-[28px]">
                    {project.category}
                  </span>

                  {/* Project Title */}
                  <h3 className="font-bold text-neutral-900 font-sans text-[28px] md:text-[32px] lg:text-[48px] leading-none h-auto md:h-[64px] lg:h-[96px] overflow-hidden mt-[12px] line-clamp-2">
                    {project.title}
                  </h3>

                  {/* Project Description */}
                  <h4 className="font-sans font-normal text-[17px] text-neutral-900/70 leading-[1.7] h-auto md:h-[110px] lg:h-[116px] overflow-hidden mt-[20px] line-clamp-4">
                    {project.desc}
                  </h4>
                </div>

                <div className="flex flex-col">
                  {/* Tags capsules */}
                  <div className="flex flex-wrap gap-[12px] h-auto md:h-[88px] overflow-hidden mt-[32px]">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="h-[38px] px-[18px] inline-flex items-center justify-center rounded-full text-[15px] font-semibold md:text-[14px] md:font-medium bg-white text-neutral-800 border border-neutral-300/40 font-sans"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Call to Action */}
                  <div className="font-semibold font-sans flex items-center gap-1.5 cursor-pointer text-[#111111] group-hover:text-[#66C7F4] transition-colors duration-300 mt-[28px] text-[16px]">
                    <span>{project.cta || "View Case Study"}</span>
                    <ArrowRight size={16} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="flex justify-center mt-12">
          <div className="cta-group">
            <button onClick={() => scrollToSection('contact')} className="cta-pill">
              View All Projects
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="cta-arrow"
              aria-label="View All Projects Arrow"
            >
              <ArrowRight size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </motion.section>

      {/* SECTION 04: SKILLS (EXPERTISE) */}
      <motion.section 
        id="skills"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="relative w-full main-container flex flex-col z-30 border-t border-neutral-200/50"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[28px] lg:gap-24 items-start">
          {/* Left Column (35% width on desktop) */}
          <div className="col-span-1 md:col-span-4 flex flex-col items-start pt-1">
            <span className="text-[12px] font-semibold tracking-[0.18em] uppercase text-[#66C7F4] mb-3 block font-sans">EXPERTISE</span>
            <h2 className="text-[40px] md:text-[56px] lg:text-[84px] font-bold tracking-[-0.03em] text-neutral-900 leading-[0.9] font-serif max-w-[420px] mt-2 mb-0 md:mb-6">
              More Than<br/>Just Software.
            </h2>
            
            {/* Small description */}
            <p className="max-w-[90%] md:max-w-[420px] text-[16px] md:text-[18px] lg:text-base text-[#5F5F5F] md:text-neutral-500 leading-[1.7] md:leading-[1.75] font-sans font-normal mt-[20px] md:mt-[22px] lg:mt-[28px]">
              Design is more than knowing software. I combine creative thinking, business understanding, and visual communication to transform ideas into meaningful brand experiences. The tools help me create—but strategy, storytelling, and user understanding are what make the work effective.
            </p>
          </div>

          {/* Right Column (65% width on desktop) */}
          <div className="col-span-1 md:col-span-8 flex flex-col pt-0 lg:pt-8 z-10">
            <div className="relative w-full">
              <motion.div 
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.15
                    }
                  }
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 md:grid-cols-2 gap-y-[20px] md:gap-y-12 gap-x-8 md:gap-x-12 relative z-10 mt-[28px] lg:mt-0"
              >
                {[
                  {
                    title: "Brand Strategy",
                    progress: 95,
                    desc: "Aligning visuals with business objectives.",
                    icon: <Palette size={32} strokeWidth={1.5} className="text-[#57B9FF]" />
                  },
                  {
                    title: "User Psychology",
                    progress: 90,
                    desc: "Designing experiences people love to use.",
                    icon: <Layers size={32} strokeWidth={1.5} className="text-[#57B9FF]" />
                  },
                  {
                    title: "Visual Stories",
                    progress: 92,
                    desc: "Communicating value through visual narratives.",
                    icon: <Sparkles size={32} strokeWidth={1.5} className="text-[#57B9FF]" />
                  },
                  {
                    title: "Digital Execution",
                    progress: 88,
                    desc: "Transforming strategy into high-performing products.",
                    icon: <Monitor size={32} strokeWidth={1.5} className="text-[#57B9FF]" />
                  }
                ].map((category, idx) => (
                  <motion.div 
                    key={category.title}
                    variants={{
                      hidden: { opacity: 0, scale: 0.8, y: 30 },
                      visible: { 
                        opacity: 1, 
                        scale: 1, 
                        y: 0,
                        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                      }
                    }}
                    className="flex flex-col items-center"
                  >
                    {/* Hoverable Circle (without auto floating) */}
                    <motion.div 
                      whileHover={{ scale: 1.05, boxShadow: "0 20px 45px rgba(0,0,0,0.06)" }}
                      transition={{
                        scale: { duration: 0.3 },
                        boxShadow: { duration: 0.3 }
                      }}
                      className="w-[160px] h-[160px] md:w-[200px] md:h-[200px] relative bg-white border border-[#EAEAEA] rounded-full flex flex-col items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.015)] group/circle cursor-default z-10"
                    >
                      {/* SVG Progress Ring */}
                      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 200 200">
                        <circle cx="100" cy="100" r="85" fill="transparent" stroke="#EAEAEA" strokeWidth="2.5" />
                        <motion.circle 
                          cx="100" 
                          cy="100" 
                          r="85" 
                          fill="transparent" 
                          stroke="#57B9FF" 
                          strokeWidth="3" 
                          strokeDasharray="534" 
                          initial={{ strokeDashoffset: 534 }}
                          whileInView={{ strokeDashoffset: 534 - (534 * category.progress) / 100 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                          strokeLinecap="round"
                        />
                      </svg>
    
                      {/* Centered Content */}
                      <div className="flex flex-col items-center justify-center text-center z-10 pt-1">
                        {/* Icon Container with slight rotation on hover */}
                        <div className="group-hover/circle:rotate-6 transition-transform duration-500 ease-out h-[36px] flex items-center justify-center">
                          {category.icon}
                        </div>
                        {/* Category Title */}
                        <span className="text-neutral-800 tracking-wider uppercase mt-2 md:mt-3 font-sans text-[12px] md:text-[14px] font-semibold">
                          {category.title}
                        </span>
                        {/* Percentage */}
                        <span className="text-neutral-900 font-bold mt-0.5 md:mt-1 font-sans text-[24px] md:text-[30px] leading-[1.1]">
                          {category.progress}%
                        </span>
                      </div>
                    </motion.div>
    
                    {/* One short capability statement below each circle */}
                    <p className="font-sans font-normal text-center mt-4 md:mt-[24px] max-w-[200px] text-[17px] md:text-[16px] text-[#5F5F5F] md:text-neutral-900/65 leading-[1.7] md:leading-[1.4]">
                      {category.desc}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 07: CONTACT */}
      <motion.section 
        id="contact"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="relative w-full main-container z-30 border-t border-neutral-200/50"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[28px] lg:gap-16 items-center">
          <div className="col-span-1 lg:col-span-7 flex flex-col gap-4 items-start">
            <span className="text-[12px] font-semibold tracking-[0.18em] uppercase text-[#66C7F4] mb-3 block font-sans">GET IN TOUCH</span>
            <h2 className="text-[40px] md:text-[56px] lg:text-7xl font-bold tracking-tight text-neutral-900 leading-[1.05] font-serif mt-2 mb-[20px] md:mb-6">
              Let's Build<br/>Something<br/>Amazing.
            </h2>
            <p className="max-w-[90%] md:max-w-[620px] lg:max-w-lg text-[16px] md:text-[18px] lg:text-lg text-[#5F5F5F] md:text-neutral-500 leading-[1.7] md:leading-[1.75] font-sans font-light mb-0 md:mb-5 lg:mb-0">
              I'm always open to discussing creative projects, freelance opportunities, branding, website design, and innovative digital experiences.
            </p>
            
            {/* Contact Action Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-[20px] mt-[24px] md:mt-9 pointer-events-auto w-full sm:w-auto">
              {/* Email Me Button */}
              <motion.a 
                href="mailto:santhosh.designns@gmail.com"
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-between gap-6 bg-white border border-[rgba(0,0,0,0.08)] rounded-full cursor-pointer px-[26px] select-none text-[17px] md:text-[16px] font-sans font-semibold text-[#111111] w-full sm:w-auto hover:bg-[#5AB8FF] hover:text-white hover:border-[#5AB8FF] transition-all duration-300 group"
                style={{ height: '58px', minWidth: '200px' }}
              >
                <span>Email Me</span>
                <Mail size={18} strokeWidth={2.2} className="text-[#5AB8FF] group-hover:text-white transition-colors duration-300" />
              </motion.a>
            </div>
          </div>

          {/* Contact Information Details */}
          <div className="col-span-1 lg:col-span-5 bg-white border border-neutral-300/30 p-6 md:p-10 rounded-3xl shadow-sm flex flex-col gap-[28px] w-full">
            <h3 className="text-[28px] md:text-2xl font-bold text-neutral-900 font-sans">Contact Details</h3>
            
            <div className="flex flex-col gap-[28px] text-sm">
              {/* Email */}
              <div className="flex items-start gap-4">
                <motion.a
                  href="mailto:santhosh.designns@gmail.com"
                  whileHover={{ y: -2, backgroundColor: "#5AB8FF" }}
                  initial={{ y: 0, backgroundColor: "#F5F7FA" }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="w-[40px] h-[40px] rounded-full border border-[rgba(0,0,0,0.05)] flex items-center justify-center text-[#5AB8FF] hover:text-white shrink-0 cursor-pointer"
                >
                  <Mail size={22} strokeWidth={1.8} />
                </motion.a>
                <div className="flex flex-col gap-0.5">
                  <span className="text-3xs uppercase tracking-wider font-semibold text-neutral-400 font-sans">Email</span>
                  <a href="mailto:santhosh.designns@gmail.com" className="text-neutral-700 hover:text-[#5AB8FF] font-medium transition-colors font-sans">santhosh.designns@gmail.com</a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <motion.a
                  href="tel:+918508455669"
                  whileHover={{ y: -2, backgroundColor: "#5AB8FF" }}
                  initial={{ y: 0, backgroundColor: "#F5F7FA" }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="w-[40px] h-[40px] rounded-full border border-[rgba(0,0,0,0.05)] flex items-center justify-center text-[#5AB8FF] hover:text-white shrink-0 cursor-pointer"
                >
                  <Phone size={22} strokeWidth={1.8} />
                </motion.a>
                <div className="flex flex-col gap-0.5">
                  <span className="text-3xs uppercase tracking-wider font-semibold text-neutral-400 font-sans">Phone</span>
                  <a href="tel:+918508455669" className="text-neutral-700 hover:text-[#5AB8FF] font-medium transition-colors font-sans">+91 8508455669</a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <motion.div
                  whileHover={{ y: -2, backgroundColor: "#5AB8FF" }}
                  initial={{ y: 0, backgroundColor: "#F5F7FA" }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="w-[40px] h-[40px] rounded-full border border-[rgba(0,0,0,0.05)] flex items-center justify-center text-[#5AB8FF] hover:text-white shrink-0 cursor-pointer"
                >
                  <MapPin size={22} strokeWidth={1.8} />
                </motion.div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-3xs uppercase tracking-wider font-semibold text-neutral-400 font-sans">Location</span>
                  <span className="text-neutral-700 font-sans">Pollachi, Tamil Nadu, India</span>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="flex items-start gap-4">
                <motion.a
                  href="https://www.linkedin.com/in/santhoshkumar-kanagaraj-920763265"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2, backgroundColor: "#5AB8FF" }}
                  initial={{ y: 0, backgroundColor: "#F5F7FA" }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="w-[40px] h-[40px] rounded-full border border-[rgba(0,0,0,0.05)] flex items-center justify-center text-[#5AB8FF] hover:text-white shrink-0 cursor-pointer"
                >
                  <Linkedin size={22} strokeWidth={1.8} />
                </motion.a>
                <div className="flex flex-col gap-0.5">
                  <span className="text-3xs uppercase tracking-wider font-semibold text-neutral-400 font-sans">LinkedIn</span>
                  <a 
                    href="https://www.linkedin.com/in/santhoshkumar-kanagaraj-920763265" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Open Santhoshkumar Kanagaraj's LinkedIn profile"
                    className="text-[#111] hover:text-[#5AB8FF] font-semibold transition-colors duration-300 inline-flex items-center gap-1 group/link cursor-pointer relative"
                  >
                    <span>View My LinkedIn</span>
                    <ArrowRight size={14} className="group-hover/link:translate-x-[6px] transition-transform duration-300 text-[#111] group-hover/link:text-[#5AB8FF] transition-colors" />
                  </a>
                </div>
              </div>


            </div>
          </div>
        </div>
      </motion.section>

      {/* FOOTER */}
      <footer className="relative w-full px-5 md:px-10 lg:px-16 py-10 max-w-[1400px] mx-auto z-30 border-t border-neutral-200/30 flex flex-col md:flex-row justify-between items-center gap-5 md:gap-6 text-[15px] md:text-xs font-medium text-neutral-400 select-none text-center">
        <span>Designed & Developed by Santhoshkumar Kanagaraj</span>
        
        {/* Social Links in Footer */}
        <div className="flex items-center justify-center gap-6 pointer-events-auto">
          {/* LinkedIn */}
          <motion.a 
            href="https://www.linkedin.com/in/santhoshkumar-kanagaraj-920763265" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Open Santhoshkumar Kanagaraj's LinkedIn profile"
            whileHover={{ y: -3, color: '#57B9FF' }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-1.5 transition-colors cursor-pointer text-[15px] md:text-xs font-medium text-neutral-400"
          >
            <Linkedin size={16} />
            <span>LinkedIn</span>
          </motion.a>


          
          {/* Email */}
          <motion.a 
            href="mailto:santhosh.designns@gmail.com" 
            whileHover={{ y: -3, color: '#57B9FF' }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-1.5 transition-colors cursor-pointer text-[15px] md:text-xs font-medium text-neutral-400"
          >
            <Mail size={16} />
            <span>Email</span>
          </motion.a>
          
          {/* Resume */}
          <motion.a 
            href={`${import.meta.env.BASE_URL}Santhoshkumar-Kanagaraj-Resume.pdf`}
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
      </>
      )}

    </div>
  );
}
