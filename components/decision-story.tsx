"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import type { Locale } from "@/lib/config";
import {
  current,
  previous,
  report,
  differences,
  change,
  number,
  percent,
} from "@/lib/story-data";
import { storyCopy } from "@/lib/story-copy";
import { useSiteMotion } from "./motion-system";

export function ReportPanel({
  lang,
  stage = 2,
}: {
  lang: Locale;
  stage?: number;
}) {
  const c = storyCopy[lang];
  const { active } = useSiteMotion();
  const n = (v: number, d = 0) => number(v, lang, d);
  const transition = {
    duration: active ? 0.65 : 0,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  };
  return (
    <div
      className={`report-panel report-stage-${stage}`}
      data-report-stage={stage}
    >
      <div className="report-toolbar">
        <span className="report-brand">
          V<span> / </span>
          {lang === "fa" ? "گزارش تصمیم" : "DECISION REPORT"}
        </span>
        <span className="report-stamp">{c.sample}</span>
      </div>
      <div className="report-content">
        <div className="report-heading">
          <strong>{c.steps[stage][0]}</strong>
          <span>{c.unit}</span>
        </div>
        {stage === 0 && (
          <div className="source-sheets">
            {(["sales", "purchase", "operating"] as const).map((key, i) => (
              <div className="source-sheet" key={key}>
                <span className="sheet-tag">
                  {c[key]} <bdi> / {number(i + 1, lang)}</bdi>
                </span>
                {key === "operating"
                  ? report.map((r) => (
                      <div className="source-record" key={r.period}>
                        <span>
                          {r.period === "previous" ? c.previous : c.current}
                        </span>
                        <strong>{n(r[key])}</strong>
                      </div>
                    ))
                  : current.rows.map((r) => (
                      <div className="source-record" key={r.id}>
                        <span>{r.name[lang]}</span>
                        <strong>{n(r[key])}</strong>
                      </div>
                    ))}
                <small>{i < 2 ? c.current : c.evidence}</small>
              </div>
            ))}
          </div>
        )}
        {stage === 1 && (
          <div className="metric-definition">
            <div className="period-selection">
              <span>{c.previous}</span>
              <span>↔</span>
              <span>{c.current}</span>
            </div>
            <p>{c.scope}</p>
            <strong>{c.profit}</strong>
            <div className="formula">{c.definition}</div>
            <p className="report-assumption">{c.assumption}</p>
            <div className="definition-check">✓ {c.evidence}</div>
          </div>
        )}
        {(stage === 2 || stage === 3) && (
          <>
            <div className="metric-strip">
              {(["sales", "purchase", "profit"] as const).map((key) => (
                <div
                  key={key}
                  className={key === "profit" ? "metric-profit" : ""}
                >
                  <span>{c[key]}</span>
                  <strong>{n(current[key])}</strong>
                  <b className={key === "sales" ? "positive" : "negative"}>
                    <bdi>
                      {percent(change(previous[key], current[key]), lang)}
                    </bdi>
                  </b>
                </div>
              ))}
            </div>
            {stage === 2 ? (
              <div className="comparison-chart">
                <div className="chart-legend">
                  <span>
                    <i />
                    {c.previous}
                  </span>
                  <span>
                    <i />
                    {c.current}
                  </span>
                </div>
                {(["sales", "purchase", "profit"] as const).map((key) => (
                  <div className="chart-group" key={key}>
                    <span>{c[key]}</span>
                    {report.map((r, i) => (
                      <div
                        className={`chart-bar-row bar-period-${i}`}
                        key={r.period}
                      >
                        <motion.div
                          initial={false}
                          style={{ width: `${(r[key] / current.sales) * 100}%`, originX: lang === "fa" ? 1 : 0 }}
                          animate={{ scaleX: active ? [0.72, 1] : 1 }}
                          transition={transition}
                        />
                        <b>{n(r[key])}</b>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <div className="profit-bridge">
                <p>
                  {lang === "fa"
                    ? "تطبیق تغییر سود"
                    : "RECONCILING THE PROFIT CHANGE"}
                </p>
                {[
                  { label: c.previous, value: previous.profit },
                  { label: c.sales, value: current.sales - previous.sales },
                  {
                    label: c.purchase,
                    value: previous.purchase - current.purchase,
                  },
                  {
                    label: c.operating,
                    value: previous.operating - current.operating,
                  },
                  { label: c.current, value: current.profit },
                ].map((row, i) => (
                  <div className={`bridge-row bridge-${i}`} key={row.label}>
                    <span>{row.label}</span>
                    <motion.i
                      initial={false}
                      style={{ width: `${(Math.abs(row.value) / (previous.profit + current.sales - previous.sales)) * 58}%`, originX: lang === "fa" ? 1 : 0 }}
                      animate={{ scaleX: active ? [0.72, 1] : 1 }}
                      transition={transition}
                    />
                    <bdi>
                      {i > 0 && i < 4 && row.value > 0 ? "+" : ""}
                      {n(row.value)}
                    </bdi>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        {stage === 4 && (
          <div className="detail-view">
            <div className="detail-total">
              <span>
                {c.purchase} · {c.delta}
              </span>
              <strong>+{n(current.purchase - previous.purchase)}</strong>
            </div>
            <table>
              <caption>
                {c.detail} · {c.unit}
              </caption>
              <thead>
                <tr>
                  <th>{c.product}</th>
                  <th>{c.previous}</th>
                  <th>{c.current}</th>
                  <th>{c.delta}</th>
                </tr>
              </thead>
              <tbody>
                {differences.map((r, i) => (
                  <tr key={r.id}>
                    <th>{r.name[lang]}</th>
                    <td>{n(previous.rows[i].purchase)}</td>
                    <td>{n(r.purchase)}</td>
                    <td>+{n(r.delta)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="invoice-detail">
              <span>{current.rows[0].name[lang]}</span>
              <bdi>
                {n(previous.rows[0].quantity)} ×{" "}
                {n(previous.rows[0].unitCost, 3)} ={" "}
                {n(previous.rows[0].purchase)}
              </bdi>
              <bdi>
                {n(current.rows[0].quantity)} × {n(current.rows[0].unitCost, 3)}{" "}
                = {n(current.rows[0].purchase)}
              </bdi>
              <small>
                {c.quantity} × {c.cost}
              </small>
            </div>
          </div>
        )}
        {stage === 5 && (
          <div className="decision-note">
            <span className="decision-label">{c.evidence}</span>
            <strong>{c.next}</strong>
            <p>{c.nextBody}</p>
            <div className="decision-evidence">
              <span>
                {current.rows[0].name[lang]} · {c.delta}
              </span>
              <b>
                +{n(differences[0].delta)} <small>{c.unit}</small>
              </b>
            </div>
            <p className="report-assumption">{c.assumption}</p>
          </div>
        )}
      </div>
      <div className="report-bottom">
        <span>{c.scope}</span>
        <span>
          {number(stage + 1, lang)} / {number(c.steps.length, lang)}
        </span>
      </div>
    </div>
  );
}

export function DecisionStory({ lang }: { lang: Locale }) {
  const c = storyCopy[lang];
  const ref = useRef<HTMLDivElement>(null);
  const restoredHash = useRef(false);
  const [stage, setStage] = useState(0);
  const { enhanced, active } = useSiteMotion();
  useEffect(() => {
    if (!enhanced || restoredHash.current) return;
    let cancelled = false;
    let frame = 0;
    void document.fonts.ready.then(() => {
      if (cancelled) return;
      restoredHash.current = true;
      const match = window.location.hash.match(/^#story-([0-5])$/);
      if (!match) return;
      frame = requestAnimationFrame(() => {
        const index = Number(match[1]);
        document.getElementById(`story-${index}`)?.scrollIntoView({ behavior: "instant", block: "start" });
        setStage(index);
      });
    });
    return () => { cancelled = true; cancelAnimationFrame(frame); };
  }, [enhanced]);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const syncStage = useCallback(() => {
    if (!enhanced || !ref.current) return;
    const focus =
      window.innerWidth <= 760
        ? window.innerHeight * 0.76
        : window.innerHeight * 0.5;
    const chapters = Array.from(ref.current.querySelectorAll(".story-chapter"));
    const index = chapters.reduce(
      (selected, el, i) =>
        el.getBoundingClientRect().top <= focus ? i : selected,
      0,
    );
    setStage(index);
  }, [enhanced]);
  useMotionValueEvent(scrollYProgress, "change", syncStage);
  useEffect(() => {
    if (!enhanced || !ref.current) return;
    let frame = 0;
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(syncStage);
    };
    // Report height and loaded fonts can move chapters without changing scrollY.
    const observer = new ResizeObserver(schedule);
    observer.observe(ref.current);
    window.addEventListener("resize", schedule, { passive: true });
    schedule();
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, [enhanced, syncStage]);
  return (
    <section className="decision-story" id="story" data-enhanced={enhanced}>
      <div className="container story-intro">
        <span className="eyebrow">{c.label}</span>
        <h2>{c.question}</h2>
        <p>{c.sample}</p>
      </div>
      <div className="container story-layout" ref={ref}>
        <div className="story-stage">
          <div className="story-progress">
            <motion.span style={{ scaleX: scrollYProgress }} />
          </div>
          <div
            className="stage-links"
            aria-label={lang === "fa" ? "مراحل روایت" : "Story stages"}
          >
            {c.steps.map((s, i) => (
              <a
                href={`#story-${i}`}
                aria-label={`${number(i + 1, lang)} · ${s[0]}`}
                aria-current={stage === i ? "step" : undefined}
                onClick={() => setStage(i)}
                key={s[0]}
              >
                {number(i + 1, lang)}
                <span>{s[0]}</span>
              </a>
            ))}
          </div>
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={stage}
              initial={
                active ? { opacity: 0.4, x: lang === "fa" ? -18 : 18 } : false
              }
              animate={{ opacity: 1, x: 0 }}
              exit={{
                opacity: active ? 0.4 : 1,
                x: active ? (lang === "fa" ? 12 : -12) : 0,
              }}
              transition={{ duration: active ? 0.24 : 0 }}
            >
              <ReportPanel lang={lang} stage={stage} />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="story-chapters">
          {c.steps.map(([label, title, body], i) => (
            <article
              id={`story-${i}`}
              key={label}
              className="story-chapter"
              data-active={stage === i}
            >
              <span className="chapter-number">
                {number(i + 1, lang).padStart(lang === "fa" ? 1 : 2, "0")}
                <small> / {number(c.steps.length, lang)}</small>
              </span>
              <span className="eyebrow">{label}</span>
              <h3>{title}</h3>
              <p>{body}</p>
              <div className="static-scene">
                <ReportPanel lang={lang} stage={i} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HeroReport({ lang }: { lang: Locale }) {
  const c = storyCopy[lang];
  const ref = useRef<HTMLDivElement>(null);
  const { active } = useSiteMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 35]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -1]);
  return (
    <motion.div className="hero-report-wrap" ref={ref} style={active ? { y, rotate } : undefined}>
      <div className="request-slip">
        <span>{lang === "fa" ? "پرسش مدیر" : "THE MANAGEMENT QUESTION"}</span>
        <strong>{c.question}</strong>
        <a href="#story">
          {c.openStory}
          <span aria-hidden="true">↓</span>
        </a>
      </div>
      <div className="hero-report">
        <ReportPanel lang={lang} />
      </div>
    </motion.div>
  );
}

export function AssistantPreview({ lang }: { lang: Locale }) {
  const c = storyCopy[lang];
  const sourceRef = useRef<HTMLDetailsElement>(null);
  return (
    <div className="assistant-product">
      <div className="assistant-top">
        <strong>
          {lang === "fa" ? "دانش سازمانی" : "KNOWLEDGE WORKSPACE"}
        </strong>
        <span>{c.sample}</span>
      </div>
      <div className="assistant-question">
        <span>{lang === "fa" ? "پرسش" : "QUESTION"}</span>
        <p>{c.assistantQuestion}</p>
      </div>
      <div className="assistant-response">
        <span className="eyebrow">
          {lang === "fa" ? "پاسخ مستند" : "GROUNDED RESPONSE"}
        </span>
        <p>{c.answer}</p>
        <a
          href="#sample-source"
          onClick={() => {
            if (sourceRef.current) sourceRef.current.open = true;
          }}
        >
          {c.sourceLabel}
          <span aria-hidden="true"> ↗</span>
        </a>
      </div>
      <details ref={sourceRef} className="source-document" id="sample-source">
        <summary>{c.source}</summary>
        <blockquote>{c.sourceBody}</blockquote>
        <small>{c.sourceLabel}</small>
      </details>
    </div>
  );
}

export function DashboardPreview({ lang }: { lang: Locale }) {
  const c = storyCopy[lang];
  const [stage, setStage] = useState(2);
  return (
    <div className="dashboard-product">
      <div className="preview-request">{c.question}</div>
      <div
        className="preview-controls"
        aria-label={lang === "fa" ? "حالت پیش‌نمایش" : "Preview view"}
      >
        {[2, 3, 4].map((i) => (
          <button
            type="button"
            key={i}
            aria-pressed={stage === i}
            onClick={() => setStage(i)}
          >
            {c.steps[i][0]}
          </button>
        ))}
      </div>
      <ReportPanel lang={lang} stage={stage} />
    </div>
  );
}

export function MethodLedger({ lang }: { lang: Locale }) {
  const ref = useRef<HTMLDivElement>(null);
  const { active } = useSiteMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 40%"],
  });
  const [step, setStep] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (active) setStep(Math.min(3, Math.floor(v * 4)));
  });
  const labels =
    lang === "fa"
      ? ["مسئله و تصمیم", "داده و محدودیت", "خروجی قابل آزمون", "معیار ارزیابی"]
      : [
          "Problem & decision",
          "Data & constraints",
          "Testable output",
          "Evaluation criteria",
        ];
  const notes =
    lang === "fa"
      ? [
          "چرا سود با فروش هم‌مسیر نیست؟",
          "دو دوره، سه محصول، فرض‌های روشن",
          "گزارش و ردیف‌های قابل تطبیق",
          "جمع جزئیات با کل برابر است",
        ]
      : [
          "Why is profit not following sales?",
          "Two periods, three products, explicit assumptions",
          "Report with reconcilable source rows",
          "Detail totals match the report",
        ];
  return (
    <div className="method-ledger" ref={ref}>
      <div className="ledger-label">{storyCopy[lang].sample}</div>
      {labels.map((label, i) => (
        <div
          className="ledger-row"
          key={label}
          data-active={!active || i <= step}
        >
          <span>{number(i + 1, lang)}</span>
          <div>
            <strong>{label}</strong>
            <p>{notes[i]}</p>
          </div>
          <motion.span
            initial={false}
            animate={{
              scale: !active || i <= step ? 1 : 0.5,
              opacity: !active || i <= step ? 1 : 0.25,
            }}
            transition={{ duration: active ? 0.4 : 0 }}
            aria-hidden="true"
          >
            ✓
          </motion.span>
        </div>
      ))}
    </div>
  );
}
