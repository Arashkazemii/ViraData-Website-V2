"use client";

import dynamic from "next/dynamic";
import { useRef, type ReactNode } from "react";
import { motion, useInView, useSpring } from "motion/react";
import { useSiteMotion } from "./motion-system";

const Threads = dynamic(() => import("./react-bits/Threads"), { ssr: false });

/** React Bits Threads, tuned to suggest data resolving into a coherent signal. */
export function HeroAtmosphere() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "100px" });
  const { active } = useSiteMotion();
  return (
    <div ref={ref} className="hero-atmosphere" aria-hidden="true">
      <Threads
        color="#a2b9d9"
        accentColor="#6d9fe6"
        lineCount={48}
        amplitude={1.9}
        distance={0.35}
        thickness={0.7}
        softness={0.35}
        speed={0.28}
        angle={-19}
        brightness={1.2}
        taper={0.5}
        fade={0.3}
        paused={!active || !inView}
      />
    </div>
  );
}

/** A small pointer response gives primary actions a tactile, settled feel. */
export function Magnetic({ children }: { children: ReactNode }) {
  const { active } = useSiteMotion();
  const x = useSpring(0, { stiffness: 240, damping: 22 });
  const y = useSpring(0, { stiffness: 240, damping: 22 });
  return (
    <motion.div
      className="magnetic-action"
      style={active ? { x, y } : { x: 0, y: 0 }}
      onPointerMove={(event) => {
        if (!active || event.pointerType !== "mouse") return;
        const bounds = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - bounds.left - bounds.width / 2) * 0.06);
        y.set((event.clientY - bounds.top - bounds.height / 2) * 0.12);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
      onBlur={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}
