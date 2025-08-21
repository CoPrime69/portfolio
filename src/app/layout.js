import DotGrid from "../components/DotGrid/DotGrid";
import { Funnel_Display } from "next/font/google";
import "./globals.css";
require("@south-paw/typeface-minecraft");

const funnelDisplay = Funnel_Display({
  subsets: ["latin"],
  variable: "--font-funnel-display",
  weight: ["300", "400", "500", "600", "700", "800"]
});

export const metadata = {
  title: "Prakhar's Portfolio",
  description: "Full Stack Developer & AI Enthusiast from IIT Jodhpur",
  metadataBase: new URL("https://coprime69.me"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${funnelDisplay.className} bg-[#060010] text-white overflow-x-hidden`}>
        {/* Global Interactive DotGrid Background */}
        <div className="fixed inset-0 z-0">
          <DotGrid
            dotSize={3.5}
            gap={15}
            baseColor="#1a1a2e"
            activeColor="#00f5ff"
            proximity={120}
            shockRadius={250}
            shockStrength={5}
            resistance={750}
            returnDuration={1.5}
          />
        </div>

        {/* Content with higher z-index */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}