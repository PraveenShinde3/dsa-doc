import React from "react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  return (
    <div className="min-h-[87vh] px-2 sm:py-28 py-36 flex flex-col gap-4 items-center">
      <div className="text-center flex flex-col items-center justify-center w-fit gap-2">
        <h2 className="text-4xl font-bold pr-1"> Coming Soon {":)"}</h2>
        <p className="text-muted-foreground text-md font-medium">
          Page under construction.
        </p>
      </div>
      <Link href="/" className={buttonVariants({})}>
        Back to homepage
      </Link>
    </div>
  );
};

export default page;
