// app/layout.tsx

import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/ui/dot-pattern";
import { SmoothCursor } from "@/components/ui/smooth-cursor";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Kael Rayan | Cinematic Editor",
  description: "Every frame deserves a pulse.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(manrope.className, "antialiased")}>
        {/* This is the correct component wrapper from your file */}
        {/* <SmoothCursor />
        <DotPattern
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1}
          className={cn(
            "[mask-image:radial-gradient(at_center,white,transparent_80%)]",
            "fixed inset-0"
          )}
        /> */}
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
