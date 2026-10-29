import { useEffect } from "react";

/**
 * Exposes the page's vertical scroll as the CSS variable `--scroll-y` (in px) on
 * <html>, so layers can move at their own speed, e.g.
 * `transform: translate3d(0, calc(var(--scroll-y, 0px) * -0.3), 0)`.
 * Updated once per frame while scrolling. Left unset (so layers don't move) when
 * the user prefers reduced motion.
 */
export function useScrollParallax() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    let frame = 0;
    const update = () => {
      frame = 0;
      root.style.setProperty("--scroll-y", `${window.scrollY}px`);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
      root.style.removeProperty("--scroll-y");
    };
  }, []);
}
