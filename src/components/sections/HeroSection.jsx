"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BlurText from "../BlurText/BlurText";
import RotatingText from "../RotatingText/RotatingText";
import MinecraftAvatar from "../MinecraftAvatar/MinecraftAvatar";

const HeroSection = ({ onScrollToProjects, onScrollToContact, onHeroComplete }) => {
    const [showSkillsText, setShowSkillsText] = useState(false);
    const [startRotation, setStartRotation] = useState(false);
    const [rotCounter, setRotCounter] = useState(0);
    const [showContent, setShowContent] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

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

            if (!isMobile) {
                // Desktop behavior - slide and show avatar
                setTimeout(() => {
                    setSlideLeft(true);
                    setTimeout(() => {
                        setShowAvatar(true);
                        setTimeout(() => {
                            onHeroComplete?.();
                        }, 1000);
                    }, 600);
                }, 1500);
            } else {
                // Mobile behavior - same timing without slide/avatar
                setTimeout(() => {
                    // Wait same total time as desktop (1500 + 600 + 1000 = 3100ms)
                    setTimeout(() => {
                        onHeroComplete?.();
                    }, 3100);
                }, 0);
            }
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
                {/* Text content */}
                <motion.div
                    className="text-center max-w-3xl"
                    animate={!isMobile && slideLeft ? { x: "-15%", opacity: 0.95 } : { x: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 70,
                        damping: 20,
                    }}
                >
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
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="flex flex-col sm:flex-row items-center justify-center gap-2 text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 font-medium mb-4 sm:mb-6"
                                onAnimationComplete={handleSkillsTextAnimationComplete}
                            >
                                <span>I work with</span>
                                {!startRotation ? (
                                    <div className={pillClass}>React</div>
                                ) : (
                                    <RotatingText
                                        texts={[
                                            "React",
                                            "Next.js",
                                            "TypeScript",
                                            "Python",
                                            "AI/ML",
                                            "Node.js",
                                        ]}
                                        mainClassName={pillClass}
                                        initial={{ y: "100%" }}
                                        animate={{ y: 0 }}
                                        exit={{ y: "-120%" }}
                                        staggerDuration={0.025}
                                        splitLevelClassName="overflow-hidden"
                                        transition={{
                                            type: "spring",
                                            damping: 30,
                                            stiffness: 400,
                                        }}
                                        rotationInterval={rotCounter === 0 ? 500 : 1500}
                                    />
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
                                transition={{ duration: 0.8, ease: "easeOut" }}
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
                                        onClick={onScrollToProjects}
                                        className="hover:cursor-pointer px-6 sm:px-8 py-3 bg-gradient-to-r from-[#00f5ff] to-[#ff006e] text-white rounded-lg font-semibold hover:shadow-xl transition-all w-full sm:w-auto text-sm sm:text-base"
                                    >
                                        View Projects
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={onScrollToContact}
                                        className="hover:cursor-pointer px-6 sm:px-8 py-3 border-2 border-[#00f5ff] text-[#00f5ff] rounded-lg font-semibold hover:bg-[#00f5ff]/10 transition-all w-full sm:w-auto text-sm sm:text-base"
                                    >
                                        Get In Touch
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Desktop avatar */}
                <AnimatePresence>
                    {!isMobile && showAvatar && (
                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 100 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="hidden md:block"
                        >
                            <MinecraftAvatar />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default HeroSection;