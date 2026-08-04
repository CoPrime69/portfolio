"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
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
import { profile, contact } from "../data/site";

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
      <div className="mc-eyebrow text-gray-400">{profile.location}</div>
      <div className="font-pixel pixel-sm mt-1">{time}</div>
    </div>
  );
};

export default function Home() {
  const [currentSection, setCurrentSection] = useState("home");
  const [heroDone, setHeroDone] = useState(false);
  const [mountSections, setMountSections] = useState(false);
  // Avatar, hotbar, depth meter and clock all reveal on this one flag.
  const [showChrome, setShowChrome] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [avatarPreloaded, setAvatarPreloaded] = useState(false);

  const prefersReducedMotion = useReducedMotion();

  // Refs for sections
  const homeRef = useRef(null);
  const educationRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);
  const techstackRef = useRef(null);
  const leadershipRef = useRef(null);
  const contactRef = useRef(null);

  const refMap = {
    home: homeRef,
    education: educationRef,
    experience: experienceRef,
    projects: projectsRef,
    techstack: techstackRef,
    leadership: leadershipRef,
    contact: contactRef,
  };

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

  /**
   * THE ACTIVE SECTION IS ALWAYS READ FROM GEOMETRY. NEVER SET OPTIMISTICALLY.
   *
   * Clicking a control starts a scroll and nothing else. The hotbar highlight
   * then travels with the viewport - home, education, experience, projects -
   * the same way it does when you scroll by hand, because it is the same
   * mechanism. The journey is the feedback.
   *
   * This was briefly done the other way: the destination was set the instant
   * you clicked, so the hotbar snapped to Projects and then appeared to walk
   * BACKWARDS through the sections the scroll passed. The target cursor is
   * driven by the same value, so it flicked on, off, then on again. Setting the
   * answer before it is true is what caused both.
   *
   * A corollary worth keeping: the cursor now turns on when Projects genuinely
   * holds the middle of the viewport, not when you press a button that intends
   * to go there.
   */
  const activeRef = useRef("home");

  const applySection = useCallback((id) => {
    if (!id || id === activeRef.current) return;
    activeRef.current = id;
    setCurrentSection(id);
  }, []);

  /**
   * The browser does the scrolling, via `scroll-smooth` on <html> in layout.js.
   *
   * A hand-rolled rAF version was tried here - duration scaled to distance, so
   * a long jump took longer and you saw more of what you passed. It felt worse,
   * not better: `scroll-smooth` turns every programmatic window.scrollTo into
   * its OWN eased animation, so 60 of them a second sat on top of each other,
   * each chasing a target that had already moved. The result was a visible
   * delay between the click and any movement. Native it is.
   */
  const scrollToSection = useCallback(
    (sectionRef) => {
      sectionRef.current?.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    },
    [prefersReducedMotion]
  );

  /**
   * WHICH SECTION AM I IN?
   *
   * This was an IntersectionObserver over a `-40% 0px -40% 0px` band that only
   * ever acted on `entry.isIntersecting === true`, so the answer depended on
   * which entries happened to cross a threshold together and in what order.
   * Scrolling UP out of a tall section could leave `currentSection` stuck on
   * the section below it - which is why the Projects target cursor did not
   * come back when you scrolled up from Tech Stack.
   *
   * Geometry is not ambiguous: the active section is the one containing the
   * middle of the viewport. That is direction-independent, survives jumps from
   * anywhere to anywhere, and gives the same answer no matter how tall the
   * section is or how you arrived in it.
   */
  const readActiveSection = useCallback(() => {
    // Listed explicitly rather than read off `refMap`, which is rebuilt every
    // render - the ref objects themselves are stable, so this closure is safe
    // to create once.
    const entries = [
      ["home", homeRef],
      ["education", educationRef],
      ["experience", experienceRef],
      ["projects", projectsRef],
      ["techstack", techstackRef],
      ["leadership", leadershipRef],
      ["contact", contactRef],
    ];

    const centre = window.innerHeight / 2;
    let containing = null;
    let nearest = null;
    let nearestDistance = Infinity;

    for (const [id, ref] of entries) {
      const el = ref.current;
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.height === 0) continue;

      if (rect.top <= centre && rect.bottom >= centre) {
        containing = id;
        break;
      }

      const distance =
        rect.top > centre ? rect.top - centre : centre - rect.bottom;
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = id;
      }
    }

    // `nearest` covers the gaps: StatsHUD sits between Leadership and Contact
    // and owns no ref, so the centre can legitimately be inside no section.
    return containing ?? nearest;
  }, []);

  useEffect(() => {
    if (!mountSections) return;

    let frame = null;

    const update = () => {
      frame = null;
      applySection(readActiveSection());
    };

    // rAF is the right throttle here: it is exactly one read per painted frame,
    // so the highlight tracks a smooth scroll without doing layout work the
    // screen would never show.
    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [mountSections, readActiveSection, applySection]);

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
   *
   * THIS NUMBER IS COUPLED TO THE HERO'S SCHEDULE. It has to land inside the
   * intro but before the gate opens: too early and it collides with the
   * headline animation, too late and the page becomes scrollable before the
   * sections below it exist. The hero settles around 4.4s (see STAGE in
   * HeroSection.jsx), so 2200ms sits in the quiet middle. If you change the
   * hero's timing, change this with it.
   */
  useEffect(() => {
    if (prefersReducedMotion) {
      setMountSections(true);
      return;
    }
    const t = setTimeout(() => setMountSections(true), 2200);
    return () => clearTimeout(t);
  }, [prefersReducedMotion]);

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
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    }
  }, [heroDone, prefersReducedMotion]);

  // Target cursor belongs to the Projects section only. Now that
  // `currentSection` is derived from geometry it is correct whichever
  // direction you arrive from.
  const targetCursorActive = currentSection === "projects" && !isMobile && heroDone;

  return (
    <div className="relative">
      <a href="#content" className="mc-btn mc-skip-link">
        Skip to content
      </a>

      {/* Hero - the night sky, layout unchanged */}
      <div ref={homeRef} data-section="home" className="relative z-10">
        <HeroSection
          onScrollToProjects={() => scrollToSection(projectsRef)}
          onScrollToContact={() => scrollToSection(contactRef)}
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
      <main id="content">
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

            <footer className="mc-container pb-[var(--dock-clearance)] text-center">
              <p className="text-xs text-gray-400">{contact.footer}</p>
            </footer>
          </>
        )}
      </main>

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
          refs={refMap}
        />
      )}
    </div>
  );
}
