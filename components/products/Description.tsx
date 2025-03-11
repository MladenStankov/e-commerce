"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DescriptionProps {
  text: string;
  maxHeight?: number;
  className?: string;
}

export function Description({
  text,
  maxHeight = 80,
  className,
}: DescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if content height exceeds maxHeight
    if (contentRef.current) {
      setIsTruncated(contentRef.current.scrollHeight > maxHeight);
    }
  }, [text, maxHeight]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={cn("relative", className)}>
      <div
        ref={contentRef}
        className={cn(
          "text-sm leading-relaxed overflow-hidden transition-all duration-300",
          isExpanded ? "max-h-[1000px]" : `max-h-[${maxHeight}px]`
        )}
        style={{
          maxHeight: isExpanded ? "1000px" : `${maxHeight}px`,
        }}
      >
        {text}

        {/* Blur gradient effect when text is truncated and not expanded */}
        {isTruncated && !isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        )}
      </div>

      {isTruncated && (
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleExpand}
          className="mt-2 text-primary"
        >
          {isExpanded ? "Show less" : "Show more"}
        </Button>
      )}
    </div>
  );
}
