"use client";
import { motion } from "framer-motion";
import stats from "../../data/stats";
import { oreColor } from "../mc";

/**
 * The HUD strip you cross on the way underground - a three-second summary
 * before any of the detail sections. Values derive from the data files, so
 * they can't drift when a project or role is added.
 */

const StatsHUD = () => (
    <section className="relative py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                {stats.map((s, i) => (
                    <motion.div
                        key={s.id}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.4, delay: i * 0.07 }}
                        className="mc-panel flex flex-col items-center px-3 py-4 text-center"
                        title={s.detail}
                    >
                        <span
                            className="font-pixel text-xl leading-none sm:text-2xl"
                            style={{ color: oreColor(s.ore) }}
                        >
                            {s.value}
                        </span>
                        <span className="mt-2 text-[10px] uppercase tracking-wider text-gray-300 sm:text-xs">
                            {s.label}
                        </span>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

export default StatsHUD;
