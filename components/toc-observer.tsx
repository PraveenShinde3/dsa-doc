"use client";

import { getDocsTocs } from "@/lib/markdown";
import clsx from "clsx";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

type Props = { data: Awaited<ReturnType<typeof getDocsTocs>> };

export default function TocObserver({ data }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!data.length) return;

    const visibleMap = new Map<string, number>();

    const recomputeFromScroll = () => {
      const line = window.scrollY + 160; // 160px from top as tracking line
      let current = data[0].href.slice(1);

      for (const item of data) {
        const el = document.getElementById(item.href.slice(1));
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (top <= line) current = item.href.slice(1);
          else break;
        }
      }
      setActiveId(current);
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        const id = entry.target.id;
        if (entry.isIntersecting) {
          visibleMap.set(id, entry.intersectionRatio || 0);
        } else {
          visibleMap.delete(id);
        }
      }

      if (visibleMap.size > 0) {
        const best = Array.from(visibleMap.entries())
          .map(([id, ratio]) => {
            const top =
              document.getElementById(id)?.getBoundingClientRect().top ?? 0;
            return { id, ratio, topAbs: Math.abs(top) };
          })
          .sort((a, b) => b.ratio - a.ratio || a.topAbs - b.topAbs)[0];
        setActiveId(best.id);
      } else {
        recomputeFromScroll();
      }
    };

    observer.current = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "-160px 0px -60% 0px", // tracking band
      threshold: [0, 0.25, 0.5, 0.75, 1],
    });

    const elements = data
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter(Boolean) as HTMLElement[];

    elements.forEach((el) => observer.current?.observe(el));

    // Fallback scroll listener
    const onScroll = () => {
      if (visibleMap.size === 0) recomputeFromScroll();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.current?.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [data]);

  return (
    <div className="flex flex-col gap-2.5 text-xs dark:text-stone-300/85 text-stone-800 ml-0.5">
      {data.map(({ href, level, text }, index) => (
        <Link
          key={href + index}
          href={href}
          className={clsx({
            "pl-0": level === 2,
            "pl-4": level === 3,
            "pl-8": level === 4,
            "dark:font-medium font-semibold text-primary":
              activeId === href.slice(1),
          })}
        >
          {text}
        </Link>
      ))}
    </div>
  );
}
