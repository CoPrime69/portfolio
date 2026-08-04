"use client";
import { FileText, ExternalLink } from "lucide-react";
import Modal from "../ModalPopUp/Modal";
import resumeTracks, { resolveResumeUrl, isFallback } from "../../data/resumes";
import { oreBlock, oreColor } from "../mc";

/**
 * Four resume variants, one per role track.
 *
 * Tracks without their own hosted PDF fall back to the general resume rather
 * than rendering a dead slot, and say so plainly - a visitor should never
 * click "Cloud / Platform" and silently receive something else.
 */

const ResumePicker = ({ isOpen, onClose }) => (
    <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Choose a Resume"
        maxWidth="max-w-2xl"
    >
        <div className="space-y-4">
            <p className="text-sm text-gray-300">
                Same work, weighted for different roles. Pick whichever matches what you're hiring
                for.
            </p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {resumeTracks.map((track) => {
                    const accent = oreColor(track.ore);
                    const fallback = isFallback(track);

                    return (
                        <a
                            key={track.id}
                            href={resolveResumeUrl(track)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mc-slot mc-lift group flex items-start gap-3 p-4 hover:cursor-pointer"
                        >
                            <div
                                className="mc-bevel flex h-11 w-11 shrink-0 items-center justify-center"
                                style={{ backgroundColor: oreBlock(track.ore, 22) }}
                            >
                                <FileText className="h-5 w-5" style={{ color: accent }} />
                            </div>

                            <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                    <span
                                        className="font-pixel pixel-sm"
                                        style={{ color: accent }}
                                    >
                                        {track.label}
                                    </span>
                                    <ExternalLink className="h-3 w-3 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100" />
                                </div>

                                <p className="mt-1 text-xs leading-snug text-gray-400">
                                    {track.blurb}
                                </p>

                                {fallback && (
                                    <p className="mc-eyebrow mt-2 text-gray-400">
                                        opens general resume
                                    </p>
                                )}
                            </div>
                        </a>
                    );
                })}
            </div>
        </div>
    </Modal>
);

export default ResumePicker;
