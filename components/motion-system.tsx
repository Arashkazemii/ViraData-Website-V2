"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import type { Locale } from "@/lib/config";
import { getCopy } from "@/lib/copy";

const MotionContext = createContext({ active: false, toggle: () => {} });

export function MotionSystem({
  children,
  lang,
}: {
  children: ReactNode;
  lang: Locale;
}) {
  const reduce = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const onVisibility = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);
  useEffect(() => {
    document.body.dataset.motionPaused = paused || reduce ? "true" : "false";
  }, [paused, reduce]);
  const active = !reduce && !paused && visible;
  const c = getCopy(lang).common;
  return (
    <MotionContext.Provider
      value={{ active, toggle: () => setPaused((value) => !value) }}
    >
      {children}
      <button
        className="motion-toggle"
        type="button"
        onClick={() => setPaused((value) => !value)}
        aria-pressed={paused}
        aria-label={paused ? c.play : c.pause}
      >
        <span className="motion-icon" aria-hidden="true">
          {paused ? "▶" : "Ⅱ"}
        </span>
        <span>{paused ? c.play : c.pause}</span>
      </button>
    </MotionContext.Provider>
  );
}

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });
  const { active } = useContext(MotionContext);
  return (
    <motion.div
      ref={ref}
      className={className}
      data-visible={inView}
      initial={false}
      animate={
        active
          ? inView
            ? { opacity: 1, y: 0 }
            : { opacity: 0.78, y: 18 }
          : { opacity: 1, y: 0 }
      }
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function DataField({
  lang,
  compact = false,
}: {
  lang: Locale;
  compact?: boolean;
}) {
  const { active } = useContext(MotionContext);
  const paths = [
    "M35 50 C210 50 160 165 320 165 S460 240 570 240",
    "M35 125 C155 125 200 200 320 200 S455 240 570 240",
    "M35 205 C155 205 200 235 320 235 S440 240 570 240",
    "M35 285 C195 285 205 265 320 265 S455 240 570 240",
    "M35 360 C160 360 215 300 320 300 S450 240 570 240",
    "M35 435 C195 435 210 340 320 340 S460 240 570 240",
  ];
  const starts = [50, 125, 205, 285, 360, 435];
  return (
    <div
      className={`data-field ${compact ? "data-field--compact" : ""}`}
      aria-label={getCopy(lang).home.graphic}
      role="img"
    >
      <div className="field-grid" />
      <svg
        viewBox="0 0 700 490"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="thread" x1="0" x2="1">
            <stop stopColor="#5889ee" stopOpacity=".15" />
            <stop offset=".68" stopColor="#69a5ff" stopOpacity=".65" />
            <stop offset="1" stopColor="#e0f2ff" />
          </linearGradient>
        </defs>
        {paths.map((path, i) => (
          <g key={path}>
            <motion.path
              d={path}
              fill="none"
              stroke="url(#thread)"
              strokeWidth="1.5"
              initial={false}
              animate={
                active
                  ? { pathLength: [0.07, 1], opacity: [0.25, 0.85] }
                  : { pathLength: 1, opacity: 0.7 }
              }
              transition={{ duration: 1.5, delay: i * 0.12, ease: "easeOut" }}
            />
            <circle cx="35" cy={starts[i]} r="3" fill="#91b5f7" />
          </g>
        ))}
        <motion.circle
          cx="570"
          cy="240"
          r="9"
          fill="#dbe9ff"
          animate={
            active
              ? { scale: [1, 1.35, 1], opacity: [0.75, 1, 0.75] }
              : { scale: 1, opacity: 1 }
          }
          transition={{ duration: 3, repeat: active ? Infinity : 0 }}
        />
        <circle
          cx="570"
          cy="240"
          r="25"
          fill="none"
          stroke="#a7c9ff"
          strokeOpacity=".55"
        />
        <circle
          cx="570"
          cy="240"
          r="42"
          fill="none"
          stroke="#a7c9ff"
          strokeOpacity=".25"
        />
      </svg>
      <span className="field-label field-label--input">
        {lang === "fa" ? "داده‌های پراکنده" : "FRAGMENTED SIGNALS"}
      </span>
      <span className="field-label field-label--output">
        {lang === "fa" ? "تصمیم روشن" : "CLEAR DECISION"}
      </span>
      <span className="field-caption">{getCopy(lang).home.graphic}</span>
    </div>
  );
}

export function HeroWords({ text }: { text: string }) {
  const { active } = useContext(MotionContext);
  return (
    <span className="hero-words">
      {text.split(" ").map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="hero-word"
          initial={false}
          animate={
            active ? { y: [12, 0], opacity: [0.82, 1] } : { y: 0, opacity: 1 }
          }
          transition={{
            duration: 0.55,
            delay: 0.04 + i * 0.045,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {word}{" "}
        </motion.span>
      ))}
    </span>
  );
}
