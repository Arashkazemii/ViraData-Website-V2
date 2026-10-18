import Link from "next/link";
import Image from "next/image";
import { ContactForm } from "./contact-form";
import { DataField, HeroWords, Reveal } from "./motion-system";
import { demos, href, type DemoId, type Locale } from "@/lib/config";
import { getCopy } from "@/lib/copy";

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
      <span aria-hidden="true">↗</span>
    </Link>
  );
}

function SectionIndex({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  return (
    <div className="section-index">
      <span>{value}</span>
      <span>{children}</span>
    </div>
  );
}

function FinalCta({ lang }: { lang: Locale }) {
  const c = getCopy(lang).home;
  return (
    <section className="final-cta">
      <div className="container final-cta-inner">
        <span className="final-orbit" aria-hidden="true" />
        <div>
          <span className="eyebrow">
            {lang === "fa" ? "گام بعدی" : "THE NEXT STEP"}
          </span>
          <h2>{c.closeTitle}</h2>
          <p>{c.closeBody}</p>
          <ArrowLink
            href={href(lang, "contact")}
            className="button button-light"
          >
            {c.closeCta}
          </ArrowLink>
        </div>
      </div>
    </section>
  );
}

export function HomePage({ lang }: { lang: Locale }) {
  const c = getCopy(lang);
  const anchors = ["assistants", "analytics", "decisions"];
  return (
    <main id="main">
      <section className="home-hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="eyebrow hero-eyebrow">
              <span className="eyebrow-line" />
              {c.home.eyebrow}
            </span>
            <h1>
              <HeroWords text={c.home.title} />
            </h1>
            <p className="hero-lead">{c.home.lead}</p>
            <div className="hero-actions">
              <ArrowLink
                href={href(lang, "solutions")}
                className="button button-primary"
              >
                {c.home.primary}
              </ArrowLink>
              <ArrowLink href={href(lang, "contact")}>
                {c.home.secondary}
              </ArrowLink>
            </div>
          </div>
          <div className="hero-graphic">
            <DataField lang={lang} />
          </div>
        </div>
        <div className="container hero-baseline">
          <span>01 / 05</span>
          <span>
            {lang === "fa" ? "شفافیت از دل پیچیدگی" : "CLARITY FROM COMPLEXITY"}
          </span>
          <span className="scroll-mark" aria-hidden="true">
            ↓
          </span>
        </div>
      </section>

      <section className="problem-section section-pad">
        <div className="container problem-grid">
          <div>
            <SectionIndex value="01">
              {lang === "fa" ? "شناخت مسئله" : "THE STARTING POINT"}
            </SectionIndex>
            <Reveal>
              <h2>{c.home.problemTitle}</h2>
            </Reveal>
          </div>
          <div className="problem-detail">
            <p className="large-copy">{c.home.problemBody}</p>
            <div className="problem-tags">
              {c.home.problemTags.map((tag, i) => (
                <span key={tag}>
                  <b>{String(i + 1).padStart(2, "0")}</b>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="families-section section-pad">
        <div className="container">
          <SectionIndex value="02">{c.home.familiesLabel}</SectionIndex>
          <div className="section-heading-row">
            <h2>
              {lang === "fa"
                ? "از دانش تا اقدام."
                : "From knowledge to action."}
            </h2>
            <p>
              {lang === "fa"
                ? "سه مسیر، هرکدام متناسب با مسئله و داده شما."
                : "Three paths, each shaped by your problem and data."}
            </p>
          </div>
          <div className="family-list">
            {c.home.families.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.06}>
                <Link
                  className="family-row"
                  href={`${href(lang, "solutions")}#${anchors[i]}`}
                >
                  <span className="family-number">0{i + 1}</span>
                  <div className="family-title">
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                  <span className="family-arrow" aria-label={item.cta}>
                    ↗
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="process-section section-pad">
        <div className="container">
          <SectionIndex value="03">
            {lang === "fa" ? "روش همکاری" : "HOW WE WORK"}
          </SectionIndex>
          <h2>{c.home.stepsTitle}</h2>
          <div className="process-line">
            {c.home.steps.map(([title, body], i) => (
              <Reveal key={title} className="process-step" delay={i * 0.08}>
                <span className="step-node">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="demo-tease section-pad">
        <div className="container demo-tease-grid">
          <div>
            <SectionIndex value="04">
              {lang === "fa" ? "پیش‌نمایش" : "A CLOSER LOOK"}
            </SectionIndex>
            <h2>{c.home.demosTitle}</h2>
            <p className="large-copy">{c.home.demosBody}</p>
            <ArrowLink
              href={href(lang, "demos")}
              className="button button-outline"
            >
              {c.home.demosCta}
            </ArrowLink>
          </div>
          <div className="demo-tease-visual">
            <div className="tease-topline">
              <span>
                {lang === "fa" ? "دو مسیر مستقل" : "TWO DISTINCT WORKSTREAMS"}
              </span>
              <span>01 / 02</span>
            </div>
            <div className="tease-rows">
              {(["dashboard", "assistant"] as DemoId[]).map((id, i) => (
                <div key={id}>
                  <span className="tease-id">0{i + 1}</span>
                  <strong>{c.demos[id].title}</strong>
                  <span className="status-pill">
                    {c.common.status[demos[id].status]}
                  </span>
                </div>
              ))}
            </div>
            <p className="sample-caption">{c.common.sample}</p>
          </div>
        </div>
      </section>
      <FinalCta lang={lang} />
    </main>
  );
}

export function SolutionsPage({ lang }: { lang: Locale }) {
  const c = getCopy(lang);
  const visuals = [
    <div key="assistants" className="solution-visual assistant-visual">
      <span className="visual-chip">01</span>
      <div className="query-line">
        {lang === "fa" ? "پرسش از دانش مجاز" : "ASK APPROVED KNOWLEDGE"}
        <span>↗</span>
      </div>
      <div className="source-lines">
        <i />
        <i />
        <i />
      </div>
      <div className="answer-line">
        <span className="answer-dot" />
        {lang === "fa" ? "پاسخ با منبع" : "ANSWER WITH SOURCE"}
      </div>
    </div>,
    <div key="analytics" className="solution-visual analytics-visual">
      <span className="visual-chip">02</span>
      <div className="analytics-bars" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="visual-axis">
        <span>{lang === "fa" ? "شاخص تعریف‌شده" : "DEFINED METRIC"}</span>
        <span>
          {lang === "fa" ? "جزئیات قابل بررسی" : "INSPECTABLE DETAIL"}
        </span>
      </div>
    </div>,
    <div key="decisions" className="solution-visual decision-visual">
      <span className="visual-chip">03</span>
      <div className="decision-path">
        <span>{lang === "fa" ? "فرض" : "INPUT"}</span>
        <i />
        <span>{lang === "fa" ? "سناریو" : "SCENARIO"}</span>
        <i />
        <span>{lang === "fa" ? "اقدام" : "ACTION"}</span>
      </div>
    </div>,
  ];
  return (
    <main id="main">
      <section className="interior-hero solutions-hero">
        <div className="container interior-hero-grid">
          <div>
            <span className="eyebrow">{c.nav[1]} / 01—03</span>
            <h1>{c.solutions.title}</h1>
            <p>{c.solutions.lead}</p>
          </div>
          <div
            className="solution-toc"
            aria-label={
              lang === "fa" ? "بخش‌های راهکارها" : "Solutions sections"
            }
          >
            {c.solutions.items.map((item, i) => (
              <a key={item.id} href={`#${item.id}`}>
                <span>0{i + 1}</span>
                {item.title}
                <span aria-hidden="true">↓</span>
              </a>
            ))}
          </div>
        </div>
      </section>
      {c.solutions.items.map((item, i) => (
        <section
          key={item.id}
          id={item.id}
          className={`solution-section section-pad solution-section--${i + 1}`}
        >
          <div className="container">
            <SectionIndex value={`0${i + 1}`}>{item.title}</SectionIndex>
            <div className="solution-main">
              <div className="solution-copy">
                <Reveal>
                  <h2>{item.title}</h2>
                </Reveal>
                <p className="large-copy">{item.intro}</p>
                <div className="solution-details">
                  <div>
                    <h3>{c.solutions.labels[0]}</h3>
                    <p>{item.examples}</p>
                  </div>
                  <div>
                    <h3>{c.solutions.labels[1]}</h3>
                    <p>{item.inputs}</p>
                  </div>
                  <div>
                    <h3>{c.solutions.labels[2]}</h3>
                    <p>{item.output}</p>
                  </div>
                </div>
                <ArrowLink
                  href={href(lang, "contact")}
                  className="button button-outline"
                >
                  {item.cta}
                </ArrowLink>
              </div>
              <Reveal className="visual-reveal">{visuals[i]}</Reveal>
            </div>
          </div>
        </section>
      ))}
      <section className="deployment-note">
        <div className="container">
          <span className="eyebrow">
            {lang === "fa" ? "تناسب با شرایط پروژه" : "BUILT FOR CONTEXT"}
          </span>
          <p>{c.solutions.closing}</p>
        </div>
      </section>
      <FinalCta lang={lang} />
    </main>
  );
}

export function DemosPage({ lang }: { lang: Locale }) {
  const c = getCopy(lang);
  return (
    <main id="main">
      <section className="interior-hero demos-hero">
        <div className="container">
          <span className="eyebrow">{c.nav[2]} / 02</span>
          <h1>{c.demos.title}</h1>
          <p>{c.demos.lead}</p>
          <div className="demo-hero-line" aria-hidden="true">
            <span />
            <span />
          </div>
        </div>
      </section>
      <div className="container demos-list">
        {(["dashboard", "assistant"] as DemoId[]).map((id, i) => {
          const item = c.demos[id],
            settings = demos[id];
          const validUrl = settings.url && /^https:\/\//.test(settings.url);
          const canLaunch = settings.status !== "planned" && validUrl;
          return (
            <section className="demo-entry" key={id} id={id}>
              <div className="demo-entry-heading">
                <span className="demo-ordinal">0{i + 1} / 02</span>
                <span className="status-pill">
                  {c.common.status[settings.status]}
                </span>
              </div>
              <div className="demo-entry-grid">
                <div>
                  <Reveal>
                    <h2>{item.title}</h2>
                  </Reveal>
                  <p className="large-copy">{item.summary}</p>
                  <div className="demo-prompts">
                    <h3>{c.demos.promptLabel}</h3>
                    {item.prompts.map((prompt) => (
                      <blockquote key={prompt}>“{prompt}”</blockquote>
                    ))}
                  </div>
                </div>
                <Reveal className="visual-reveal">
                  <div
                    className={`demo-art demo-art--${id}`}
                    role="img"
                    aria-label={c.common.sample}
                  >
                    <span className="art-sample">{c.common.sample}</span>
                    {id === "dashboard" ? (
                      <>
                        <div className="art-chart">
                          <i />
                          <i />
                          <i />
                          <i />
                          <i />
                        </div>
                        <div className="art-lines">
                          <span />
                          <span />
                          <span />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="art-question">?</div>
                        <div className="art-answer">
                          <i />
                          <i />
                          <i />
                        </div>
                      </>
                    )}
                  </div>
                </Reveal>
              </div>
              <div className="demo-foot">
                <div>
                  <h3>{c.demos.limitation}</h3>
                  <p>{item.limits}</p>
                </div>
                {canLaunch ? (
                  <a
                    className="button button-outline"
                    href={settings.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {c.common.demoCta[settings.status]} ↗
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
        <p className="demo-disclaimer">{c.demos.note}</p>
      </div>
      <FinalCta lang={lang} />
    </main>
  );
}

export function AboutPage({ lang }: { lang: Locale }) {
  const c = getCopy(lang);
  return (
    <main id="main">
      <section className="interior-hero about-hero">
        <div className="container about-hero-grid">
          <div>
            <span className="eyebrow">{c.nav[3]} / VIRADATA</span>
            <h1>{c.about.title}</h1>
            <p>{c.about.lead}</p>
          </div>
          <div className="about-symbol">
            <Image src="/logo-1.png" alt="" width={500} height={500} />
            <span>
              {lang === "fa"
                ? "از پیچیدگی تا وضوح"
                : "FROM COMPLEXITY TO CLARITY"}
            </span>
          </div>
        </div>
      </section>
      <section className="about-method section-pad">
        <div className="container about-method-grid">
          <div>
            <SectionIndex value="01">{c.about.howTitle}</SectionIndex>
            <h2>{c.about.howTitle}</h2>
            <p className="large-copy">{c.about.howBody}</p>
          </div>
          <div className="principles">
            {c.about.principles.map(([title, body], i) => (
              <div key={title}>
                <span>0{i + 1}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="about-team">
        <div className="container">
          <SectionIndex value="02">
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
      <FinalCta lang={lang} />
    </main>
  );
}

export function ContactPage({ lang }: { lang: Locale }) {
  const c = getCopy(lang);
  return (
    <main id="main">
      <section className="interior-hero contact-hero">
        <div className="container contact-hero-grid">
          <div>
            <span className="eyebrow">{c.nav[4]} / 01</span>
            <h1>{c.contact.title}</h1>
            <p>{c.contact.lead}</p>
            <div className="contact-decoration" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </div>
          <ContactForm lang={lang} />
        </div>
      </section>
    </main>
  );
}
