import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { tools } from "@/data/nciDoseTools";
import {
  ArrowRight,
  Building2,
  Code2,
  DatabaseZap,
  ExternalLink,
  Layers3,
  ScrollText,
  ShieldCheck,
  TestTube2,
  Workflow,
} from "lucide-react";

const apiHighlights = [
  {
    icon: Code2,
    title: "Structured request/response workflows",
    description:
      "Each dose tool is prepared for structured inputs and outputs that are practical for web services, enterprise platforms, and automated reporting.",
  },
  {
    icon: Workflow,
    title: "Product workflow fit",
    description:
      "Map dose-tool inputs and outputs into your platform's existing exam ingestion, analytics, reporting, or quality dashboards.",
  },
  {
    icon: TestTube2,
    title: "Free trial available",
    description:
      "A free vendor trial/evaluation route is available so teams can test technical fit and customer value before deeper integration.",
  },
];

const strengths = [
  {
    icon: Layers3,
    title: "Shared reference phantom foundation",
    description:
      "NCI-developed reference phantoms support a consistent anatomical basis across CT, RF, and nuclear medicine workflows.",
  },
  {
    icon: DatabaseZap,
    title: "CT/RF/NM ecosystem",
    description:
      "The suite is not a single modality calculator. CT, radiography/fluoroscopy, and nuclear medicine tools are organized as one dosimetry ecosystem.",
  },
  {
    icon: ShieldCheck,
    title: "REST API-ready vendor pathway",
    description:
      "Trial evaluation support makes the tools practical to test before a commercial integration decision.",
  },
  {
    icon: ScrollText,
    title: "Research-validated and documented",
    description:
      "A maintained GitHub technical portal and a growing publication registry provide visible scientific credibility.",
  },
];

const vendorComponentSummaries: Record<string, string> = {
  ncict:
    "REST API-accessible CT organ-dose estimation component for protocol, scanner, and patient-size workflows.",
  ncirf:
    "REST API-accessible radiography and fluoroscopy dose component with geometry-aware exposure modeling.",
  ncinm:
    "REST API-accessible nuclear medicine absorbed-dose component for radionuclide and radiopharmaceutical workflows, including fuzzy algorithm-based radiopharmaceutical name matching.",
  phantom:
    "Shared reference anatomy library supporting consistent dose estimates across the tool suite.",
};

const vendorComponentIcons: Record<string, typeof Code2> = {
  ncict: Code2,
  ncirf: Workflow,
  ncinm: DatabaseZap,
  phantom: Layers3,
};

const apiManualLinks: Partial<Record<string, string>> = {
  ncict: "https://github.com/ncidosimetry/ncidosetools/wiki/NCICTAPI-User-Manual",
  ncirf: "https://github.com/ncidosimetry/ncidosetools/wiki/NCIRFAPI-User-Manual",
  ncinm: "https://github.com/ncidosimetry/ncidosetools/wiki/NCINMAPI-User-Manual",
};

const apiExamples = [
  {
    tool: "NCICT REST API",
    title: "Custom CT tube current profile",
    endpoint: "/param",
    payload: `{
  "age": 10,
  "sex": "f",
  "wed": 25,
  "start": 0,
  "end": 20,
  "kvp": 120,
  "tcm_strength": -1,
  "head_body": 1,
  "ctdivol": 20,
  "custom_ma": [100, 200, 300, 400, 500, 600, 700]
}`,
  },
  {
    tool: "NCIRF REST API",
    title: "Projection geometry and phantom alignment",
    endpoint: "/param",
    payload: `{
  "id": "vendor-demo-rf",
  "phantom_library": 4,
  "age": 30,
  "sex": "f",
  "height_cm": 150,
  "weight_kg": 40,
  "kvp": 28,
  "hvl": 0.460,
  "sid": 80,
  "field_width_cm": 10,
  "field_height_cm": 10,
  "dap_gy_cm2": 100,
  "ppa": 180,
  "psa": 0,
  "iso_x": 16.5,
  "iso_y": 13.7,
  "iso_z": 75.1,
  "table_thickness_cm": 1,
  "history": 5000000,
  "threads": 6
}`,
  },
  {
    tool: "NCINM REST API",
    title: "Radiopharmaceutical dose request",
    endpoint: "/param",
    payload: `{
  "patientID": "vendor-demo-nm",
  "phantom_library": 1,
  "sex": "female",
  "age": 36,
  "radiopharmaceutical": "18FFDG",
  "administered_activity_mbq": 185
}`,
  },
];

const Engine = () => {
  const [activeApiExample, setActiveApiExample] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveApiExample((current) => (current + 1) % apiExamples.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="pt-24">
        <section className="relative overflow-hidden py-24">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute left-0 right-0 top-1/3 h-px bg-border" />
            <div className="absolute left-0 right-0 top-2/3 h-px bg-border" />
          </div>

          <div className="container relative z-10 mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-5xl"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-primary">
                For Vendors
              </span>
              <h1 className="mt-4 text-hero-md lg:text-hero">
                REST API-Ready
                <br />
                <span className="text-muted-foreground">Reference Dosimetry</span>
              </h1>
              <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
                NCI Dose Tools can help vendors add scientifically grounded organ
                dose estimation to commercial platforms. REST API integration can
                be evaluated through web-based or local REST API server deployments:
                test the fit, validate the workflow, then move toward an approved
                commercial license.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="mailto:kevin.chang@nih.gov" className="btn-precision">
                  Request REST API Trial
                </a>
                <a href="#components" className="btn-precision-outline">
                  View Components
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="bg-slate-50 py-20">
          <div className="container mx-auto px-6">
            <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="font-mono text-xs uppercase tracking-widest text-primary">
                  REST API Integration
                </span>
                <h2 className="mt-4 text-section-md lg:text-section">
                  Built for vendor-side integration
                </h2>
                <p className="mt-5 text-muted-foreground">
                  For vendors, the central question is not only whether dose
                  estimates are scientifically credible, but whether they can be
                  integrated into a real product. The NCI Dose Tools vendor path
                  supports REST-style request and response workflows through
                  web-based services or local REST API servers, depending on the
                  evaluation and deployment environment.
                </p>
              </motion.div>

              <div className="space-y-4">
                <ApiRequestPreview
                  activeIndex={activeApiExample}
                  example={apiExamples[activeApiExample]}
                />
                <div className="grid gap-3">
                  {apiHighlights.map((highlight, index) => (
                    <motion.div
                      key={highlight.title}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                      className="flex gap-5 border border-border bg-white p-5"
                    >
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center border border-primary text-primary">
                        <highlight.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-900">{highlight.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {highlight.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
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
              className="mb-12 max-w-4xl"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-primary">
                Differentiators
              </span>
              <h2 className="mt-4 text-section-md lg:text-section">
                What sets NCI Dose Tools apart
              </h2>
              <p className="mt-5 text-muted-foreground">
                The core advantage is not only one calculator. It is an
                NCI-developed CT/RF/NM dosimetry ecosystem with reference
                phantoms, REST API pathways, and open technical documentation.
              </p>
            </motion.div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {strengths.map((strength, index) => (
                <motion.div
                  key={strength.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="border border-border bg-white p-6"
                >
                  <div className="mb-6 flex h-10 w-10 items-center justify-center border border-primary text-primary">
                    <strength.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-medium text-slate-900">{strength.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {strength.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="components" className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-12 text-center"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-primary">
                Supported Components
              </span>
              <h2 className="mt-4 text-section-md lg:text-section">
                Components vendors can evaluate
              </h2>
              <p className="mx-auto mt-5 max-w-3xl text-muted-foreground">
                Vendor evaluation focuses on the REST API-accessible versions of these
                components. Each component summary outlines the relevant dose-tool
                capability, while published REST API user manuals document
                integration workflows that can fit into commercial products.
                Vendors interested in GUI-oriented overviews can visit{" "}
                <Link to="/tools" className="text-primary hover:underline">
                  Our Tools
                </Link>
                .
              </p>
            </motion.div>

            <div className="grid gap-4 md:grid-cols-2">
              {tools.map((tool, index) => {
                const VendorIcon = vendorComponentIcons[tool.id] ?? Code2;
                const componentType =
                  tool.id === "phantom" ? "Reference Library" : "REST API Component";

                return (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden border border-border bg-white"
                  >
                    <div className="flex h-full flex-col xl:grid xl:grid-cols-[220px_1fr]">
                      <div className="flex min-h-[180px] w-full flex-col items-center justify-center border-b border-border bg-slate-50 p-6 text-center xl:h-full xl:border-b-0 xl:border-r">
                        <div className="flex h-16 w-16 items-center justify-center border border-primary/40 bg-white text-primary">
                          <VendorIcon className="h-8 w-8" />
                        </div>
                        <div className="mt-4 font-mono text-lg text-primary">
                          {tool.name}
                        </div>
                        <div className="mt-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                          {componentType}
                        </div>
                      </div>
                      <div className="min-w-0 p-5 sm:p-6">
                        <h3 className="break-words font-medium text-slate-900">
                          {tool.modality}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          {vendorComponentSummaries[tool.id] ?? tool.suiteSummary}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                          <a
                            href={apiManualLinks[tool.id] ?? tool.manualHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 font-mono text-sm text-primary hover:underline"
                          >
                            {apiManualLinks[tool.id]
                              ? "View REST API technical manual"
                              : "View user manual"}
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="mb-12 text-center"
              >
                <span className="font-mono text-xs uppercase tracking-widest text-primary">
                  Licensing and Next Steps
                </span>
                <h2 className="mt-4 text-section-md lg:text-section">
                  Start the commercial access conversation
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="border border-border bg-white p-8"
              >
                <div className="space-y-6">
                  {[
                    "Start with a REST API trial/evaluation to test technical fit in your product workflow.",
                    "Discuss which dose-tool components match your product roadmap and customer base.",
                    "Move from evaluation to commercial integration through an NCI Technology Transfer Center licensing agreement.",
                  ].map((step, index) => (
                    <div key={step} className="flex items-start gap-4">
                      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center border border-primary font-mono text-sm text-primary">
                        {index + 1}
                      </span>
                      <p className="pt-1 text-slate-700">{step}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-10 border-t border-border pt-8">
                  <h3 className="mb-6 flex items-center gap-3 font-medium text-slate-900">
                    <Building2 className="h-5 w-5 text-primary" />
                    Contact for licensing inquiries
                  </h3>
                  <div className="border border-primary/30 bg-primary/5 p-6">
                    <p className="font-medium text-slate-900">Dr. Kevin Chang</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Licensing and Technology Transfer Officer, NCI Technology Transfer Center
                    </p>
                    <a
                      href="mailto:kevin.chang@nih.gov"
                      className="mt-4 inline-flex items-center gap-2 font-mono text-sm text-primary hover:underline"
                    >
                      kevin.chang@nih.gov
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const ApiRequestPreview = ({
  activeIndex,
  example,
}: {
  activeIndex: number;
  example: (typeof apiExamples)[number];
}) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    className="overflow-hidden border border-border bg-white shadow-xl shadow-slate-900/5"
  >
    <div className="flex items-center justify-between border-b border-border bg-slate-50 px-4 py-3">
      <div>
        <div className="font-mono text-[11px] uppercase tracking-widest text-primary">
          REST API request payload
        </div>
        <div className="mt-1 font-mono text-sm text-slate-900">
          {example.title}
        </div>
      </div>
      <div className="hidden items-center gap-1.5 sm:flex">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
      </div>
    </div>

    <div className="grid border-b border-border bg-white px-4 py-3 font-mono text-xs sm:grid-cols-[auto_1fr] sm:gap-x-4">
      <span className="text-emerald-700">POST</span>
      <span className="break-all text-slate-900">{example.endpoint}</span>
      <span className="mt-2 text-muted-foreground sm:mt-0">Content-Type</span>
      <span className="text-slate-700">application/json</span>
    </div>

    <motion.div
      key={example.tool}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <div className="absolute right-4 top-4 border border-primary/30 bg-primary/5 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-primary">
        {example.tool}
      </div>
      <pre className="h-[520px] overflow-auto bg-white p-5 pt-12 text-[12px] leading-relaxed text-slate-800 sm:h-[600px] sm:text-sm">
        <code>{example.payload}</code>
      </pre>
    </motion.div>

    <div className="flex items-center justify-between border-t border-border bg-slate-50 px-4 py-3">
      <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        Web-based or local REST API server workflow
      </span>
      <div className="flex gap-1.5" aria-hidden="true">
        {apiExamples.map((item, index) => (
          <span
            key={item.tool}
            className={`h-1.5 w-6 transition-colors ${
              index === activeIndex ? "bg-primary" : "bg-slate-300"
            }`}
          />
        ))}
      </div>
    </div>
  </motion.div>
);

export default Engine;
