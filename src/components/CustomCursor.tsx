import { useEffect, useRef } from "react";

const BASE_SIZE = 18;
const HOVER_SCALE = 64 / BASE_SIZE;
const HOVER_SELECTOR = "a, button, [role='button'], input, select, textarea, label";

export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mq.matches) return;

    const el = ref.current;
    if (!el) return;

    document.documentElement.classList.add("has-custom-cursor");
    el.style.opacity = "0";

    // Target (pointer) position and rendered position, lerped for smoothness.
    let tx = -100;
    let ty = -100;
    let cx = -100;
    let cy = -100;
    let scale = 1;
    let targetScale = 1;
    let raf = 0;
    let visible = false;

    const ease = reduced.matches ? 1 : 0.22;

    const loop = () => {
      cx += (tx - cx) * ease;
      cy += (ty - cy) * ease;
      scale += (targetScale - scale) * 0.2;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%) scale(${scale})`;
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!visible) {
        visible = true;
        cx = tx;
        cy = ty;
        el.style.opacity = "1";
      }
      const target = e.target as HTMLElement | null;
      targetScale = target?.closest(HOVER_SELECTOR) ? HOVER_SCALE : 1;
    };

    const onLeave = () => {
      el.style.opacity = "0";
      visible = false;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block rounded-full mix-blend-difference bg-white"
      style={{
        width: BASE_SIZE,
        height: BASE_SIZE,
        willChange: "transform",
        contain: "strict",
        transition: "opacity 200ms ease-out",
      }}
    />
  );
}
