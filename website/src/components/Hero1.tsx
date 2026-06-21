import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import NCICTImage from "./assets/NCICT.png";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const navigate = useNavigate();

  const handleGetAccess = () => {
    const element = document.getElementById("how-to-access");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleExploreTools = () => {
    navigate("/tools");
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x, y });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
      style={{
        "--mouse-x": `${mousePosition.x}%`,
        "--mouse-y": `${mousePosition.y}%`,
      } as React.CSSProperties}
    >
      {/* Radial gradient following cursor */}
      <div className="absolute inset-0 radial-glow pointer-events-none transition-all duration-300 ease-out" />

      {/* Grid lines background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-0 right-0 h-px bg-primary/30" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-primary/30" />
        <div className="absolute top-3/4 left-0 right-0 h-px bg-primary/30" />
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-primary/30" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary/30" />
        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-primary/30" />
      </div>

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-5 items-center gap-12">
        <div className="space-y-8 text-start max-w-2xl col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-widest"
          >
            <span className="w-2 h-2 bg-primary rounded-full animate-glow-pulse" />
            System Online
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-hero-md lg:text-hero leading-none"
          >
            NCI DOSE TOOLS
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-muted-foreground max-w-xl"
          >
            Reference-grade radiation dose tools for patient-specific, anatomically realistic dose estimation
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-start gap-4"
          >
            <button className="btn-precision" onClick={handleGetAccess}>
              Get Access
            </button>
            <button className="btn-precision-outline" onClick={handleExploreTools}>
              Explore the Tools
            </button>
          </motion.div>
        </div>

        {/* NCICT Dosimetry System Preview */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="hidden xl:block relative group col-span-2 mt-12"
        >
          <div className="glass-card p-1 overflow-hidden hover:border-border ">
            <img
              src={NCICTImage}
              alt="NCI CT Dosimetry System Interface"
              className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
          </div>
          <div className="absolute -top-3 -right-3 w-6 h-6 border-t border-r border-primary" />
          <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b border-l border-primary" />
        </motion.div>
      </div>

      {/* Bottom scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        {/* <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Scroll</span> */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: [0.16, 1, 0.3, 1] }}
          className="w-[3px] rounded-full h-12 bg-gradient-to-b from-transparent to-primary"
        />
      </motion.div>
    </section>
  );
};
