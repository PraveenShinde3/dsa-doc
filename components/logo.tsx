"use client";

import DsaDocIcon from "@/public/dsa-doc-icon.svg";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function Logo() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Optionally, render a placeholder or nothing until mounted
    return (
      <DsaDocIcon className="w-5 h-5 transition-colors duration-300 fill-black" />
    );
  }

  return (
    <DsaDocIcon
      className={clsx("w-5 h-5 transition-colors duration-300 fill-foreground")}
    />
  );
}
