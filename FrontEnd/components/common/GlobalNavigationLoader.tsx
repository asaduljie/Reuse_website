"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import PaperBagLoader from "../dashboard/notifications/PaperBagLoader";

export default function GlobalNavigationLoader({ children }: { children: ReactNode }) {
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Trigger a 3-second loading animation on initial page load / refresh
  useEffect(() => {
    setIsNavigating(true);
    const timer = setTimeout(() => {
      setIsNavigating(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Make sure loading overlay is closed when pathname updates
  useEffect(() => {
    setIsNavigating(false);
  }, [pathname]);

  // Intercept all standard local link navigations
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      
      if (anchor && anchor.href && anchor.target !== "_blank") {
        const currentUrl = window.location.href;
        const targetUrl = anchor.href;
        
        // Determine if it is a different local path on the same domain
        if (
          targetUrl !== currentUrl &&
          targetUrl.startsWith(window.location.origin) &&
          !targetUrl.includes("#") &&
          !anchor.hasAttribute("download")
        ) {
          e.preventDefault(); // Stop Next.js instant routing
          setIsNavigating(true); // Show backdrop blur with paper bag animation
          
          // Delay routing by exactly 3 seconds (3000ms)
          setTimeout(() => {
            const relativePath = anchor.pathname + anchor.search + anchor.hash;
            router.push(relativePath);
          }, 3000);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick, true); // Use capture phase
    return () => document.removeEventListener("click", handleAnchorClick, true);
  }, [router]);

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
