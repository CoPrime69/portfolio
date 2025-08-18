"use client";
import { useEffect, useState } from "react";
import ProjectTimeline from "../ProjectTimeline/ProjectTimeline";
import TargetCursor from "../TargetCursor/TargetCursor";

const ProjectsSection = ({ isActive }) => {
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
        if (isActive && !isMobile) {
            document.body.style.cursor = "none"; // hide system cursor only on desktop
        } else {
            document.body.style.cursor = "auto"; // restore normal cursor
        }

        return () => {
            document.body.style.cursor = "auto"; // cleanup on unmount
        };
    }, [isActive, isMobile]);

    return (
        <section
            className="relative min-h-screen py-12 sm:py-16 md:py-20"
            data-section="projects"
        >
            {/* Target Cursor only for desktop */}
            {isActive && !isMobile && (
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