"use client";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { contact, profile, sections } from "../../data/site";
import { SectionHeading, BlockPanel, oreColor } from "../mc";

/**
 * Bedrock, the floor of the world and the end of the descent.
 * All copy and links come from data/site.js.
 */

const ICONS = {
    github: Github,
    linkedin: Linkedin,
    email: Mail,
};

const ContactSection = () => (
    <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <SectionHeading ore={sections.contact.ore} depth={sections.contact.depth}>
                {contact.heading}
            </SectionHeading>

            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45 }}
            >
                <BlockPanel glow ore={sections.contact.ore} className="p-7 text-center sm:p-10">
                    <p className="mx-auto max-w-xl text-base leading-relaxed text-gray-200 sm:text-lg">
                        {contact.body}
                    </p>

                    <a
                        href={`mailto:${profile.email}`}
                        className="mc-btn mx-auto mt-7 inline-flex items-center gap-2 px-6 py-4 text-sm text-white hover:cursor-pointer sm:text-base"
                    >
                        <Mail className="h-4 w-4" />
                        {contact.emailCta}
                    </a>

                    <div className="mt-8 flex justify-center gap-3">
                        {contact.socials.map((s, i) => {
                            const Icon = ICONS[s.id] ?? Mail;
                            const isMailto = s.href.startsWith("mailto:");
                            return (
                                <motion.a
                                    key={s.id}
                                    href={s.href}
                                    target={isMailto ? undefined : "_blank"}
                                    rel={isMailto ? undefined : "noopener noreferrer"}
                                    initial={{ opacity: 0, y: 14 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.35, delay: i * 0.08 }}
                                    whileHover={{ y: -3 }}
                                    className="mc-slot flex h-12 w-12 items-center justify-center transition-colors"
                                    style={{ color: oreColor(s.ore) }}
                                    aria-label={s.label}
                                >
                                    <Icon className="h-5 w-5" />
                                </motion.a>
                            );
                        })}
                    </div>
                </BlockPanel>
            </motion.div>

            <p className="mt-10 text-center text-xs text-gray-400">{contact.footer}</p>
        </div>
    </section>
);

export default ContactSection;
