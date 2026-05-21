import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 350, damping: 28, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 350, damping: 28, mass: 0.6 });
  const [variant, setVariant] = useState<"default" | "hover">("default");
  const enabled = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mq.matches) return;
    enabled.current = true;
    document.documentElement.classList.add("has-custom-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      if (el?.closest("a, button, [role='button'], input, select, textarea, label")) {
        setVariant("hover");
      } else {
        setVariant("default");
      }
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [x, y]);

  const size = variant === "hover" ? 64 : 18;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block rounded-full mix-blend-difference bg-white"
      style={{
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{ width: size, height: size }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    />
  );
}
