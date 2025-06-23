import "~/styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import BaseProvider from "~/providers/BaseProvider";

export const metadata: Metadata = {
  title: "Tactiq",
  description: "Simplify creating and organizing Tasks",
  icons: [{ rel: "icon", url: "/icon.svg" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <BaseProvider>{children}</BaseProvider>
      </body>
    </html>
  );
}
