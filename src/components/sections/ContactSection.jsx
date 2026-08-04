"use client";
import { Github, Linkedin, Mail } from "lucide-react";
import { contact, profile, sections } from "../../data/site";
import { SectionHeading, BlockPanel, Reveal, oreColor } from "../mc";

/**
 * Bedrock, the floor of the world and the end of the descent.
 * All copy and links come from data/site.js.
 *
 * The section ore is iron now, not diamond - see the note in site.js. The
 * social slots keep their own ores because each one is a different
 * destination, which is the one case where per-item colour earns its place.
 *
 * The footer line moved to a real <footer> in page.js; it was a bare <p>
 * hanging off the end of this section and the document had no landmark for it.
 */

const ICONS = {
    github: Github,
    linkedin: Linkedin,
    email: Mail,
};

const ContactSection = () => (
    <section className="mc-section mc-section-dock">
        <div className="mc-container mc-container-narrow">
            <SectionHeading ore={sections.contact.ore} depth={sections.contact.depth}>
                {contact.heading}
            </SectionHeading>

            <Reveal>
                <BlockPanel glow ore={sections.contact.ore} className="p-7 text-center sm:p-10">
                    <p className="mx-auto max-w-xl text-base leading-relaxed text-gray-200 sm:text-lg">
                        {contact.body}
                    </p>

                    <a
                        href={`mailto:${profile.email}`}
                        className="mc-btn pixel-md mx-auto mt-7 inline-flex items-center gap-2 px-6 py-4 text-white hover:cursor-pointer"
                    >
                        <Mail className="h-4 w-4" />
                        {contact.emailCta}
                    </a>

                    <div className="mt-8 flex justify-center gap-3">
                        {contact.socials.map((s) => {
                            const Icon = ICONS[s.id] ?? Mail;
                            const isMailto = s.href.startsWith("mailto:");
                            return (
                                <a
                                    key={s.id}
                                    href={s.href}
                                    target={isMailto ? undefined : "_blank"}
                                    rel={isMailto ? undefined : "noopener noreferrer"}
                                    className="mc-slot mc-lift flex h-12 w-12 items-center justify-center"
                                    style={{ color: oreColor(s.ore) }}
                                    aria-label={s.label}
                                >
                                    <Icon className="h-5 w-5" />
                                </a>
                            );
                        })}
                    </div>
                </BlockPanel>
            </Reveal>
        </div>
    </section>
);

export default ContactSection;
