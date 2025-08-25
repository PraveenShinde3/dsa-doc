"use client";

import { Clipboard, ArrowUpRight } from "lucide-react";
import Link from "next/link";

type ListCardProps = {
  id: number;
  title: string;
  des: string;
  link?: string;
};

export default function ListCard({
  patterns,
  link = true,
}: {
  patterns: ListCardProps[];
  link?: boolean;
}) {
  return (
    <div className="text-foreground ">
      <div className="grid grid-cols-1 w-full md:grid-cols-2 xl:grid-cols-3 gap-4">
        {patterns.map((pattern, index) =>
          link && pattern.link ? (
            <Link
              href={pattern.link}
              key={pattern.id}
              target="_blank"
              className="bg-white no-underline p-2 w-full rounded-md border border-gray-200 cursor-pointer group"
            >
              <div className="flex items-start gap-2 ">
                <Clipboard className="w-4 h-4 text-sm mt-0.5" />
                <p className="!m-0 flex-1 text-sm font-medium">
                  {pattern.title}
                </p>
                <div className="opacity-60 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className="!m-1 line-clamp-1 px-5 text-xs overflow-hidden text-wrap text-muted-foreground w-full">
                  {pattern.des}
                </p>
              </div>
            </Link>
          ) : (
            <div
              key={pattern.id}
              className="bg-white p-3 w-full rounded-md border border-gray-200 cursor-default group"
            >
              <div className="flex items-center gap-2 relative">
                {/* <Clipboard className="w-4 h-4 text-sm mt-0.5" />
                 */}
                <p className="!m-0 text-xs font-medium bg-muted rounded-full absolute -top-6 -left-6 px-2 py-1">
                  {index < 10 ? `0${index}` : index}
                </p>
                <p className="!m-0 flex-1 text-sm font-medium ">
                  {pattern.title}
                </p>
              </div>
              <div>
                <p className="!m-0 pt-1 text-xs overflow-hidden text-wrap text-muted-foreground w-full">
                  {pattern.des}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
