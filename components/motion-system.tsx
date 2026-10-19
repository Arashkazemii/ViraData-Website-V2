"use client";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { motion, useInView } from "motion/react";
import type { Locale } from "@/lib/config";
import { getCopy } from "@/lib/copy";
const subscribeReady = () => () => {};
const subscribeReduced = (notify: () => void) => {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
};
const MotionContext = createContext({
  active: false,
  enhanced: false,
  paused: false,
  toggle: () => {},
});
export const useSiteMotion = () => useContext(MotionContext);
export function MotionSystem({
  children,
}: {
  children: ReactNode;
  lang: Locale;
}) {
  const ready = useSyncExternalStore(
    subscribeReady,
    () => true,
    () => false,
  );
  const reduce = useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
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
  const enhanced = ready && !reduce && !paused;
  return (
    <MotionContext.Provider
      value={{
        active: enhanced && visible,
        enhanced,
        paused,
        toggle: () => setPaused((v) => !v),
      }}
    >
      {children}
    </MotionContext.Provider>
  );
}
export function MotionToggle({ lang }: { lang: Locale }) {
  const { paused, toggle } = useSiteMotion();
  const c = getCopy(lang).common;
  return (
    <button
      className="motion-toggle"
      type="button"
      onClick={toggle}
      aria-pressed={paused}
      aria-label={paused ? c.play : c.pause}
      title={paused ? c.play : c.pause}
    >
      <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>
      <span>{paused ? c.play : c.pause}</span>
    </button>
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
  const { active } = useSiteMotion();
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={{
        opacity: active && !inView ? 0.8 : 1,
        y: active && !inView ? 12 : 0,
      }}
      transition={{ duration: active ? 0.5 : 0, delay: active ? delay : 0 }}
    >
      {children}
    </motion.div>
  );
}
export function HeroWords({ text }: { text: string }) {
  const { active } = useSiteMotion();
  return (
    <motion.span
      className="hero-words"
      initial={false}
      animate={
        active ? { y: [8, 0], opacity: [0.85, 1] } : { y: 0, opacity: 1 }
      }
      transition={{ duration: active ? 0.7 : 0 }}
    >
      {text}
    </motion.span>
  );
}
