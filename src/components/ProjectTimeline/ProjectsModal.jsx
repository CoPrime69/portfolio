"use client";

import Link from "next/link";
import React from "react";
import Modal from "../ModalPopUp/Modal";
import ModalProjectCard from "./ModalProjectCard";
import additionalProjects from "./additionalProjects"


const ProjectsModal = ({ isOpen, onClose }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="All Projects"
            maxWidth="max-w-[1300px]"
            maxHeight="max-h-[80vh]"
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                {additionalProjects.map((project, index) => (
                    <ModalProjectCard key={index} project={project} />
                ))}
            </div>
        </Modal>
    );
};

export default ProjectsModal;