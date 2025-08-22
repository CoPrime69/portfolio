"use client";
import { useState, useEffect, useRef } from "react";
import {
  HeroSection,
  ProjectsSection,
  ExperienceSection,
  ContactSection,
  NavigationDock,
} from "../components/sections";
import { motion, AnimatePresence } from "framer-motion";
import MobileAvatar from "../components/MobileAvatar/MobileAvatar";

// Time & Location Component
const TimeLocationWidget = () => {
  const [time, setTime] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      setTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`bg-white/10 backdrop-blur-lg rounded-lg p-3 sm:p-4 text-white shadow-lg ${isMobile ? 'text-sm' : ''}`} style={{ fontWeight: 300 }}>
      <div className="text-sm sm:text-md opacity-80 mb-1">Jodhpur, India</div>
      <div className="text-base sm:text-lg" style={{ fontWeight: 300 }}>
        {time}
      </div>
    </div>
  );
};

export default function Home() {
  const [currentSection, setCurrentSection] = useState("home");
  const [heroDone, setHeroDone] = useState(false);
  const [allowScroll, setAllowScroll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [avatarPreloaded, setAvatarPreloaded] = useState(false);
  const [isActiveTargetCursor, setIsActiveTargetCursor] = useState(false);

  // Refs for sections
  const homeRef = useRef(null);
  const projectsRef = useRef(null);
  const experienceRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Pre-load avatar on component mount
  useEffect(() => {
    const preloadAvatar = async () => {
      try {
        // Pre-load the skinview3d library
        await import("skinview3d");

        // Pre-load skin and cape images
        const skinPromise = new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = "https://crafatar.com/skins/aaf71728-7390-4175-bd18-9c36cd4697fc";
        });

        const capePromise = new Promise((resolve) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve; // Don't fail if cape doesn't exist
          img.src = "https://crafatar.com/capes/b876ec32-e396-476b-a115-8438d83c67d4";
        });

        await Promise.all([skinPromise, capePromise]);
        setAvatarPreloaded(true);
      } catch (error) {
        console.warn("Avatar preload failed:", error);
        setAvatarPreloaded(true); // Set to true anyway to prevent blocking
      }
    };

    preloadAvatar();
  }, []);

  const scrollToSection = (sectionRef, sectionName) => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    setCurrentSection(sectionName);
  };

  // Intersection observer for current section tracking
  useEffect(() => {
    if (!allowScroll) return;

    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute("data-section");
          setCurrentSection(sectionId);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = [homeRef, projectsRef, experienceRef, contactRef];
    sections.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, [allowScroll]);

  // Reset scroll to top on reload + after hero animation
  useEffect(() => {
    if (heroDone) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setAllowScroll(true);
    }
  }, [heroDone]);

  // Centralized cursor and body class management
  useEffect(() => {
    // Determine if target cursor should be active
    const shouldUseTargetCursor = currentSection === "projects" && !isMobile && heroDone;
    setIsActiveTargetCursor(shouldUseTargetCursor);

    // Toggle special body class for projects section
    if (currentSection === "projects") {
      document.body.classList.add("projects-section");
    } else {
      document.body.classList.remove("projects-section");
    }

    // Cleanup function
    return () => {
      document.body.classList.remove("projects-section");
    };
  }, [currentSection, isMobile, heroDone]);

  return (
    <div className="relative">
      {/* Hero Section */}
      <div ref={homeRef} data-section="home" className="relative z-10">
        <HeroSection
          onScrollToProjects={() => scrollToSection(projectsRef, "projects")}
          onScrollToContact={() => scrollToSection(contactRef, "contact")}
          onHeroComplete={() => setHeroDone(true)}
          avatarPreloaded={avatarPreloaded}
        />
      </div>

      {/* Top Right - Time & Location (non-sticky) */}
      <AnimatePresence>
        {heroDone && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute top-4 sm:top-6 right-4 sm:right-6 z-40"
            style={{ fontWeight: 300 }}
          >
            <TimeLocationWidget />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Left - Mobile Avatar (sticky) */}
      <AnimatePresence>
        {heroDone && isMobile && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.8 }}
            className="fixed top-4 left-4 z-50"
          >
            <MobileAvatar />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Render other sections ONLY after hero is done */}
      {allowScroll && (
        <>
          {/* Experience Section */}
          <div ref={experienceRef} data-section="experience">
            <ExperienceSection />
          </div>

          {/* Projects Section */}
          <div ref={projectsRef} data-section="projects">
            <ProjectsSection
              isActive={currentSection === "projects"}
              isActiveTargetCursor={isActiveTargetCursor}
            />
          </div>

          {/* Contact Section */}
          <div ref={contactRef} data-section="contact">
            <ContactSection />
          </div>
        </>
      )}

      {/* Navigation Dock */}
      <AnimatePresence>
        {heroDone && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50"
          >
            <NavigationDock
              scrollToSection={scrollToSection}
              refs={{
                home: homeRef,
                projects: projectsRef,
                experience: experienceRef,
                contact: contactRef,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}