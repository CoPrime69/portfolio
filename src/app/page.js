"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HeroSection,
  StatsHUD,
  ExperienceSection,
  ProjectsSection,
  TechStackSection,
  EducationSection,
  LeadershipSection,
  ContactSection,
  NavigationDock,
} from "../components/sections";
import MobileAvatar from "../components/MobileAvatar/MobileAvatar";
import DepthMeter from "../components/Strata/DepthMeter";
import TargetCursor from "../components/TargetCursor/TargetCursor";
import { SKIN_URL } from "../components/MinecraftAvatar/MinecraftAvatar";
import { profile } from "../data/site";

// Time & Location Component
const TimeLocationWidget = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mc-panel px-3 py-2 text-white sm:px-4 sm:py-3">
      <div className="text-[10px] uppercase tracking-wider text-gray-400">{profile.location}</div>
      <div className="font-pixel mt-1 text-sm sm:text-base">{time}</div>
    </div>
  );
};

export default function Home() {
  const [currentSection, setCurrentSection] = useState("home");
  const [heroDone, setHeroDone] = useState(false);
  const [allowScroll, setAllowScroll] = useState(false);
  const [mountSections, setMountSections] = useState(false);
  // Avatar, hotbar, depth meter and clock all reveal on this one flag.
  const [showChrome, setShowChrome] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [avatarPreloaded, setAvatarPreloaded] = useState(false);

  // Refs for sections
  const homeRef = useRef(null);
  const educationRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);
  const techstackRef = useRef(null);
  const leadershipRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Pre-load avatar on component mount
  useEffect(() => {
    const preloadAvatar = async () => {
      try {
        // Pre-load the skinview3d library
        await import("skinview3d");

        // Skin ships from /public now, so this resolves off the local server
        await new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = SKIN_URL;
        });

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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.getAttribute("data-section"));
          }
        });
      },
      { root: null, rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    [
      homeRef, educationRef, experienceRef, projectsRef,
      techstackRef, leadershipRef, contactRef,
    ].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, [allowScroll]);

  /**
   * PERF: mount the below-the-fold sections PART WAY THROUGH the hero rather
   * than all at once when it finishes.
   *
   * They used to be gated on `heroDone`, so seven sections committed in a
   * single synchronous render at the exact moment the avatar's WebGL context
   * was initialising and the hotbar and depth meter appeared. That pile-up is
   * what made the reveal stutter. Mounting them early costs nothing visually
   * (they are off-screen and the page cannot be scrolled yet) and spreads the
   * work across a quiet part of the intro.
   */
  useEffect(() => {
    const t = setTimeout(() => setMountSections(true), 2200);
    return () => clearTimeout(t);
  }, []);

  // The page must not scroll until the hero has finished, now that the
  // sections below it exist before that point.
  useEffect(() => {
    if (heroDone) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [heroDone]);

  // Reset scroll to top on reload + after hero animation
  useEffect(() => {
    if (heroDone) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setAllowScroll(true);
    }
  }, [heroDone]);

  // Target cursor belongs to the Projects section only.
  const targetCursorActive = currentSection === "projects" && !isMobile && heroDone;

  return (
    <div className="relative">
      {/* Hero - the night sky, layout unchanged */}
      <div ref={homeRef} data-section="home" className="relative z-10">
        <HeroSection
          onScrollToProjects={() => scrollToSection(projectsRef, "projects")}
          onScrollToContact={() => scrollToSection(contactRef, "contact")}
          onHeroComplete={() => setHeroDone(true)}
          onChromeReveal={() => setShowChrome(true)}
          avatarPreloaded={avatarPreloaded}
        />
      </div>

      {/* Top Right - Time & Location (non-sticky) */}
      <AnimatePresence>
        {showChrome && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute right-4 top-4 z-40 sm:right-6 sm:top-6"
          >
            <TimeLocationWidget />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Left - Mobile Avatar (sticky) */}
      <AnimatePresence>
        {showChrome && isMobile && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed left-4 top-4 z-50"
          >
            <MobileAvatar />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Descend. Mounted during the hero, not at the end of it (see above). */}
      {mountSections && (
        <>
          {/* Education leads the descent */}
          <div ref={educationRef} data-section="education" className="section-slice">
            <EducationSection />
          </div>

          <div ref={experienceRef} data-section="experience" className="section-slice">
            <ExperienceSection />
          </div>

          <div ref={projectsRef} data-section="projects" className="section-slice">
            <ProjectsSection />
          </div>

          <div ref={techstackRef} data-section="techstack" className="section-slice">
            <TechStackSection />
          </div>

          <div ref={leadershipRef} data-section="leadership" className="section-slice">
            <LeadershipSection />
          </div>

          {/* Summary numbers land at the end, as a wrap-up */}
          <StatsHUD />

          <div ref={contactRef} data-section="contact" className="section-slice">
            <ContactSection />
          </div>
        </>
      )}

      {/* Mounted once so it can cross-fade rather than popping in, but only
          ever visible while the Projects section is the active one. */}
      {!isMobile && showChrome && (
        <TargetCursor
          spinDuration={2.5}
          hideDefaultCursor
          targetSelector=".cursor-target"
          active={targetCursorActive}
        />
      )}

      {/* Depth readout + hotbar */}
      {showChrome && <DepthMeter />}
      {showChrome && (
        <NavigationDock
          scrollToSection={scrollToSection}
          currentSection={currentSection}
          refs={{
            home: homeRef,
            education: educationRef,
            experience: experienceRef,
            projects: projectsRef,
            techstack: techstackRef,
            leadership: leadershipRef,
            contact: contactRef,
          }}
        />
      )}
    </div>
  );
}
