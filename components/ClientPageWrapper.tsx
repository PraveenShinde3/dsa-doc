"use client";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function ClientPageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const firstSegment = pathname?.split("/")[1] || "root";
  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        key={firstSegment}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
