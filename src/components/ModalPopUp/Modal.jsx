"use client";

import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

/**
 * The GUI screen primitive: chest, inventory, resume picker.
 *
 * TWO CLASSES OF PROBLEM THIS FILE USED TO HAVE.
 *
 * 1. ACCESSIBILITY. It announced `aria-modal="true"` while leaving the entire
 *    page behind it in the tab order - measured 28 focusable elements still
 *    reachable - and it never moved focus into the dialog on open. A keyboard
 *    user opened a chest and immediately tabbed out the back of it. There is
 *    now a real focus trap, focus lands on the panel, and it returns to
 *    whatever opened the modal on close.
 *
 * 2. THEME. The panel was `rounded-2xl` with a `rounded-lg` grey close button
 *    and a `border-radius: 3px` scrollbar, in a system whose first rule is
 *    zero border-radius anywhere. Callers were papering over the panel with
 *    `!rounded-none mc-panel`; the close button and scrollbar were not covered
 *    by that and shipped round in every modal. The panel is now .mc-panel by
 *    construction and the close button is a real .mc-slot, so callers no
 *    longer need to pass overrides at all.
 */

const FOCUSABLE =
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

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
    const panelRef = useRef(null);
    const returnFocusRef = useRef(null);

    // Handle body scroll lock and cursor reset
    useEffect(() => {
        if (!isOpen) return;

        // Restore whatever was there before rather than hard-coding 'unset'.
        // Two modals can be open at once (the dock is always reachable), and
        // closing either one used to unlock scrolling while the other was
        // still up. TargetCursor also owns `cursor`, so the same applies.
        const prevOverflow = document.body.style.overflow;
        const prevCursor = document.body.style.cursor;

        document.body.style.overflow = 'hidden';
        document.body.style.cursor = 'auto';

        return () => {
            document.body.style.overflow = prevOverflow;
            document.body.style.cursor = prevCursor;
        };
    }, [isOpen]);

    // Move focus in on open, put it back where it came from on close.
    useEffect(() => {
        if (!isOpen) return;
        returnFocusRef.current =
            document.activeElement instanceof HTMLElement ? document.activeElement : null;

        // The panel itself takes focus rather than the first control, so a
        // screen reader reads the dialog's title before its contents.
        //
        // Called straight from the effect, NOT from requestAnimationFrame: the
        // ref is already attached by the time effects run, and rAF does not
        // fire at all in a backgrounded tab - which would leave a modal open
        // with focus still on the page behind it.
        panelRef.current?.focus();

        return () => {
            returnFocusRef.current?.focus?.();
        };
    }, [isOpen]);

    // Escape to close, Tab to cycle inside the dialog.
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
                return;
            }
            if (e.key !== 'Tab') return;

            const panel = panelRef.current;
            if (!panel) return;

            const focusable = [...panel.querySelectorAll(FOCUSABLE)].filter(
                (el) => el.offsetWidth > 0 || el.offsetHeight > 0
            );
            if (focusable.length === 0) {
                // Nothing to move to - keep focus on the panel rather than
                // letting it escape to the page behind.
                e.preventDefault();
                panel.focus();
                return;
            }

            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            const active = document.activeElement;

            if (e.shiftKey && (active === first || active === panel)) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && active === last) {
                e.preventDefault();
                first.focus();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
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
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-label={typeof title === "string" ? title : undefined}
                tabIndex={-1}
                className={`mc-panel w-full will-change-transform contain-layout ${maxWidth} ${maxHeight} overflow-hidden ${className}`}
                onClick={(e) => e.stopPropagation()}
                style={{
                    transform: 'translate3d(0, 0, 0)',
                    backfaceVisibility: 'hidden',
                    perspective: 1000
                }}
            >
                {/* Modal Header */}
                {showHeader && (
                    <div className={`flex items-center justify-between gap-4 border-b border-white/15 p-4 sm:p-6 ${headerClassName}`}>
                        {title && (
                            <h2 className="mc-title font-pixel pixel-md text-white">
                                {title}
                            </h2>
                        )}

                        {showCloseButton && (
                            <button
                                onClick={onClose}
                                className="mc-slot ml-auto flex h-10 w-10 shrink-0 items-center justify-center text-gray-300 transition-colors hover:text-white cursor-pointer touch-manipulation"
                                aria-label="Close modal"
                            >
                                <X size={18} />
                            </button>
                        )}
                    </div>
                )}

                {/* Modal Content */}
                <div
                    className={`mc-scroll overflow-y-auto max-h-[calc(90vh-80px)] sm:max-h-[calc(80vh-100px)] ${contentClassName}`}
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
        </div>
    );
};

export default Modal;
