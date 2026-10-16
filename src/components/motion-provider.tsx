"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { lenisRef } from "@/lib/lenis-ref";

gsap.registerPlugin(ScrollTrigger);

// Site-wide motion runtime: Lenis smooth scroll driven by GSAP's ticker and
// kept in sync with ScrollTrigger. Reduced-motion visitors get native scroll
// and no scroll-linked animation registration at all — sections must render
// complete without motion.
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.12,
      anchors: true,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenisRef.current = null;
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {children}
      <RouteScrollReset />
    </>
  );
}

// Lenis keeps its own scroll target, so the router's scroll-to-top on a
// client navigation gets eased straight back to the previous page's offset.
// Snap Lenis to the top on each new route, except on the first render (a
// reload keeps its restored offset), on back/forward (the browser restores
// the old offset) and for #hash targets (anchors scroll themselves).
// Reduced-motion visitors have no Lenis; the router's native reset already
// works for them.
function RouteScrollReset() {
  const pathname = usePathname();
  const lastPathname = useRef(pathname);
  // Path a back/forward traversal landed on. A hash-only traversal never
  // changes the pathname, so it can't suppress the next real navigation.
  const traversalPath = useRef<string | null>(null);

  useEffect(() => {
    const onPopState = () => {
      traversalPath.current = window.location.pathname;
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (pathname === lastPathname.current) return;
    lastPathname.current = pathname;
    const traversed = traversalPath.current === pathname;
    traversalPath.current = null;
    if (traversed || window.location.hash) return;
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}
