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
import { motion, MotionConfig, useInView } from "motion/react";
const subscribeReady = () => () => {};
const subscribeReduced = (notify: () => void) => {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
};
const MotionContext = createContext({
  active: false,
  enhanced: false,
});
export const useSiteMotion = () => useContext(MotionContext);
export function MotionSystem({
  children,
}: {
  children: ReactNode;
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
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const onVisibility = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);
  const enhanced = ready && !reduce;
  return (
    <MotionContext.Provider
      value={{
        active: enhanced && visible,
        enhanced,
      }}
    >
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
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
  const { active } = useSiteMotion();
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={{
        opacity: active && !inView ? 0.2 : 1,
        y: active && !inView ? 28 : 0,
      }}
      transition={{ duration: active ? 0.8 : 0, delay: active ? delay : 0, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
export function HeroWords({ text }: { text: string }) {
  const { active } = useSiteMotion();
  return (
    <span className="hero-words">
      <span className="sr-only">{text}</span>
      {text.split(" ").map((word, i, words) => (
        <span className="hero-word-mask" key={`${word}-${i}`} aria-hidden="true">
          <motion.span
            className={i >= words.length - 2 ? "hero-word hero-word--accent" : "hero-word"}
            initial={false}
            animate={active ? { y: [24, 0], opacity: [0.3, 1] } : { y: 0, opacity: 1 }}
            transition={{ duration: active ? 0.9 : 0, delay: active ? i * 0.045 : 0, ease: [0.22, 1, 0.36, 1] }}
          >{word}</motion.span>{i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
