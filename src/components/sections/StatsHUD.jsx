"use client";
import stats from "../../data/stats";
import { Reveal, oreColor } from "../mc";

/**
 * The HUD strip you cross on the way underground - a three-second summary
 * before any of the detail sections. Values derive from the data files, so
 * they can't drift when a project or role is added.
 *
 * Half a section's vertical measure rather than an arbitrary py-14: this is a
 * strip between two sections, not a section of its own.
 */

const StatsHUD = () => (
    <section className="relative py-[calc(var(--mc-section-y)/2)] sm:py-[calc(var(--mc-section-y-lg)/2)]">
        <div className="mc-container">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                {stats.map((s, i) => (
                    <Reveal
                        key={s.id}
                        index={i}
                        offset={16}
                        className="mc-panel flex flex-col items-center px-3 py-4 text-center"
                        title={s.detail}
                    >
                        <span
                            className="font-pixel pixel-lg leading-none"
                            style={{ color: oreColor(s.ore) }}
                        >
                            {s.value}
                        </span>
                        <span className="mc-eyebrow mt-2 text-gray-300">{s.label}</span>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
);

export default StatsHUD;
