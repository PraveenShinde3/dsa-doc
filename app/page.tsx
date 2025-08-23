import { buttonVariants } from "@/components/ui/button";
import { page_routes } from "@/lib/routes-config";
import Link from "next/link";
import type { Metadata } from "next";
import NotificationBanner from "@/components/ui/notification-banner";

export const metadata: Metadata = {
  title: "Dsa - Docs",
  metadataBase: new URL("https://dsa-docs.vercel.app/"),
  description:
    "This comprehensive documentation template, crafted with Next.js and available as open-source, delivers a sleek and responsive design, tailored to meet all your project documentation requirements.",
};

export default function Home() {
  return (
    <div className="flex sm:min-h-[87.5vh] min-h-[82vh] flex-col gap-3 sm:items-center justify-center text-center sm:py-8 py-14">
      <NotificationBanner />
      <h1 className="text-[1.45rem] leading-8 sm:px-32 lg:px-[30%] md:leading-[2.5rem] font-bold mb-4 sm:text-3xl text-left sm:text-center">
        Master Data Structures & Algorithms with Curated Resources and
        Explanations
      </h1>
      <p className="mb-8 text-base max-w-[1200px] lg:px-[15%] text-muted-foreground text-left sm:text-center">
        This platform is your one-stop solution for DSA (Data Structures &
        Algorithms) preparation. Access handpicked LeetCode question lists,
        comprehensive resource recommendations, and clear explanations of
        essential DSA topics—all designed to help you understand concepts deeply
        and prepare effectively for coding interviews.
      </p>
      <div className="sm:flex sm:flex-row grid grid-cols-2 items-center sm;gap-5 gap-3 mb-8">
        <Link
          href={`/docs${page_routes[0].href}`}
          className={buttonVariants({ className: "px-6", size: "lg" })}
        >
          Get Started
        </Link>
        <Link
          href="/blog"
          className={buttonVariants({
            variant: "secondary",
            className: "px-6",
            size: "lg",
          })}
        >
          Read Blog
        </Link>
      </div>
    </div>
  );
}
