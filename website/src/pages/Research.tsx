import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { portalLinks, publicationSearches } from "@/data/nciDoseTools";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  ExternalLink,
  FileText,
  Globe2,
  LockKeyhole,
  MessageSquare,
} from "lucide-react";

const portalCards = [
  {
    icon: Globe2,
    eyebrow: "Public Orientation",
    title: "ncidosetools.com",
    description:
      "A readable front door for the NCI Dose Tools ecosystem. This site explains what the tools do, who they are for, and where different users should go next.",
    href: "https://ncidosetools.com",
    linkText: "Current site",
  },
  {
    icon: BadgeCheck,
    eyebrow: "Official NCI Source",
    title: "DCEG Radiation Dosimetry Tools",
    description:
      "The authoritative NCI page for official context, access instructions, and the Software Transfer Agreement pathway for non-commercial research use.",
    href: portalLinks.officialNci,
    linkText: "Open official NCI page",
  },
  {
    icon: BookOpen,
    eyebrow: "Technical Portal",
    title: "GitHub: ncidosimetry/ncidosetools",
    description:
      "The technical home for manuals, release information, version history, Q&A, REST API resources, and implementation-oriented documentation.",
    href: portalLinks.github,
    linkText: "Open GitHub",
  },
  {
    icon: LockKeyhole,
    eyebrow: "Approved Users",
    title: "Google Group + Drive Repository",
    description:
      "A membership-based channel for users with approved access, including release announcements and controlled file distribution.",
    href: portalLinks.googleGroup,
    linkText: "Open Google Group",
  },
];

const userPaths = [
  {
    title: "First-time visitor",
    text: "Start here for plain-language tool summaries, modality coverage, and access options.",
    href: "/tools",
    linkText: "View tool summaries",
    external: false,
  },
  {
    title: "Research user",
    text: "Use the DCEG page and STA form for official access, then use GitHub and the approved-user group after approval.",
    href: "/researchers",
    linkText: "Research access path",
    external: false,
  },
  {
    title: "Commercial vendor",
    text: "Review the vendor overview, then contact the NCI Technology Transfer Center for licensing.",
    href: "/vendors",
    linkText: "Vendor integration path",
    external: false,
  },
  {
    title: "Technical implementer",
    text: "Use GitHub for manuals, release notes, technical questions, version history, and REST API-oriented details.",
    href: portalLinks.github,
    linkText: "Open GitHub portal",
    external: true,
  },
];

const Research = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="pt-24">
        <section className="py-24">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-5xl"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-primary">
                Links & Resources
              </span>
              <h1 className="mt-4 text-hero-md lg:text-hero">
                Three Portals,
                <span className="block text-muted-foreground">One Public Front Door</span>
              </h1>
              <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
                The official NCI page, GitHub technical portal, and approved-user
                file repository each serve a different purpose. This site explains
                the ecosystem in a more public, readable, and update-friendly way.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid gap-4 lg:grid-cols-4">
              {portalCards.map((portal, index) => (
                <motion.a
                  key={portal.title}
                  href={portal.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex min-h-[320px] flex-col justify-between border border-border bg-white p-6 transition-colors hover:border-primary"
                >
                  <div>
                    <div className="mb-6 flex h-10 w-10 items-center justify-center border border-primary text-primary">
                      <portal.icon className="h-5 w-5" />
                    </div>
                    <div className="font-mono text-xs uppercase tracking-widest text-primary">
                      {portal.eyebrow}
                    </div>
                    <h2 className="mt-3 text-xl font-medium text-slate-900">
                      {portal.title}
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {portal.description}
                    </p>
                  </div>
                  <div className="mt-8 flex items-center gap-2 font-mono text-sm text-primary">
                    {portal.linkText}
                    <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-10 max-w-3xl"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-primary">
                Literature Registry
              </span>
              <h2 className="mt-4 text-section-md lg:text-section">
                Year-by-year publication pages
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                Generated literature pages summarize PubMed and PubMed Central
                results separately for each NCI Dose Tool, using modality-specific
                search terms to keep the lists focused.
              </p>
            </motion.div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {publicationSearches.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={`/literature/${item.id}`}
                    className="group block h-full border border-border bg-white p-6 transition-colors hover:border-primary"
                  >
                    <div className="font-mono text-xs uppercase tracking-widest text-primary">
                      {item.tool}
                    </div>
                    <h3 className="mt-3 text-xl font-medium text-slate-900">
                      {item.modality}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {item.summary}
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-primary">
                      Open literature page
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-20">
          <div className="container mx-auto px-6">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="font-mono text-xs uppercase tracking-widest text-primary">
                  Positioning
                </span>
                <h2 className="mt-4 text-section-md lg:text-section">
                  What this site should do
                </h2>
                <p className="mt-5 text-muted-foreground leading-relaxed">
                  This website should be easier to update than the official NCI
                  page and less technical than GitHub. Its role is to explain,
                  orient, announce, and route visitors to the correct official or
                  technical channel.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="grid gap-3"
              >
                {[
                  "Keep public summaries current when tool capabilities, access routes, or documentation locations change.",
                  "Avoid duplicating official policy language that belongs on NCI/DCEG pages.",
                  "Avoid burying new visitors in issue threads, release tags, or implementation details.",
                  "Send approved users to GitHub and the controlled group when they need files, manuals, or technical support.",
                ].map((item) => (
                  <div key={item} className="flex gap-4 border border-border bg-white p-4">
                    <ArrowRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <p className="text-sm leading-relaxed text-slate-700">{item}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-12"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-primary">
                Navigation
              </span>
              <h2 className="mt-4 text-section-md lg:text-section">
                Where each visitor should go
              </h2>
            </motion.div>

            <div className="grid gap-4 md:grid-cols-2">
              {userPaths.map((path, index) => (
                <motion.div
                  key={path.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  {path.external ? (
                    <a
                      href={path.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block h-full border border-border bg-white p-6 transition-colors hover:border-primary"
                    >
                      <VisitorPathContent path={path} index={index} />
                    </a>
                  ) : (
                    <Link
                      to={path.href}
                      className="group block h-full border border-border bg-white p-6 transition-colors hover:border-primary"
                    >
                      <VisitorPathContent path={path} index={index} />
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const VisitorPathContent = ({
  path,
  index,
}: {
  path: (typeof userPaths)[number];
  index: number;
}) => (
  <>
    <div className="mb-4 flex items-center gap-3">
      <div className="flex h-8 w-8 items-center justify-center border border-primary text-primary">
        {index === 0 ? (
          <Globe2 className="h-4 w-4" />
        ) : index === 1 ? (
          <FileText className="h-4 w-4" />
        ) : index === 2 ? (
          <BadgeCheck className="h-4 w-4" />
        ) : (
          <MessageSquare className="h-4 w-4" />
        )}
      </div>
      <h3 className="font-medium text-slate-900">{path.title}</h3>
    </div>
    <p className="text-sm leading-relaxed text-muted-foreground">
      {path.text}
    </p>
    <div className="mt-5 inline-flex items-center gap-2 font-mono text-sm text-primary">
      {path.linkText}
      {path.external ? (
        <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      ) : (
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      )}
    </div>
  </>
);

export default Research;
