import Link from "next/link";
import { LogoDiv } from "./navbar";

export function Footer() {
  return (
    <footer className="border-t w-full h-16 bg-background">
      <div className="container flex items-center sm:justify-between justify-start gap-4 h-full text-muted-foreground text-sm flex-wrap sm:py-0 py-3 max-sm:px-4">
        {/* Left Section */}
        <div className="flex item-center gap-3">
          <LogoDiv />
          <p>
            <span className="text-xs rounded-full bg-muted px-1 border border-border text-muted-foreground">
              v1.0.0
            </span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-center">
            © {new Date().getFullYear()} · Built by{" "}
            <Link
              href="https://github.com/PraveenShinde3"
              target="_blank"
              rel="noopener noreferrer"
              className="px-1 underline underline-offset-2 hover:text-foreground"
            >
              Praveen Shinde
            </Link>
            · Powered by{" "}
            <Link
              href="https://ariadocs.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-1 underline underline-offset-2 hover:text-foreground"
            >
              Ariadocs
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
