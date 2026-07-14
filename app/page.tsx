import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import styles from "./work-index.module.css";

const work = [
  {
    index: "01",
    href: "/reviewer",
    label: "Primary tool",
    title: "Question parse reviewer",
    description:
      "Inspect extracted entities in context, open their parser metadata, and record accept or flag decisions.",
    meta: "10 public MedQA examples · review state saved locally",
    featured: true,
  },
  {
    index: "02",
    href: "/network/4.9",
    label: "Network release",
    title: "4.9",
    description:
      "Answer-choice entity topology with clinical-domain and role views.",
    meta: "entity level · curated analytical subset",
  },
  {
    index: "03",
    href: "/network/5.0",
    label: "Network release",
    title: "5.0",
    description:
      "Association statistics, cross-source replication, and community structure.",
    meta: "entity level · enriched associations",
  },
  {
    index: "04",
    href: "/network/5.1",
    label: "Network release",
    title: "5.1",
    description:
      "Canonical-concept network with exact answer choices preserved for audit.",
    meta: "concept level · current release",
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
