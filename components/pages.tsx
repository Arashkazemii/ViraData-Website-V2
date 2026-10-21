import Link from "next/link";
import Image from "next/image";
import { ContactForm } from "./contact-form";
import { HeroWords, Reveal } from "./motion-system";
import { HeroAtmosphere, Magnetic } from "./signature-motion";
import { ArrowUpRight, ChartBar, ChatsCircle, TreeStructure, ShieldCheck, Stack, Target } from "@phosphor-icons/react/dist/ssr";
import {
  DecisionStory,
  HeroReport,
  AssistantPreview,
  DashboardPreview,
  MethodLedger,
} from "./decision-story";
import { demos, href, site, type DemoId, type Locale } from "@/lib/config";
import { getCopy } from "@/lib/copy";
import { storyCopy } from "@/lib/story-copy";
import { number } from "@/lib/story-data";

function ArrowLink({
  href: to,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link className={`arrow-link ${className}`} href={to}>
      {children}
      <ArrowUpRight size={18} aria-hidden="true" />
    </Link>
  );
}
function SectionIndex({ children }: {
  children: React.ReactNode;
}) {
  return (
    <div className="section-index">
      <span className="section-marker" aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}

export function HomePage({ lang }: { lang: Locale }) {
  const c = getCopy(lang);
  const s = storyCopy[lang];
  return (
    <main id="main" className="home-page">
      <section className="home-hero">
        <HeroAtmosphere />
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="eyebrow hero-eyebrow">{c.home.eyebrow}</span>
            <h1>
              <HeroWords text={c.home.title} />
            </h1>
            <p className="hero-lead">{c.home.lead}</p>
            <div className="hero-actions">
              <Magnetic><ArrowLink href="#story" className="button button-primary">
                {s.openStory}
              </ArrowLink></Magnetic>
              <ArrowLink href={href(lang, "solutions")}>
                {c.home.primary}
              </ArrowLink>
            </div>
          </div>
          <HeroReport lang={lang} />
        </div>
      </section>
      <div className="confidence-strip container">
        <span><Stack size={20} aria-hidden="true" />{lang === "fa" ? "متناسب با جریان کار شما" : "Built around your workflow"}</span>
        <span><ShieldCheck size={20} aria-hidden="true" />{lang === "fa" ? "شفاف و قابل بررسی" : "Traceable by design"}</span>
        <span><Target size={20} aria-hidden="true" />{lang === "fa" ? "از پرسش تا اقدام" : "From question to action"}</span>
      </div>
      <section className="families-section section-pad">
        <div className="container">
          <SectionIndex>
            {c.home.familiesLabel}
          </SectionIndex>
          <Reveal className="section-heading-row">
            <h2>
              {lang === "fa"
                ? "از دانش تا اقدام."
                : "From knowledge to action."}
            </h2>
            <p>
              {lang === "fa"
                ? "شش حوزه، هرکدام متناسب با مسئله و داده شما."
                : "Six areas, each shaped by your problem and data."}
            </p>
          </Reveal>
          <div className="family-list">
            {c.home.families.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08} className={`family-card family-card--${i}`}>
                <Link
                  className="family-row"
                  href={`${href(lang, "solutions")}#${c.solutions.items[i].id}`}
                >
                  <span className="family-icon" aria-hidden="true">
                  {i % 3 === 0 ? <ChatsCircle size={30} weight="duotone" /> : i % 3 === 1 ? <ChartBar size={30} weight="duotone" /> : <TreeStructure size={30} weight="duotone" />}
                  </span>
                  <div className="family-title">
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                  <span className="family-arrow" aria-label={item.cta}>
                    <ArrowUpRight size={22} aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <DecisionStory lang={lang} />
      <section className="problem-section section-pad">
        <Reveal className="container problem-grid">
          <div>
            <h2>{c.home.problemTitle}</h2>
          </div>
          <div className="problem-detail">
            <p className="large-copy">{c.home.problemBody}</p>
            <div className="problem-tags">
              {c.home.problemTags.map((tag, i) => (
                <span key={tag}>
                  <b>{number(i + 1, lang)}</b>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
      <section className="process-section section-pad">
        <div className="container process-editorial">
          <div>
            <h2>{c.home.stepsTitle}</h2>
            <MethodLedger lang={lang} />
          </div>
          <div className="process-notes">
            {c.home.steps.map(([title, body], i) => (
              <Reveal key={title} delay={i * 0.05}>
                <article>
                  <span>{number(i + 1, lang)}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="demo-tease section-pad">
        <div className="container">
          <Reveal className="section-heading-row">
            <div>
              <h2>{c.home.demosTitle}</h2>
            </div>
            <p>{c.home.demosBody}</p>
          </Reveal>
          <div className="demo-gateways">
            {(["dashboard", "assistant"] as DemoId[]).map((id, i) => (
              <Link
                href={`${href(lang, "demos")}#${id}`}
                key={id}
                className={`demo-gateway gateway-${id}`}
              >
                <span className="status-pill">
                  {c.common.status[demos[id].status]}
                </span>
                <h3>{c.demos[id].title}</h3>
                <p>{i === 0 ? s.question : s.assistantQuestion}</p>
                <strong>
                  {i === 0
                    ? lang === "fa"
                      ? "درخواست / گزارش / جزئیات"
                      : "REQUEST / REPORT / DETAIL"
                    : lang === "fa"
                      ? "پرسش / پاسخ / منبع"
                      : "QUESTION / ANSWER / SOURCE"}
                </strong>
                <span className="gateway-arrow" aria-hidden="true">
                  ↗
                </span>
              </Link>
            ))}
          </div>
          <ArrowLink href={href(lang, "demos")}>{c.home.demosCta}</ArrowLink>
        </div>
      </section>
      <section className="home-close section-pad">
        <div className="container">
          <h2>{c.home.closeTitle}</h2>
          <div>
            <p>{c.home.closeBody}</p>
            <ArrowLink
              href={href(lang, "contact")}
              className="button button-primary"
            >
              {c.home.closeCta}
            </ArrowLink>
          </div>
        </div>
      </section>
    </main>
  );
}

export function SolutionsPage({ lang }: { lang: Locale }) {
  const c = getCopy(lang);
  return (
    <main id="main" className="solutions-page">
      <section className="interior-hero solutions-hero">
        <div className="container">
          <span className="eyebrow">{c.nav[1]}</span>
          <h1><HeroWords text={c.solutions.title} /></h1>
          <div className="solutions-intro">
            <p>{c.solutions.lead}</p>
            <nav
              className="solution-toc"
              aria-label={
                lang === "fa" ? "بخش‌های راهکارها" : "Solutions sections"
              }
            >
              {c.solutions.items.map((item, i) => (
                <a key={item.id} href={`#${item.id}`}>
                  <span>{number(i + 1, lang)}</span>
                  {item.title}
                  <span aria-hidden="true">↓</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>
      <div className="solution-segments">
      {c.solutions.items.map((item, i) => (
        <section
          key={item.id}
          id={item.id}
          className="solution-section section-pad"
        >
          <div className="container">
            <SectionIndex>
              {number(i + 1, lang)} / {number(c.solutions.items.length, lang)}
            </SectionIndex>
            <Reveal className="segment-heading">
              <h2>{item.title}</h2>
              <p>{item.intro}</p>
            </Reveal>
            <Reveal className="segment-cases">
              {item.cases.map(([problem, approach], j) => (
                <article className="segment-case" key={problem}>
                  <span>{number(j + 1, lang)}</span>
                  <div><h3>{problem}</h3><p>{approach}</p></div>
                </article>
              ))}
            </Reveal>
            <ArrowLink href={href(lang, "contact")} className="button button-outline">{item.cta}</ArrowLink>
          </div>
        </section>
      ))}
      </div>
      <section className="deployment-note">
        <div className="container">
          <span className="eyebrow">
            {lang === "fa" ? "تناسب با شرایط پروژه" : "BUILT FOR CONTEXT"}
          </span>
          <p>{c.solutions.closing}</p>
        </div>
      </section>
    </main>
  );
}

export function DemosPage({ lang }: { lang: Locale }) {
  const c = getCopy(lang);
  return (
    <main id="main" className="demos-page">
      <section className="interior-hero demos-hero">
        <div className="container">
          <span className="eyebrow">
            {lang === "fa" ? "آزمایشگاه ایده‌ها" : "THE CONCEPT LAB"}
          </span>
          <h1><HeroWords text={c.demos.title} /></h1>
          <p>{c.demos.lead}</p>
          <div className="lab-index">
            <a href="#dashboard">{c.demos.dashboard.title} ↓</a>
            <a href="#assistant">{c.demos.assistant.title} ↓</a>
          </div>
        </div>
      </section>
      <div className="container demos-list">
        {(["dashboard", "assistant"] as DemoId[]).map((id, i) => {
          const item = c.demos[id],
            settings = demos[id];
          const canLaunch =
            settings.status !== "planned" &&
            settings.url &&
            /^https:\/\//.test(settings.url);
          return (
            <section
              className={`demo-entry demo-entry--${id}`}
              key={id}
              id={id}
            >
              <div className="demo-entry-heading">
                <span className="demo-ordinal">
                  {number(i + 1, lang)} / {number(2, lang)}
                </span>
                <span className="status-pill">
                  {c.common.status[settings.status]}
                </span>
              </div>
              <div className="demo-entry-grid">
                <div className="demo-description">
                  <h2>{item.title}</h2>
                  <p className="large-copy">{item.summary}</p>
                  <div className="demo-prompts">
                    <h3>{c.demos.promptLabel}</h3>
                    {item.prompts.map((p) => (
                      <blockquote key={p}>{p}</blockquote>
                    ))}
                  </div>
                </div>
                <div>
                  {id === "dashboard" ? (
                    <DashboardPreview lang={lang} />
                  ) : (
                    <AssistantPreview lang={lang} />
                  )}
                </div>
              </div>
              <div className="demo-foot">
                {canLaunch ? (
                  <a
                    className="button button-outline"
                    href={settings.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {c.common.demoCta[settings.status]}
                  </a>
                ) : (
                  <ArrowLink
                    href={href(lang, "contact")}
                    className="button button-outline"
                  >
                    {c.common.demoCta.planned}
                  </ArrowLink>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}

export function AboutPage({ lang }: { lang: Locale }) {
  const c = getCopy(lang);
  return (
    <main id="main" className="about-page">
      <section className="interior-hero about-hero">
        <div className="container about-hero-grid">
          <div>
            <span className="eyebrow">{c.nav[3]} / ViraData</span>
            <h1><HeroWords text={c.about.title} /></h1>
            <p>{c.about.lead}</p>
          </div>
          <div className="practice-file">
            <div className="practice-file-header">
              <Image src={site.logoPath} alt="" width={80} height={80} />
              <span>
                {lang === "fa"
                  ? "یادداشت روش همکاری"
                  : "A NOTE ON OUR PRACTICE"}
              </span>
            </div>
            <MethodLedger lang={lang} />
            <span className="practice-signature">
              ViraData /{" "}
              {lang === "fa"
                ? "از درخواست تا تصمیم"
                : "From request to decision"}
            </span>
          </div>
        </div>
      </section>
      <section className="about-method section-pad">
        <div className="container about-method-grid">
          <div>
            <SectionIndex>
              {c.about.howTitle}
            </SectionIndex>
            <h2>{c.about.howTitle}</h2>
            <p className="large-copy">{c.about.howBody}</p>
          </div>
          <div className="principles">
            {c.about.principles.map(([title, body], i) => (
              <div key={title}>
                <span>{number(i + 1, lang)}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="about-team">
        <div className="container">
          <SectionIndex>
            {lang === "fa" ? "همکاری" : "THE PRACTICE"}
          </SectionIndex>
          <p>{c.about.team}</p>
          <ArrowLink
            href={href(lang, "contact")}
            className="button button-outline"
          >
            {c.about.cta}
          </ArrowLink>
        </div>
      </section>
    </main>
  );
}

export function ContactPage({ lang }: { lang: Locale }) {
  const c = getCopy(lang);
  return (
    <main id="main" className="contact-page">
      <section className="interior-hero contact-hero">
        <div className="container contact-hero-grid">
          <div>
            <span className="eyebrow">{c.nav[4]}</span>
            <h1><HeroWords text={c.contact.title} /></h1>
            <p>{c.contact.lead}</p>
            <a className="contact-email" href="mailto:vp.sales@viradataco.com" dir="ltr">vp.sales@viradataco.com</a>
            <ol className="contact-prompts">
              {(lang === "fa"
                ? [
                    "چه تصمیمی باید روشن‌تر شود؟",
                    "داده‌ها امروز کجا هستند؟",
                    "چه خروجی‌ای برای شما قابل استفاده است؟",
                  ]
                : [
                    "Which decision needs more clarity?",
                    "Where does your data live today?",
                    "What would a useful outcome look like?",
                  ]
              ).map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ol>
          </div>
          <ContactForm lang={lang} />
        </div>
      </section>
    </main>
  );
}
