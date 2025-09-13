"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, FileText, MessageSquare, Bot, ChevronDown } from "lucide-react";

interface DocActionsDropdownProps {
  pageContent?: string;
  pageTitle?: string;
  pageUrl?: string;
}

export function DocActionsDropdown({
  pageContent = "",
  pageTitle = "Documentation",
  pageUrl = "",
}: //   pageUrl = "",
DocActionsDropdownProps) {
  //   const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState("Copy page");

  const copyPageAsMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(pageContent);
      // change button text
      setCopyStatus("Copied!");
      // after 2 seconds, revert
      setTimeout(() => {
        setCopyStatus("Copy page");
      }, 2000);
    } catch (err) {
      console.error(err);
      // optionally show error text
      setCopyStatus("Failed to copy");
      setTimeout(() => {
        setCopyStatus("Copy page");
      }, 2000);
    }
    setIsOpen(false);
  };

  const viewAsMarkdown = () => {
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head><title>${pageTitle} - Markdown</title></head>
          <body style="font-family: monospace; white-space: pre-wrap; padding: 20px;">
            ${pageContent.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
          </body>
        </html>
      `);
      newWindow.document.close();
    }
    setIsOpen(false);
  };

  const openInChatGPT = () => {
    const prompt = encodeURIComponent(
      `Please help me with this documentation page:\n\n${
        pageUrl.length == 0 ? pageContent : pageUrl
      }`
    );
    window.open(`https://chatgpt.com/?hints=search&prompt=${prompt}`, "_blank");
    setIsOpen(false);
  };

  const openInClaude = () => {
    const prompt = encodeURIComponent(
      `Please help me with this documentation page:\n\n${
        pageUrl.length == 0 ? pageContent : pageUrl
      }`
    );

    window.open(`https://claude.ai/new?q=${prompt}`, "_blank");
    setIsOpen(false);
  };

  return (
    <div className="flex items-center">
      <Button
        variant="outline"
        size="xs"
        className="gap-2 rounded-r-none border-r-0 bg-transparent"
        onClick={copyPageAsMarkdown}
      >
        <Copy className="h-3 w-3" />
        <span className="inline-block min-w-[70px] text-left">
          {copyStatus}
        </span>
      </Button>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="iconXs"
            className="gap-2 rounded-l-none bg-transparent"
          >
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-64">
          <DropdownMenuItem
            onClick={copyPageAsMarkdown}
            className="flex flex-col items-start gap-1 p-3"
          >
            <div className="flex items-center gap-2">
              <Copy className="h-3 w-3" />
              <span className="font-medium">Copy page</span>
            </div>
            <span className="text-xs text-muted-foreground">
              Copy page as Markdown.
            </span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={viewAsMarkdown}
            className="flex flex-col items-start gap-1 p-3"
          >
            <div className="flex items-center gap-2">
              <FileText className="h-3 w-3" />
              <span className="font-medium">View as Markdown</span>
            </div>
            <span className="text-xs text-muted-foreground">
              View this page as plain text.
            </span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={openInChatGPT}
            className="flex flex-col items-start gap-1 p-3"
          >
            <div className="flex items-center gap-2">
              <MessageSquare className="h-3 w-3" />
              <span className="font-medium">Open in ChatGPT</span>
            </div>
            <span className="text-xs text-muted-foreground">
              Ask questions about this page.
            </span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={openInClaude}
            className="flex flex-col items-start gap-1 p-3"
          >
            <div className="flex items-center gap-2">
              <Bot className="h-3 w-3" />
              <span className="font-medium">Open in Claude</span>
            </div>
            <span className="text-xs text-muted-foreground">
              Ask questions about this page.
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
