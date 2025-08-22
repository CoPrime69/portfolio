"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";

const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    maxWidth = "max-w-[1000px]",
    maxHeight = "max-h-[80vh]",
    showHeader = true,
    showCloseButton = true,
    closeOnBackdrop = true,
    className = "",
    headerClassName = "",
    contentClassName = "",
    backdropClassName = "",
    ...props
}) => {
    // Handle body scroll lock and cursor reset
    useEffect(() => {
        if (isOpen) {
            // Lock body scroll
            document.body.style.overflow = 'hidden';
            document.body.style.cursor = 'auto';

            // Set cursor for modal element
            const modalElement = document.querySelector('[data-modal="true"]');
            if (modalElement) {
                modalElement.style.cursor = 'auto';
            }

            // Cleanup function
            return () => {
                document.body.style.overflow = 'unset';
                document.body.style.cursor = '';
            };
        }
    }, [isOpen]);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            return () => document.removeEventListener('keydown', handleEscape);
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (closeOnBackdrop && e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className={`fixed inset-0 bg-black/70 z-[9999] flex items-center justify-center p-2 sm:p-4 ${backdropClassName}`}
            data-modal="true"
            style={{ cursor: 'auto' }}
            onClick={handleBackdropClick}
            {...props}
        >
            <div
                className={`bg-gray-900/95 border border-gray-700 rounded-2xl shadow-2xl w-full will-change-transform contain-layout ${maxWidth} ${maxHeight} overflow-hidden ${className}`}
                onClick={(e) => e.stopPropagation()}
                style={{
                    transform: 'translate3d(0, 0, 0)',
                    backfaceVisibility: 'hidden',
                    perspective: 1000
                }}
            >
                {/* Modal Header */}
                {showHeader && (
                    <div className={`flex items-center justify-between p-4 sm:p-6 border-b border-gray-700 ${headerClassName}`}>
                        {title && (
                            <h2 className="text-xl sm:text-2xl font-bold text-white">
                                {title}
                            </h2>
                        )}

                        {showCloseButton && (
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white cursor-pointer touch-manipulation ml-auto"
                                aria-label="Close modal"
                            >
                                <X size={20} className="sm:w-6 sm:h-6" />
                            </button>
                        )}
                    </div>
                )}

                {/* Modal Content with Optimized Scrollbar */}
                <div
                    className={`overflow-y-auto max-h-[calc(90vh-80px)] sm:max-h-[calc(80vh-100px)] optimized-scrollbar ${contentClassName}`}
                    style={{
                        scrollBehavior: 'auto', // Remove smooth scrolling for better performance
                        willChange: 'scroll-position',
                        transform: 'translate3d(0, 0, 0)' // GPU acceleration
                    }}
                >
                    <div className="p-3 sm:p-6">
                        {children}
                    </div>
                </div>
            </div>

            {/* Optimized Scrollbar Styles */}
            <style jsx>{`
                .optimized-scrollbar {
                    /* Use hardware acceleration */
                    transform: translate3d(0, 0, 0);
                    -webkit-overflow-scrolling: touch;
                }
                
                .optimized-scrollbar::-webkit-scrollbar {
                    width: 6px; /* Reduced width */
                }
                
                .optimized-scrollbar::-webkit-scrollbar-track {
                    background: #374151; /* Solid color instead of rgba */
                    border-radius: 3px;
                }
                
                .optimized-scrollbar::-webkit-scrollbar-thumb {
                    background: #00f5ff; /* Solid color instead of gradient */
                    border-radius: 3px;
                    transition: background-color 0.2s ease; /* Faster transition */
                }
                
                .optimized-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #00ff88; /* Solid color on hover */
                }
                
                /* Firefox - simplified */
                .optimized-scrollbar {
                    scrollbar-width: thin;
                    scrollbar-color: #00f5ff #374151;
                }
                
                /* Performance optimizations */
                .optimized-scrollbar * {
                    will-change: auto; /* Reset will-change for children */
                }
            `}</style>
        </div>
    );
};

export default Modal;