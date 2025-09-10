// components/Indent.tsx
import { ReactNode } from "react";

interface IndentProps {
  children: ReactNode;
  level?: number;
}

export default function Indent({ children, level = 1 }: IndentProps) {
  return <div className={`pl-${level * 4}`}>{children}</div>;
}
