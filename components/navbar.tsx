"use client";
import { ModeToggle } from "@/components/theme-toggle";
import { GithubIcon, TwitterIcon, Search } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import Anchor from "./anchor";
import { SheetLeftbar } from "./leftbar";
import Logo from "./logo";
import { SheetClose } from "@/components/ui/sheet";
import { SearchDialog } from "./ui/search-dialog";
import { useState } from "react";

export const NAVLINKS = [
  {
    title: "Documentation",
    href: `/docs/getting-started`,
  },
  {
    title: "Resources List",
    href: "/resources-list",
  },
  {
    title: "Leetcode Questions",
    href: "/leetcode-questions",
  },
  // {
  //   title: "Blog",
  //   href: "/blog",
  // },
];

export function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <>
      <nav className="w-full border-b h-16 sticky top-0 z-50 bg-background">
        <div className="sm:container mx-auto w-[95vw] h-full flex items-center sm:justify-between md:gap-2">
          <div className="flex items-center sm:gap-5 gap-2.5">
            <SheetLeftbar />
            <div className="flex items-center gap-6">
              <div className="lg:flex hidden">
                <LogoDiv />
              </div>
              <p className="lg:flex hidden">|</p>
              <div className="md:flex hidden items-center gap-4 text-sm font-medium text-muted-foreground">
                <NavMenu />
              </div>
            </div>
          </div>

          <div className="flex items-center sm:justify-normal justify-between sm:gap-3 ml-1 sm:w-fit w-[90%]">
            <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
              <div className="w-full flex-1 md:w-auto md:flex-none">
                <button
                  className="relative h-9 w-full flex items-center justify-start rounded-md bg-background border border-muted text-sm font-normal text-muted-foreground shadow-sm hover:bg-muted/50 transition-colors sm:pr-12 md:w-40 lg:w-64 px-3"
                  onClick={() => setSearchOpen(true)}
                >
                  <Search className="h-4 w-4 mr-2" />
                  <span className="hidden lg:inline-flex">Search..</span>
                  <span className="inline-flex lg:hidden">Search...</span>
                  <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                    <span className="text-xs">⌘</span>K
                  </kbd>
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between sm:gap-2">
              <div className="flex ml-4 sm:ml-0">
                <Link
                  href="https://github.com/praveenShinde3"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "icon",
                  })}
                  target="_blank"
                >
                  <GithubIcon className="h-[1.1rem] w-[1.1rem]" />
                </Link>
                <Link
                  href="#"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "icon",
                  })}
                >
                  <TwitterIcon className="h-[1.1rem] w-[1.1rem]" />
                </Link>
                <ModeToggle />
              </div>
            </div>
          </div>
        </div>
      </nav>
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}

export function LogoDiv() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <Logo />
      <h2 className="text-md font-bold font-code">
        DSA<span className="text-muted-foreground text-sm">.docs</span>
      </h2>
    </Link>
  );
}

export function NavMenu({ isSheet = false }) {
  return (
    <>
      {NAVLINKS.map((item) => {
        const Comp = (
          <Anchor
            key={item.title + item.href}
            activeClassName="!text-primary dark:font-medium font-semibold"
            absolute
            className="flex items-center gap-1 sm:text-sm text-[14.5px] text-muted-foreground hover:text-foreground"
            href={item.href}
          >
            {item.title}
          </Anchor>
        );
        return isSheet ? (
          <SheetClose key={item.title + item.href} asChild>
            {Comp}
          </SheetClose>
        ) : (
          Comp
        );
      })}
    </>
  );
}
