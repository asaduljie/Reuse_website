"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import PaperBagLoader from "../../components/dashboard/notifications/PaperBagLoader";

export default function DashboardRootLayout({ children }: { children: ReactNode }) {
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Stop loading as soon as pathname changes (navigation completed)
    setIsNavigating(false);
  }, [pathname]);

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      
      if (anchor && anchor.href && anchor.target !== "_blank") {
        const currentUrl = window.location.href;
        const targetUrl = anchor.href;
        
        // Only trigger loading for same-origin navigation, non-hash, and different pages
        if (
          targetUrl !== currentUrl && 
          targetUrl.startsWith(window.location.origin) &&
          !targetUrl.includes("#") &&
          !anchor.hasAttribute("download")
        ) {
          setIsNavigating(true);
        }
      }
    };
    
    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  return (
    <>
      {children}
      {isNavigating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/5 backdrop-blur-sm transition-all duration-300">
          <div className="bg-white/80 backdrop-blur-md rounded-[32px] p-8 border border-gray-100/50 shadow-2xl">
            <PaperBagLoader />
          </div>
        </div>
      )}
    </>
  );
}
