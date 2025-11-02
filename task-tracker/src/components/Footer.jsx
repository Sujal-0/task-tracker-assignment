import React from "react";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="bg-[#d1cfc8] text-[#000000] py-3 md:py-4 border-t border-gray-200"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
          {/* Left */}
          <div className="flex-1 flex justify-center sm:justify-start">
            <p className="text-xs sm:text-sm text-[#222]">
              © {new Date().getFullYear()}{" "}
              <span className="font-medium">Task Tracker</span>. All rights
              reserved.
            </p>
          </div>

          {/* Middle */}
          <div className="flex-1 flex justify-center items-center">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#222]">
              <span className="sr-only">Made with love by</span>
              <span className="hidden sm:inline">Made with</span>
              <Heart
                className="w-4 h-4 sm:w-5 sm:h-5 text-[#6B705C] shrink-0"
                aria-hidden="true"
              />
              <span className="font-medium">Sujal Singh</span>
            </div>
          </div>

          {/* Rights */}
          <div className="flex-1 flex justify-center sm:justify-end">
            <p className="text-xs sm:text-sm text-[#222]">
              Built for{" "}
              <span className="font-semibold">Penthara Technologies</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
