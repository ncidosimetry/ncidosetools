import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Database,
  ExternalLink,
  FileText,
  type LucideIcon,
} from "lucide-react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

type LiteratureArticle = {
  pmid: string;
  pmcid: string | null;
  title: string;
  journal: string;
  pubdate: string;
  year: string;
  authors: string[];
  nciTeamAuthored?: boolean;
  doi: string | null;
  sources: string[];
  pubmedUrl: string;
  pmcUrl: string | null;
};

type LiteratureYear = {
  year: string;
  count: number;
  articles: LiteratureArticle[];
};

type LiteratureTool = {
  id: string;
  tool: string;
  modality: string;
  summary: string;
  queryUrls: {
    pubmedTitleAbstract: string;
    pmcFullText: string;
  };
  counts: {
    pubmedTitleAbstract: number;
    pmcMappedPmids: number;
    displayedArticles: number;
  };
  years: LiteratureYear[];
};

type LiteratureData = {
  generatedAt: string;
  note: string;
  tools: LiteratureTool[];
};

const formatGeneratedDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

const sourceTone = (source: string) =>
  source.includes("PMC")
    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
    : "border-sky-200 bg-sky-50 text-sky-700";

const isNciTeamArticle = (article: LiteratureArticle) =>
  article.nciTeamAuthored === true || article.authors.includes("Lee C");

const nciTeamArticleCount = (tool: LiteratureTool) =>
  tool.years.reduce(
    (sum, year) => sum + year.articles.filter(isNciTeamArticle).length,
    0,
  );

const filteredNciTeamYears = (tool: LiteratureTool) =>
  tool.years
    .map((year) => {
      const articles = year.articles.filter(isNciTeamArticle);
      return {
        ...year,
        count: articles.length,
        articles,
      };
    })
    .filter((year) => year.articles.length > 0);

const Literature = () => {
  const { toolId } = useParams();
  const [searchParams] = useSearchParams();
  const [data, setData] = useState<LiteratureData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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
          setData(payload);
          setError(null);
        }
      })
      .catch((caught) => {
        if (!cancelled) {
          setError(caught instanceof Error ? caught.message : "Unable to load literature data");
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const selectedTool = useMemo(
    () => data?.tools.find((tool) => tool.id === toolId) ?? null,
    [data, toolId],
  );

  const totalArticles = useMemo(
    () => data?.tools.reduce((sum, tool) => sum + tool.counts.displayedArticles, 0) ?? 0,
    [data],
  );

  const isDetailPage = Boolean(toolId);
  const showNciTeamOnly = isDetailPage && searchParams.get("team") === "lee-c";
  const listedPapers = selectedTool
    ? showNciTeamOnly
      ? nciTeamArticleCount(selectedTool)
      : selectedTool.counts.displayedArticles
    : totalArticles;

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
              className="max-w-4xl"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-primary">
                Literature Registry
              </span>
              <h1
                className={`mt-4 ${
                  selectedTool
                    ? "whitespace-nowrap text-section-md lg:text-section"
                    : "text-hero-md lg:text-hero"
                }`}
              >
                {selectedTool
                  ? `${selectedTool.tool} Publications`
                  : "NCI Dose Tools Publications"}
              </h1>
              <p className="mt-6 max-w-3xl text-muted-foreground leading-relaxed">
                {selectedTool
                  ? `${selectedTool.tool} publications are generated from NCBI PubMed and PubMed Central searches, grouped by publication year.`
                  : "Choose a tool below to view a focused, year-by-year publication list. Each page is generated from NCBI PubMed and PubMed Central searches using tool-specific and modality-specific terms."}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 grid max-w-4xl gap-4 sm:grid-cols-3"
            >
              <StatCard icon={Database} label="Source" value="PubMed + PMC" />
              <StatCard
                icon={FileText}
                label="Listed papers"
                value={loading ? "Loading" : listedPapers.toLocaleString()}
              />
              <StatCard
                icon={CalendarDays}
                label="Updated"
                value={data ? formatGeneratedDate(data.generatedAt) : "Pending"}
              />
            </motion.div>
          </div>
        </section>

        <section className="pb-24">
          <div className="container mx-auto px-6">
            {loading && (
              <div className="border border-border bg-white p-6 text-sm text-muted-foreground">
                Loading generated publication list...
              </div>
            )}

            {error && (
              <div className="border border-red-200 bg-red-50 p-6 text-sm text-red-700">
                Literature data could not be loaded: {error}
              </div>
            )}

            {data && (
              <LiteratureNav activeToolId={selectedTool?.id ?? null} tools={data.tools} />
            )}

            {data && !isDetailPage && <LiteratureIndex tools={data.tools} />}

            {data && isDetailPage && !selectedTool && (
              <div className="max-w-3xl border border-border bg-white p-6">
                <h2 className="text-2xl font-light text-slate-900">
                  Literature page not found
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Choose one of the available literature registries.
                </p>
              </div>
            )}

            {data && selectedTool && (
              <ToolLiterature
                note={data.note}
                showNciTeamOnly={showNciTeamOnly}
                tool={selectedTool}
              />
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const StatCard = ({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) => (
  <div className="border border-border bg-white p-5">
    <Icon className="h-4 w-4 text-primary" />
    <div className="mt-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
      {label}
    </div>
    <div className="mt-1 text-sm text-foreground">{value}</div>
  </div>
);

const LiteratureNav = ({
  activeToolId,
  tools,
}: {
  activeToolId: string | null;
  tools: LiteratureTool[];
}) => (
  <nav className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5" aria-label="Literature sections">
    <Link
      to="/literature"
      className={`border px-4 py-3 font-mono text-xs uppercase tracking-wider transition-colors ${
        activeToolId === null
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-white text-primary hover:border-primary/50"
      }`}
    >
      Literature index
    </Link>
    {tools.map((tool) => (
      <Link
        key={tool.id}
        to={`/literature/${tool.id}`}
        className={`border px-4 py-3 font-mono text-xs uppercase tracking-wider transition-colors ${
          activeToolId === tool.id
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-white text-primary hover:border-primary/50"
        }`}
      >
        {tool.tool} literature
      </Link>
    ))}
  </nav>
);

const LiteratureIndex = ({ tools }: { tools: LiteratureTool[] }) => (
  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
    {tools.map((tool, index) => {
      const teamCount = nciTeamArticleCount(tool);

      return (
        <motion.div
          key={tool.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            to={`/literature/${tool.id}`}
            className="group flex h-full min-h-[260px] flex-col justify-between border border-border bg-white p-6 transition-colors hover:border-primary/60"
          >
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-primary">
                {tool.tool}
              </div>
              <h2 className="mt-3 text-2xl font-light text-slate-900">
                {tool.modality}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {tool.summary}
              </p>
            </div>
            <div className="mt-8 flex items-center justify-between gap-4">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {tool.counts.displayedArticles} papers · {teamCount} NCI team
              </span>
              <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-primary">
                Open list
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        </motion.div>
      );
    })}
  </div>
);

const ToolLiterature = ({
  note,
  showNciTeamOnly,
  tool,
}: {
  note: string;
  showNciTeamOnly: boolean;
  tool: LiteratureTool;
}) => {
  const nciTeamCount = nciTeamArticleCount(tool);
  const displayedYears = showNciTeamOnly ? filteredNciTeamYears(tool) : tool.years;
  const displayedCount = displayedYears.reduce((sum, year) => sum + year.count, 0);

  return (
    <div className="space-y-10">
    <div className="border border-border bg-white p-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-primary">
            NCI team publications
          </div>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            NCI Dose Team publications are highlighted within the generated
            registry.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            to={`/literature/${tool.id}`}
            className={`border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${
              showNciTeamOnly
                ? "border-border text-muted-foreground hover:border-primary/50 hover:text-primary"
                : "border-primary bg-primary text-primary-foreground"
            }`}
          >
            All papers
          </Link>
          <Link
            to={`/literature/${tool.id}?team=lee-c`}
            className={`border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${
              showNciTeamOnly
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-primary hover:border-primary/50"
            }`}
          >
            NCI team ({nciTeamCount})
          </Link>
        </div>
      </div>
    </div>

    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-primary">
            {tool.tool}
          </div>
          <h2 className="mt-3 text-3xl font-light text-slate-900">
            {tool.modality}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {tool.summary}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <SmallStat label={showNciTeamOnly ? "Filtered" : "Displayed"} value={displayedCount} />
            <SmallStat label="Years" value={displayedYears.length} />
            <SmallStat label="NCI team" value={nciTeamCount} />
            <SmallStat label="PubMed" value={tool.counts.pubmedTitleAbstract} />
            <SmallStat label="PMC" value={tool.counts.pmcMappedPmids} />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <SearchButton href={tool.queryUrls.pubmedTitleAbstract}>
              PubMed query
            </SearchButton>
            <SearchButton href={tool.queryUrls.pmcFullText}>
              PMC full-text query
            </SearchButton>
          </div>
        </div>

        <div className="space-y-8">
          {displayedYears.map((yearGroup) => (
            <div key={`${tool.id}-${yearGroup.year}`}>
              <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
                <h3 className="text-xl font-light text-slate-900">
                  {yearGroup.year}
                </h3>
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {yearGroup.count} papers
                </span>
              </div>

              <div className="divide-y divide-border">
                {yearGroup.articles.map((article) => (
                  <ArticleRow key={`${tool.id}-${article.pmid}`} article={article} />
                ))}
              </div>
            </div>
          ))}

          {displayedYears.length === 0 && (
            <div className="border border-border bg-white p-6 text-sm text-muted-foreground">
              No NCI team-highlighted papers were found for this tool in the generated registry.
            </div>
          )}
        </div>
      </div>
    </motion.section>

    <div className="max-w-4xl border border-border bg-slate-50 p-5 text-sm leading-relaxed text-muted-foreground">
      {note} PMC full-text results are mapped back to PubMed IDs when possible,
      then merged with title and abstract matches so repeated citations appear once.
    </div>
  </div>
  );
};

const SmallStat = ({ label, value }: { label: string; value: number }) => (
  <div className="border border-border bg-white p-4">
    <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
      {label}
    </div>
    <div className="mt-2 text-2xl font-light text-foreground">{value}</div>
  </div>
);

const SearchButton = ({
  children,
  href,
}: {
  children: string;
  href: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 border border-border bg-white px-4 py-2 text-xs font-mono uppercase tracking-wider text-primary transition-colors hover:border-primary/50"
  >
    {children}
    <ExternalLink className="h-3.5 w-3.5" />
  </a>
);

const ArticleRow = ({ article }: { article: LiteratureArticle }) => (
  <article className="py-5">
    <div className="flex flex-wrap gap-2">
      {article.sources.map((source) => (
        <span
          key={source}
          className={`border px-2 py-1 text-[11px] font-mono uppercase tracking-wider ${sourceTone(source)}`}
        >
          {source}
        </span>
      ))}
    </div>

    <h4 className="mt-3 text-base font-medium leading-snug text-slate-950">
      <a
        href={article.pubmedUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-colors hover:text-primary"
      >
        {article.title}
      </a>
    </h4>

    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
      {article.authors.join(", ")}
      {article.authors.length > 0 ? ". " : ""}
      <span className="italic">{article.journal}</span>
      {article.pubdate ? `, ${article.pubdate}` : ""}.
    </p>

    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs font-mono uppercase tracking-wider text-primary">
      <a
        href={article.pubmedUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 hover:underline"
      >
        PMID {article.pmid}
        <ExternalLink className="h-3 w-3" />
      </a>
      {article.pmcUrl && article.pmcid && (
        <a
          href={article.pmcUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 hover:underline"
        >
          {article.pmcid}
          <ExternalLink className="h-3 w-3" />
        </a>
      )}
      {article.doi && <span>DOI {article.doi}</span>}
    </div>
  </article>
);

export default Literature;
