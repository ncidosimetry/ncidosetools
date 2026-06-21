import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  noBorder?: boolean;
}

const BentoCard = ({ children, className = "", delay = 0, noBorder = false }: BentoCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`glass-card inner-glow cursor-crosshair-custom overflow-hidden ${noBorder ? "!border-0" : ""} ${className}`}
    >
      {children}
    </motion.div>
  );
};

// Protocol item component
const ProtocolItem = ({ name, active = false }: { name: string; active?: boolean }) => (
  <div
    className={`px-4 py-2 text-sm font-mono border border-border transition-all duration-300 ease-expo
      ${active 
        ? "bg-primary/10 border-primary text-primary" 
        : "hover:border-primary/50 hover:bg-primary/5 text-muted-foreground hover:text-foreground"
      }`}
  >
    {name}
  </div>
);

export const BentoGrid = () => {
  const protocols = [
    "CT Abdomen", "CT Chest", "CT Head", "Fluoroscopy", 
    "Nuclear Med", "PET/CT", "Radiography", "Mammography"
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <span className="text-xs font-mono text-primary uppercase tracking-widest">
            Capabilities
          </span>
          <h2 className="mt-4 text-section-md lg:text-section">
            Precision at Every Layer
          </h2>
        </motion.div>

        {/* Bento Grid: single border via gap, no per-card borders */}
        <div className="border border-border rounded-none overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {/* Large Card: Computational Engine */}
          <BentoCard className="lg:col-span-2 lg:row-span-2 p-8" delay={0} noBorder>
            <div className="h-full flex flex-col">
              <h3 className="text-card-title text-foreground mb-4">
                The Computational Engine
              </h3>
              <p className="text-sm text-muted-foreground mb-8">
                Voxel-level dose distribution calculations with Monte Carlo precision.
              </p>
              
              {/* Code/Formula Display */}
              <div className="flex-1 flex items-center justify-center bg-background/50 rounded p-6">
                <div className="font-mono text-data">
                  <div className="text-muted-foreground mb-2">{"// Dose calculation"}</div>
                  <div className="text-primary">
                    D(x,y,z) = ∫ Φ(E) · μ<sub>en</sub>(E)/ρ · dE
                  </div>
                  <div className="text-muted-foreground mt-4 text-xs">
                    {"// Where Φ(E) = particle fluence spectrum"}
                  </div>
                </div>
              </div>

              {/* Animated dots grid */}
              <div className="mt-8 grid grid-cols-8 gap-2">
                {[...Array(16)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0.2 }}
                    animate={{ opacity: [0.2, 0.8, 0.2] }}
                    transition={{
                      duration: 2,
                      delay: i * 0.1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-2 h-2 rounded-full bg-primary"
                  />
                ))}
              </div>
            </div>
          </BentoCard>

          {/* Wide Card: Protocol Library */}
          <BentoCard className="lg:col-span-2 p-6" delay={0.1} noBorder>
            <h3 className="text-card-title text-foreground mb-4">
              Protocol Library
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Standardized examination protocols across modalities.
            </p>
            <div className="flex flex-wrap gap-2">
              {protocols.map((protocol, i) => (
                <ProtocolItem 
                  key={protocol} 
                  name={protocol} 
                  active={i === 2}
                />
              ))}
            </div>
          </BentoCard>

          {/* Tall Card: Patient-Size Scaling */}
          <BentoCard className="lg:row-span-1 p-6" delay={0.2} noBorder>
            <h3 className="text-card-title text-foreground mb-4">
              Patient-Size Scaling
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Adaptive dose mesh from pediatric to adult.
            </p>
            
            {/* Size scaling visualization */}
            <div className="flex items-end justify-center gap-4 h-32">
              {[40, 60, 80, 100].map((height, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${height}%` }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.8, 
                    delay: i * 0.1, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  className="w-4 bg-gradient-to-t from-primary/20 to-primary border border-primary/30"
                />
              ))}
            </div>
          </BentoCard>

          {/* Standard Card: Real-time Processing */}
          <BentoCard className="p-6" delay={0.3} noBorder>
            <h3 className="text-card-title text-foreground mb-4">
              Real-time Processing
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Latency</span>
                <span className="font-mono text-primary text-data">&lt;50ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Throughput</span>
                <span className="font-mono text-primary text-data">10k/sec</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Uptime</span>
                <span className="font-mono text-primary text-data">99.99%</span>
              </div>
            </div>
          </BentoCard>

          {/* Wide Card: DICOM Integration */}
          <BentoCard className="lg:col-span-2 p-6" delay={0.4} noBorder>
            <h3 className="text-card-title text-foreground mb-4">
              DICOM Integration
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Seamless import and export with complete metadata preservation.
            </p>
            
            {/* Process flow */}
            <div className="flex items-center justify-between">
              {["Ingest", "Compute", "Report"].map((step, i) => (
                <div key={step} className="flex items-center">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full border border-primary flex items-center justify-center mb-2">
                      <span className="font-mono text-primary">{i + 1}</span>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">{step}</span>
                  </div>
                  {i < 2 && (
                    <div className="w-16 h-px bg-gradient-to-r from-primary to-primary/20 mx-4" />
                  )}
                </div>
              ))}
            </div>
          </BentoCard>

          {/* Standard Card: Audit Trail */}
          <BentoCard className="p-6" delay={0.5} noBorder>
            <h3 className="text-card-title text-foreground mb-4">
              Audit Trail
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Complete calculation history with regulatory compliance.
            </p>
            <div className="space-y-2">
              {["FDA 21 CFR Part 11", "HIPAA Compliant", "ISO 27001"].map((cert) => (
                <div key={cert} className="flex items-center gap-2 text-xs font-mono">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span className="text-muted-foreground">{cert}</span>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* Standard Card: REST API Access */}
          <BentoCard className="p-6" delay={0.6} noBorder>
            <h3 className="text-card-title text-foreground mb-4">
              REST API Access
            </h3>
            <div className="bg-background/50 rounded p-3 font-mono text-xs">
              <div className="text-muted-foreground">{"// REST endpoint"}</div>
              <div className="text-primary mt-1">
                POST /v2/dose/calculate
              </div>
              <div className="text-muted-foreground mt-2">
                {"// Response: <50ms"}
              </div>
            </div>
          </BentoCard>
          </div>
        </div>
      </div>
    </section>
  );
};
