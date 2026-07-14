import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Mail, Linkedin, Download, ExternalLink } from 'lucide-react';

export default function JewelMarkCaseStudy({ navigateTo }) {
  const sectionVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F5F5F5] text-[#111111] overflow-x-hidden selection:bg-[#66C7F4]/30 selection:text-[#111111] pt-[92px] md:pt-[120px]">
      
      {/* CASE STUDY HEADER & NAVIGATION */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="w-full max-w-[1400px] mx-auto px-5 md:px-10 lg:px-16 pt-8 pb-12"
      >
        <div className="mb-10 md:mb-14 pointer-events-auto">
          <button 
            onClick={() => navigateTo('/', 'projects')}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 hover:text-[#66C7F4] transition-colors duration-300 font-sans cursor-pointer"
          >
            <ArrowLeft size={16} /> Back to Projects
          </button>
        </div>

        {/* 1. HERO SECTION (2-Column Grid on Desktop/Tablet) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center w-full">
          {/* LEFT SIDE: Hero text content */}
          <div className="md:col-span-7 flex flex-col items-start text-left">
            <span className="text-[12px] font-semibold tracking-[0.18em] uppercase text-[#66C7F4] mb-3 block font-sans">
              BRAND IDENTITY
            </span>
            <h1 className="text-[42px] md:text-[52px] lg:text-[64px] font-bold tracking-tight text-neutral-900 leading-[1.05] mb-6">
              JewelMark Branding
            </h1>
            <p className="text-[16px] md:text-[17px] lg:text-[18px] text-[#5F5F5F] leading-[1.65] font-normal mb-8 max-w-2xl">
              A jewellery brand identity developed to create a distinctive, memorable, and consistent presence across digital and physical touchpoints.
            </p>

            {/* Mobile logo position - hidden on desktop/tablet, centered on mobile */}
            <div className="block md:hidden w-full my-6 text-center">
              <div className="max-w-[75%] mx-auto flex items-center justify-center">
                <img 
                  src={`${import.meta.env.BASE_URL}jewelmark-logo-hero.png`} 
                  alt="JewelMark Logo" 
                  className="w-full h-auto object-contain max-h-[160px]"
                />
              </div>
            </div>
            
            <a 
              href="https://jewelmark.in/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#66C7F4] hover:text-neutral-950 transition-colors font-sans"
            >
              Visit Website <ExternalLink size={14} />
            </a>
          </div>

          {/* RIGHT SIDE: Centered high-res logo - hidden on mobile, shown from tablet up */}
          <div className="hidden md:flex md:col-span-5 items-center justify-center p-4 bg-transparent">
            <img 
              src={`${import.meta.env.BASE_URL}jewelmark-logo-hero.png`} 
              alt="JewelMark Official Logo" 
              className="w-full h-auto object-contain max-h-[280px]"
            />
          </div>
        </div>
      </motion.section>

      {/* 3. PROJECT OVERVIEW */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="w-full max-w-[1400px] mx-auto px-5 md:px-10 lg:px-16 py-12 md:py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 border-t border-neutral-300/20 pt-12">
          <div className="col-span-1 md:col-span-4">
            <span className="text-[12px] font-semibold tracking-[0.18em] uppercase text-[#66C7F4] mb-3 block font-sans">
              PROJECT OVERVIEW
            </span>
            <h2 className="text-[34px] md:text-[42px] lg:text-[52px] font-bold tracking-tight text-neutral-900 leading-[1.1]">
              The Context.
            </h2>
          </div>
          <div className="col-span-1 md:col-span-8 flex flex-col gap-6 text-[16px] md:text-[17px] lg:text-[18px] text-[#5F5F5F] leading-[1.7] font-normal">
            <p>
              **The Brand:** JewelMark provides visual AI photography, virtual store experiences, and digital gold scheme campaigns specifically tailored for legacy jewelry manufacturers and retail stores.
            </p>
            <p>
              **The Need:** Traditional jewelry brands have deep customer trust but suffer from visual fragmentation, uncoordinated visual updates, and high content creation costs. Clear, cohesive brand presentation across print and digital media is required to communicate their craftsmanship to modern consumers.
            </p>
            <p>
              **My Contribution:** My work focused on visual communication layout, graphic design templates, social media post components, and conceptual AI video layouts supporting JewelMark's brand presentation.
            </p>
          </div>
        </div>
      </motion.section>

      {/* LOGO EVOLUTION SECTION */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="w-full max-w-[1400px] mx-auto px-5 md:px-10 lg:px-16 py-16 md:py-24 border-t border-neutral-300/20"
      >
        <span className="text-[12px] font-semibold tracking-[0.18em] uppercase text-[#66C7F4] mb-3 block font-sans">
          LOGO EVOLUTION
        </span>
        <h2 className="text-[34px] md:text-[42px] lg:text-[52px] font-bold tracking-tight text-neutral-900 leading-[1.1] mb-6">
          From First Sketch<br />to Final Mark.
        </h2>
        <p className="text-[16px] md:text-[17px] lg:text-[18px] text-[#5F5F5F] leading-[1.65] font-normal max-w-2xl mb-16">
          The JewelMark identity began as a hand-drawn idea, combining the initials “J” and “M” with a rising form to represent growth and progress. The concept was then simplified, refined, and developed into a cleaner visual identity for the final brand.
        </p>

        {/* 3-Stage Visual Process */}
        <div className="relative w-full">
          {/* Horizontal Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-[292px] left-[15%] right-[15%] h-[1px] bg-neutral-300/40 z-0" />
          
          {/* Vertical Connecting Line for Mobile */}
          <div className="block lg:hidden absolute top-[130px] bottom-[130px] left-1/2 -translate-x-1/2 w-[1px] bg-neutral-300/40 z-0" />

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
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-8 relative z-10"
          >
            {[
              {
                num: "01",
                label: "INITIAL SKETCH",
                img: `${import.meta.env.BASE_URL}logo-evolution-1.png`,
                desc: "The original idea explored the JewelMark initials, jewellery symbolism, and an upward movement representing growth."
              },
              {
                num: "02",
                label: "DIGITAL REFINEMENT",
                img: `${import.meta.env.BASE_URL}logo-evolution-2.png`,
                desc: "The concept was simplified into a cleaner digital form, improving structure, balance, and visual clarity."
              },
              {
                num: "03",
                label: "FINAL IDENTITY",
                img: `${import.meta.env.BASE_URL}logo-evolution-3.jpg`,
                desc: "The final identity refined the concept into a premium, modern jewellery brand mark, balancing elegance, simplicity, and strong brand recognition across digital and print applications."
              }
            ].map((stage) => (
              <motion.div 
                key={stage.num}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
                  }
                }}
                className="flex flex-col items-center text-center h-full relative"
              >
                {/* Image Card */}
                <div className={`h-[260px] w-full max-w-sm bg-white border border-neutral-200/50 rounded-[20px] p-8 flex items-center justify-center overflow-hidden z-10 ${stage.num === '03' ? '' : 'shadow-sm'}`}>
                  <img 
                    src={stage.img} 
                    alt={stage.label} 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                
                {/* Details */}
                <div className="pt-8 flex flex-col items-center bg-transparent z-10">
                  <span className="text-[18px] lg:text-[20px] font-bold text-[#66C7F4] bg-[#F5F5F5] px-4">
                    {stage.num}
                  </span>
                  <span className="text-[11px] lg:text-[12px] font-bold tracking-widest uppercase text-neutral-800 font-sans mt-2 bg-[#F5F5F5] px-2">
                    {stage.label}
                  </span>
                  <p className="text-[14px] lg:text-[15px] text-[#5F5F5F] font-sans leading-relaxed mt-2 max-w-sm bg-[#F5F5F5] px-2">
                    {stage.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* 5. MY CONTRIBUTION */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="w-full max-w-[1400px] mx-auto px-5 md:px-10 lg:px-16 py-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 border-t border-neutral-300/20 pt-12">
          <div className="col-span-1 md:col-span-4">
            <span className="text-[12px] font-semibold tracking-[0.18em] uppercase text-[#66C7F4] mb-3 block font-sans">
              MY CONTRIBUTION
            </span>
            <h2 className="text-[34px] md:text-[42px] lg:text-[52px] font-bold tracking-tight text-neutral-900 leading-[1.1]">
              Areas of Focus.
            </h2>
          </div>
          <div className="col-span-1 md:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Brand Communication",
                "Graphic Design",
                "Marketing Creatives",
                "AI Video Production",
                "Visual Storytelling"
              ].map((area, idx) => (
                <div key={idx} className="flex items-center gap-3 border border-neutral-300/20 bg-white px-5 py-4 rounded-[16px] shadow-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#66C7F4]" />
                  <span className="text-sm font-semibold text-neutral-800 font-sans">{area}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* 6. FINAL CTA & NEXT PROJECT */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        className="w-full border-t border-neutral-300/20 mt-16 bg-neutral-900 text-white"
      >
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-16 py-16 md:py-24 flex flex-col items-center justify-center text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#66C7F4] mb-4 font-sans">
            EXPLORE JEWELMARK
          </span>
          <h2 className="text-[34px] md:text-[42px] lg:text-[52px] font-semibold mb-8 text-white">
            Ready to build your legacy?
          </h2>
          <a 
            href="https://jewelmark.in/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#66C7F4] text-neutral-950 rounded-full font-bold tracking-widest uppercase text-xs hover:bg-[#66C7F4]/90 hover:scale-[1.02] transition-all shadow-lg"
          >
            Visit Official Website <ExternalLink size={14} />
          </a>
        </div>

        {/* Next Project Link */}
        <button 
          onClick={() => navigateTo('/', 'projects')}
          className="w-full border-t border-white/10 flex flex-col items-center justify-center text-center py-16 hover:bg-white/5 transition-colors duration-300 cursor-pointer group"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-sans font-bold mb-2">NEXT PROJECT</span>
          <h3 className="text-[22px] md:text-[24px] lg:text-[28px] font-semibold text-white tracking-wide group-hover:translate-x-1.5 transition-transform duration-300 inline-flex items-center gap-2">
            Company Website Design <ArrowRight className="text-[#66C7F4]" size={20} />
          </h3>
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

    </div>
  );
}
