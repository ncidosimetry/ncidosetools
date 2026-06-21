import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const outputPath = path.join(projectRoot, "public", "literature.json");
const eutilsBase = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils";

const searchDefinitions = [
  {
    id: "ncict",
    tool: "NCICT",
    modality: "CT dosimetry",
    summary:
      "CT dosimetry publications document NCICT dose estimation, benchmarking, and cohort-scale imaging workflows.",
    pubmedTitleAbstractQuery:
      '("NCICT"[Title/Abstract] OR "National Cancer Institute dosimetry system for Computed Tomography"[Title/Abstract] OR "National Cancer Institute dosimetry system for CT"[Title/Abstract]) AND ("computed tomography"[Title/Abstract] OR "CT dosimetry"[Title/Abstract] OR "CT scan"[Title/Abstract] OR "CT scans"[Title/Abstract] OR "CT imaging"[Title/Abstract] OR "CT examination"[Title/Abstract] OR "CT examinations"[Title/Abstract] OR "PET/CT"[Title/Abstract])',
    pmcFullTextQuery:
      '("NCICT"[body] OR "National Cancer Institute dosimetry system for Computed Tomography"[body] OR "National Cancer Institute dosimetry system for CT"[body]) AND ("computed tomography"[body] OR "CT dosimetry"[body] OR "CT scan"[body] OR "CT scans"[body] OR "CT imaging"[body] OR "CT examination"[body] OR "CT examinations"[body] OR "PET/CT"[body])',
  },
  {
    id: "ncirf",
    tool: "NCIRF",
    modality: "Fluoroscopy dosimetry",
    summary:
      "Peer-reviewed RF dosimetry publications continue to expand around projection imaging and fluoroscopy workflows.",
    pubmedTitleAbstractQuery:
      '("NCIRF"[Title/Abstract] OR "National Cancer Institute dosimetry system for Radiography and Fluoroscopy"[Title/Abstract]) AND (radiography[Title/Abstract] OR radiographic[Title/Abstract] OR fluoroscopy[Title/Abstract] OR fluoroscopic[Title/Abstract])',
    pmcFullTextQuery:
      '("NCIRF"[body] OR "National Cancer Institute dosimetry system for Radiography and Fluoroscopy"[body]) AND (radiography[body] OR radiographic[body] OR fluoroscopy[body] OR fluoroscopic[body])',
  },
  {
    id: "ncinm",
    tool: "NCINM",
    modality: "Nuclear medicine dosimetry",
    summary:
      "Nuclear medicine publications are tracked with NCINM-specific terms combined with radionuclide, radiopharmaceutical, and internal dosimetry language.",
    pubmedTitleAbstractQuery:
      '("NCINM"[Title/Abstract] OR "National Cancer Institute dosimetry system for Nuclear Medicine"[Title/Abstract]) AND ("nuclear medicine"[Title/Abstract] OR radionuclide[Title/Abstract] OR radiopharmaceutical[Title/Abstract] OR "internal dosimetry"[Title/Abstract] OR "organ dose"[Title/Abstract])',
    pmcFullTextQuery:
      '("NCINM"[body] OR "National Cancer Institute dosimetry system for Nuclear Medicine"[body]) AND ("nuclear medicine"[body] OR radionuclide[body] OR radiopharmaceutical[body] OR "internal dosimetry"[body] OR "organ dose"[body])',
  },
  {
    id: "phantom",
    tool: "PHANTOM",
    modality: "Computational phantom literature",
    summary:
      "Hybrid computational phantom publications document the NCI/UF anatomical model foundation used across dose-estimation workflows.",
    pubmedTitleAbstractQuery:
      '("NCI/UF"[Title/Abstract] OR "NCI-UF"[Title/Abstract] OR "National Cancer Institute/University of Florida"[Title/Abstract] OR "reference hybrid phantom"[Title/Abstract] OR "reference hybrid phantoms"[Title/Abstract] OR ("UF family"[Title/Abstract] AND (phantom[Title/Abstract] OR phantoms[Title/Abstract] OR dosimetry[Title/Abstract] OR radiation[Title/Abstract])) OR (("hybrid computational phantom"[Title/Abstract] OR "hybrid computational phantoms"[Title/Abstract]) AND ("National Cancer Institute"[Title/Abstract] OR "National Cancer Institute"[Affiliation] OR NCI[Title/Abstract] OR "University of Florida"[Title/Abstract] OR "University of Florida"[Affiliation] OR UF[Title/Abstract])))',
    pmcFullTextQuery:
      '("NCI/UF"[body] OR "NCI-UF"[body] OR "National Cancer Institute/University of Florida"[body] OR "reference hybrid phantom"[body] OR "reference hybrid phantoms"[body] OR ("UF family"[body] AND (phantom[body] OR phantoms[body]) AND (dosimetry[body] OR radiation[body])) OR (("hybrid computational phantom"[body] OR "hybrid computational phantoms"[body]) AND ("National Cancer Institute"[body] OR NCI[body] OR "University of Florida"[body] OR UF[body])))',
  },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const buildUrl = (endpoint, params) => {
  const url = new URL(`${eutilsBase}/${endpoint}`);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value));
    }
  }
  return url;
};

const fetchJson = async (url, label, attempts = 4) => {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: {
          Accept: "application/json",
          "User-Agent": "ncidosetools-literature-generator/1.0",
        },
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      lastError = error;
      if (attempt < attempts) {
        await sleep(350 * attempt);
      }
    }
  }

  throw new Error(`${label} failed: ${lastError?.message ?? "unknown error"}`);
};

const esearch = async (db, term) => {
  const url = buildUrl("esearch.fcgi", {
    db,
    term,
    retmode: "json",
    retmax: 500,
    sort: "pub date",
  });
  const data = await fetchJson(url, `${db} esearch`);
  return {
    count: Number.parseInt(data.esearchresult?.count ?? "0", 10),
    ids: data.esearchresult?.idlist ?? [],
  };
};

const esummary = async (db, ids) => {
  const summaries = new Map();
  const chunkSize = 100;

  for (let start = 0; start < ids.length; start += chunkSize) {
    const chunk = ids.slice(start, start + chunkSize);
    if (chunk.length === 0) {
      continue;
    }

    const url = buildUrl("esummary.fcgi", {
      db,
      id: chunk.join(","),
      retmode: "json",
    });
    const data = await fetchJson(url, `${db} esummary`);
    const result = data.result ?? {};
    const uids = result.uids ?? chunk;
    for (const uid of uids) {
      if (result[uid]) {
        summaries.set(uid, result[uid]);
      }
    }
    await sleep(120);
  }

  return summaries;
};

const unique = (values) => [...new Set(values.filter(Boolean))];

const normalizePmid = (value) => {
  if (!value) {
    return null;
  }
  const match = String(value).match(/\d+/);
  return match?.[0] ?? null;
};

const articleIds = (summary) => (Array.isArray(summary?.articleids) ? summary.articleids : []);

const findArticleId = (summary, idType) => {
  const found = articleIds(summary).find((item) => item.idtype === idType);
  return found?.value || found?.id || null;
};

const extractPmidFromPmc = (summary) =>
  normalizePmid(findArticleId(summary, "pmid") ?? summary?.pmid);

const extractPmcid = (summary) => {
  const value =
    findArticleId(summary, "pmc") ??
    findArticleId(summary, "pmcid") ??
    summary?.pmcid ??
    summary?.uid;
  if (!value) {
    return null;
  }
  const normalized = String(value).toUpperCase();
  return normalized.startsWith("PMC") ? normalized : `PMC${normalized.replace(/^PMC/i, "")}`;
};

const extractDoi = (summary) => findArticleId(summary, "doi") ?? null;

const extractYear = (summary) => {
  const pubdate = summary?.pubdate ?? summary?.epubdate ?? summary?.sortpubdate ?? "";
  const match = String(pubdate).match(/\b(19|20)\d{2}\b/);
  return match?.[0] ?? "Unknown";
};

const extractAuthors = (summary) => {
  const authors = Array.isArray(summary?.authors) ? summary.authors : [];
  return authors
    .map((author) => author.name)
    .filter(Boolean);
};

const buildSearchUrl = (db, query) => {
  const base =
    db === "pmc"
      ? "https://pmc.ncbi.nlm.nih.gov/search/"
      : "https://pubmed.ncbi.nlm.nih.gov/";
  const url = new URL(base);
  url.searchParams.set("term", query);
  return url.toString();
};

const buildToolData = async (definition) => {
  console.log(`Searching ${definition.tool} PubMed title/abstract...`);
  const pubmedSearch = await esearch("pubmed", definition.pubmedTitleAbstractQuery);

  console.log(`Searching ${definition.tool} PMC full text...`);
  const pmcSearch = await esearch("pmc", definition.pmcFullTextQuery);
  const pmcSummaries = await esummary("pmc", pmcSearch.ids);

  const pmcByPmid = new Map();
  let pmcWithoutPmid = 0;
  for (const summary of pmcSummaries.values()) {
    const pmid = extractPmidFromPmc(summary);
    const pmcid = extractPmcid(summary);
    if (!pmid) {
      pmcWithoutPmid += 1;
      continue;
    }
    if (!pmcByPmid.has(pmid)) {
      pmcByPmid.set(pmid, new Set());
    }
    if (pmcid) {
      pmcByPmid.get(pmid).add(pmcid);
    }
  }

  const pubmedPmids = pubmedSearch.ids.map(normalizePmid).filter(Boolean);
  const pmcPmids = [...pmcByPmid.keys()];
  const combinedPmids = unique([...pubmedPmids, ...pmcPmids]);
  const pubmedSummaries = await esummary("pubmed", combinedPmids);

  const articles = combinedPmids
    .map((pmid) => {
      const summary = pubmedSummaries.get(pmid);
      if (!summary) {
        return null;
      }
      const authors = extractAuthors(summary);
      const pmcIds = [...(pmcByPmid.get(pmid) ?? [])];
      const sources = [];
      if (pubmedPmids.includes(pmid)) {
        sources.push("PubMed title/abstract");
      }
      if (pmcByPmid.has(pmid)) {
        sources.push("PMC full text");
      }

      return {
        pmid,
        pmcid: pmcIds[0] ?? null,
        title: String(summary.title ?? "").replace(/\.$/, ""),
        journal: summary.fulljournalname || summary.source || "",
        pubdate: summary.pubdate || summary.epubdate || "",
        year: extractYear(summary),
        authors: authors.slice(0, 6),
        nciTeamAuthored: authors.includes("Lee C"),
        doi: extractDoi(summary),
        sources,
        pubmedUrl: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`,
        pmcUrl: pmcIds[0] ? `https://pmc.ncbi.nlm.nih.gov/articles/${pmcIds[0]}/` : null,
      };
    })
    .filter(Boolean)
    .sort((a, b) => {
      if (a.year !== b.year) {
        return Number(b.year) - Number(a.year);
      }
      return a.title.localeCompare(b.title);
    });

  const groups = new Map();
  for (const article of articles) {
    const year = article.year || "Unknown";
    if (!groups.has(year)) {
      groups.set(year, []);
    }
    groups.get(year).push(article);
  }

  const years = [...groups.entries()]
    .sort(([a], [b]) => {
      if (a === "Unknown") {
        return 1;
      }
      if (b === "Unknown") {
        return -1;
      }
      return Number(b) - Number(a);
    })
    .map(([year, groupedArticles]) => ({
      year,
      count: groupedArticles.length,
      articles: groupedArticles,
    }));

  return {
    id: definition.id,
    tool: definition.tool,
    modality: definition.modality,
    summary: definition.summary,
    queries: {
      pubmedTitleAbstract: definition.pubmedTitleAbstractQuery,
      pmcFullText: definition.pmcFullTextQuery,
    },
    queryUrls: {
      pubmedTitleAbstract: buildSearchUrl("pubmed", definition.pubmedTitleAbstractQuery),
      pmcFullText: buildSearchUrl("pmc", definition.pmcFullTextQuery),
    },
    counts: {
      pubmedTitleAbstract: pubmedSearch.count,
      pmcFullTextRecords: pmcSearch.count,
      pmcMappedPmids: pmcPmids.length,
      pmcWithoutPmid,
      combinedUniquePmids: combinedPmids.length,
      displayedArticles: articles.length,
    },
    years,
  };
};

const filterToolArticles = (tool, keepArticle) => {
  const years = tool.years
    .map((year) => {
      const articles = year.articles.filter(keepArticle);
      return {
        ...year,
        count: articles.length,
        articles,
      };
    })
    .filter((year) => year.articles.length > 0);
  const displayedArticles = years.reduce((sum, year) => sum + year.count, 0);

  return {
    ...tool,
    counts: {
      ...tool.counts,
      combinedUniquePmids: displayedArticles,
      displayedArticles,
    },
    years,
  };
};

const removeSharedToolPapersFromPhantom = (tools) => {
  const sharedToolPmids = new Set(
    tools
      .filter((tool) => tool.id !== "phantom")
      .flatMap((tool) => tool.years.flatMap((year) => year.articles.map((article) => article.pmid))),
  );

  return tools.map((tool) =>
    tool.id === "phantom"
      ? filterToolArticles(tool, (article) => !sharedToolPmids.has(article.pmid))
      : tool,
  );
};

const main = async () => {
  const rawTools = [];
  for (const definition of searchDefinitions) {
    rawTools.push(await buildToolData(definition));
  }
  const tools = removeSharedToolPapersFromPhantom(rawTools);

  const payload = {
    generatedAt: new Date().toISOString(),
    source: "NCBI E-utilities PubMed and PubMed Central searches",
    note:
      "Searches combine tool-specific identifiers with modality terms to reduce unrelated full-text matches.",
    tools,
  };

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`);
  console.log(`Wrote ${outputPath}`);
  for (const tool of tools) {
    console.log(
      `${tool.tool}: ${tool.counts.displayedArticles} displayed articles across ${tool.years.length} years`,
    );
  }
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
