import React from "react";

const typeStyles: Record<string, string> = {
  info: "bg-blue-50 border-blue-300 text-blue-900 dark:bg-blue-950 dark:border-blue-700 dark:text-blue-100",
  success:
    "bg-green-50 border-green-300 text-green-900 dark:bg-green-950 dark:border-green-700 dark:text-green-100",
  warning:
    "bg-yellow-50 border-yellow-300 text-yellow-900 dark:bg-yellow-950 dark:border-yellow-700 dark:text-yellow-100",
  danger:
    "bg-red-50 border-red-300 text-red-900 dark:bg-red-950 dark:border-red-700 dark:text-red-100",
  default:
    "bg-gray-50 border-gray-200 text-gray-900 dark:bg-stone-900 dark:border-stone-700 dark:text-stone-100",
};

interface CalloutProps {
  type?: "info" | "success" | "warning" | "danger";
  title?: string;
  children: React.ReactNode;
}

export default function Callout({
  type = "info",
  title,
  children,
}: CalloutProps) {
  return (
    <div
      className={`border-l-4 px-4 py-2  ${
        typeStyles[type] || typeStyles.default
      }`}
    >
      {title && <div className="font-semibold mb-1">{title}</div>}
      <div>{children}</div>
    </div>
  );
}
