import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, Noto_Sans_Thai, Quicksand } from "next/font/google";
import "./globals.css";
import { weddingConfig as w, eventDateParts } from "@/config/wedding";
const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});
const sans = Manrope({ subsets: ["latin"], variable: "--font-sans" });
const numbers = Quicksand({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-numbers" });
const thai = Noto_Sans_Thai({
  subsets: ["thai"],
  weight: ["300", "400", "500"],
  variable: "--font-thai",
});
export const metadata: Metadata = {
  title: `${w.brideName} & ${w.groomName} — A celebration of love`,
  description: `Join us on ${eventDateParts().short} at ${w.venueFullName}. Our wedding invitation, schedule, directions and RSVP.`,
  robots: { index: false, follow: false },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${serif.variable} ${sans.variable} ${thai.variable} ${numbers.variable}`}>
        {children}
      </body>
    </html>
  );
}
