import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { portalLinks, tools } from "@/data/nciDoseTools";
import phantomFamilyImage from "../../family2.png";

export const WhatAreTools = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <span className="text-xs font-mono text-primary uppercase tracking-widest">
            Overview
          </span>
          <h2 className="mt-4 text-section-md lg:text-section">
            What are the NCI Dose Tools?
          </h2>
        </motion.div>

        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                The NCI Dose Tools are a suite of radiation dose estimation software tools
                developed at the National Cancer Institute (NCI) for computed tomography,
                nuclear medicine, and radiography/fluoroscopy procedures.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The tools support standardized organ dose assessment using computational
                phantoms, precomputed dose libraries, and direct Monte Carlo transport
                for research use and licensed vendor integration.
              </p>
            </div>
            <div className="p-4 bg-slate-200/40">
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground font-medium">NCI Dose Tools</span> (this website) complements the{" "}
                <a 
                  href={portalLinks.officialNci}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  official NCI webpages
                </a>{" "}
                and the{" "}
                <a 
                  href={portalLinks.github}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  GitHub documentation
                </a>{" "}
                by providing a readable public entry point: what each tool does, who it is
                for, where to request access, and where to find technical documentation.
              </p>
            </div>
          </motion.div>
        </div>
        {/* Right: Tool Suite */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-4 items-center justify-start mt-20 pt-20"
          >
            <h3 className="text-sm font-mono text-primary uppercase tracking-widest ">
              The Suite Includes
            </h3>
            <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
              {tools.map((tool, i) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={`/tools#${tool.id}`}
                    className="group flex h-full flex-col overflow-hidden border border-border bg-white transition-all duration-300 hover:border-primary/50"
                  >
                    {tool.id === "phantom" ? (
                      <div className="aspect-[16/10] border-b border-border bg-slate-100">
                        <img
                          src={phantomFamilyImage}
                          alt="Computational human phantom family models"
                          className="h-full w-full object-cover object-top"
                          loading="lazy"
                        />
                      </div>
                    ) : tool.image ? (
                      <div className="aspect-[16/10] border-b border-border bg-slate-100">
                        <img
                          src={tool.image}
                          alt={tool.imageAlt}
                          className="h-full w-full object-cover object-left-top"
                          loading="lazy"
                        />
                      </div>
                    ) : null}
                    <div className="flex flex-1 flex-col gap-3 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-mono text-lg text-primary">{tool.name}</span>
                        <span className="text-primary opacity-0 transition-opacity group-hover:opacity-100">
                          →
                        </span>
                      </div>
                      <span className="text-sm leading-relaxed text-muted-foreground">
                        {tool.suiteSummary}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
      </div>
    </section>
  );
};
