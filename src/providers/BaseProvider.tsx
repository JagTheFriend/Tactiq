"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { AnimatePresence } from "motion/react";
import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";

export default function BaseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <HeroUIProvider>
        <ToastProvider />
        <BaseLayout>
          <AnimatePresence>{children}</AnimatePresence>
        </BaseLayout>
      </HeroUIProvider>
    </ClerkProvider>
  );
}

function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-screen flex-col overflow-x-hidden">
      <div className="flex-grow text-black antialiased">
        <Navbar />
        {children}
      </div>
      <Footer />
    </main>
  );
}
