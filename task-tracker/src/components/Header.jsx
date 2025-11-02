import React from "react";
import { Highlighter } from "./ui/highlighter";

/**
 * Header - top bar
 * It includes the app name (currently).
 */
export default function Header() {
  return (
    <header
      className="w-full bg-[#d1cfc8] shadow-md border-b border-gray-200"
      role="banner"
      aria-label="TaskTracker header"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-1 sm:py-2 md:py-4 flex flex-col items-center md:items-start">
          <h1
            className="font-grotesk font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight text-center md:text-left leading-tight"
            aria-hidden="false"
          >
            TASK
          </h1>

          {/* TRACKER - wrapped in block so it always sits beneath TASK */}
          <span className="block mt-0">
            <Highlighter
              action="highlight"
              color="#6B705C"
              className="block font-grotesk text-xs sm:text-xl md:text-2xl tracking-tight text-center md:text-left leading-tight"
            >
              TRACKER
            </Highlighter>
          </span>
        </div>
      </div>
    </header>
  );
}
