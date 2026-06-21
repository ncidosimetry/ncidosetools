import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { portalLinks } from "@/data/nciDoseTools";
import { RadiationTransportVisual } from "@/components/RadiationTransportVisual";

export const Hero = () => {
  const navigate = useNavigate();

  const handleGetAccess = () => {
    const element = document.getElementById("how-to-access");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleExploreTools = () => {
    navigate("/tools");
  };

  return (
    <section className="relative flex items-center justify-center overflow-hidden pb-8 pt-24 sm:min-h-[78vh] sm:py-24">
      <div className="container mx-auto px-6 relative z-10 flex justify-center">
        <div className="max-w-3xl space-y-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-widest"
          >
            <span className="w-2 h-2 bg-primary rounded-full animate-glow-pulse" />
            Public Information Hub
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-hero-md lg:text-hero leading-none"
          >
            NCI Dose Tools
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-2xl text-lg text-muted-foreground"
          >
            A public-facing guide to NCI-developed radiation dosimetry software for CT,
            nuclear medicine, and radiography/fluoroscopy research and licensed
            vendor integration.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto flex max-w-2xl flex-wrap justify-center gap-2 text-xs"
          >
            {[
              { label: "Official access", href: portalLinks.officialNci },
              { label: "Technical docs", href: portalLinks.github },
              { label: "Approved-user updates", href: portalLinks.googleGroup },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-border bg-background/80 px-3 py-1.5 text-muted-foreground backdrop-blur transition-colors hover:border-primary hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-4"
          >
            <button className="btn-precision" onClick={handleGetAccess}>
              Get Access
            </button>
            <button className="btn-precision-outline" onClick={handleExploreTools}>
              Explore the Tools
            </button>
          </motion.div>

          <RadiationTransportVisual />
        </div>
      </div>
    </section>
  );
};
