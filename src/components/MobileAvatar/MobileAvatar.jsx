"use client";
import { motion } from "framer-motion";
import { SKIN_URL, MINECRAFT_USERNAME } from "../MinecraftAvatar/MinecraftAvatar";

/**
 * Head crop taken straight out of the 64x64 skin sheet, no network round-trip.
 *
 * Minecraft skin UV layout: the head's front face lives at (8,8)-(16,16) and the
 * "hat" overlay layer at (40,8)-(48,16). Scaling the whole 64px sheet by SCALE
 * and offsetting by the face origin * SCALE crops the face; `image-rendering:
 * pixelated` keeps the 8x8 grid crisp instead of smearing it.
 */
const SCALE = 8;
const SHEET = 64 * SCALE;

const layer = (x, y) => ({
    backgroundImage: `url(${SKIN_URL})`,
    backgroundSize: `${SHEET}px ${SHEET}px`,
    backgroundPosition: `-${x * SCALE}px -${y * SCALE}px`,
    imageRendering: "pixelated",
});

const MobileAvatar = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mc-bevel relative h-16 w-16 overflow-hidden"
            title={MINECRAFT_USERNAME}
            aria-label={`${MINECRAFT_USERNAME} avatar`}
        >
            {/* base head layer */}
            <div className="absolute inset-0" style={layer(8, 8)} />
            {/* hat / accessory overlay layer */}
            <div className="absolute inset-0" style={layer(40, 8)} />
        </motion.div>
    );
};

export default MobileAvatar;
