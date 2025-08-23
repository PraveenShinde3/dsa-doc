import { EachRoute } from "@/lib/routes-config";
import Anchor from "./anchor";
import { cn } from "@/lib/utils";
import { SheetClose } from "@/components/ui/sheet";
import React from "react";

export default function SubLink({
  title,
  href,
  items,
  noLink,
  level,
  isSheet,
  tag,
}: EachRoute & { level: number; isSheet: boolean }) {
  const Comp = (
    <Anchor
      activeClassName="text-primary dark:font-medium font-semibold underline underline-offset-4"
      className="text-sm"
      href={href}
    >
      {title}
      {tag && (
        <span className="dark:bg-green-700 bg-green-500 rounded-lg px-2 py-0.5 mx-2 text-xs text-white !font-normal">
          {tag}
        </span>
      )}
    </Anchor>
  );

  const titleOrLink = !noLink ? (
    isSheet ? (
      <SheetClose asChild>{Comp}</SheetClose>
    ) : (
      Comp
    )
  ) : (
    <h4 className="font-medium sm:text-sm text-primary flex items-center">
      {title}
      {tag && (
        <span className="dark:bg-blue-700 bg-blue-500 rounded-md px-1.5 py-0.5 mx-2 text-xs text-white !font-normal">
          {tag}
        </span>
      )}
    </h4>
  );

  if (!items) {
    return <div className="flex flex-col">{titleOrLink}</div>;
  }

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex items-center justify-between cursor-pointer w-full">
        <span className="w-[95%] overflow-hidden text-ellipsis text-start">
          {titleOrLink}
        </span>
      </div>
      <div
        className={cn(
          "flex flex-col items-start sm:text-sm dark:text-stone-300/85 text-stone-800 ml-0.5 mt-2.5 gap-3",
          level > 0 && "pl-4 border-l ml-1.5"
        )}
      >
        {items?.map((innerLink) => {
          const modifiedItems = {
            ...innerLink,
            href: `${href + innerLink.href}`,
            level: level + 1,
            isSheet,
          };
          return <SubLink key={modifiedItems.href} {...modifiedItems} />;
        })}
      </div>
    </div>
  );
}
