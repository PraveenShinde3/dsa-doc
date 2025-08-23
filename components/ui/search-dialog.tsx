"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, Hash, FileText, Sparkles } from "lucide-react";
import { ROUTES, type EachRoute } from "@/lib/routes-config";
import Link from "next/link";

interface SearchResult {
  title: string;
  href: string;
  breadcrumb: string[];
  description?: string;
  type: "page" | "section";
}

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FrontmatterItem {
  title?: string;
  description?: string;
  slug: string;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [frontmatters, setFrontmatters] = useState<
    { title: string; description: string; slug: string }[]
  >([]);

  useEffect(() => {
    // Fetch frontmatters from API on mount
    fetch("/api/docs-frontmatters")
      .then((res) => res.json())
      .then((data: FrontmatterItem[]) => {
        setFrontmatters(
          data.map((item: FrontmatterItem) => ({
            title: item.title ?? "",
            description: item.description ?? "",
            slug: item.slug,
          }))
        );
      });
    // console.log("Fetched frontmatters:", frontmatters);
  }, []);

  // Map title to description for quick lookup
  const titleToDescription = useMemo(() => {
    const map: Record<string, string> = {};
    frontmatters.forEach((fm) => {
      if (fm.title && fm.description) map[fm.title] = fm.description;
    });
    return map;
  }, [frontmatters]);

  // Generate search results with breadcrumbs
  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    const getDescription = (title: string): string => {
      return (
        titleToDescription[title] ||
        `Learn about ${title.toLowerCase()} and its applications`
      );
    };

    const results: SearchResult[] = [];

    // Helper function to build breadcrumb path
    const buildBreadcrumb = (
      route: EachRoute,
      parentPath: string[] = []
    ): SearchResult[] => {
      const currentPath = [...parentPath, route.title];
      const results: SearchResult[] = [];

      // Add current route if it matches and is not noLink
      if (
        !route.noLink &&
        route.title.toLowerCase().includes(query.toLowerCase())
      ) {
        const normalizedHref = route.href.startsWith("/docs")
          ? route.href
          : `/docs${route.href.startsWith("/") ? "" : "/"}${route.href}`;

        results.push({
          title: route.title,
          href: normalizedHref,
          breadcrumb: currentPath.slice(0, -1),
          description: getDescription(route.title),
          type: "page",
        });
      }

      // Process children
      if (route.items) {
        route.items.forEach((item) => {
          const childHref = item.href.startsWith("/")
            ? `${route.href}${item.href}`
            : item.href;
          const childResults = buildBreadcrumb(
            { ...item, href: `${childHref}` },
            currentPath
          );
          results.push(...childResults);
        });
      }

      return results;
    };

    // Search through all routes
    ROUTES.forEach((route) => {
      results.push(...buildBreadcrumb(route));
    });

    return results.slice(0, 8); // Limit to 8 results
  }, [query, titleToDescription]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            Math.min(prev + 1, searchResults.length - 1)
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case "Enter":
          e.preventDefault();
          if (searchResults[selectedIndex]) {
            window.location.href = searchResults[selectedIndex].href;
            onOpenChange(false);
          }
          break;
        case "Escape":
          onOpenChange(false);
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, searchResults, selectedIndex, onOpenChange]);

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Reset query when dialog closes
  useEffect(() => {
    if (!open) {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 rounded-lg shadow-lg border">
        <div className="flex items-center border-b px-4 py-3">
          <Search className="h-4 w-4 text-gray-500 mr-3" />
          <input
            type="text"
            placeholder="Search documentation..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-0 outline-none text-base text-gray-900 dark:text-gray-100 placeholder-gray-500"
            autoFocus
          />
          <div className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
            ESC
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {query.trim() && searchResults.length > 0 && (
            <div className="p-2">
              {searchResults.map((result, index) => (
                <Link
                  key={`${result.href}-${index}`}
                  href={result.href}
                  onClick={() => onOpenChange(false)}
                  className={`block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                    index === selectedIndex
                      ? "bg-gray-100 dark:bg-gray-800"
                      : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {result.type === "section" ? (
                        <FileText className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Hash className="h-4 w-4 text-orange-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        {result.breadcrumb.map((crumb, i) => (
                          <span key={i} className="flex items-center gap-2">
                            {crumb}
                            {i < result.breadcrumb.length - 1 && (
                              <span className="text-xs">›</span>
                            )}
                          </span>
                        ))}
                      </div>
                      <div className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                        <Hash className="inline h-3 w-3 mr-1" />
                        {result.title}
                      </div>
                      {result.description && (
                        <div className="text-sm text-gray-500 line-clamp-2">
                          {result.description}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {query.trim() && searchResults.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No results found for query:{query}</p>
            </div>
          )}

          {/* AI Assistant Section */}
          <div className="border-t p-4">
            <div className="text-sm font-medium text-gray-500 mb-2">
              Ask AI assistant
            </div>
            <button
              className="w-full flex items-center justify-start text-left p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              onClick={() => {
                // You can implement AI assistant functionality here
                console.log(`AI query: Can you tell me about ${query}?`);
                onOpenChange(false);
              }}
            >
              <Sparkles className="h-4 w-4 mr-2 text-orange-500" />
              <span className="text-gray-900 dark:text-gray-100">
                Can you tell me about {query || "this topic"}?
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
