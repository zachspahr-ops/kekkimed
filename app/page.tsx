import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import styles from "./work-index.module.css";

const work = [
  {
    index: "01",
    href: "/reviewer/compare",
    label: "Primary tool",
    title: "Parse comparison",
    description:
      "Compare legacy entity mentions with validated v7.5.1 annotations over the same ten public MedQA examples.",
    meta: "10 MedQA examples · side by side · review state saved locally",
    featured: true,
  },
  {
    index: "02",
    href: "/network/7.5.1",
    label: "Current network",
    title: "7.5.1",
    description:
      "Explore the corrected, exact-identity clinical concept network with aggregate association evidence and specialty filters.",
    meta: "exact-API non-LOINC release · public aggregate build",
    featured: true,
  },
  {
    index: "03",
    href: "/reviewer",
    label: "Preserved tool",
    title: "v4.3",
    description:
      "Open the original legacy-only entity reviewer for the same ten MedQA examples.",
    meta: "legacy parser · unchanged",
  },
  {
    index: "04",
    href: "/network/4.9",
    label: "Network release",
    title: "4.9",
    description:
      "Answer-choice entity topology with clinical-domain and role views.",
    meta: "entity level · historical release",
  },
  {
    index: "05",
    href: "/network/5.0",
    label: "Network release",
    title: "5.0",
    description:
      "Association statistics, cross-source replication, and community structure.",
    meta: "entity level · historical release",
  },
  {
    index: "06",
    href: "/network/5.1",
    label: "Network release",
    title: "5.1",
    description:
      "Canonical-concept network with exact answer choices preserved for audit.",
    meta: "concept level · historical release",
  },
  {
    index: "07",
    href: "/network/5.4",
    label: "Network release",
    title: "5.4",
    description:
      "All-entity analysis with focused evidence networks and reviewed community labels.",
    meta: "concept level · historical release",
  },
];

export default function Home() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.wordmark} href="/" aria-label="Kekki home">
          kekki
        </Link>
        <span>clinical knowledge systems</span>
      </header>

      <section className={styles.intro} aria-labelledby="page-title">
        <p>Selected work / 2026</p>
        <h1 id="page-title">Clinical data, parsed and mapped.</h1>
        <div className={styles.introMeta}>
          <p>
            Working interfaces from a physician-built pipeline for turning
            medical education data into reviewable concepts and networks.
          </p>
          <p>Open a tool below.</p>
        </div>
      </section>

      <nav className={styles.workGrid} aria-label="Project tools">
        {work.map((item) => (
          <a
            className={item.featured ? styles.featuredCard : styles.card}
            href={item.href}
            key={item.href}
          >
            <div className={styles.cardTop}>
              <span>{item.index}</span>
              <span>{item.label}</span>
              <span aria-hidden="true">↗</span>
            </div>
            <div className={styles.cardBody}>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
            <p className={styles.cardMeta}>{item.meta}</p>
          </a>
        ))}
      </nav>

      <footer className={styles.footer}>
        <span>Educational research portfolio</span>
        <Link href="/login">Private application</Link>
      </footer>
      <Analytics />
    </main>
  );
}
