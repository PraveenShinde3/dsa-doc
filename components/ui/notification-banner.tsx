import { ChevronRight } from "lucide-react";

export default function NotificationBanner() {
  return (
    <div className="mb-8 text-xs sm:text-sm truncate flex text-foreground items-center gap-3 p-1 bg-background border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      <span className="hidden sm:block font-medium border  border-border  rounded-sm px-3 py-1">
        What&apos;s new?
      </span>

      <div className="flex items-center gap-2">
        {/* Stripe logo */}
        <div className="w-5 h-5rounded flex items-center justify-center">
          {/* <span className="text-white text-xs font-bold">S</span> */}
          {/* <Megaphone className="w-4 h-4" /> */}
          🎉
        </div>

        <span className="text-sm  font-medium">
          Notification banner content
        </span>
      </div>

      <ChevronRight className="w-4 h-4  ml-auto" />
    </div>
  );
}
