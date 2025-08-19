"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BlurText from "../BlurText/BlurText";
import RotatingText from "../RotatingText/RotatingText";
import MinecraftAvatar from "../MinecraftAvatar/MinecraftAvatar";

// Smooth easing function for all animations
const smoothEasing = [0.25, 0.1, 0.25, 1];

const HeroSection = ({ onScrollToProjects, onScrollToContact, onHeroComplete, avatarPreloaded = false }) => {
    const [showSkillsText, setShowSkillsText] = useState(false);
    const [startRotation, setStartRotation] = useState(false);
    const [rotCounter, setRotCounter] = useState(0);
    const [showContent, setShowContent] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [allContentReady, setAllContentReady] = useState(false);

    // Desktop states
    const [slideLeft, setSlideLeft] = useState(false);
    const [showAvatar, setShowAvatar] = useState(false);

    const pillClass =
        "h-8 sm:h-10 flex items-center justify-center px-3 backdrop-blur-sm border border-white/20 bg-gradient-to-r from-[#0891b2] to-[#1d4ed8] text-white rounded-xl font-semibold text-lg sm:text-xl shadow-lg hover:shadow-xl transition-all duration-300";

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleMainAnimationComplete = () => {
        setShowSkillsText(true);
    };

    const handleSkillsTextAnimationComplete = () => {
        setStartRotation(true);
        setTimeout(() => {
            setShowContent(true);
            setTimeout(() => {
                setAllContentReady(true);

                if (!isMobile) {
                    // Desktop behavior - slide everything and show avatar
                    setTimeout(() => {
                        setSlideLeft(true);
                        setTimeout(() => {
                            setShowAvatar(true);
                            setTimeout(() => {
                                onHeroComplete?.();
                            }, 800);
                        }, 1200); // Wait for slide to complete
                    }, 1000);
                } else {
                    // Mobile behavior
                    setTimeout(() => {
                        onHeroComplete?.();
                    }, 2000);
                }
            }, 500);
        }, 800);
    };

    useEffect(() => {
        if (startRotation && rotCounter === 0) {
            const timer = setTimeout(() => setRotCounter(1), 500);
            return () => clearTimeout(timer);
        }
    }, [startRotation, rotCounter]);

    return (
        <section className="relative h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="flex items-center justify-center w-full max-w-7xl md:gap-x-6">
                {/* Single container for all content that moves together */}
                <motion.div
                    className="flex items-center justify-center w-full"
                    animate={!isMobile && slideLeft ? { x: "-20%" } : { x: 0 }}
                    transition={{
                        duration: 1.2,
                        ease: "easeOut",
                    }}
                >
                    {/* Text content - no individual animations after ready */}
                    <div className="text-center max-w-3xl">
                        {/* Main heading */}
                        <BlurText
                            text="Hey there, I am Prakhar pursuing B.Tech in AI & DS from IIT Jodhpur!"
                            delay={150}
                            animateBy="words"
                            direction="top"
                            onAnimationComplete={handleMainAnimationComplete}
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight max-w-4xl mx-auto mb-4 sm:mb-6"
                        />

                        {/* Skills text */}
                        <AnimatePresence mode="wait">
                            {showSkillsText && (
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.8, ease: smoothEasing }}
                                    className="flex flex-col sm:flex-row items-center justify-center gap-2 text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 font-medium mb-4 sm:mb-6"
                                    onAnimationComplete={handleSkillsTextAnimationComplete}
                                >
                                    <span>I work with</span>
                                    {!startRotation ? (
                                        <div className={pillClass}>React</div>
                                    ) : (
                                        <div className={pillClass}>
                                            <RotatingText
                                                texts={[
                                                    "React",
                                                    "Next.js",
                                                    "TypeScript",
                                                    "Python",
                                                    "AI/ML",
                                                    "Node.js",
                                                ]}
                                                mainClassName="flex items-center justify-center"
                                                initial={{ y: "100%" }}
                                                animate={{ y: 0 }}
                                                exit={{ y: "-120%" }}
                                                staggerDuration={0.025}
                                                splitLevelClassName="overflow-hidden"
                                                transition={{
                                                    duration: 0.3,
                                                    ease: "easeInOut",
                                                }}
                                                rotationInterval={rotCounter === 0 ? 500 : 1500}
                                            />
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Content */}
                        <AnimatePresence>
                            {showContent && (
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 40 }}
                                    transition={{ duration: 0.8, ease: smoothEasing }}
                                    className="space-y-4 sm:space-y-6"
                                >
                                    <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed px-2">
                                        Full-stack developer passionate about creating innovative
                                        solutions with modern web technologies and AI
                                    </p>

                                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            transition={{ duration: 0.2, ease: "easeOut" }}
                                            onClick={onScrollToProjects}
                                            className="hover:cursor-pointer px-6 sm:px-8 py-3 bg-gradient-to-r from-[#00f5ff] to-[#ff006e] text-white rounded-lg font-semibold hover:shadow-xl transition-all w-full sm:w-auto text-sm sm:text-base"
                                        >
                                            View Projects
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            transition={{ duration: 0.2, ease: "easeOut" }}
                                            onClick={onScrollToContact}
                                            className="hover:cursor-pointer px-6 sm:px-8 py-3 border-2 border-[#00f5ff] text-[#00f5ff] rounded-lg font-semibold hover:bg-[#00f5ff]/10 transition-all w-full sm:w-auto text-sm sm:text-base"
                                        >
                                            Get In Touch
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Desktop avatar - appears separately but doesn't move with text */}
                <AnimatePresence>
                    {!isMobile && showAvatar && avatarPreloaded && (
                        <motion.div
                            initial={{ opacity: 0, x: 100, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 100 }}
                            transition={{
                                duration: 0.5,
                                ease: "easeOut"
                            }}
                            className="hidden md:block absolute top-1/2 -translate-y-1/2 
+              right-[8%] lg:right-[12%] xl:right-[15%]"
                        // style={{
                        //     right: "15%",
                        // top: "50%",
                        // transform: "translateY(-50%)"
                        // }}
                        >
                            <MinecraftAvatar preloaded={true} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default HeroSection;