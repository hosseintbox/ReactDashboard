import React from "react";
import GridShape from "../components/common/GridShape";
import ThemeTogglerTwo from "../components/common/ThemeTogglerTwo";

export default function FormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full h-[80vh] dark:bg-gray-900">
      {/* Overlay with blur */}
      <div className="absolute inset-0 backdrop-blur-sm z-0" />

      {/* Content container */}
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl">
          {children}
        </div>
      </div>

      {/* Right-side grid only on large screens */}
    
    </div>
  );
}
