import React from "react";

interface CardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export default function Card({ title, icon, children }: CardProps) {
  return (
    <div className="rounded-md border bg-background p-5 flex flex-col gap-2">
      <div className="flex items-center gap-2  text-base font-semibold">
        {icon && <span className="text-2xl">{icon}</span>}
        <span>{title}</span>
      </div>
      <div className="text-muted-foreground text-sm">{children}</div>
    </div>
  );
}
