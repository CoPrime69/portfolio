"use client";
import { useState, useEffect } from "react";
import TransparentDock from "../Dock/TransparentDock";
import { VscHome, VscCode, VscPerson, VscMail, VscFile } from "react-icons/vsc";

const NavigationDock = ({ scrollToSection, refs }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const items = [
        {
            icon: <VscHome size={isMobile ? 16 : 18} />,
            label: "About",
            onClick: () => scrollToSection(refs.home, "home")
        },
        {
            icon: <VscPerson size={isMobile ? 16 : 18} />,
            label: "Experience",
            onClick: () => scrollToSection(refs.experience, "experience")
        },
        {
            icon: <VscFile size={isMobile ? 16 : 18} />,
            label: "Resume",
            onClick: () => window.open("https://drive.google.com/file/d/1DFzRiX0pxmD7pn5MZhb7b9T2Ffi6_gRA/view?usp=sharing", "_blank")
        },
        {
            icon: <VscCode size={isMobile ? 16 : 18} />,
            label: "Projects",
            onClick: () => scrollToSection(refs.projects, "projects")
        },
        {
            icon: <VscMail size={isMobile ? 16 : 18} />,
            label: "Contact",
            onClick: () => scrollToSection(refs.contact, "contact")
        }
    ];

    return (
        <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50">
            <TransparentDock
                items={items}
                panelHeight={isMobile ? 56 : 68}
                baseItemSize={isMobile ? 42 : 50}
                magnification={isMobile ? 56 : 70}
                className="hover:cursor-pointer"
            />
        </div>
    );
};

export default NavigationDock;