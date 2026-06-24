import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Caveat, Comic_Neue, Architects_Daughter, Patrick_Hand } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-cursive",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const architectsDaughter = Architects_Daughter({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400"],
});

const patrickHand = Patrick_Hand({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Ayesha Mashiat | Backend & AI Systems",
  description: "Personal portfolio of Ayesha Mashiat, a backend engineer building intelligent systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${caveat.variable} ${architectsDaughter.variable} ${patrickHand.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground selection:bg-foreground selection:text-background transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
        
        {/* Inline SVG filters for wobbly hand-drawn effect */}
        <svg style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="doodle-border-filter" x="-8%" y="-8%" width="116%" height="116%">
              <feTurbulence type="fractalNoise" baseFrequency="0.006 0.008" numOctaves="3" seed="2" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.4" xChannelSelector="R" yChannelSelector="G" result="displaced" />
              <feGaussianBlur in="displaced" stdDeviation="0.3" />
            </filter>
          </defs>
        </svg>
      </body>
    </html>
  );
}
