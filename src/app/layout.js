import StrataDotGrid from "../components/Strata/StrataDotGrid";
import StrataBackdrop from "../components/Strata/StrataBackdrop";
import MotionProvider from "../components/MotionProvider";
import { Funnel_Display } from "next/font/google";
import "./globals.css";
import { meta as siteMeta } from "../data/site";
import "@south-paw/typeface-minecraft";

const funnelDisplay = Funnel_Display({
  subsets: ["latin"],
  variable: "--font-funnel-display",
  weight: ["300", "400", "500", "600", "700", "800"]
});

export const metadata = {
  title: siteMeta.title,
  description: siteMeta.description,
  metadataBase: new URL("https://coprime69.me"),
  openGraph: {
    title: "Prakhar Srivastava - AI/ML & Backend Engineer",
    description:
      "B.Tech AI & Data Science at IIT Jodhpur. LLM fine-tuning, distributed data platforms and cloud infrastructure.",
    url: "https://coprime69.me",
    siteName: "Prakhar Srivastava",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      {/* Base colour matches StrataBackdrop's first stop so there is no flash
          before it mounts. Was #060010 - that purple cast fought everything
          layered on top of it. The literal is the Sky stratum from
          data/strata.js; it cannot be a var() because this is the paint that
          happens before any stylesheet-driven colour lands. */}
      <body className={`${funnelDisplay.className} bg-[#070b14] text-white overflow-x-hidden`}>
        {/* Every framer-motion animation on the page becomes a no-op when the
            OS asks for reduced motion. The @media block in globals.css cannot
            do this - framer-motion writes inline transforms, which no CSS rule
            can reach. GSAP and the timer-driven sequences are handled at their
            own call sites; see the REDUCED MOTION note in globals.css. */}
        <MotionProvider>
          {/* Background COLOUR shifts with scroll depth. Sits behind the dots. */}
          <StrataBackdrop />

          {/* Interactive dot grid. Same pattern and interaction throughout; the
              colours travel with the depth so the dots stay legible against the
              shifting backdrop instead of sinking into it. */}
          <div className="fixed inset-0" aria-hidden="true" style={{ zIndex: 1 }}>
            <StrataDotGrid />
          </div>

          {/* Content with higher z-index */}
          <div className="relative z-10">
            {children}
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}
