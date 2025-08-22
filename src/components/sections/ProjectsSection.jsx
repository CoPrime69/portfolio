"use client";
import { useEffect, useState } from "react";
import ProjectTimeline from "../ProjectTimeline/ProjectTimeline";
import TargetCursor from "../TargetCursor/TargetCursor";

const ProjectsSection = ({ isActive, isActiveTargetCursor }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <section
            className="relative min-h-screen py-12 sm:py-16 md:py-20"
            data-section="projects"
        >
            {/* Target Cursor - appears at current cursor position without relocation */}
            {isActiveTargetCursor && (
                <TargetCursor
                    spinDuration={2.5}
                    hideDefaultCursor={true}
                    targetSelector=".cursor-target"
                />
            )}

            <ProjectTimeline />
        </section>
    );
};

export default ProjectsSection;