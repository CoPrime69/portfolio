"use client";
import { MotionConfig } from "framer-motion";

/**
 * One switch for every framer-motion animation on the page.
 *
 * `reducedMotion="user"` makes framer-motion read the OS setting and drop
 * transform and layout animations while keeping opacity fades - so content
 * still arrives, it just stops travelling to get there.
 *
 * This exists as its own client component because layout.js is a server
 * component and MotionConfig needs to run on the client. Everything under it
 * is covered, including motion used inside sections that never opt in.
 */
const MotionProvider = ({ children }) => (
    <MotionConfig reducedMotion="user">{children}</MotionConfig>
);

export default MotionProvider;
