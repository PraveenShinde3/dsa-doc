import Link from "next/link";
import { LogoDiv } from "./navbar";

interface FooterProps {
  className?: string;
}

export function Footer({ className = "" }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`border-t w-full bg-background ${className}`}
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-muted-foreground text-sm">
          {/* Brand Section */}
          <div className="flex items-center gap-3">
            <LogoDiv />
            <span
              className="text-xs rounded-full bg-muted px-2 py-1 border border-border text-muted-foreground font-medium"
              aria-label="Version 1.0.0"
            >
              v1.0.0
            </span>
          </div>

          {/* Copyright and Credits Section */}
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <span>© {currentYear}</span>
            <span className="hidden sm:inline" aria-hidden="true">
              ·
            </span>
            <span>
              Built by{" "}
              <Link
                href="https://praveenshinde.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline underline-offset-2 hover:text-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm"
                aria-label="Visit Praveen Shinde's GitHub profile (opens in new tab)"
              >
                Praveen Shinde
              </Link>
            </span>
            <span className="hidden sm:inline" aria-hidden="true">
              ·
            </span>
            <span>
              Powered by{" "}
              <Link
                href="https://ariadocs.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline underline-offset-2 hover:text-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm"
                aria-label="Visit Ariadocs website (opens in new tab)"
              >
                Ariadocs
              </Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
