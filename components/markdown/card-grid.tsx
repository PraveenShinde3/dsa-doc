import React from "react";

export default function CardGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-4">
      {children}
    </div>
  );
}
