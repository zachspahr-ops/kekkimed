import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Braces,
  CheckCircle2,
  CircleDot,
  FileSearch,
  Fingerprint,
  LockKeyhole,
  Network,
  ShieldCheck,
  Sparkles,
  Waypoints,
} from "lucide-react";
import styles from "./page.module.css";

const metrics = [
  { value: "22,132", label: "records analyzed" },
  { value: "0", label: "parser errors in the QA run" },
  { value: "4,216", label: "canonical concepts" },
  { value: "10,930", label: "network-ready relationships" },
];

const pipeline = [
  {
    number: "01",
    icon: FileSearch,
    title: "Inspect the source",
    text: "Profile heterogeneous records, repair answer targets, and quarantine malformed inputs before analysis.",
  },
  {
    number: "02",
    icon: Fingerprint,
    title: "Resolve the language",
    text: "Map clinical wording and synonyms to a controlled concept layer while preserving uncertainty.",
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Gate for precision",
    text: "Accept only high-confidence targets automatically; route ambiguous cases into explicit review queues.",
  },
  {
    number: "04",
    icon: Waypoints,
    title: "Build the network",
    text: "Connect clues, decisions, and common alternatives into interpretable educational structures.",
  },
];

const roleItems = [
  "Clinical problem framing",
  "Ontology and schema design",
  "Parser and validation logic",
  "Error analysis and iteration",
  "Network interpretation",
  "Product translation",
];

export default function Home() {
  return (
    <main id="main" className={styles.page}>
      <a className={styles.skipLink} href="#project">
        Skip to project
      </a>

      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="Kekki home">
          <span className={styles.brandMark}>K</span>
          <span>
            <strong>Kekki</strong>
            <small>Clinical knowledge engineering</small>
          </span>
        </Link>
        <nav className={styles.nav} aria-label="Primary navigation">
          <a href="#project">Project</a>
          <a href="#method">Method</a>
          <a href="#validation">Validation</a>
          <Link className={styles.navCta} href="/explore">
            Explore the network
            <ArrowUpRight aria-hidden="true" size={15} />
          </Link>
        </nav>
      </header>

      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroCopy}>
          <div className={styles.eyebrow}>
            <span className={styles.liveDot} />
            Fellowship project portfolio
          </div>
          <h1 id="hero-title">
            Turning clinical learning data into a map of <em>what matters.</em>
          </h1>
          <p className={styles.heroLead}>
            A physician-built, precision-first pipeline that transforms a
            22,132-record educational corpus into structured, auditable clinical
            concepts—and then into tools for more adaptive learning.
          </p>
          <div className={styles.heroActions}>
            <Link className={styles.primaryButton} href="/explore">
              Open the interactive analysis
              <ArrowUpRight aria-hidden="true" size={17} />
            </Link>
            <a className={styles.textLink} href="#method">
              Read the method
              <ArrowDown aria-hidden="true" size={16} />
            </a>
          </div>
          <p className={styles.heroNote}>
            Selected snapshots from an evolving clinical knowledge system.
            Aggregate signals only; no source questions are published.
          </p>
        </div>

        <div className={styles.heroVisual} aria-label="Clinical knowledge pipeline overview">
          <div className={styles.visualTopline}>
            <span>ANALYSIS / VALIDATION</span>
            <span>v4.3 snapshot</span>
          </div>
          <div className={styles.visualTitle}>
            <div>
              <small>Precision-first parser QA</small>
              <strong>Validated network inputs</strong>
            </div>
            <span className={styles.statusPill}>
              <CheckCircle2 aria-hidden="true" size={13} />
              passed
            </span>
          </div>

          <div className={styles.networkMap} aria-hidden="true">
            <span className={`${styles.edge} ${styles.edgeOne}`} />
            <span className={`${styles.edge} ${styles.edgeTwo}`} />
            <span className={`${styles.edge} ${styles.edgeThree}`} />
            <span className={`${styles.edge} ${styles.edgeFour}`} />
            <span className={`${styles.edge} ${styles.edgeFive}`} />
            <span className={`${styles.edge} ${styles.edgeSix}`} />
            <span className={`${styles.node} ${styles.nodeOne}`} />
            <span className={`${styles.node} ${styles.nodeTwo}`} />
            <span className={`${styles.node} ${styles.nodeThree}`} />
            <span className={`${styles.node} ${styles.nodeFour}`} />
            <span className={`${styles.node} ${styles.nodeFive}`} />
            <span className={`${styles.node} ${styles.nodeSix}`} />
            <span className={`${styles.node} ${styles.nodeSeven}`} />
            <span className={`${styles.node} ${styles.nodeEight}`} />
            <span className={styles.mapLabelOne}>clinical finding</span>
            <span className={styles.mapLabelTwo}>decision target</span>
            <span className={styles.mapLabelThree}>distractor</span>
          </div>

          <div className={styles.visualStats}>
            <div>
              <span>Accepted-high coverage</span>
              <strong>66.2%</strong>
              <i><b style={{ width: "66.2%" }} /></i>
            </div>
            <div>
              <span>Observed precision*</span>
              <strong>100%</strong>
              <i><b style={{ width: "100%" }} /></i>
            </div>
          </div>
          <p className={styles.statFootnote}>
            *Among 223 reviewed high-precision assignments in this snapshot.
          </p>
        </div>
      </section>

      <section className={styles.metricBand} aria-label="Project metrics">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </div>
        ))}
      </section>

      <section id="project" className={styles.problemSection}>
        <div className={styles.sectionIntro}>
          <span className={styles.sectionIndex}>01 / THE PROBLEM</span>
          <h2>Most learning analytics stop at a score.</h2>
        </div>
        <div className={styles.problemGrid}>
          <p className={styles.problemLead}>
            A percentage can say that a learner struggled. It cannot explain
            which clinical distinctions are repeatedly confused—or what should
            be studied together next.
          </p>
          <div className={styles.problemText}>
            <p>
              The project asks a more useful question: can we recover the
              structure beneath a large educational corpus without sacrificing
              auditability?
            </p>
            <p>
              The answer required more than a visualization. It required a
              reliable data layer: repaired targets, controlled vocabulary,
              explicit confidence bands, source-family checks, and reproducible
              validation gates.
            </p>
          </div>
        </div>
      </section>

      <section id="method" className={styles.methodSection}>
        <div className={styles.sectionIntroRow}>
          <div className={styles.sectionIntro}>
            <span className={styles.sectionIndex}>02 / THE METHOD</span>
            <h2>Precision before pattern.</h2>
          </div>
          <p>
            A four-stage pipeline turns messy text into network-ready evidence
            while keeping uncertainty visible.
          </p>
        </div>
        <div className={styles.pipelineGrid}>
          {pipeline.map((step) => {
            const Icon = step.icon;
            return (
              <article key={step.number} className={styles.pipelineCard}>
                <div className={styles.cardTop}>
                  <span>{step.number}</span>
                  <Icon aria-hidden="true" size={21} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section id="validation" className={styles.validationSection}>
        <div className={styles.validationCopy}>
          <span className={styles.sectionIndex}>03 / VALIDATION</span>
          <h2>Built to reveal its own uncertainty.</h2>
          <p>
            The system separates high-confidence automation from cases that
            require review. Precision is reported only on manually examined
            assignments—not implied across the full corpus.
          </p>
          <div className={styles.validationChecks}>
            <span><CheckCircle2 aria-hidden="true" size={17} /> Zero parser errors in the full QA run</span>
            <span><CheckCircle2 aria-hidden="true" size={17} /> Source-family coverage tracked independently</span>
            <span><CheckCircle2 aria-hidden="true" size={17} /> Malformed records quarantined and accounted for</span>
            <span><CheckCircle2 aria-hidden="true" size={17} /> Ambiguous targets routed to review queues</span>
          </div>
          <Link className={styles.inlineLink} href="/explore">
            Inspect the validation dashboard
            <ArrowUpRight aria-hidden="true" size={16} />
          </Link>
        </div>

        <div className={styles.validationPanel} aria-label="Validation summary">
          <div className={styles.panelHeader}>
            <span>QUALITY GATES</span>
            <CircleDot aria-hidden="true" size={16} />
          </div>
          <div className={styles.gateRow}>
            <span>Parser integrity</span>
            <i><b style={{ width: "100%" }} /></i>
            <strong>PASS</strong>
          </div>
          <div className={styles.gateRow}>
            <span>Exact lexical precision</span>
            <i><b style={{ width: "100%" }} /></i>
            <strong>PASS</strong>
          </div>
          <div className={styles.gateRow}>
            <span>Mechanism precision</span>
            <i><b style={{ width: "100%" }} /></i>
            <strong>PASS</strong>
          </div>
          <div className={styles.gateRow}>
            <span>Accepted-high coverage</span>
            <i><b className={styles.partialBar} style={{ width: "66.2%" }} /></i>
            <strong className={styles.reviewLabel}>ITERATE</strong>
          </div>
          <div className={styles.panelNote}>
            <Braces aria-hidden="true" size={19} />
            <p>
              <strong>The design principle</strong>
              A trustworthy “not yet classified” is more useful than a confident
              error.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.translationSection}>
        <div className={styles.translationCard}>
          <div className={styles.translationCopy}>
            <span className={styles.sectionIndex}>04 / TRANSLATION</span>
            <h2>From analysis to an adaptive learning system.</h2>
            <p>
              Kekki is the product expression of this work: a private internal
              medicine study platform designed to turn performance analytics
              into structured gaps, focused review clusters, and a tighter
              learning loop.
            </p>
            <div className={styles.translationFlow} aria-label="Kekki learning loop">
              <span>Analytics</span>
              <ArrowUpRight aria-hidden="true" size={14} />
              <span>Structured gaps</span>
              <ArrowUpRight aria-hidden="true" size={14} />
              <span>Review plan</span>
              <ArrowUpRight aria-hidden="true" size={14} />
              <span>Feedback</span>
            </div>
          </div>
          <div className={styles.productMark} aria-hidden="true">
            <div className={styles.productOrbitOne} />
            <div className={styles.productOrbitTwo} />
            <div className={styles.productCore}>K</div>
            <span className={styles.orbitLabelOne}>map</span>
            <span className={styles.orbitLabelTwo}>review</span>
            <span className={styles.orbitLabelThree}>adapt</span>
          </div>
        </div>
      </section>

      <section className={styles.roleSection}>
        <div>
          <span className={styles.sectionIndex}>05 / MY ROLE</span>
          <h2>Clinician, analyst, and builder.</h2>
          <p>
            I designed and developed the project end to end, moving between the
            clinical question, the technical implementation, and the educational
            use case.
          </p>
        </div>
        <div className={styles.roleList}>
          {roleItems.map((item, index) => (
            <span key={item}>
              <small>{String(index + 1).padStart(2, "0")}</small>
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className={styles.boundarySection}>
        <div className={styles.boundaryIcon}>
          <LockKeyhole aria-hidden="true" size={24} />
        </div>
        <div>
          <span className={styles.sectionIndex}>PROJECT BOUNDARIES</span>
          <h2>Designed for responsible educational use.</h2>
        </div>
        <p>
          The public exhibit contains aggregate metrics and derived concept
          relationships only. It publishes no source question stems, answer
          choices, rationales, patient information, or clinical guidance.
        </p>
      </section>

      <section className={styles.finalCta}>
        <div className={styles.ctaSpark} aria-hidden="true">
          <Sparkles size={22} />
        </div>
        <span className={styles.sectionIndex}>EXPLORE THE WORK</span>
        <h2>See the clinical structure emerge.</h2>
        <p>
          Search the network, inspect relationships, compare analysis stages,
          and review the validation evidence.
        </p>
        <Link className={styles.primaryButtonLight} href="/explore">
          Launch interactive exhibit
          <Network aria-hidden="true" size={18} />
        </Link>
      </section>

      <footer className={styles.footer}>
        <div className={styles.brand}>
          <span className={styles.brandMark}>K</span>
          <span>
            <strong>Kekki</strong>
            <small>Physician-built clinical knowledge systems</small>
          </span>
        </div>
        <div className={styles.footerMeta}>
          <span>Educational research portfolio</span>
          <Link href="/login">
            Private application
            <ArrowUpRight aria-hidden="true" size={14} />
          </Link>
        </div>
      </footer>
    </main>
  );
}
