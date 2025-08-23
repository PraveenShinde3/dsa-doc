"use client";

import { Leftbar } from "@/components/leftbar";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <div className="flex items-start gap-8">
      <Leftbar key="leftbar" />
      <div className="flex-[5.25]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname} // animates only doc content
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            // exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
