import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PhantomLibraryVisual } from "@/components/PhantomLibraryVisual";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type DoseTool, tools } from "@/data/nciDoseTools";

type LiteratureArticle = {
  authors: string[];
  nciTeamAuthored?: boolean;
};

type LiteratureTool = {
  id: string;
  counts: {
    displayedArticles: number;
  };
  years: Array<{
    articles: LiteratureArticle[];
  }>;
};

type LiteratureData = {
  tools: LiteratureTool[];
};

type PublicationSummary = {
  total: number;
  nciTeam: number;
};

const isNciTeamArticle = (article: LiteratureArticle) =>
  article.nciTeamAuthored === true || article.authors.includes("Lee C");

const buildPublicationSummaries = (data: LiteratureData) =>
  data.tools.reduce<Record<string, PublicationSummary>>((summaries, tool) => {
    summaries[tool.id] = {
      total: tool.counts.displayedArticles,
      nciTeam: tool.years.reduce(
        (sum, year) => sum + year.articles.filter(isNciTeamArticle).length,
        0,
      ),
    };
    return summaries;
  }, {});

const ToolContent = ({
  publicationSummary,
  tool,
}: {
  publicationSummary?: PublicationSummary;
  tool: DoseTool;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    className="space-y-8"
  >
    <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
      <div className="space-y-6">
        <div className="border-l-4 border-primary pl-6">
          <h3 className="text-2xl font-light text-foreground lg:text-3xl">
            {tool.name}
          </h3>
          <p className="mt-2 text-lg font-medium text-primary">
            {tool.fullName}
          </p>
        </div>

        <div className="grid gap-3 text-sm sm:grid-cols-2">
          <div className="border border-border bg-white p-4">
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Modality
            </div>
            <div className="mt-2 text-slate-800">{tool.modality}</div>
          </div>
          <div className="border border-border bg-white p-4">
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Method
            </div>
            <div className="mt-2 text-slate-800">{tool.method}</div>
          </div>
        </div>

        <p className="text-muted-foreground leading-relaxed">{tool.intro}</p>
        <div className="border border-border bg-white p-5">
          <div className="font-mono text-xs uppercase tracking-widest text-primary">
            Key advantages
          </div>
          <ul className="mt-4 space-y-3">
            {tool.advantages.map((advantage) => (
              <li key={advantage} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 bg-primary" />
                <span className="text-sm leading-relaxed text-slate-700">
                  {advantage}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-3 border border-border bg-white p-5">
          <div className="font-mono text-xs uppercase tracking-widest text-primary">
            Core workflow
          </div>
          <div className="space-y-3">
            {tool.details.map((detail) => (
              <p key={detail} className="text-sm leading-relaxed text-slate-700">
                {detail}
              </p>
            ))}
          </div>
        </div>
        <div className="border border-primary/20 bg-primary/5 p-5">
          <div className="font-mono text-xs uppercase tracking-widest text-primary">
            {tool.id === "phantom" ? "Library role" : "Typical outputs"}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">
            {tool.output}
          </p>
        </div>
      </div>

      {tool.id === "phantom" ? (
        <PhantomLibraryVisual />
      ) : tool.image ? (
        <figure className="overflow-hidden border border-border bg-white shadow-xl">
          <div className="border-b border-border bg-slate-50 px-4 py-3">
            <figcaption className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {tool.name} GUI
            </figcaption>
          </div>
          <img
            src={tool.image}
            alt={tool.imageAlt}
            className="w-full object-cover object-left-top"
            loading="lazy"
          />
        </figure>
      ) : null}
    </div>

    <div className="border border-border bg-slate-50 p-6">
      <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <h4 className="font-mono text-sm uppercase tracking-widest text-primary">
            Peer-reviewed foundation
          </h4>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {publicationSummary
              ? `${tool.name} is represented in ${publicationSummary.total} registry papers, including ${publicationSummary.nciTeam} publications by the NCI Dose Team.`
              : "PHANTOM provides the anatomical basis used across NCI Dose Tools methods and validation literature."}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            to={publicationSummary ? `/literature/${tool.id}` : "/literature"}
            className="border border-border bg-white px-4 py-2 font-mono text-xs uppercase tracking-wider text-primary transition-colors hover:border-primary/50"
          >
            Literature registry
          </Link>
          {publicationSummary && (
            <Link
              to={`/literature/${tool.id}?team=lee-c`}
              className="border border-primary bg-primary px-4 py-2 font-mono text-xs uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
            >
              NCI team papers
            </Link>
          )}
        </div>
      </div>
    </div>

    <div className="grid gap-3 border border-border bg-white p-4 sm:grid-cols-2 lg:grid-cols-5">
      <Link
        to="/vendors"
        className="group border border-slate-200 p-4 transition-colors hover:border-primary"
      >
        <div className="font-mono text-xs uppercase tracking-widest text-primary">
          Vendor integration
        </div>
        <p className="mt-2 text-sm text-muted-foreground group-hover:text-slate-700">
          Evaluate REST API-ready components.
        </p>
      </Link>
      <Link
        to="/researchers"
        className="group border border-slate-200 p-4 transition-colors hover:border-primary"
      >
        <div className="font-mono text-xs uppercase tracking-widest text-primary">
          Research access
        </div>
        <p className="mt-2 text-sm text-muted-foreground group-hover:text-slate-700">
          Request non-commercial use.
        </p>
      </Link>
      <a
        href={tool.manualHref}
        target="_blank"
        rel="noopener noreferrer"
        className="group border border-slate-200 p-4 transition-colors hover:border-primary"
      >
        <div className="font-mono text-xs uppercase tracking-widest text-primary">
          User manual
        </div>
        <p className="mt-2 text-sm text-muted-foreground group-hover:text-slate-700">
          Open the {tool.name} GitHub wiki manual.
        </p>
      </a>
      <a
        href={tool.versionHistoryHref}
        target="_blank"
        rel="noopener noreferrer"
        className="group border border-slate-200 p-4 transition-colors hover:border-primary"
      >
        <div className="font-mono text-xs uppercase tracking-widest text-primary">
          Version history
        </div>
        <p className="mt-2 text-sm text-muted-foreground group-hover:text-slate-700">
          Review {tool.name} releases and files.
        </p>
      </a>
      <Link
        to="/resources"
        className="group border border-slate-200 p-4 transition-colors hover:border-primary"
      >
        <div className="font-mono text-xs uppercase tracking-widest text-primary">
          Links & Resources
        </div>
        <p className="mt-2 text-sm text-muted-foreground group-hover:text-slate-700">
          Open official pages, technical docs, and approved-user links.
        </p>
      </Link>
    </div>
  </motion.div>
);

const Protocols = () => {
  const { hash } = useLocation();
  const toolSectionRef = useRef<HTMLElement | null>(null);
  const [activeTab, setActiveTab] = useState("ncict");
  const [publicationSummaries, setPublicationSummaries] =
    useState<Record<string, PublicationSummary> | null>(null);

  useEffect(() => {
    const toolId = hash.replace("#", "");
    if (toolId && tools.some((tool) => tool.id === toolId)) {
      setActiveTab(toolId);
      window.requestAnimationFrame(() => {
        toolSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [hash]);

  useEffect(() => {
    let cancelled = false;

    fetch(`${import.meta.env.BASE_URL}literature.json`, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`literature.json returned ${response.status}`);
        }
        return response.json() as Promise<LiteratureData>;
      })
      .then((payload) => {
        if (!cancelled) {
          setPublicationSummaries(buildPublicationSummaries(payload));
        }
      })
      .catch(() => {
        if (!cancelled) {
          setPublicationSummaries(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleTabChange = (value: string, shouldScroll = false) => {
    setActiveTab(value);
    window.history.replaceState(null, "", `#${value}`);
    if (shouldScroll) {
      toolSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
                Our Tools
              </span>
              <h1 className="mt-4 text-hero-md lg:text-hero">
                NCI Dose Tools Suite
              </h1>
              <p className="mt-6 max-w-3xl text-muted-foreground leading-relaxed">
                The suite covers CT, nuclear medicine, and radiography/fluoroscopy
                dose estimation, with a shared anatomical foundation built from
                computational human phantom libraries.
              </p>
              <p className="mt-4 max-w-3xl text-muted-foreground leading-relaxed">
                This page is intentionally high level. Detailed manuals, release notes,
                and support discussions live in the GitHub technical portal.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="bg-slate-50 py-16">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8 max-w-4xl"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-primary">
                Compare tools
              </span>
              <h2 className="mt-4 text-2xl font-light text-slate-800 lg:text-3xl">
                Choose the right starting point
              </h2>
              <p className="mt-3 text-muted-foreground">
                Use this comparison to decide which detailed tool tab to open first.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border border-slate-200 bg-white"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th className="px-6 py-4 text-left font-mono text-sm uppercase tracking-wider text-slate-600">
                        Tool
                      </th>
                      <th className="px-6 py-4 text-left font-mono text-sm uppercase tracking-wider text-slate-600">
                        Best for
                      </th>
                      <th className="px-6 py-4 text-left font-mono text-sm uppercase tracking-wider text-slate-600">
                        Primary inputs
                      </th>
                      <th className="px-6 py-4 text-left font-mono text-sm uppercase tracking-wider text-slate-600">
                        Calculation basis
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {tools.map((tool) => (
                      <tr key={tool.id} className="transition-colors hover:bg-slate-50">
                        <td className="px-6 py-5 font-mono font-medium text-primary">
                          <button
                            type="button"
                            onClick={() => handleTabChange(tool.id, true)}
                            className="hover:underline"
                          >
                            {tool.name}
                          </button>
                        </td>
                        <td className="max-w-md px-6 py-5 text-sm leading-relaxed text-slate-700">
                          {tool.comparison.bestFor}
                        </td>
                        <td className="max-w-lg px-6 py-5 text-sm leading-relaxed text-slate-600">
                          {tool.comparison.primaryInputs}
                        </td>
                        <td className="max-w-sm px-6 py-5 text-sm leading-relaxed text-slate-600">
                          {tool.comparison.calculationBasis}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </section>

        <section ref={toolSectionRef} id="tool-summary" className="scroll-mt-24 py-10 lg:py-16">
          <div className="container mx-auto px-6">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <TabsList className="flex h-auto flex-wrap gap-2 bg-transparent p-0 pb-10">
                  {tools.map((tool) => (
                    <TabsTrigger
                      key={tool.id}
                      value={tool.id}
                      className="rounded-none border border-border px-4 py-2 font-mono text-sm text-muted-foreground transition-all duration-300 hover:border-primary hover:text-primary data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      {tool.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </motion.div>

              <div className="mt-12">
                {tools.map((tool) => (
                  <TabsContent key={tool.id} value={tool.id} className="mt-0">
                    <ToolContent
                      publicationSummary={publicationSummaries?.[tool.id]}
                      tool={tool}
                    />
                  </TabsContent>
                ))}
              </div>
            </Tabs>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Protocols;
