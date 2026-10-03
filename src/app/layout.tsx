import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Caveat, Playfair_Display } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-script",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0f9f59",
};

export const metadata: Metadata = {
  title: "DVS Facilities | Spotless Spaces, Seamless Service",
  description: "DVS Facilities offers top-tier Facilities Management (Housekeeping, Electrical, Garden, Plumber), Security Guard Supply, Hospital-Grade Deep Cleaning, and Housekeeping Material Supply across India.",
  keywords: "DVS Facilities, Facilities Management India, Housekeeping Staff, Security Guard Supply, Deep Cleaning Services, Kitchen Deep Cleaning, Toilet Cleaning, Floor Scrubbing, Housekeeping Materials Supply Bangalore",
  authors: [{ name: "DVS Facilities Management" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${caveat.variable} ${playfair.variable} font-sans`}>
      <body className="min-h-full flex flex-col bg-white text-slate-900 antialiased selection:bg-emerald-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
