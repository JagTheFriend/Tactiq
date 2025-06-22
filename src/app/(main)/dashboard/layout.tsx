import { AnimatePresence } from "motion/react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AnimatePresence>{children}</AnimatePresence>;
}
