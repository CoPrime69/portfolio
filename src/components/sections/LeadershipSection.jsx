"use client";
import { Trophy } from "lucide-react";
import leadership from "../../data/leadership";
import { sections } from "../../data/site";
import {
    SectionHeading,
    MetricChip,
    Reveal,
    distinctOres,
    oreBlock,
    oreColor,
} from "../mc";

/**
 * Advancement toasts.
 *
 * Each entry slides in from the right the way Minecraft's advancement popup
 * does, then stays put - the animation is the point, so it fires once on
 * scroll-into-view rather than looping.
 *
 * THE OVERFLOW BUG THIS FILE USED TO HAVE: the slide was `initial={{ x: 60 }}`
 * on the toast itself, which is a full-width element. Until each toast had
 * animated in, it sat 60px to the right of its container and widened the
 * document - measured `window.scrollX` reaching 36 at 768px, and a 349px-wide
 * page at a 320px viewport. The travel now happens on an inner wrapper inside
 * an `overflow-hidden` frame, so the toast still enters from the right and the
 * page can no longer be pushed sideways.
 *
 * `rarity: "challenge"` changes the banner wording. It used to promise a
 * purple-tinted treatment as well; purple (amethyst) was deliberately pulled
 * from the palette, so the wording is the whole difference and the comment
 * that claimed otherwise has been corrected rather than the colour restored.
 */

const Toast = ({ item, index, ore }) => {
    const accent = oreColor(ore);
    const isChallenge = item.rarity === "challenge";

    return (
        <div className="overflow-hidden">
            <Reveal
                index={index}
                from={{ opacity: 0, x: 60 }}
                transition={{ duration: 0.45, delay: index * 0.1, ease: [0, 0, 1, 1] }}
                className="mc-toast p-4 sm:p-5"
                style={{ borderColor: accent }}
            >
                <div className="flex items-start gap-4">
                    {/* Advancement icon block */}
                    <div
                        className="mc-bevel flex h-12 w-12 shrink-0 items-center justify-center"
                        style={{ backgroundColor: oreBlock(ore, 22) }}
                    >
                        <Trophy className="h-5 w-5" style={{ color: accent }} />
                    </div>

                    <div className="min-w-0 flex-1">
                        <p className="mc-eyebrow" style={{ color: accent }}>
                            {isChallenge ? "Challenge Complete!" : "Advancement Made!"}
                        </p>
                        <h3 className="mc-title font-pixel pixel-md mt-1.5 text-white">
                            {item.achievement}
                        </h3>

                        <p className="mt-2 text-sm text-gray-200">
                            <span className="font-medium text-white">{item.title}</span>
                            <span className="text-gray-400"> · {item.org}</span>
                        </p>
                        <p className="mt-1 text-xs text-gray-400">{item.period}</p>

                        <p className="mt-3 text-sm leading-relaxed text-gray-300">
                            {item.description}
                        </p>

                        {item.metrics.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2">
                                {item.metrics.map((m) => (
                                    <MetricChip key={m.label} {...m} ore={ore} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </Reveal>
        </div>
    );
};

const LeadershipSection = () => {
    // One colour per advancement, guaranteed distinct - see distinctOres().
    const ores = distinctOres(leadership);

    return (
        <section className="mc-section">
            <div className="mc-container mc-container-narrow">
                <SectionHeading
                    ore={sections.leadership.ore}
                    depth={sections.leadership.depth}
                    sub={sections.leadership.sub}
                >
                    Leadership
                </SectionHeading>

                <div className="space-y-5">
                    {leadership.map((item, i) => (
                        <Toast key={item.id} item={item} index={i} ore={ores[i]} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LeadershipSection;
