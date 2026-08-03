"use client";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import leadership from "../../data/leadership";
import { sections } from "../../data/site";
import { SectionHeading, MetricChip, oreColor } from "../mc";

/**
 * Advancement toasts.
 *
 * Each entry slides in from the right the way Minecraft's advancement popup
 * does, then stays put - the animation is the point, so it fires once on
 * scroll-into-view rather than looping.
 *
 * `rarity: "challenge"` gets the purple-tinted treatment Minecraft reserves
 * for challenge advancements; "goal" gets the standard gold.
 */

const Toast = ({ item, index }) => {
    const accent = oreColor(item.ore);
    const isChallenge = item.rarity === "challenge";

    return (
        <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: index * 0.12, ease: [0.2, 0.8, 0.2, 1] }}
            className="mc-toast p-4 sm:p-5"
            style={{ borderColor: accent }}
        >
            <div className="flex items-start gap-4">
                {/* Advancement icon block */}
                <div
                    className="mc-bevel flex h-12 w-12 shrink-0 items-center justify-center"
                    style={{ backgroundColor: `color-mix(in srgb, ${accent} 22%, #14141a)` }}
                >
                    <Trophy className="h-5 w-5" style={{ color: accent }} />
                </div>

                <div className="min-w-0 flex-1">
                    <p
                        className="font-pixel text-[10px] uppercase tracking-widest"
                        style={{ color: accent }}
                    >
                        {isChallenge ? "Challenge Complete!" : "Advancement Made!"}
                    </p>
                    <h3 className="mc-title mt-1.5 text-base text-white">{item.achievement}</h3>

                    <p className="mt-2 text-sm text-gray-200">
                        <span className="font-medium text-white">{item.title}</span>
                        <span className="text-gray-400"> · {item.org}</span>
                    </p>
                    <p className="mt-1 text-xs text-gray-400">{item.period}</p>

                    <p className="mt-3 text-sm leading-relaxed text-gray-300">{item.description}</p>

                    {item.metrics.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                            {item.metrics.map((m) => (
                                <MetricChip key={m.label} {...m} ore={item.ore} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

const LeadershipSection = () => (
    <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
                ore={sections.leadership.ore}
                    depth={sections.leadership.depth}
                    sub={sections.leadership.sub}
            >
                Leadership
            </SectionHeading>

            <div className="space-y-5">
                {leadership.map((item, i) => (
                    <Toast key={item.id} item={item} index={i} />
                ))}
            </div>
        </div>
    </section>
);

export default LeadershipSection;
